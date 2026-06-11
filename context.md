# Project Context: SekolahMu (LMS DevLearn)

SekolahMu (LMS DevLearn) adalah prototipe aplikasi Learning Management System (LMS) berbasis web interaktif. Aplikasi ini dirancang agar kompatibel dengan template Moodle namun dengan desain modern, premium, responsif, dan adaptif terhadap tiga jenjang pendidikan yang berbeda: **Sekolah Dasar (SD)**, **Sekolah Menengah Kejuruan (SMK)**, dan **Perguruan Tinggi (Kuliah)**.

---

## 🛠️ Tech Stack & Konsep Inti
1. **Core:** HTML5 murni (Vanilla HTML) dan Vanilla JavaScript (ES6+).
2. **Styling:** CSS3 dengan **Tailwind CSS v4** (diimpor melalui `@import "tailwindcss"` di `src/css/index.css`).
3. **Typography:** Menggunakan Google Fonts *Plus Jakarta Sans* untuk teks umum (`var(--font-sans)`) dan *Outfit* untuk judul/header (`var(--font-display)`), diimpor langsung pada file CSS utama.
4. **Icons:** Lucide Icons SVG (di-render dinamis via script tag `unpkg.com/lucide@latest` dan diinisiasi lewat `lucide.createIcons()`).
5. **Build Tool:** Vite untuk server lokal (`npm run dev`) dan manajemen aset.
6. **Theme Dynamic & Adaptive Layout:**
   - Variabel warna, tata letak kolom, dan visibilitas menu diatur berdasarkan class di elemen `<body>` (misal: `body.theme-sd`, `body.theme-kuliah`, dan default untuk SMK).
   - Penanganan tema dilengkapi proteksi anti-bocor tema (*anti-theme leakage*). Seluruh script pemuatan tema membersihkan tema lain (`classList.remove('theme-sd', 'theme-kuliah')`) sebelum menambahkan kelas tema aktif.
   - Aturan show/hide elemen adaptif menggunakan utilitas CSS murni di `src/css/index.css`:
     - `.show-sd` (hanya tampil di SD) & `.hide-sd` (sembunyikan di SD).
     - `.show-kuliah` (hanya tampil di Kuliah) & `.hide-kuliah` (sembunyikan di Kuliah).
     - Mekanisme ini menghindarkan DOM manipulation JavaScript yang berat, menjaga performa render tetap instan.

---

## 🎨 Premium Visual Elements (Visual Overhaul)
Aplikasi ini menerapkan standar UI modern dengan kualitas visual tinggi:
*   **Dynamic Background Blobs:** Lingkaran warna gradasi melayang di latar belakang (`bg-accent-300` & `bg-primary-300`) yang secara halus beradaptasi warnanya mengikuti tema tingkat pendidikan aktif.
*   **Glassmorphism Layout:** Sidebar navigasi samping dan topbar menggunakan efek `.glass-panel` transparan dengan filter blur tebal (`backdrop-blur-xl bg-white/70 border-white/40 shadow-xl relative`).
*   **Animasi Dropdown:** Dropdown Notifikasi dan Profil menggunakan `@keyframes fadeInScale` sehingga meluncur dan membesar secara organik (`scale` dan `opacity`) dengan kurva transisi *cubic-bezier* premium saat dibuka.
*   **High Stacking Context:** Parent `header` diposisikan dengan `z-30` di seluruh berkas HTML untuk memastikan seluruh menu dropdown melayang di atas konten utama tanpa ada overlap dari efek transform pada welcome banner.
*   **Universal Interactive Transition:** Semua elemen interaktif (`a`, `button`, `select`, `input`, `.level-card`, `.course-card`) menggunakan transisi lambat `transition-all 0.25s` untuk memberikan umpan balik visual yang premium.

---

## 📂 Struktur Direktori Proyek
```text
learning-management-system/
├── index.html            # Dashboard / Beranda Siswa
├── login.html            # Halaman Portal Masuk & Pemilih Jenjang (Ultra-Glassmorphic)
├── courses.html          # Katalog Mata Pelajaran / Kuliah
├── course-detail.html    # Halaman Detail Kursus & Pembelajaran
├── calendar.html         # Agenda & Kalender Kegiatan Interaktif
├── grades.html           # Rapor Nilai & Bento Grid Hasil Belajar
├── files.html            # Penyimpanan File & Radial Progress Capacity
├── package.json          # Konfigurasi npm (scripts, dependencies)
├── vite.config.js        # Konfigurasi Vite & Tailwind CSS
├── context.md            # Konteks Proyek & Panduan Promp (File ini)
└── src/
    ├── css/
    │   └── index.css     # Base Tailwind, Font Google, Variabel Tema & Adaptive CSS
    └── js/
        ├── db.js         # Central Database (Mock Data untuk semua jenjang)
        ├── main.js       # Logika Global (Inisiasi Lucide, Session Check, Sidebar Mobile, Logout)
        ├── login.js      # Logika login & interaktivitas level selector
        ├── dashboard.js  # Handler data dinamis & welcome banner premium
        ├── courses.js    # Handler grid kursus, filter tab, dan fitur pencarian
        ├── course-detail.js # Handler modul, sistem kuis (SD), upload tugas (SMK/Kuliah), forum diskusi (Kuliah)
        ├── calendar.js   # Pembuat kalender grid interaktif bulanan & formulir tambah kegiatan
        ├── grades.js     # Bento grid pencapaian akademik & rapor bintang
        ├── files.js      # Handler file cloud pribadi & radial progress ring storage
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
- `sidebarTexts`: Teks kustomisasi menu samping (misal: "Mata Pelajaran" untuk SMK vs "Mata Kuliah" untuk Kuliah vs "Kelas Saya" untuk SD).
- `coursesData`: Data struktural kelas, berisi judul, pengampu, deskripsi, daftar sub-modul materi, soal kuis bergambar (SD), target tugas (SMK/Kuliah).

### 2. SekolahMu Buddy (`src/js/buddy.js`)
Sebuah floating widget Virtual Pet yang disuntikkan ke seluruh halaman:
- **Animasi:** Efek melayang dinamis pada avatar lewat `@keyframes buddy-float`.
- **Greeting/Speech Bubble:** Mengeluarkan balon dialog berisi sapaan ramah berkala.
- **Console Obrolan:** Panel chat dengan gelembung pesan asimetris (`rounded-tl-none` untuk bot, `rounded-tr-none` untuk user) serta efek gradasi warna. Membalas kata kunci seperti `tips`, `tugas`, `bintang`/`level`, atau `lelucon` secara real-time.

### 3. Modul Kuis Ceria (`src/js/course-detail.js` - SD Only)
- Menghitung jawaban benar-salah. Jika benar 100%, memicu trigger kembang api **Canvas Confetti** (`canvas-confetti` library), memberikan 10 Bintang Prestasi, dan memperbarui evolusi pet Piko.

### 4. Modul Submisi Tugas (`src/js/course-detail.js` - SMK & Kuliah)
- Drag-and-drop zone mockup untuk upload file dengan progress bar upload dinamis dari 0% ke 100%.

### 5. Modul Forum Diskusi Perkuliahan (`src/js/course-detail.js` - Kuliah Only)
- Chat room perkuliahan yang menampilkan komentar/instruksi dosen (ber-badge merah) dan mahasiswa (ber-badge indigo), tersinkronisasi ke `localStorage`.

### 6. Kalender Kegiatan (`src/js/calendar.js`)
- Menggambar grid tanggal bulanan dinamis dengan dot penanda kegiatan (hijau untuk kelas, orange untuk deadline, dan indigo untuk event) serta modal input kegiatan baru.

### 7. Hasil Studi & Rapor (`src/js/grades.js`)
- Memvisualisasikan hasil belajar di ketiga jenjang menggunakan tata letak bento grid modern untuk statistik ringkasan akademik (IPK, SKS, Bintang Emas, status kompetensi) dan tabel evaluasi.

### 8. Drive File Pribadi & Radial Progress (`src/js/files.js`)
- Handler berkas pribadi yang diintegrasikan dengan folder navigasi (Kuliah & SMK) serta visual kapasitas sisa memori menggunakan widget **Radial Progress Ring SVG** melingkar yang berpendar dinamis.
