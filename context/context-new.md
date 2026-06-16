# Project Context: SekolahMu (LMS DevLearn) - Updated

SekolahMu (LMS DevLearn) adalah prototipe aplikasi Learning Management System (LMS) berbasis web interaktif yang dirancang khusus untuk mendukung berbagai jenjang sekolah dengan desain modern, premium, responsif, serta adaptif terhadap tiga tingkat pendidikan yang berbeda: **Sekolah Dasar (SD)**, **Sekolah Menengah Kejuruan (SMK)**, dan **Perguruan Tinggi (Kuliah)**.

---

## 🛠️ Tech Stack & Konsep Inti
1.  **Core:** HTML5 murni (Vanilla HTML) dan Vanilla JavaScript (ES6+).
2.  **Styling:** CSS3 dengan **Tailwind CSS v4** (diimpor melalui `@import "tailwindcss"` di `src/css/index.css`).
3.  **Typography:** Menggunakan Google Fonts *Plus Jakarta Sans* untuk teks umum (`var(--font-sans)`) dan *Outfit* untuk judul/header (`var(--font-display)`), diimpor langsung pada file CSS utama.
4.  **Icons:** Lucide Icons SVG (di-render dinamis via script tag `unpkg.com/lucide@latest` dan diinisiasi lewat `lucide.createIcons()`).
5.  **Build Tool:** Vite untuk server lokal (`npm run dev`) dan manajemen aset.
6.  **Theme Dynamic & Adaptive Layout:**
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
*   **Universal Interactive Transition & Hover Effect:** Semua elemen interaktif (`a`, `button`, `select`, `input`, `.level-card`, `.course-card`) menerapkan transisi halus (`transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1)`) dan kartu utama memiliki efek `.hover-lift` (`translateY(-4px)` + bayangan melayang).

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
├── context/
│   ├── context-old.md    # Context lama sebelum optimasi
│   ├── context-new.md    # Context terbaru proyek (File ini)
│   └── implementation-plan.md # Panduan langkah demi langkah refactoring & optimasi
└── src/
    ├── css/
    │   └── index.css     # Base Tailwind, Font Google, Variabel Tema & Adaptive CSS
    └── js/
        ├── store.js      # [NEW] Central State Management (getState/setState & Migrasi)
        ├── components/   # [NEW] Folder Komponen Modular ES6
        │   ├── sidebar.js # [NEW] Render Sidebar dinamis & penanda menu aktif otomatis
        │   └── header.js  # [NEW] Render Header dinamis & dropdown user profile/notifikasi
        ├── db.js         # Central Database (Mock Data untuk semua jenjang)
        ├── main.js       # Logika Global (Inisiasi Komponen Modular, Lucide, Sidebar Mobile, Logout)
        ├── login.js      # Logika login & interaktivitas level selector
        ├── dashboard.js  # Handler data dinamis & welcome banner premium
        ├── courses.js    # Handler grid kursus, filter tab, dan fitur pencarian
        ├── course-detail.js # Handler modul, sistem kuis (SD), upload tugas (SMK/Kuliah), forum diskusi (Kuliah)
        ├── calendar.js   # Pembuat kalender grid interaktif bulanan & formulir tambah kegiatan
        ├── grades.js     # Bento grid pencapaian akademik & rapor bintang
        ├── files.js      # Handler file cloud pribadi & radial progress ring storage
        └── buddy.js      # SekolahMu Buddy (Virtual Pet pendamping belajar adaptif dengan Drag & Minimized)
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

## 💾 Manajemen State Terpusat (`src/js/store.js`)
Aplikasi ini menggunakan sistem state management terpusat yang dibungkus dalam satu objek JSON `sekolahmu_state` di `localStorage`. Semua modul membaca dan menulis data melalui modul `store.js` menggunakan fungsi pembantu:
*   `getState(key, defaultValue)`: Mengambil properti tertentu dari objek `sekolahmu_state`.
*   `setState(key, value)`: Menyimpan properti ke dalam `sekolahmu_state` secara reaktif dan memicu event kustom `sekolahmu_state_change` agar modul lain bisa merespons perubahan secara reaktif.

### Skema Data `sekolahmu_state`
Semua data disimpan dalam satu objek dengan struktur sebagai berikut:
*   `edu-level` : `'sd' | 'smk' | 'kuliah'` (jenjang aktif).
*   `username` : Nama pengguna yang login.
*   `progress-course-[id]` : Persentase kemajuan belajar per mata pelajaran.
*   `kuis-stars-[id]` : Jumlah bintang kuis untuk siswa SD.
*   `modules-course-[id]` : Status checklist penyelesaian sub-modul.
*   `tugas-status-[id]` : Status pengumpulan berkas tugas (`true | false`).
*   `forum-course-[id]` : Riwayat pesan obrolan di forum diskusi perkuliahan.
*   `custom-agendas` : Array agenda kustom dari kalender.
*   `personal-files-[level]` : Daftar file pribadi yang tersimpan di cloud drive.
*   `buddy-position` : Posisi koordinat floating widget Buddy (`{ x, y }`).
*   `buddy-minimized` : Status apakah floating widget Buddy sedang ciut/minimized (`true | false`).

### Mekanisme Migrasi Legacy Data
Saat pertama kali berjalan, `store.js` secara otomatis mendeteksi kunci-kunci `localStorage` terpisah yang dibuat oleh versi aplikasi terdahulu, memigrasikan nilainya ke objek terpadu `sekolahmu_state`, dan menghapus kunci lama untuk kebersihan penyimpanan data.

---

## 🧩 Modul Pendukung Khusus

### 1. Central Static Database (`src/js/db.js`)
Menyediakan modul modular ekspor:
*   `sidebarTexts`: Teks kustomisasi menu samping (misal: "Mata Pelajaran" untuk SMK vs "Mata Kuliah" untuk Kuliah vs "Kelas Saya" untuk SD).
*   `coursesData`: Data struktural kelas, berisi judul, pengampu, deskripsi, daftar sub-modul materi, soal kuis bergambar (SD), target tugas (SMK/Kuliah).

### 2. SekolahMu Buddy (`src/js/buddy.js`)
Sebuah floating widget Virtual Pet yang disuntikkan ke seluruh halaman (dengan `z-50` agar melayang di atas semua konten):
*   **Animasi:** Efek melayang dinamis pada avatar lewat `@keyframes buddy-float` dan styling tombol avatar melingkar 56px (`w-14 h-14`).
*   **Interaktivitas Drag-and-Drop:** Dilengkapi fitur *drag-and-drop* lancar (mouse & touch) dengan pendeteksian batas layar agar tidak melayang ke luar viewport. Posisi buddy disimpan di `sekolahmu_state` agar tetap konsisten ketika berpindah halaman.
*   **Pencegah Klik Palsu:** Menerapkan toleransi gerakan 5px untuk membedakan antara aksi *drag* dan aksi *click* (membuka balon percakapan).
*   **State "Minimized":** Dapat disusutkan menjadi ikon kepala kecil di pojok layar, status minimalisasi disimpan di `sekolahmu_state`.
*   **Console Obrolan:** Panel chat bergaya `.glass-panel` (lebar `w-72`) dengan gelembung pesan asimetris. Balon pesan bot menggunakan `bg-gray-100 text-surface-800` sedangkan balon pesan user menggunakan `bg-accent` (gradient linear yang adaptif dengan tema jenjang aktif). Membalas kata kunci seperti `tips`, `tugas`, `bintang`/`level`, atau `lelucon` secara real-time.

### 3. Modul Kuis Ceria (`src/js/course-detail.js` - SD Only)
*   Menghitung jawaban benar-salah. Jika benar 100%, memicu trigger kembang api **Canvas Confetti** (`canvas-confetti` library), memberikan 10 Bintang Prestasi, dan memperbarui evolusi pet Piko.

### 4. Modul Submisi Tugas (`src/js/course-detail.js` - SMK & Kuliah)
*   Drag-and-drop zone mockup untuk upload file dengan progress bar upload dinamis dari 0% ke 100%.

### 5. Modul Forum Diskusi Perkuliahan (`src/js/course-detail.js` - Kuliah Only)
*   Chat room perkuliahan yang menampilkan komentar/instruksi dosen (ber-badge merah) dan mahasiswa (ber-badge indigo), tersinkronisasi ke `localStorage` (via `store.js`).

### 6. Kalender Kegiatan (`src/js/calendar.js`)
*   Menggambar grid tanggal bulanan dinamis dengan dot penanda kegiatan (hijau untuk kelas, orange untuk deadline, dan indigo untuk event) serta modal input kegiatan baru.

### 7. Hasil Studi & Rapor (`src/js/grades.js`)
*   Memvisualisasikan hasil belajar di ketiga jenjang menggunakan tata letak bento grid modern untuk statistik ringkasan akademik (IPK, SKS, Bintang Emas, status kompetensi) dan tabel evaluasi.

### 8. Drive File Pribadi & Radial Progress (`src/js/files.js`)
*   Handler berkas pribadi yang diintegrasikan dengan folder navigasi (Kuliah & SMK) serta visual kapasitas sisa memori menggunakan widget **Radial Progress Ring SVG** melingkar yang berpendar dinamis.
