# Project Context: SekolahMu (LMS DevLearn) - Updated with Supabase & Groq Integration

SekolahMu (LMS DevLearn) adalah prototipe aplikasi Learning Management System (LMS) berbasis web interaktif yang dirancang khusus untuk mendukung berbagai jenjang sekolah dengan desain modern, premium, responsif, serta adaptif terhadap tiga tingkat pendidikan yang berbeda: **Sekolah Dasar (SD)**, **Sekolah Menengah Kejuruan (SMK)**, dan **Perguruan Tinggi (Kuliah)**.

---

## 🛠️ Tech Stack & Konsep Inti
1.  **Core:** HTML5 murni (Vanilla HTML) dan Vanilla JavaScript (ES6+).
2.  **Styling:** CSS3 dengan **Tailwind CSS v4** (diimpor melalui `@import "tailwindcss"` di `src/css/index.css`).
3.  **Typography:** Menggunakan Google Fonts *Plus Jakarta Sans* untuk teks umum (`var(--font-sans)`) dan *Outfit* untuk judul/header (`var(--font-display)`), diimpor langsung pada file CSS utama.
4.  **Icons:** Lucide Icons SVG (di-render dinamis via script tag `unpkg.com/lucide@latest` dan diinisiasi lewat `lucide.createIcons()`).
5.  **Build Tool:** Vite untuk server lokal (`npm run dev`) dan manajemen aset.
6.  **Backend & Database:** **Supabase (PostgreSQL)** untuk menggantikan penyimpanan statis `db.js` dan penyimpanan lokal `store.js`. Data disinkronisasikan secara real-time.
7.  **AI Integration:** **Groq Cloud API** untuk mentenagai virtual chatbot SekolahMu Buddy dengan persona adaptif.
8.  **Theme Dynamic & Adaptive Layout:**
    *   Variabel warna, tata letak, dan visibilitas diatur berdasarkan atribut `data-theme` pada elemen `<html>` (misal: `[data-theme="sd"]`, `[data-theme="kuliah"]`, dan default untuk SMK).
    *   Inisialisasi tema dilakukan melalui inline script di bagian `<head>` pada setiap file HTML untuk mencegah efek *Flash of Unstyled Content* (FOUC) sebelum halaman di-render sepenuhnya.
    *   Penanganan tema diatur secara terpusat dengan menetapkan atribut `data-theme` pada `document.documentElement` sehingga seluruh halaman langsung menyesuaikan variabel warna CSS secara efisien.
    *   Aturan show/hide elemen adaptif menggunakan utilitas CSS murni di `src/css/index.css`:
        *   `.show-sd` (hanya tampil di SD) & `.hide-sd` (sembunyikan di SD).
        *   `.show-kuliah` (hanya tampil di Kuliah) & `.hide-kuliah` (sembunyikan di Kuliah).
        *   Mekanisme ini menghindarkan DOM manipulation JavaScript yang berat, menjaga performa render tetap instan.

---

## 🎨 Premium Visual Elements (Optimized Visuals)
Aplikasi ini dirancang dengan standar UI modern kualitas premium yang dioptimalkan kinerjanya:
*   **Dynamic Background Blobs:** Lingkaran warna gradasi melayang di latar belakang menggunakan kelas `.blob` (`.blob-1` & `.blob-2`) dengan animasi `@keyframes blob-drift` yang beradaptasi secara dinamis sesuai tema tingkat pendidikan aktif.
*   **Optimized Glassmorphism Layout:** Komponen utama melayang yang statis (*Sidebar*, *Topbar/Header*, *Modal Dialog*, dan *Console Obrolan Buddy*) menggunakan efek `.glass-panel` transparan (`backdrop-filter: blur(20px) saturate(180%); background: rgba(255, 255, 255, 0.72); border: 1px solid rgba(255, 255, 255, 0.45); box-shadow: var(--shadow-glass)`). Untuk komponen berulang yang padat (seperti *bento cards* atau *course-card*), efek `backdrop-filter` dihilangkan dan diganti dengan latar semi-transparan solid (misal: `bg-white/85`) dengan drop shadow biasa untuk mempertahankan performa *scrolling* yang lancar pada semua jenis perangkat.
*   **Animasi Dropdown:** Dropdown Notifikasi dan Profil menggunakan kelas `.dropdown-menu` dengan `@keyframes fadeInScale` sehingga meluncur dan membesar secara organik (`scale` dan `opacity`) dengan kurva transisi *cubic-bezier* premium dari kanan atas.
*   **Z-index Stacking Context:**
    *   Konten utama: `z-10`
    *   Header / Topbar: `z-30`
    *   Dropdown menu: `z-40`
    *   SekolahMu Buddy Container: `z-50` (Sejajar dengan modal dan diposisikan paling atas untuk menghindari bug terpotong oleh komponen lain).
*   **Universal Interactive Transition & Hover Effect:** Semua elemen interaktif (`a`, `button`, `select`, `input`, `.course-card`) menerapkan transisi halus (`transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1)`) dan kartu utama memiliki efek `.hover-lift` (`translateY(-4px)` + bayangan melayang).
*   **Responsive Calendar Grid:** Grid tanggal kalender bulanan menggunakan utilitas `aspect-square` agar sel tanggal tetap persegi secara responsif tanpa tumpang tindih. Dot indikator kegiatan diposisikan secara absolut di bagian bawah sel dan dibatasi maksimal 3 dot untuk menghindari penumpukan visual.

---

## 📂 Struktur Direktori Proyek
```text
learning-management-system/
├── index.html            # Dashboard / Beranda Siswa
├── login.html            # Halaman Portal Masuk dengan Autentikasi Email (Tanpa Pemilih Jenjang)
├── courses.html          # Katalog Mata Pelajaran / Kuliah (Aktif & Riwayat Semester Sebelumnya)
├── course-detail.html    # Halaman Detail Kursus, Progress Modul, & Forum Real-time
├── calendar.html         # Agenda & Kalender Kegiatan Interaktif
├── grades.html           # Rapor Nilai & Bento Grid Hasil Belajar
├── files.html            # Penyimpanan File Cloud Drive Pribadi & Radial Progress Ring
├── admin.html            # Halaman Admin Panel untuk Manajemen Peran & Jenjang
├── package.json          # Konfigurasi npm (scripts, dependencies)
├── vite.config.js        # Konfigurasi Vite & Tailwind CSS
├── database.md           # Dokumentasi Migrasi & Skema Supabase Database
├── context/
│   ├── context-old.md    # Context lama sebelum optimasi
│   ├── context-new.md    # Context terbaru proyek (File ini)
│   └── implementation_plan.md # Panduan langkah demi langkah refactoring & integrasi
└── src/
    ├── css/
    │   └── index.css     # Base Tailwind, Font Google, Variabel Tema & Adaptive CSS
    └── js/
        ├── store.js      # Central State Management (getState/setState untuk sinkronisasi state UI lokal)
        ├── supabaseClient.js # Inisialisasi Supabase Client dengan URL dan Anon Key
        ├── components/   # Folder Komponen Modular ES6
        │   ├── sidebar.js # Render Sidebar dinamis & penanda menu aktif otomatis
        │   └── header.js  # Render Header dinamis (Menu Ganti Jenjang Dihapus)
        ├── db.js         # Central Static Database (Data Riwayat Pelajaran Masa Lalu)
        ├── main.js       # Logika Global (Inisiasi Komponen Modular, Sesi Supabase, Sidebar Mobile, Logout)
        ├── login.js      # Logika login & signup Supabase Auth serta Deteksi Jenjang Bawaan dari Domain Email
        ├── dashboard.js  # Handler data dinamis dasbor & welcome banner premium
        ├── courses.js    # Handler grid kursus dari Supabase berdasarkan jenjang aktif
        ├── course-detail.js # Handler detail kursus, progress modul, upload tugas, kuis confetti, & forum diskusi real-time (Realtime Channel)
        ├── calendar.js   # Pembuat kalender bulanan responsif & sinkronisasi agenda pribadi/sistem ke database
        ├── grades.js     # Bento grid pencapaian akademik dinamis
        ├── files.js      # Handler unggah/unduh file Supabase Storage bucket 'user-documents' & Signed URL
        ├── admin.js      # Handler untuk halaman Admin Panel (pencarian, filter, edit data real-time, toast)
        └── buddy.js      # SekolahMu Buddy (Virtual Pet obrolan akademik Groq API dengan guardrails & metadata akademik terintegrasi)
```

---

## 🌟 Jenjang Pendidikan, Peran & Manajemen Pembatasan
Sesuai kesepakatan **Pendekatan 1**, pengguna tidak dapat lagi secara bebas memilih atau mengubah jenjang pendidikan mereka dari antarmuka login maupun profile dropdown. Perubahan jenjang pendidikan ditentukan sepenuhnya oleh Administrator melalui database Supabase (kolom `edu_level` pada tabel `public.profiles`).

*   **Pola Pendaftaran Default (Domain Email Detection):** Saat pengguna baru mendaftar secara otomatis, sistem akan menganalisis domain email untuk memetakan tingkat pendidikan bawaan (contoh: `@sd.sekolahmu.sch.id` otomatis masuk jenjang `sd`, sedangkan domain umum/lainnya masuk jenjang `smk`).
*   **Penghapusan Selector & Switcher:** Selektor kartu jenjang di halaman login, opsi "Ganti Jenjang" di dropdown profil, serta *event listener* beralih jenjang di Javascript telah dihapus sepenuhnya dari sisi klien.
*   **Peran Administrator (Admin Role & Exclusive View):**
    - **Kolom `is_admin`**: Tabel `profiles` dilengkapi dengan kolom `is_admin` (BOOLEAN) untuk mengidentifikasi peran administrator.
    - **Tampilan Khusus Admin**: Akun administrator secara otomatis dialihkan (`redirect`) ke halaman `admin.html` sesaat setelah login. Mereka diblokir sepenuhnya dari mengakses halaman student biasa (seperti dashboard `index.html`, `courses.html`, dll).
    - **Sidebar Khusus**: Menu sidebar untuk admin secara eksklusif hanya menampilkan tautan **"Admin Panel"** dan tombol **"Keluar"** (tanpa menu student lainnya).
    - **Skema Warna Ungu Premium (`[data-theme="admin"]`)**: Admin memiliki tema warna visual ungu/violet aksen (`#a855f7`) eksklusif untuk panel kontrol mereka.

| Fitur | Sekolah Dasar (SD) | Sekolah Menengah (SMK) - Default | Perguruan Tinggi (Kuliah) | Administrator (Admin Panel) |
| :--- | :--- | :--- | :--- | :--- |
| **Warna Aksen** | Biru Langit (`#0ea5e9` - Sky) | Amber / Soft Yellow (`#eab308` - Amber) | Indigo (`#6366f1` - Indigo) | Ungu / Violet (`#a855f7` - Purple) |
| **Header / Menu** | Sederhana. Kolom pencarian, chat, kalender, dan file pribadi disembunyikan. | Lengkap dengan bilah pencarian & navigasi penuh. | Lengkap dengan bilah pencarian & navigasi penuh. | Menu Tameng Admin Panel & Keluar (Logout) eksklusif. |
| **Widget Dashboard** | **Bintang Prestasi Saya 🌟**: Menampilkan pencapaian bintang kuis mingguan. | Standar tugas mendatang. | **Pintasan Akademik 🌐**: Tautan cepat (E-Journal, Perpus, KRS, Layanan Dosen). | Panel kontrol pengguna (Pencarian & Filter Jenjang/Peran). |
| **Indikator Progres** | Progress Belajar (Persentase) | Progress Belajar (Persentase) | **KHS & Transkrip**: Menampilkan IPK Semester (`3.85 / 4.00`) & beban SKS. | Manajemen dropdown `edu_level` dan toggle `is_admin` real-time. |
| **Sistem Detail Kelas** | Modul Ceria + Kuis Bintang (confetti confetti-canvas) | Modul & Materi + Dropbox Tugas | Silabus & Modul + Submisi Tugas + Forum Diskusi Mahasiswa | - |
| **Virtual Buddy Persona**| **Piko (Dino 🦖)**: Sapaan *"Teman Piko"*, ceria, evolusi visual berdasarkan total bintang kuis. | **Dev-Bot 2.0 (Robot 🤖)**: Sapaan *"Sobat Belajar"*, general (tidak RPL-spesifik), membagi waktu belajar dengan sehat. | **Athena (Burung Hantu 🦉)**: Sapaan *"Rekan Mahasiswa"*, semi-formal akademis. | - (Ditiadakan untuk tampilan bersih) |

---

## 💾 Integrasi Database & Autentikasi Supabase
Sistem SekolahMu LMS terhubung penuh ke cloud database **Supabase (PostgreSQL)** untuk penyimpanan data persisten dan real-time:
1.  **Supabase Auth (Separate Login & SignUp Flows):** Autentikasi dipisah secara eksplisit antara alur masuk dan daftar baru. Di halaman portal (`login.html`), terdapat tautan toggle untuk beralih mode. 
    *   **Login Mode:** Memanggil API `signInWithPassword`. Jika kata sandi atau email salah, mengembalikan pesan error dalam Bahasa Indonesia yang ramah tanpa mendaftarkan akun secara otomatis.
    *   **SignUp Mode:** Memanggil API `signUp` dengan pendeteksian jenjang berbasis domain email dan pemetaan nama pengguna otomatis.
2.  **Trigger Database (`on_auth_user_created`):** Trigger di database mengeksekusi fungsi PL/pgSQL `handle_new_user` untuk menyalin pengguna yang baru mendaftar di `auth.users` ke tabel `public.profiles` dengan pengaturan username yang rapi (kapitalisasi + penghapusan pemisah) dan penetapan jenjang otomatis. Fungsi ini dikonfigurasi secara aman menggunakan `SECURITY DEFINER SET search_path = public` untuk mencegah error skema.
3.  **Tabel Relasional database:**
    *   `profiles`: Data profil mahasiswa/siswa (id, username, edu_level, avatar_url).
    *   `courses`: Data kelas akademis aktif serta kelas masa lalu (riwayat pelajaran).
    *   `user_module_progress`: Menyimpan status checklist pengerjaan modul.
    *   `forum_messages`: Obrolan diskusi mahasiswa perkuliahan yang disinkronisasi instan menggunakan *Supabase Realtime Channel Subscription*.
    *   `calendar_agendas`: Agenda sistem (global sesuai jenjang) dan agenda personal (RLS terikat ke pemilik user).
    *   `user_files`: Metadata penyimpanan cloud pribadi.
4.  **Supabase Storage & Signed URL:** File pribadi yang diunggah dikirim langsung ke Supabase Storage bucket privat `user-documents` dengan jalur terenkripsi `${user_id}/${edu_level}/`. Tautan unduhan berkas digenerasi dinamis menggunakan Signed URL berdurasi kedaluwarsa 60 detik untuk menjamin keamanan berkas.

---

## 🤖 Integrasi AI Groq Cloud API (`src/js/buddy.js`)
Widget floating SekolahMu Buddy terintegrasi penuh dengan **Groq Cloud API** menggunakan kunci API dinamis di frontend:
*   **Academic Context Injection:** Setiap permintaan obrolan secara dinamis menyuntikkan data akademis terbaru dari state aplikasi (daftar mata pelajaran aktif, modul yang sedang dikerjakan, detail tugas, dan tenggat waktu).
*   **Navigation Guidance:** Chatbot memahami peta navigasi aplikasi (seperti tautan ke `grades.html` atau `calendar.html` sesuai nama menu jenjang aktif) sehingga bisa mengarahkan user dengan tepat.
*   **Guardrails & Rules:** Membatasi AI untuk hanya merespons topik akademis, melarang pemberian jawaban kode penuh (hanya boleh kerangka dan petunjuk pemikiran), membatasi panjang respons maksimal 3 kalimat agar pas di UI gelembung obrolan, serta menyembunyikan identitas mesin aslinya (Athena/Dev-Bot/Piko).
