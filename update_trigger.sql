-- JALANKAN DI SQL EDITOR SUPABASE DASHBOARD
-- ----------------------------------------------------
-- Query ini memperbarui fungsi trigger handle_new_user
-- agar mendeteksi level pendidikan secara otomatis dari
-- domain email sekolahmu.sch.id baru atau dari metadata pendaftaran.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  clean_username VARCHAR(100);
  detected_level public.edu_level_type;
  is_first_user BOOLEAN;
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

  -- 4. Masukkan ke tabel profiles
  INSERT INTO public.profiles (id, username, edu_level, email, is_admin, avatar_url)
  VALUES (
    NEW.id,
    clean_username,
    detected_level,
    NEW.email,
    is_first_user, -- Set user pertama sebagai admin secara otomatis untuk mempermudah testing
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL)
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
