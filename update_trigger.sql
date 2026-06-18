-- JALANKAN DI SQL EDITOR SUPABASE DASHBOARD
-- ----------------------------------------------------
-- Query ini memperbarui fungsi trigger handle_new_user
-- dan check_profile_update di Supabase.
-- 
-- Fitur yang diperbarui:
-- 1. Deteksi otomatis email dan metadata pendaftaran.
-- 2. Menghapus hak akses administrator dan jenjang sekolah secara silang (Siswa tidak boleh menjadi admin & Admin wajib tanpa jenjang sekolah).

-- ==========================================
-- 1. PERBARUI TRIGGER PENDAFTARAN (handle_new_user)
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  clean_username VARCHAR(100);
  detected_level public.edu_level_type;
  is_first_user BOOLEAN;
  final_level public.edu_level_type;
  final_is_admin BOOLEAN;
BEGIN
  -- 1. Bersihkan email untuk format username yang ramah
  clean_username := INITCAP(REGEXP_REPLACE(SPLIT_PART(NEW.email, '@', 1), '[\._-]', ' ', 'g'));
  
  -- 2. Deteksi level pendidikan berdasarkan metadata, domain atau kata kunci di email
  IF NEW.raw_user_meta_data->>'edu_level' IS NOT NULL THEN
    detected_level := (NEW.raw_user_meta_data->>'edu_level')::public.edu_level_type;
  ELSIF NEW.email ILIKE '%@sd.sekolahmu.sch.id' THEN
    detected_level := 'sd'::public.edu_level_type;
  ELSIF NEW.email ILIKE '%@univ.sekolahmu.sch.id' THEN
    detected_level := 'kuliah'::public.edu_level_type;
  ELSIF NEW.email ILIKE '%@smk.sekolahmu.sch.id' OR NEW.email ILIKE '%@smp.sekolahmu.sch.id' THEN
    detected_level := 'smk'::public.edu_level_type;
  ELSIF NEW.email ILIKE '%sd.%' OR NEW.email ILIKE '%+sd%' OR NEW.email ILIKE '%.sd%' THEN
    detected_level := 'sd'::public.edu_level_type;
  ELSIF NEW.email ILIKE '%kuliah.%' OR NEW.email ILIKE '%univ.%' OR NEW.email ILIKE '%ac.id' OR NEW.email ILIKE '%+kuliah%' OR NEW.email ILIKE '%.kuliah%' THEN
    detected_level := 'kuliah'::public.edu_level_type;
  ELSE
    detected_level := 'smk'::public.edu_level_type;
  END IF;

  -- 3. Cek apakah ini user pertama di tabel profiles
  SELECT NOT EXISTS (SELECT 1 FROM public.profiles) INTO is_first_user;

  -- 4. Tentukan is_admin final (user pertama otomatis menjadi admin)
  final_is_admin := is_first_user;

  -- Proteksi: Pendaftar dengan domain email sekolah tidak boleh menjadi admin pertama kali
  IF final_is_admin AND (
     NEW.email ILIKE '%@sd.sekolahmu.sch.id' OR 
     NEW.email ILIKE '%@univ.sekolahmu.sch.id' OR 
     NEW.email ILIKE '%@smk.sekolahmu.sch.id' OR 
     NEW.email ILIKE '%@smp.sekolahmu.sch.id' OR
     NEW.email ILIKE '%sd.%' OR 
     NEW.email ILIKE '%kuliah.%' OR 
     NEW.email ILIKE '%univ.%' OR 
     NEW.email ILIKE '%ac.id'
  ) THEN
    final_is_admin := false;
  END IF;

  -- Jika admin, edu_level WAJIB NULL. Jika bukan admin, wajib ada edu_level.
  IF final_is_admin THEN
    final_level := NULL;
  ELSE
    final_level := detected_level;
  END IF;

  -- 5. Masukkan ke tabel profiles
  INSERT INTO public.profiles (id, username, edu_level, email, is_admin, avatar_url)
  VALUES (
    NEW.id,
    clean_username,
    final_level,
    NEW.email,
    final_is_admin,
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL)
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;


-- ==========================================
-- 2. PERBARUI TRIGGER UPDATE PROFILE (check_profile_update)
-- ==========================================
CREATE OR REPLACE FUNCTION public.check_profile_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Blokir perubahan is_admin HANYA jika dipicu oleh client-side auth session yang bukan admin (auth.uid() is not null)
  IF auth.uid() IS NOT NULL AND NEW.is_admin IS DISTINCT FROM OLD.is_admin AND NOT public.is_admin() THEN
    NEW.is_admin := OLD.is_admin;
  END IF;

  -- Proteksi 1: Jika menjadi admin (is_admin = true), maka edu_level dipaksa NULL (tidak boleh memiliki jenjang sekolah/siswa)
  IF NEW.is_admin = true THEN
    NEW.edu_level := NULL;
  -- Proteksi 2: Jika menjadi siswa biasa (is_admin = false), maka edu_level wajib ada (tidak boleh NULL)
  ELSIF NEW.is_admin = false AND NEW.edu_level IS NULL THEN
    NEW.edu_level := COALESCE(OLD.edu_level, 'smk'::public.edu_level_type);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
