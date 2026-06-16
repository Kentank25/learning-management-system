# Implementation Plan: Optimasi SekolahMu (LMS DevLearn) - Revised

Dokumen ini berisi panduan teknis langkah demi langkah untuk melakukan *refactoring* dan optimalisasi pada proyek SekolahMu (LMS DevLearn) yang menggunakan Vanilla JavaScript, HTML5, dan Tailwind CSS v4.

---

## 1. Arsitektur Manajemen State (Penyimpanan Data Terpusat)
**Tujuan:** Menghentikan pemanggilan kunci (*keys*) `localStorage` secara langsung dan terpisah (seperti `edu-level`, `progress-course-[id]`, `kuis-stars-[id]`) guna mencegah *bug* sinkronisasi data antar halaman serta mempermudah pengelolaan data.

**Langkah Eksekusi:**
*   **Buat File Baru:** `src/js/store.js` untuk mengelola *state* terpusat.
*   **Struktur JSON Terpadu (`sekolahmu_state`):** Satukan semua data ke dalam satu objek di `localStorage` dengan skema berikut:
    ```json
    {
      "edu-level": "sd" | "smk" | "kuliah",
      "username": "Keane",
      "progress-course-[id]": 0,
      "kuis-stars-[id]": 0,
      "modules-course-[id]": [],
      "tugas-status-[id]": false,
      "forum-course-[id]": [],
      "custom-agendas": [],
      "personal-files-sd": [],
      "personal-files-smk": [],
      "personal-files-kuliah": [],
      "buddy-position": { "x": 0, "y": 0 },
      "buddy-minimized": false
    }
    ```
*   **Buat Helper Functions:**
    *   `getState(key, defaultValue)`: Mengambil properti tertentu dari objek `sekolahmu_state`.
    *   `setState(key, value)`: Memperbarui properti di dalam `sekolahmu_state`, menyimpannya kembali ke `localStorage`, dan memicu event kustom `sekolahmu_state_change` agar modul lain bisa merespons perubahan secara reaktif.
*   **Sistem Migrasi Legacy Data (Penting):** Di dalam `store.js`, buat logika inisialisasi yang mendeteksi jika `sekolahmu_state` belum ada namun ada data dari kunci-kunci lama di `localStorage`. Jika ada, kumpulkan data tersebut, masukkan ke objek baru, simpan ke `sekolahmu_state`, lalu hapus kunci-kunci lama tersebut.
*   **Migrasi Kode Modul:** Lakukan *refactoring* bertahap pada `main.js`, `login.js`, `dashboard.js`, `courses.js`, `course-detail.js`, `calendar.js`, `grades.js`, `files.js`, dan `buddy.js` untuk mengimpor dan menggunakan fungsi dari `store.js`.

---

## 2. Optimasi Mekanisme Tema Adaptif (Anti-Tema Bocor)
**Tujuan:** Menghilangkan *Flash of Unstyled Content* (FOUC) saat perpindahan halaman dengan memindahkan penentuan tema ke awal pemuatan dokumen menggunakan selektor atribut HTML.

**Langkah Eksekusi:**
*   **Terapkan Inline Script di `<head>`:** Letakkan script block murni tepat di bawah tag `<title>` pada seluruh file HTML (`index.html`, `login.html`, `courses.html`, `course-detail.html`, `calendar.html`, `grades.html`, `files.html`).
    ```html
    <script>
      (function() {
        const state = JSON.parse(localStorage.getItem('sekolahmu_state') || '{}');
        const theme = state['edu-level'] || localStorage.getItem('edu-level') || 'smk';
        document.documentElement.setAttribute('data-theme', theme);
      })();
    </script>
    ```
*   **Refactor CSS Tailwind v4:** Di file `src/css/index.css`, ganti semua selektor berbasis class body (misalnya `body.theme-sd` dan `body.theme-kuliah`) menjadi selektor atribut atribut data (seperti `[data-theme="sd"]` dan `[data-theme="kuliah"]`).
*   **Penyederhanaan Logika JS:** Hapus kode manipulasi class `classList.remove('theme-sd', 'theme-kuliah')` di `main.js`. Ganti dengan pembaruan atribut global:
    ```javascript
    document.documentElement.setAttribute('data-theme', newLevel);
    ```

---

## 3. Performa Visual & Efek Glassmorphism
**Tujuan:** Menjaga performa peramban (*browser*) tetap stabil dan memiliki FPS tinggi saat digulir (*scrolling*) di perangkat berspesifikasi rendah dengan meminimalkan penggunaan `backdrop-filter: blur()`.

**Langkah Eksekusi:**
*   **Audit Elemen `.glass-panel`:** Identifikasi elemen mana saja yang menggunakan kelas `.glass-panel`.
*   **Optimasi Elemen Berulang:** Pada komponen yang muncul dalam jumlah banyak atau berulang (seperti kartu bento widget di dashboard dan halaman evaluasi), hapus efek `backdrop-filter` dan ganti dengan warna latar semi-transparan solid (misal: `bg-white/85`) dengan drop shadow biasa.
*   **Pertahankan Glassmorphic pada Komponen Utama:** Pertahankan efek blur premium eksklusif untuk elemen statis melayang/fixed seperti *Sidebar*, *Topbar/Header*, *Modal/Dialog Box*, dan *Console Obrolan Buddy*.

---

## 4. Interaksi SekolahMu Buddy & Z-index
**Tujuan:** Memastikan *Virtual Pet* (Piko, Dev-Bot, Athena) tidak menutupi komponen penting dan posisinya dapat disesuaikan pengguna secara dinamis.

**Langkah Eksekusi:**
*   **Implementasi Drag-and-Drop:**
    *   Tambahkan event listener (`mousedown`, `mousemove`, `mouseup` serta event `touch` untuk mobile) pada avatar buddy di `src/js/buddy.js`.
    *   Terapkan pembatasan (*bounding constraints*) agar widget buddy tidak bisa diseret keluar dari batas viewport layar.
*   **Pencegah Trigger Klik Palsu:** Tambahkan variabel threshold sejauh 5px. Jika jarak geser selama mouse down hingga mouse up kurang dari 5px, aksi dianggap sebagai klik biasa (membuka obrolan). Jika lebih dari 5px, aksi dianggap sebagai drag dan tidak akan memicu terbukanya jendela obrolan.
*   **State Persistence (Koordinat & Minimized):** Simpan status posisi koordinat (`buddy-position`) dan status minimalisasi (`buddy-minimized`) ke dalam state terpusat `sekolahmu_state` agar posisinya tetap sama setelah berpindah halaman.
*   **Penyesuaian Stacking Context (Z-index):** Pastikan z-index tersusun rapi:
    *   Konten utama: `z-10`
    *   Header / Topbar: `z-30`
    *   Dropdown menu: `z-40`
    *   SekolahMu Buddy Container: `z-50` (Sejajar dengan modal dan diposisikan paling atas).

---

## 5. Skalabilitas Komponen Vanilla JS (Header & Sidebar Modular)
**Tujuan:** Mengurangi redundansi kode HTML dan mempermudah pemeliharaan dengan memisahkan Sidebar dan Header menjadi komponen dinamis.

**Langkah Eksekusi:**
*   **Buat Direktori Komponen Baru:** Buat folder `src/js/components/`.
*   **Pisahkan File Komponen:**
    *   `sidebar.js`: Mengandung fungsi `renderSidebar(activePath)` yang mengembalikan string HTML sidebar. Fungsi ini akan mendeteksi path saat ini secara otomatis untuk memberikan kelas aktif (`sidebar-active-indicator` dan background warna aksen) pada menu yang tepat.
    *   `header.js`: Mengandung fungsi `renderHeader(username, eduLevel)` untuk merender header lengkap dengan search bar, menu notifikasi, dan profil dropdown.
*   **Integrasi DOM & Rendering di `main.js`:**
    *   Sediakan penampung kosong `<div id="sidebar-root"></div>` dan `<div id="header-root"></div>` di seluruh file HTML.
    *   Di dalam `main.js`, render komponen tersebut ke dalam DOM secara sinkron menggunakan `.innerHTML`.
*   **Inisialisasi Lucide & Event Listener:** Panggil `lucide.createIcons()` dan daftarkan semua event listener (seperti tombol toggle sidebar, dropdown profile, dan notifikasi) **tepat setelah** HTML sidebar dan header disuntikkan ke DOM. Jika tidak, ikon tidak akan ter-render dan event listener tidak akan berfungsi.