# Implementation Plan: Integrasi Groq Cloud API untuk SekolahMu Buddy

Dokumen ini merangkum langkah-langkah migrasi sistem AI dari lokal (LMStudio) ke layanan *cloud* gratis (Groq) untuk memfasilitasi *chatbot* adaptif pada `src/js/buddy.js`.

## Fase 1: Persiapan Kredensial Groq Cloud
**Tujuan:** Mendapatkan kunci akses API yang sah.
1. Kunjungi [console.groq.com](https://console.groq.com) dan buat akun gratis.
2. Navigasi ke menu **API Keys** dan buat kunci baru (misal dengan nama: `SekolahMu_LMS_Key`).
3. Salin *API Key* tersebut (dimulai dengan `gsk_...`). Ingat, kunci ini hanya ditampilkan sekali.
4. Pilih model yang akan digunakan. Untuk performa cepat dan bahasa Indonesia yang baik, gunakan model **`llama-3.3-70b-versatile`** atau **`llama-3.1-8b-instant`**.

## Fase 2: Konfigurasi Environment Variables di Vite
**Tujuan:** Mengamankan API Key di lingkungan pengembangan lokal menggunakan fitur bawaan Vite.
1. Buat file bernama `.env` di *root directory* proyek (sejajar dengan `package.json` dan `vite.config.js`).
2. Tambahkan variabel berikut ke dalam file `.env`:
```text
   VITE_GROQ_API_KEY=gsk_paste_api_key_kamu_disini