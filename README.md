# SekolahMu LMS 🎓🌐

SekolahMu LMS (Learning Management System) adalah platform manajemen pembelajaran modern yang dirancang khusus untuk memfasilitasi berbagai jenjang pendidikan secara dinamis dalam satu aplikasi. Platform ini mengusung antarmuka premium berbasis **glassmorphism** dengan transisi yang halus, serta didukung penuh oleh infrastruktur real-time dari **Supabase**.

Aplikasi ini mendeteksi level pendidikan pengguna secara otomatis saat pendaftaran berdasarkan pola email, dan langsung menyesuaikan tema, fitur akademik, pintasan, hingga karakter pendamping (Buddy Chatbot) sesuai tingkatannya.

---

## 🎮 Panduan Uji Coba Cepat (Credentials & Pengujian)

Untuk mencoba aplikasi secara langsung baik di localhost maupun hasil deploy, Anda dapat mendaftarkan akun baru secara gratis melalui tombol **"Daftar Baru"** di halaman login. 

Gunakan **pola alamat email** berikut agar sistem secara otomatis memetakan jenjang pendidikan Anda:

| Jenjang Pendidikan / Peran | Pola Email yang Wajib Digunakan | Contoh Email untuk Daftar | Sandi (Password) |
| :--- | :--- | :--- | :--- |
| **Siswa Sekolah Dasar (SD)** 🎨 | Mengandung kata `sd` atau `+sd` | `siswa+sd@gmail.com` <br> `anak.sd@school.com` | *Bebas (Min. 6 Karakter)* |
| **Siswa Sekolah Menengah (SMK)** 💻 | Email biasa (default sistem) | `siswa@gmail.com` <br> `rpl.smk@gmail.com` | *Bebas (Min. 6 Karakter)* |
| **Mahasiswa Kuliah (Universitas)** 🎓 | Mengandung kata `kuliah`, `univ`, atau `ac.id` | `mahasiswa+kuliah@gmail.com` <br> `budi@univ.ac.id` | *Bebas (Min. 6 Karakter)* |

### 🛡️ Cara Mendapatkan Akses Administrator (Admin Panel):
1. **Pengguna Pertama (Otomatis)**: Jika database Supabase Anda masih baru dan tabel `profiles` kosong, akun pertama yang mendaftar (selama tidak menggunakan email berdomain sekolah) akan otomatis dipromosikan sebagai **Administrator Utama**.
2. **Melalui Panel Admin**: Akun admin yang sudah aktif dapat masuk ke Panel Admin (`admin.html`), mengeklik tombol **"Tambah Pengguna"**, lalu mendaftarkan staf admin baru dengan mencentang opsi **"Jadikan Administrator"**.

---

## 🌟 Fitur Unggulan

### 1. Sistem Multi-Jenjang Dinamis (Multi-Level Experience)
Satu platform untuk tiga pengalaman belajar yang sepenuhnya berbeda:
*   **Sekolah Dasar (SD) 🎨**: Desain bertema cerah (Sky Blue) yang ramah anak, menampilkan pintasan visual sederhana, menyembunyikan elemen kompleks seperti search bar, serta menghadirkan pendamping belajar lucu bernama **Piko si Dinosaurus**.
*   **Sekolah Menengah Kejuruan (SMK) 💻**: Desain bertema profesional (Amber) yang berfokus pada kesiapan kerja, pemrograman, basis data, dan portofolio sertifikasi kompetensi.
*   **Kuliah / Universitas 🎓**: Desain akademis bertema elegan (Indigo) yang menampilkan SKS, praktikum, bimbingan skripsi, jurnal ilmiah, dan integrasi ruang kelas virtual.

### 2. Panel Admin Super Aman & Analitis (Advanced Admin Panel)
Dashboard manajemen khusus staf administrator dengan fitur:
*   **Bento-Grid Statistik**: Menampilkan rangkuman total pengguna aktif dan pembagian kuantitas per jenjang pendidikan secara real-time.
*   **Visualisasi Grafik Interaktif (Chart.js)**: 
    *   *Doughnut Chart*: Distribusi persentase peran pengguna (Staf Admin vs Siswa per Jenjang).
    *   *Bar Chart*: Keaktifan unggah berkas tugas siswa per jenjang.
*   **Manajemen Peran & Kelas (Full CRUD)**:
    *   Mengelola profil pengguna, menaikkan/menurunkan peran admin, serta mengubah jenjang sekolah.
    *   Membuat, mengedit, dan menghapus mata pelajaran/mata kuliah (courses) lengkap dengan penyesuaian ikon Lucide dan gradasi warna kartu kelas.
*   **Proteksi Keamanan Berlapis**:
    *   *Verifikasi Sandi Admin*: Setiap pengubahan peran administrator wajib melalui re-autentikasi kata sandi admin secara aman via Supabase Auth sebelum disimpan.
    *   *Universal Trigger Protection*: PostgreSQL trigger memastikan admin terbebas dari atribut sekolah (`edu_level = NULL`). Sebaliknya, siswa biasa dipaksa memiliki jenjang sekolah yang valid.

### 3. Penyimpanan Cloud Pribadi & Tugas (Private Document Storage)
*   Integrasi dengan **Supabase Storage Bucket** (`user-documents`).
*   Penerapan Row Level Security (RLS) yang ketat: Siswa hanya dapat mengunggah, membaca, dan menghapus berkas di dalam folder UUID pribadi mereka (`/userId/eduLevel/filename`).
*   Admin dapat memantau statistik akumulasi berkas per jenjang untuk pengawasan tugas tanpa melanggar privasi dokumen fisik.

### 4. Interactive Buddy Chatbot 🤖
*   Asisten belajar pintar di pojok kanan bawah yang memberikan panduan navigasi, tips belajar, dan humor penyemangat yang disesuaikan dengan psikologi jenjang pendidikan pengguna aktif (SD, SMK, atau Kuliah).

---

## 🛠️ Teknologi & Pustaka

*   **Frontend**: HTML5 (Semantic), Vanilla CSS (Custom Variables & Glassmorphism), Modern JavaScript (ES6+ Modules)
*   **Bundler/Build Tool**: Vite v8
*   **Backend & Database**: Supabase (Auth, Database PostgreSQL, Storage Bucket, Row Level Security, Triggers & Functions)
*   **Visualisasi**: Chart.js v4 (Auto-bundling)
*   **Ikon**: Lucide Icons

---

## 🚀 Panduan Memulai Cepat (Local Development)

Ikuti langkah-langkah berikut untuk menjalankan SekolahMu LMS di komputer lokal Anda.

### Prasyarat
*   Node.js terpasang di komputer Anda (versi 18 atau yang lebih baru direkomendasikan).
*   Akun [Supabase](https://supabase.com) aktif untuk konfigurasi backend database.

### 1. Klon Repositori
```bash
git clone https://github.com/username/learning-management-system.git
cd learning-management-system
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Konfigurasi Variabel Lingkungan (.env)
Buat sebuah berkas bernama `.env` di direktori utama proyek Anda, lalu isi dengan kredensial Supabase Anda:
```env
VITE_SUPABASE_URL=https://your-supabase-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anonymous-key
```

### 4. Jalankan Server Pengembangan Lokal
```bash
npm run dev
```
Aplikasi akan berjalan secara otomatis di `http://localhost:5173`.

---

## 🗄️ Panduan Konfigurasi Database Supabase

Agar fitur autentikasi, penyimpanan file, grafik analitis, dan sinkronisasi role berjalan lancar, Anda harus melakukan setup database di dashboard Supabase Anda.

### Langkah 1: Buat Tabel & Enumerasi (Tipe Data)
Buka menu **SQL Editor** di dashboard Supabase Anda, buat query baru, lalu jalankan skrip SQL skema utama yang ada di berkas [database.md](database.md). Skrip ini akan membuat:
1.  Tipe Enum (`edu_level_type`, `agenda_type`, `file_category_type`).
2.  Tabel `profiles` (terhubung ke `auth.users`).
3.  Tabel `courses`, `course_modules`, `course_quizzes`, `course_tasks`, `user_task_submissions`, `forum_messages`, `calendar_agendas`, dan `user_files`.

### Langkah 2: Izinkan Kolom edu_level Menerima Nilai NULL (Nullable)
Jalankan perintah SQL berikut di editor Supabase agar Administrator dapat disimpan tanpa jenjang pendidikan:
```sql
ALTER TABLE public.profiles ALTER COLUMN edu_level DROP NOT NULL;
```

### Langkah 3: Pasang Database Trigger Keamanan & Deteksi Otomatis
Salin seluruh isi berkas [update_trigger.sql](update_trigger.sql) dan jalankan di SQL Editor Supabase. Trigger ini berfungsi untuk:
*   Mendeteksi secara otomatis jenjang pendidikan pendaftar baru berdasarkan format email mereka.
*   Memastikan pengguna pertama yang mendaftar menjadi Administrator secara otomatis.
*   Mengunci aturan keamanan: Akun dengan status admin dipaksa memiliki `edu_level = NULL`. Sebaliknya, akun siswa dipaksa memiliki jenjang sekolah yang valid dan tidak bisa mengubah dirinya sendiri menjadi admin melalui manipulasi client-side.

### Langkah 4: Konfigurasi Row Level Security (RLS) & Storage
1.  **Storage Bucket**:
    *   Buka menu **Storage** di Supabase.
    *   Buat bucket baru bernama **`user-documents`** dan setel sebagai **Private**.
2.  **RLS Policies**:
    *   Jalankan query RLS kebijakan dokumen & penyimpanan berikut di SQL Editor agar file terproteksi dengan aman:

```sql
-- Kebijakan RLS Tabel user_files
ALTER TABLE public.user_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow select for owners and admins on user_files" ON public.user_files
FOR SELECT TO authenticated
USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Allow modify for owners on user_files" ON public.user_files
FOR ALL TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Kebijakan RLS Storage Bucket (storage.objects)
CREATE POLICY "Allow authenticated users to read own folder" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'user-documents' AND (auth.uid() = owner OR auth.uid()::text = (storage.foldername(name))[1]));

CREATE POLICY "Allow authenticated users to upload to own folder" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'user-documents' AND (auth.uid() = owner OR auth.uid()::text = (storage.foldername(name))[1]));

CREATE POLICY "Allow authenticated users to delete from own folder" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'user-documents' AND (auth.uid() = owner OR auth.uid()::text = (storage.foldername(name))[1]));
```

---

## 📦 Panduan Deploy ke Vercel

Aplikasi ini sepenuhnya siap untuk di-deploy ke **Vercel** secara gratis.

1.  Hubungkan repositori GitHub Anda ke akun Vercel.
2.  Pilih proyek **learning-management-system**.
3.  Konfigurasikan **Build & Development Settings**:
    *   Framework Preset: `Other` atau `Vite` (Vercel akan mendeteksinya secara otomatis).
    *   Build Command: `npm run build`
    *   Output Directory: `dist`
4.  Tambahkan **Environment Variables** di dashboard Vercel sesuai konfigurasi `.env`:
    *   `VITE_SUPABASE_URL`
    *   `VITE_SUPABASE_ANON_KEY`
5.  Klik **Deploy**! Aplikasi Anda kini dapat diakses secara publik di seluruh dunia.

---

## 📂 Struktur Proyek

```text
├── dist/                     # Hasil kompilasi produksi siap deploy
├── src/
│   ├── css/
│   │   └── index.css         # Variabel tema global & desain glassmorphism
│   └── js/
│   │   ├── components/
│   │   │   ├── header.js     # Header dinamis (avatar & notifikasi sistem)
│   │   │   └── sidebar.js    # Sidebar dinamis berdasarkan level
│   │   ├── admin.js          # Logika admin panel, CRUD kelas, & Chart.js
│   │   ├── files.js          # Logika upload berkas cloud siswa & deteksi tipe file
│   │   ├── main.js           # Sistem otentikasi, tema global, & notifikasi
│   │   ├── store.js          # Pengelola state lokal (localStorage sync)
│   │   └── supabaseClient.js # Inisialisasi SDK Supabase
├── admin.html                # Halaman Dashboard Admin
├── index.html                # Halaman Utama Siswa
├── database.md               # Rujukan skema database lengkap & SQL seed
├── update_trigger.sql        # Trigger keamanan database
├── package.json              # File manifest dependensi npm
└── README.md                 # Dokumentasi proyek (file ini)
```

---

## 📝 Lisensi

Proyek ini dilisensikan di bawah **ISC License**. Bebas digunakan untuk keperluan pembelajaran, lab sekolah, maupun pengembangan personal.
