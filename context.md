# Project Context: SekolahMu (LMS DevLearn)

SekolahMu (LMS DevLearn) adalah prototipe aplikasi Learning Management System (LMS) berbasis web interaktif. Aplikasi ini dirancang agar kompatibel dengan template Moodle namun dengan desain modern, premium, responsif, dan adaptif terhadap tiga jenjang pendidikan yang berbeda: **Sekolah Dasar (SD)**, **Sekolah Menengah Kejuruan (SMK)**, dan **Perguruan Tinggi (Kuliah)**.

---

## 🛠️ Tech Stack & Konsep Inti
1. **Core:** HTML5 murni (Vanilla HTML) dan Vanilla JavaScript (ES6+).
2. **Styling:** CSS3 dengan **Tailwind CSS v4** (diimpor melalui `@import "tailwindcss"` di `src/css/index.css`).
3. **Icons:** Lucide Icons SVG (di-render dinamis via script tag `unpkg.com/lucide@latest` dan diinisiasi lewat `lucide.createIcons()`).
4. **Build Tool:** Vite untuk server lokal (`npm run dev`) dan manajemen aset.
5. **Theme Dynamic & Adaptive Layout:**
   - Variabel warna, tata letak kolom, dan visibilitas menu diatur berdasarkan class di elemen `<body>` (misal: `body.theme-sd`, `body.theme-kuliah`, dan default untuk SMK).
   - Aturan show/hide elemen adaptif menggunakan utilitas CSS murni di `src/css/index.css`:
     - `.show-sd` (hanya tampil di SD) & `.hide-sd` (sembunyikan di SD).
     - `.show-kuliah` (hanya tampil di Kuliah) & `.hide-kuliah` (sembunyikan di Kuliah).
     - Mekanisme ini menghindarkan DOM manipulation JavaScript yang berat, menjaga performa render tetap instan.

---

## 📂 Struktur Direktori Proyek
```text
learning-management-system/
├── index.html            # Dashboard / Beranda Siswa
├── login.html            # Halaman Portal Masuk & Pemilih Jenjang
├── courses.html          # Katalog Mata Pelajaran / Kuliah
├── course-detail.html    # Halaman Detail Kursus & Pembelajaran
├── calendar.html         # Agenda & Kalender Kegiatan Interaktif
├── package.json          # Konfigurasi npm (scripts, dependencies)
├── vite.config.js        # Konfigurasi Vite & Tailwind CSS
└── src/
    ├── css/
    │   └── index.css     # Base Tailwind & Kustomisasi Variabel Tema & Adaptive CSS
    └── js/
        ├── db.js         # Central Database (Mock Data untuk semua jenjang)
        ├── main.js       # Logika Global (Inisiasi Lucide, Session Check, Sidebar Mobile, Logout)
        ├── login.js      # Logika login & interaktivitas level selector
        ├── dashboard.js  # Handler data dinamis & widget Dashboard
        ├── courses.js    # Handler grid kursus, filter tab, dan fitur pencarian
        ├── course-detail.js # Handler modul, sistem kuis (SD), upload tugas (SMK/Kuliah), forum diskusi (Kuliah)
        ├── calendar.js   # Pembuat kalender grid interaktif bulanan & formulir tambah kegiatan
        └── buddy.js      # SekolahMu Buddy (Virtual Pet pendamping belajar adaptif)
```

---

## 🌟 Tingkatan Pendidikan (Educational Levels)
Perubahan jenjang pendidikan mengubah visual (warna aksen, ikon, ilustrasi) dan fungsionalitas (menu sidebar, jenis tugas, widget khusus).

| Fitur | Sekolah Dasar (SD) | SMK (RPL) - Default | Perguruan Tinggi (Kuliah) |
| :--- | :--- | :--- | :--- |
| **Warna Aksen** | Biru Langit (`#0ea5e9` - Sky) | Amber / Soft Yellow (`#eab308` - Amber) | Indigo (`#6366f1` - Indigo) |
| **Header / Menu** | Sederhana. Kolom pencarian, chat, kalender, dan file pribadi disembunyikan. | Lengkap dengan bilah pencarian & navigasi penuh. | Lengkap dengan bilah pencarian & navigasi penuh. |
| **Widget Dashboard** | **Bintang Prestasi Saya 🌟**: Menampilkan pencapaian bintang mingguan. | Standar tugas mendatang. | **Pintasan Akademik 🌐**: Tautan cepat (E-Journal, Perpus, KRS, Layanan Dosen). |
| **Indikator Progres** | Progress Belajar (Persentase) | Progress Belajar (Persentase) | **KHS & Transkrip**: Menampilkan IPK Semester (`3.85 / 4.00`) & beban SKS. |
| **Sistem Detail Kelas** | Modul Ceria + Kuis Bintang (interaktif) | Modul & Materi + Dropbox Tugas | Silabus & Modul + Submisi Tugas + Forum Diskusi Mahasiswa |
| **Virtual Buddy Persona**| **Piko (Dino 🦖)**: Tumbuh dari telur ke naga bijak berdasarkan jumlah bintang kuis. | **Dev-Bot 2.0 (Drone 🤖)**: Status baterai terisi berdasarkan persentase penyelesaian modul. | **Athena (Burung Hantu 🦉)**: Tingkatan level kebijaksanaan seiring progres modul selesai. |

---

## 💾 Manajemen State (Session & LocalStorage)
Aplikasi ini berjalan tanpa database server, melainkan memanfaatkan data statis di `db.js` dan sinkronisasi status via `localStorage`:
- `edu-level` : Menyimpan jenjang aktif (`sd`, `smk`, `kuliah`).
- `username` : Menyimpan nama pengguna dari form login.
- `progress-course-[id]` : Menyimpan persentase belajar per modul kelas.
- `kuis-stars-[id]` : Jumlah bintang yang diperoleh anak SD saat kuis selesai.
- `modules-course-[id]` : Status checklist materi modul (selesai/belum).
- `tugas-status-[id]` : Status pengumpulan berkas tugas (`true`/`false`).
- `forum-course-[id]` : Riwayat obrolan di forum diskusi perkuliahan.
- `custom-agendas` : Daftar agenda kustom yang ditambahkan lewat kalender.

---

## 🧩 Modul Pendukung Khusus

### 1. Central Static Database (`src/js/db.js`)
Menyediakan modul modular ekspor:
- `sidebarTexts`: Kustomisasi teks menu samping (misal: "Mata Pelajaran" untuk SMK vs "Mata Kuliah" untuk Kuliah vs "Kelas Saya" untuk SD).
- `scheduleData`: Agenda pelajaran harian.
- `deadlinesData`: Jadwal tugas mendatang.
- `coursesData`: Data struktural kelas, berisi judul, guru/dosen, deskripsi, daftar sub-modul materi, soal kuis bergambar (SD), target tugas (SMK/Kuliah).
- `calendarData`: Event kalender bawaan per jenjang.

### 2. SekolahMu Buddy (`src/js/buddy.js`)
Sebuah floating widget Virtual Pet yang disuntikkan ke seluruh halaman:
- **Animasi:** Menggunakan CSS animation `@keyframes buddy-float` yang memberikan efek melayang dinamis pada avatar.
- **Greeting/Speech Bubble:** Mengeluarkan balon dialog berisi sapaan ramah pada jeda waktu tertentu (idle/awal load) yang disesuaikan dengan bahasa anak (SD), bahasa programmer (SMK), atau akademis formal (Kuliah).
- **Console Obrolan:** Ketika avatar diklik, panel chat akan meluncur ke atas. Pengguna bisa mengetik pesan (terutama kata kunci seperti `tips`, `tugas`, `bintang`/`level`, atau `lelucon`) dan Buddy akan merespons secara real-time disertai visual "Typing Indicator" (animasi 3 titik memantul).

### 3. Modul Kuis Ceria (`src/js/course-detail.js` - SD Only)
- Menampilkan soal-soal pilihan ganda yang ceria.
- Menghitung jawaban benar-salah. Jika benar 100%, akan memicu trigger kembang api **Canvas Confetti** (`canvas-confetti` library), memberikan 10 Bintang Prestasi, dan memperbarui visual pet Piko agar berevolusi ke bentuk yang lebih dewasa.

### 4. Modul Submisi Tugas (`src/js/course-detail.js` - SMK & Kuliah)
- Drag-and-drop zone mockup untuk upload file.
- Simulasi progress bar upload dengan presentase loading dinamis dari 0% ke 100% menggunakan `setInterval` sebelum menyimpan status pengumpulan.

### 5. Modul Forum Diskusi Perkuliahan (`src/js/course-detail.js` - Kuliah Only)
- Chat room perkuliahan yang menampilkan komentar/instruksi dosen (ber-badge merah) dan mahasiswa (ber-badge indigo).
- Mahasiswa dapat mengirim tanggapan baru yang langsung ditambahkan ke antrean layout serta disimpan ke `localStorage`.

### 6. Kalender Kegiatan (`src/js/calendar.js`)
- Menggambar grid tanggal bulanan dinamis.
- Hari-hari yang memiliki kegiatan ditandai dengan dot kecil berwarna (hijau untuk kelas, orange untuk deadline, dan indigo untuk event).
- Dilengkapi navigasi perpindahan bulan (Maju/Mundur).
- Mengintegrasikan modal pop-up "Tambah Kegiatan Baru" yang sinkron dengan penanda dot kalender secara instan.
