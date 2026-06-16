// Central Static Database for SekolahMu LMS
// This file exports unified data structures for SD, SMK, and Kuliah levels.

export const sidebarTexts = {
  sd: {
    dashboard: 'Dashboard',
    courses: 'Kelas Saya',
    calendar: 'Kalender Belajar',
    grades: 'Nilai & Bintang',
    files: 'File Saya',
    pageTitle: 'Kelas Saya',
    pageDesc: 'Pilih materi belajarmu hari ini dan mulailah belajar!'
  },
  smk: {
    dashboard: 'Dashboard',
    courses: 'Mata Pelajaran',
    calendar: 'Kalender',
    grades: 'Nilai & Rapor',
    files: 'File Pribadi',
    pageTitle: 'Mata Pelajaran',
    pageDesc: 'Pilih kelas Anda untuk melanjutkan pembelajaran.'
  },
  kuliah: {
    dashboard: 'Portal Akademik',
    courses: 'Mata Kuliah',
    calendar: 'Agenda Kuliah',
    grades: 'KHS & Transkrip',
    files: 'Drive Mahasiswa',
    pageTitle: 'Daftar Mata Kuliah',
    pageDesc: 'Pilih mata kuliah aktif semester ini untuk mengakses modul, materi, dan forum.'
  }
};

export const scheduleData = {
  sd: {
    title: 'Jadwal Belajar Hari Ini',
    date: 'Kamis, 21 Mei',
    items: [
      {
        id: 1,
        time: '08:00 - 09:30 WIB',
        title: 'Matematika Ceria',
        subtitle: 'Topik: Penjumlahan & Pengurangan Dasar',
        status: 'Sedang Berlangsung',
        statusType: 'active',
        location: 'Ruang Kelas 4A',
        icon: 'smile'
      },
      {
        id: 2,
        time: '10:00 - 11:30 WIB',
        title: 'Bahasa Indonesia',
        subtitle: 'Topik: Membaca Dongeng Rakyat Nusantara',
        status: 'Akan Datang',
        statusType: 'upcoming',
        location: 'Perpustakaan Mini',
        icon: 'book'
      },
      {
        id: 3,
        time: '13:00 - 14:30 WIB',
        title: 'Menggambar & Mewarnai',
        subtitle: 'Topik: Menggambar Rumah Impian Kita',
        status: 'Akan Datang',
        statusType: 'upcoming',
        location: 'Studio Seni Budaya',
        icon: 'palette'
      }
    ]
  },
  smk: {
    title: 'Jadwal Hari Ini',
    date: 'Kamis, 21 Mei',
    items: [
      {
        id: 1,
        time: '08:00 - 10:30 WIB',
        title: 'Pemrograman Basis Data',
        subtitle: 'Topik: Normalisasi & Relasi Tabel MySQL',
        status: 'Sedang Berlangsung',
        statusType: 'active',
        location: 'Ruang Virtual (Zoom)',
        icon: 'database'
      },
      {
        id: 2,
        time: '11:00 - 13:30 WIB',
        title: 'Front End Web Development',
        subtitle: 'Topik: Pengenalan HTML5, CSS & Semantic Web',
        status: 'Akan Datang',
        statusType: 'upcoming',
        location: 'Lab RPL 2',
        icon: 'layout'
      },
      {
        id: 3,
        time: '14:00 - 15:30 WIB',
        title: 'Pemrograman Berorientasi Objek',
        subtitle: 'Topik: Pewarisan & Polimorfisme (Java)',
        status: 'Akan Datang',
        statusType: 'upcoming',
        location: 'Lab RPL 1',
        icon: 'code'
      }
    ]
  },
  kuliah: {
    title: 'Jadwal Kuliah Hari Ini',
    date: 'Kamis, 21 Mei',
    items: [
      {
        id: 1,
        time: '08:00 - 10:30 WIB',
        title: 'Rekayasa Perangkat Lunak',
        subtitle: 'Dosen: Dr. Ir. Wahyu Wibowo | Ruang: R.304',
        status: 'Sedang Berlangsung',
        statusType: 'active',
        location: 'Gedung IT Center - R.304',
        icon: 'cpu'
      },
      {
        id: 2,
        time: '11:00 - 13:30 WIB',
        title: 'Desain Basis Data Lanjut',
        subtitle: 'Dosen: Prof. Budi Rahardjo | Ruang: Lab Data',
        status: 'Akan Datang',
        statusType: 'upcoming',
        location: 'Laboratorium Data Terpadu',
        icon: 'database'
      },
      {
        id: 3,
        time: '14:00 - 15:30 WIB',
        title: 'Analisis Algoritma',
        subtitle: 'Dosen: Dr. Rina Wijaya | Ruang: R.102',
        status: 'Akan Datang',
        statusType: 'upcoming',
        location: 'Gedung Utama - R.102',
        icon: 'terminal'
      }
    ]
  }
};

export const deadlinesData = {
  sd: {
    title: 'Tugas Belajar',
    items: [
      {
        id: 1,
        title: 'Menggambar Rumah Impian',
        subject: 'Menggambar & Mewarnai',
        due: 'Hari ini, 20:00 WIB',
        borderColor: 'border-orange-100 bg-orange-50/50 hover:bg-orange-50',
        textColor: 'text-orange-600'
      },
      {
        id: 2,
        title: 'Latihan Penjumlahan Matematika',
        subject: 'Matematika Ceria',
        due: 'Besok, 20:00 WIB',
        borderColor: 'border-surface-100 hover:bg-surface-50',
        textColor: 'text-surface-500'
      }
    ]
  },
  smk: {
    title: 'Tugas Mendatang',
    items: [
      {
        id: 1,
        title: 'Skema Database Toko Online',
        subject: 'Pemrograman Basis Data',
        due: 'Hari ini, 23:59 WIB',
        borderColor: 'border-orange-100 bg-orange-50/50 hover:bg-orange-50',
        textColor: 'text-orange-600'
      },
      {
        id: 2,
        title: 'Landing Page Interaktif (Vue.js)',
        subject: 'Front End Web Development',
        due: 'Besok, 23:59 WIB',
        borderColor: 'border-surface-100 hover:bg-surface-50',
        textColor: 'text-surface-500'
      }
    ]
  },
  kuliah: {
    title: 'Tenggat Kuliah',
    items: [
      {
        id: 1,
        title: 'Laporan Bab 3 - Dokumen SRS Lengkap',
        subject: 'Rekayasa Perangkat Lunak',
        due: 'Hari ini, 23:59 WIB',
        borderColor: 'border-orange-100 bg-orange-50/50 hover:bg-orange-50',
        textColor: 'text-orange-600'
      },
      {
        id: 2,
        title: 'Tugas Praktikum Pewarisan Database',
        subject: 'Desain Basis Data Lanjut',
        due: 'Besok, 23:59 WIB',
        borderColor: 'border-surface-100 hover:bg-surface-50',
        textColor: 'text-surface-500'
      }
    ]
  }
};

export const progressData = {
  sd: {
    title: 'Kemajuan Belajar',
    items: [
      { name: 'Matematika', val: '85%', color: 'bg-sky-500', text: 'text-sky-500' },
      { name: 'Bahasa Indonesia', val: '70%', color: 'bg-emerald-500', text: 'text-emerald-500' },
      { name: 'Seni & Menggambar', val: '90%', color: 'bg-purple-500', text: 'text-purple-500' }
    ]
  },
  smk: {
    title: 'Progress Belajar',
    items: [
      { name: 'UI/UX Design', val: '75%', color: 'bg-accent-500', text: 'text-accent-600' },
      { name: 'Front End Web Lab', val: '40%', color: 'bg-indigo-500', text: 'text-indigo-500' },
      { name: 'PBO (Java)', val: '90%', color: 'bg-green-500', text: 'text-green-500' }
    ]
  }
};

export const coursesData = {
  sd: [
    {
      id: 1,
      title: 'Matematika Ceria',
      teacher: 'Bu Endang Sri',
      progress: 85,
      status: 'ongoing',
      colorClass: 'from-sky-400 to-blue-500',
      icon: 'smile',
      tag: 'Kelas 4',
      description: 'Belajar matematika dasar dengan cara yang asyik, interaktif, dan penuh petualangan! Di sini kamu akan menguasai penjumlahan, pengurangan, perkalian, pembagian, hingga teka-teki logika seru.',
      modules: [
        { id: 1, title: 'Modul 1: Penjumlahan Ceria 1 sampai 100', dur: '15 menit', completed: true },
        { id: 2, title: 'Modul 2: Berpetualang dengan Pengurangan', dur: '20 menit', completed: true },
        { id: 3, title: 'Modul 3: Perkalian Asyik Menggunakan Gambar', dur: '25 menit', completed: true },
        { id: 4, title: 'Modul 4: Pengenalan Pembagian dengan Pembagian Kue 🍰', dur: '30 menit', completed: false }
      ],
      kuis: [
        { id: 1, q: 'Berapakah hasil dari 25 + 17?', a: ['32', '42', '45', '52'], correct: 1 },
        { id: 2, q: 'Jika Budi punya 10 apel dan memberikan 4 apel ke Siti, sisa apel Budi adalah...', a: ['4', '5', '6', '7'], correct: 2 }
      ]
    },
    {
      id: 2,
      title: 'Bahasa Indonesia',
      teacher: 'Pak Joko Susilo',
      progress: 70,
      status: 'ongoing',
      colorClass: 'from-emerald-400 to-teal-500',
      icon: 'book-open',
      tag: 'Kelas 4',
      description: 'Membaca dongeng, menulis karangan, dan berbicara sopan. Mari pelajari keindahan kosakata bahasa kita melalui cerita rakyat nusantara!',
      modules: [
        { id: 1, title: 'Modul 1: Menemukan Pesan Moral di Cerita Rakyat', dur: '20 menit', completed: true },
        { id: 2, title: 'Modul 2: Menulis Surat untuk Sahabat Pena', dur: '15 menit', completed: true },
        { id: 3, title: 'Modul 3: Membaca Puisi dengan Lafal yang Tepat', dur: '25 menit', completed: false },
        { id: 4, title: 'Modul 4: Penggunaan Huruf Kapital & Tanda Baca', dur: '15 menit', completed: false }
      ],
      kuis: [
        { id: 1, q: 'Dongeng Malin Kundang mengajarkan kita untuk...', a: ['Rajin belajar', 'Sopan kepada guru', 'Berdagang ke luar negeri', 'Sabar & Berbakti kepada orang tua'], correct: 3 }
      ]
    },
    {
      id: 3,
      title: 'Menggambar & Mewarnai',
      teacher: 'Bu Maria Utama',
      progress: 100,
      status: 'completed',
      colorClass: 'from-purple-400 to-pink-500',
      icon: 'palette',
      tag: 'Kelas 4',
      description: 'Ekspresikan kreativitas tanpa batas! Pelajari dasar teori warna, teknik arsir krayon, hingga cara menggambar pemandangan alam dan rumah impian yang memukau.',
      modules: [
        { id: 1, title: 'Modul 1: Mengenal Warna Primer dan Sekunder', dur: '15 menit', completed: true },
        { id: 2, title: 'Modul 2: Teknik Mewarnai Gradasi Krayon', dur: '30 menit', completed: true },
        { id: 3, title: 'Modul 3: Menggambar Rumah Impian Kita', dur: '45 menit', completed: true }
      ],
      kuis: [
        { id: 1, q: 'Warna apakah yang dihasilkan jika warna Merah dicampur Kuning?', a: ['Hijau', 'Ungu', 'Oranye', 'Cokelat'], correct: 2 }
      ]
    },
    {
      id: 4,
      title: 'Pendidikan Pancasila',
      teacher: 'Pak Budi Hartono',
      progress: 15,
      status: 'ongoing',
      colorClass: 'from-rose-400 to-red-500',
      icon: 'award',
      tag: 'Kelas 4',
      description: 'Mengenal lambang negara Garuda Pancasila, menghafal sila-sila, serta mempraktikkan gotong royong dan toleransi beragama sejak usia dini.',
      modules: [
        { id: 1, title: 'Modul 1: Memahami Arti Lambang Garuda Pancasila', dur: '20 menit', completed: true },
        { id: 2, title: 'Modul 2: Hubungan Simbol Sila dengan Sikap Sehari-hari', dur: '25 menit', completed: false },
        { id: 3, title: 'Modul 3: Indahnya Keberagaman Budaya di Indonesia', dur: '30 menit', completed: false }
      ],
      kuis: [
        { id: 1, q: 'Sila ke-3 Pancasila berbunyi...', a: ['Kemanusiaan yang adil dan beradab', 'Persatuan Indonesia', 'Keadilan sosial bagi seluruh rakyat Indonesia', 'Ketuhanan Yang Maha Esa'], correct: 1 }
      ]
    }
  ],
  smk: [
    {
      id: 1,
      title: 'Pemrograman Basis Data',
      teacher: 'Pak Budi Santoso',
      progress: 65,
      status: 'ongoing',
      colorClass: 'from-indigo-500 to-purple-600',
      icon: 'database',
      tag: 'Kelas XI',
      description: 'Materi kejuruan RPL berfokus pada perancangan basis data relasional. Anda akan mempelajari normalisasi 1NF-3NF, bahasa query SQL (DDL, DML, DCL), indexing, relasi tabel, dan optimalisasi query MySQL.',
      modules: [
        { id: 1, title: 'Modul 1: Pengantar Relational Database Management System (RDBMS)', dur: '45 menit', completed: true },
        { id: 2, title: 'Modul 2: Skema Normalisasi Database 1NF, 2NF, 3NF', dur: '60 menit', completed: true },
        { id: 3, title: 'Modul 3: Sintaks SQL DDL (CREATE, ALTER, DROP)', dur: '50 menit', completed: true },
        { id: 4, title: 'Modul 4: Query DML Kompleks (JOIN, GROUP BY, HAVING)', dur: '90 menit', completed: false }
      ],
      tasks: [
        { id: 1, title: 'Tugas Skema Database Toko Online', due: 'Hari ini, 23:59 WIB', pts: 100, completed: false }
      ]
    },
    {
      id: 2,
      title: 'Front End Web Development',
      teacher: 'Bu Rina Wijaya',
      progress: 40,
      status: 'ongoing',
      colorClass: 'from-emerald-400 to-teal-500',
      icon: 'layout',
      tag: 'Kelas XI',
      description: 'Membangun antarmuka web modern yang responsif dan interaktif. Pembelajaran mencakup kerangka kerja modern, CSS Grid & Flexbox, praprosesor, manipulasi DOM, serta integrasi Tailwind CSS.',
      modules: [
        { id: 1, title: 'Modul 1: Sintaksis HTML5 Semantik & SEO Dasar', dur: '40 menit', completed: true },
        { id: 2, title: 'Modul 2: Styling Responsif Menggunakan Flexbox & Grid CSS', dur: '50 menit', completed: true },
        { id: 3, title: 'Modul 3: Dasar Javascript ES6+ dan DOM Manipulation', dur: '60 menit', completed: false },
        { id: 4, title: 'Modul 4: Integrasi Tailwind CSS v4 & Utilitas Utamanya', dur: '75 menit', completed: false }
      ],
      tasks: [
        { id: 2, title: 'Landing Page Interaktif (Vue.js)', due: 'Besok, 23:59 WIB', pts: 100, completed: false }
      ]
    },
    {
      id: 3,
      title: 'Pemrograman Berorientasi Objek',
      teacher: 'Pak Andi Pratama',
      progress: 100,
      status: 'completed',
      colorClass: 'from-blue-500 to-cyan-500',
      icon: 'code',
      tag: 'Kelas XI',
      description: 'Menguasai paradigma Object-Oriented Programming (OOP) menggunakan bahasa Java. Mempelajari konsep inti Class, Object, Inheritance, Polymorphism, Encapsulation, Abstraction, serta handling exception.',
      modules: [
        { id: 1, title: 'Modul 1: Instalasi JDK dan Konsep Class/Object Java', dur: '30 menit', completed: true },
        { id: 2, title: 'Modul 2: Enkapsulasi & Konstruktor Spesial', dur: '45 menit', completed: true },
        { id: 3, title: 'Modul 3: Pewarisan (Inheritance) & Polimorfisme', dur: '60 menit', completed: true },
        { id: 4, title: 'Modul 4: Exception Handling (try-catch-finally)', dur: '40 menit', completed: true }
      ],
      tasks: []
    },
    {
      id: 4,
      title: 'Pemrograman Perangkat Bergerak',
      teacher: 'Bu Siti Aminah',
      progress: 15,
      status: 'ongoing',
      colorClass: 'from-rose-400 to-orange-500',
      icon: 'smartphone',
      tag: 'Kelas XI',
      description: 'Pengembangan aplikasi mobile lintas platform menggunakan Flutter dan bahasa Dart. Belajar siklus hidup widget (Stateless/Stateful), state management, routing, dan integrasi API RESTful.',
      modules: [
        { id: 1, title: 'Modul 1: Instalasi Flutter SDK dan Konsep Dasar Dart', dur: '45 menit', completed: true },
        { id: 2, title: 'Modul 2: Membangun UI dengan Layout Widgets', dur: '60 menit', completed: false },
        { id: 3, title: 'Modul 3: Stateful vs Stateless Widget & State Lifecycle', dur: '50 menit', completed: false }
      ],
      tasks: []
    }
  ],
  kuliah: [
    {
      id: 1,
      title: 'Rekayasa Perangkat Lunak',
      teacher: 'Dr. Ir. Wahyu Wibowo',
      progress: 60,
      status: 'ongoing',
      colorClass: 'from-indigo-600 to-violet-800',
      icon: 'cpu',
      tag: '3 SKS',
      description: 'Mata kuliah wajib metodologi pengembangan sistem skala besar. Membahas SDLC (Waterfall, Agile Scrum), analisis kebutuhan (SRS), pemodelan UML (Use Case, Class, Activity), serta pengujian perangkat lunak (Black Box, White Box).',
      modules: [
        { id: 1, title: 'Modul 1: Pengenalan SDLC & Pemilihan Model Proses Perangkat Lunak', dur: '60 menit', completed: true },
        { id: 2, title: 'Modul 2: Analisis Kebutuhan Sistem (Software Requirements Specification - SRS)', dur: '90 menit', completed: true },
        { id: 3, title: 'Modul 3: Desain Arsitektur & Pemodelan Berorientasi Objek dengan UML', dur: '90 menit', completed: true },
        { id: 4, title: 'Modul 4: Verifikasi & Validasi Perangkat Lunak (QA/QC Testing)', dur: '75 menit', completed: false }
      ],
      tasks: [
        { id: 1, title: 'Laporan Bab 3 - Dokumen SRS Lengkap', due: 'Hari ini, 23:59 WIB', pts: 100, completed: false }
      ]
    },
    {
      id: 2,
      title: 'Desain Basis Data Lanjut',
      teacher: 'Prof. Budi Rahardjo',
      progress: 45,
      status: 'ongoing',
      colorClass: 'from-indigo-400 to-cyan-600',
      icon: 'database',
      tag: '4 SKS',
      description: 'Eksplorasi mendalam perancangan enterprise database. Mempelajari query tuning, indexing B-Tree/Hash, partitioning, store procedure, trigger, konsep transaksi ACID, concurrency control, dan dasar-dasar NoSQL.',
      modules: [
        { id: 1, title: 'Modul 1: Review SQL Lanjut, Views & Subqueries', dur: '60 menit', completed: true },
        { id: 2, title: 'Modul 2: Indexing & Query Optimization Tuning', dur: '90 menit', completed: true },
        { id: 3, title: 'Modul 3: Pemrograman Database: Triggers & Stored Procedures', dur: '90 menit', completed: false },
        { id: 4, title: 'Modul 4: Concurrency Control, Transaksi & Isolation Levels', dur: '80 menit', completed: false }
      ],
      tasks: [
        { id: 2, title: 'Tugas Praktikum Pewarisan Database', due: 'Besok, 23:59 WIB', pts: 100, completed: false }
      ]
    },
    {
      id: 3,
      title: 'Analisis Algoritma',
      teacher: 'Dr. Rina Wijaya',
      progress: 100,
      status: 'completed',
      colorClass: 'from-slate-700 to-slate-900',
      icon: 'terminal',
      tag: '3 SKS',
      description: 'Studi matematis dan praktis mengenai performa komputasi algoritma. Mempelajari Notasi Big-O (Time & Space Complexity), Divide and Conquer, Greedy Algorithms, Dynamic Programming, dan NP-Completeness.',
      modules: [
        { id: 1, title: 'Modul 1: Konsep Dasar Efisiensi Algoritma & Notasi Big-O', dur: '50 menit', completed: true },
        { id: 2, title: 'Modul 2: Analisis Algoritma Rekursif & Master Theorem', dur: '65 menit', completed: true },
        { id: 3, title: 'Modul 3: Paradigma Divide & Conquer (Merge & Quick Sort)', dur: '80 menit', completed: true },
        { id: 4, title: 'Modul 4: Pengantar Dynamic Programming & Knapsack Problem', dur: '90 menit', completed: true }
      ],
      tasks: []
    },
    {
      id: 4,
      title: 'Pemrograman Web Enterprise',
      teacher: 'Ir. Hermawan, M.T.',
      progress: 20,
      status: 'ongoing',
      colorClass: 'from-blue-600 to-indigo-800',
      icon: 'globe',
      tag: '4 SKS',
      description: 'Membangun aplikasi web skala korporat menggunakan arsitektur modular yang kokoh. Mempelajari Spring Boot (Java) atau Nest.js (TypeScript), arsitektur Microservices, ORM, Caching (Redis), dan antrean pesan.',
      modules: [
        { id: 1, title: 'Modul 1: Konsep REST API & Dependency Injection di Backend Framework', dur: '60 menit', completed: true },
        { id: 2, title: 'Modul 2: Integrasi Object Relational Mapping (ORM) & Migrasi Skema', dur: '90 menit', completed: false },
        { id: 3, title: 'Modul 3: Autentikasi Keamanan Enterprise (JWT, OAuth2, RBAC)', dur: '90 menit', completed: false }
      ],
      tasks: []
    }
  ]
};

export const calendarData = {
  sd: [
    { date: '2026-05-05', title: 'Belajar Menggambar di Kelas', type: 'class' },
    { date: '2026-05-12', title: 'Dongeng Bersama Pak Joko', type: 'event' },
    { date: '2026-05-21', title: 'Tenggat: Menggambar Rumah Impian', type: 'deadline' },
    { date: '2026-05-22', title: 'Tenggat: Latihan Penjumlahan Matematika', type: 'deadline' },
    { date: '2026-05-26', title: 'Kelas Ceria Menggambar Bebas', type: 'class' }
  ],
  smk: [
    { date: '2026-05-08', title: 'Ujian Praktik Java OOP', type: 'event' },
    { date: '2026-05-15', title: 'Webinar Sukses Karir Developer RPL', type: 'event' },
    { date: '2026-05-21', title: 'Tenggat: Skema Database Toko Online', type: 'deadline' },
    { date: '2026-05-22', title: 'Tenggat: Landing Page Interaktif (Vue.js)', type: 'deadline' },
    { date: '2026-05-28', title: 'Presentasi Proyek Front End', type: 'class' }
  ],
  kuliah: [
    { date: '2026-05-10', title: 'Kuliah Tamu: Microservices Architecture di Tokopedia', type: 'event' },
    { date: '2026-05-14', title: 'Bimbingan Skripsi / PKM', type: 'class' },
    { date: '2026-05-21', title: 'Tenggat: Laporan Bab 3 - Dokumen SRS Lengkap', type: 'deadline' },
    { date: '2026-05-22', title: 'Tenggat: Tugas Praktikum Pewarisan Database', type: 'deadline' },
    { date: '2026-05-29', title: 'Sidang Proposal Kelompok RPL', type: 'event' }
  ]
};

// ─────────────────────────────────────────────────────────
// HISTORICAL COURSE DATA
// Organized by education level → period → courses.
// IDs: SD 300+, SMK 400+, Kuliah 500+ (no clash with active).
// Fields differ from coursesData: finalScore, gradeLetter.
// No progress/status/kuis/tasks — archive is view-only.
// ─────────────────────────────────────────────────────────
export const historyCoursesData = {
  sd: [
    {
      period: 'Kelas 3',
      year: '2024/2025',
      courses: [
        {
          id: 301,
          title: 'Matematika Dasar',
          teacher: 'Bu Endang Sri',
          finalScore: 88,
          gradeLetter: 'A',
          colorClass: 'from-sky-400 to-blue-500',
          icon: 'calculator',
          tag: 'Kelas 3',
          description: 'Pengenalan operasi dasar matematika: penjumlahan, pengurangan, perkalian sederhana, dan pengenalan bilangan ratusan. Belajar melalui aktivitas bergambar dan permainan angka yang menyenangkan.',
          modules: [
            { title: 'Mengenal Bilangan 1 sampai 500', completed: true },
            { title: 'Penjumlahan Ratusan', completed: true },
            { title: 'Pengurangan Dua Digit', completed: true },
            { title: 'Pengenalan Perkalian dengan Gambar', completed: true },
          ]
        },
        {
          id: 302,
          title: 'Bahasa Indonesia Ceria',
          teacher: 'Bu Rika Permata',
          finalScore: 91,
          gradeLetter: 'A',
          colorClass: 'from-rose-400 to-pink-500',
          icon: 'book-open',
          tag: 'Kelas 3',
          description: 'Membaca, menulis, dan memahami teks sederhana. Berlatih menulis kalimat lengkap, mengenal huruf kapital, tanda titik, dan koma melalui cerita pendek bergambar.',
          modules: [
            { title: 'Membaca Cerita Pendek', completed: true },
            { title: 'Menulis Kalimat Pertamaku', completed: true },
            { title: 'Tanda Baca: Titik dan Koma', completed: true },
          ]
        },
        {
          id: 303,
          title: 'Sains Alam Seru',
          teacher: 'Pak Doni Aditya',
          finalScore: 85,
          gradeLetter: 'B',
          colorClass: 'from-green-400 to-emerald-500',
          icon: 'leaf',
          tag: 'Kelas 3',
          description: 'Menjelajahi dunia alam sekitar: tumbuhan, hewan, cuaca, dan lingkungan hidup. Belajar melalui eksperimen kecil dan pengamatan langsung.',
          modules: [
            { title: 'Bagian-bagian Tumbuhan', completed: true },
            { title: 'Hewan Peliharaan dan Liar', completed: true },
            { title: 'Cuaca dan Musim', completed: true },
          ]
        },
        {
          id: 304,
          title: 'Seni Budaya dan Prakarya',
          teacher: 'Bu Lina Kusuma',
          finalScore: 94,
          gradeLetter: 'A',
          colorClass: 'from-amber-400 to-orange-500',
          icon: 'palette',
          tag: 'Kelas 3',
          description: 'Berkreasi dengan warna, bentuk, dan berbagai bahan. Mengenal budaya daerah melalui seni lukis, kerajinan tangan, dan lagu anak.',
          modules: [
            { title: 'Menggambar Alam Sekitar', completed: true },
            { title: 'Membuat Kerajinan dari Kertas', completed: true },
            { title: 'Lagu Daerah Nusantara', completed: true },
          ]
        },
      ]
    },
    {
      period: 'Kelas 2',
      year: '2023/2024',
      courses: [
        {
          id: 311,
          title: 'Berhitung Asyik',
          teacher: 'Bu Endang Sri',
          finalScore: 83,
          gradeLetter: 'B',
          colorClass: 'from-sky-300 to-cyan-400',
          icon: 'hash',
          tag: 'Kelas 2',
          description: 'Belajar berhitung dari angka 1 sampai 100 dengan cara yang menyenangkan menggunakan gambar, lagu, dan permainan kelompok.',
          modules: [
            { title: 'Mengenal Angka 1–100', completed: true },
            { title: 'Penjumlahan dengan Jari', completed: true },
            { title: 'Pengurangan Sederhana', completed: true },
          ]
        },
        {
          id: 312,
          title: 'Membaca dan Menulis',
          teacher: 'Bu Rika Permata',
          finalScore: 90,
          gradeLetter: 'A',
          colorClass: 'from-fuchsia-400 to-violet-500',
          icon: 'pencil',
          tag: 'Kelas 2',
          description: 'Meningkatkan kemampuan membaca lancar dan menulis huruf tegak bersambung. Mengenal kosakata baru melalui cerita bergambar yang menarik.',
          modules: [
            { title: 'Membaca Suku Kata', completed: true },
            { title: 'Menulis Huruf Kapital', completed: true },
            { title: 'Kosakata Sehari-hari', completed: true },
          ]
        },
        {
          id: 313,
          title: 'Lingkungan Hidupku',
          teacher: 'Pak Doni Aditya',
          finalScore: 87,
          gradeLetter: 'A',
          colorClass: 'from-teal-400 to-green-500',
          icon: 'tree-pine',
          tag: 'Kelas 2',
          description: 'Mengenal lingkungan rumah, sekolah, dan sekitarnya. Belajar menjaga kebersihan dan menyayangi alam.',
          modules: [
            { title: 'Lingkungan Rumahku', completed: true },
            { title: 'Menjaga Kebersihan Sekolah', completed: true },
          ]
        },
      ]
    },
    {
      period: 'Kelas 1',
      year: '2022/2023',
      courses: [
        {
          id: 321,
          title: 'Mengenal Angka',
          teacher: 'Bu Endang Sri',
          finalScore: 80,
          gradeLetter: 'B',
          colorClass: 'from-sky-200 to-blue-300',
          icon: 'list-ordered',
          tag: 'Kelas 1',
          description: 'Pengenalan angka 1 sampai 20, belajar menghitung benda-benda di sekitar dengan cara yang menyenangkan.',
          modules: [
            { title: 'Angka 1 sampai 10', completed: true },
            { title: 'Angka 11 sampai 20', completed: true },
          ]
        },
        {
          id: 322,
          title: 'Mengenal Huruf',
          teacher: 'Bu Rika Permata',
          finalScore: 86,
          gradeLetter: 'A',
          colorClass: 'from-pink-300 to-rose-400',
          icon: 'type',
          tag: 'Kelas 1',
          description: 'Mengenal 26 huruf alfabet, belajar membaca suku kata pertama, dan menulis nama sendiri.',
          modules: [
            { title: 'Huruf A sampai M', completed: true },
            { title: 'Huruf N sampai Z', completed: true },
            { title: 'Membaca Suku Kata Pertama', completed: true },
          ]
        },
        {
          id: 323,
          title: 'Dunia di Sekitarku',
          teacher: 'Pak Doni Aditya',
          finalScore: 92,
          gradeLetter: 'A',
          colorClass: 'from-lime-300 to-green-400',
          icon: 'globe',
          tag: 'Kelas 1',
          description: 'Mengenal anggota keluarga, profesi, dan lingkungan sekitar melalui gambar dan cerita sederhana.',
          modules: [
            { title: 'Keluargaku', completed: true },
            { title: 'Profesi dan Pekerjaan', completed: true },
          ]
        },
      ]
    },
  ],

  smk: [
    {
      period: 'Kelas X',
      year: '2024/2025',
      courses: [
        {
          id: 401,
          title: 'Dasar-dasar Pemrograman',
          teacher: 'Pak Budi Santoso',
          finalScore: 82,
          gradeLetter: 'B',
          colorClass: 'from-violet-400 to-purple-600',
          icon: 'code-2',
          tag: 'Kelas X',
          description: 'Pengenalan logika pemrograman, algoritma, flowchart, dan pemrograman dasar menggunakan Python. Menjadi fondasi untuk seluruh mata pelajaran kejuruan RPL.',
          modules: [
            { title: 'Pengenalan Algoritma & Flowchart', completed: true },
            { title: 'Tipe Data dan Variabel', completed: true },
            { title: 'Percabangan (if-else)', completed: true },
            { title: 'Perulangan (for & while)', completed: true },
            { title: 'Fungsi dan Prosedur', completed: true },
          ]
        },
        {
          id: 402,
          title: 'Jaringan Komputer Dasar',
          teacher: 'Pak Agus Prayitno',
          finalScore: 78,
          gradeLetter: 'B',
          colorClass: 'from-cyan-400 to-sky-600',
          icon: 'network',
          tag: 'Kelas X',
          description: 'Konsep dasar jaringan komputer: topologi, protokol TCP/IP, subnetting, dan pengenalan perangkat jaringan (router, switch, hub).',
          modules: [
            { title: 'Pengenalan Jaringan Komputer', completed: true },
            { title: 'Topologi Jaringan', completed: true },
            { title: 'Protokol TCP/IP', completed: true },
            { title: 'Pengenalan Subnetting', completed: true },
          ]
        },
        {
          id: 403,
          title: 'Sistem Komputer',
          teacher: 'Bu Dewi Rahayu',
          finalScore: 85,
          gradeLetter: 'A',
          colorClass: 'from-slate-400 to-gray-600',
          icon: 'cpu',
          tag: 'Kelas X',
          description: 'Arsitektur komputer, komponen hardware (CPU, RAM, storage), sistem operasi dasar, dan manajemen file menggunakan Windows dan Linux.',
          modules: [
            { title: 'Komponen Hardware Komputer', completed: true },
            { title: 'Sistem Operasi Windows', completed: true },
            { title: 'Pengenalan Linux CLI', completed: true },
            { title: 'Manajemen File & Folder', completed: true },
          ]
        },
        {
          id: 404,
          title: 'Matematika Peminatan TIK',
          teacher: 'Bu Nita Sari',
          finalScore: 74,
          gradeLetter: 'B',
          colorClass: 'from-orange-400 to-amber-500',
          icon: 'sigma',
          tag: 'Kelas X',
          description: 'Matematika terapan untuk kebutuhan teknologi informasi: logika matematika, himpunan, relasi, fungsi, dan aljabar boolean.',
          modules: [
            { title: 'Logika Matematika', completed: true },
            { title: 'Himpunan dan Relasi', completed: true },
            { title: 'Fungsi & Komposisi', completed: true },
            { title: 'Aljabar Boolean', completed: true },
          ]
        },
      ]
    },
  ],

  kuliah: [
    {
      period: 'Semester 3',
      year: '2025/2026 Ganjil',
      courses: [
        {
          id: 501,
          title: 'Basis Data Lanjut',
          teacher: 'Dr. Rina Wijaya',
          finalScore: 85,
          gradeLetter: 'A',
          colorClass: 'from-indigo-500 to-blue-700',
          icon: 'database',
          tag: 'Semester 3',
          description: 'Normalisasi database tingkat lanjut (BCNF, 4NF), transaksi ACID, stored procedure, trigger, dan optimalisasi query pada MySQL dan PostgreSQL.',
          modules: [
            { title: 'Review Normalisasi 1NF–3NF', completed: true },
            { title: 'BCNF dan 4NF', completed: true },
            { title: 'Transaksi & ACID Properties', completed: true },
            { title: 'Stored Procedure & Trigger', completed: true },
            { title: 'Query Optimization & Indexing', completed: true },
          ]
        },
        {
          id: 502,
          title: 'Pemrograman Berorientasi Objek',
          teacher: 'Ir. Hendra Gunawan, M.T.',
          finalScore: 88,
          gradeLetter: 'A',
          colorClass: 'from-blue-500 to-indigo-600',
          icon: 'boxes',
          tag: 'Semester 3',
          description: 'Paradigma OOP menggunakan Java: enkapsulasi, inheritansi, polimorfisme, interface, abstract class, design pattern dasar (Singleton, Factory, Observer).',
          modules: [
            { title: 'Prinsip OOP: Enkapsulasi', completed: true },
            { title: 'Inheritansi & Polimorfisme', completed: true },
            { title: 'Interface & Abstract Class', completed: true },
            { title: 'Design Pattern: Singleton & Factory', completed: true },
            { title: 'Collections & Generics', completed: true },
          ]
        },
        {
          id: 503,
          title: 'Jaringan Komputer',
          teacher: 'Dr. Fajar Nugraha',
          finalScore: 79,
          gradeLetter: 'B',
          colorClass: 'from-teal-500 to-cyan-600',
          icon: 'wifi',
          tag: 'Semester 3',
          description: 'Arsitektur jaringan komputer (OSI & TCP/IP model), routing, switching, VLAN, keamanan jaringan dasar, dan konfigurasi menggunakan Cisco Packet Tracer.',
          modules: [
            { title: 'Model OSI & TCP/IP', completed: true },
            { title: 'IP Addressing & Subnetting', completed: true },
            { title: 'Routing Statis & Dinamis (RIP)', completed: true },
            { title: 'VLAN & Inter-VLAN Routing', completed: true },
          ]
        },
        {
          id: 504,
          title: 'Statistika untuk Informatika',
          teacher: 'Dr. Sinta Melati',
          finalScore: 82,
          gradeLetter: 'B',
          colorClass: 'from-purple-500 to-violet-600',
          icon: 'bar-chart-2',
          tag: 'Semester 3',
          description: 'Probabilitas, distribusi statistik, pengujian hipotesis, regresi linier, dan analisis data menggunakan Python (NumPy, Pandas, Matplotlib).',
          modules: [
            { title: 'Statistika Deskriptif', completed: true },
            { title: 'Probabilitas & Distribusi', completed: true },
            { title: 'Pengujian Hipotesis', completed: true },
            { title: 'Regresi Linier Sederhana', completed: true },
          ]
        },
      ]
    },
    {
      period: 'Semester 2',
      year: '2024/2025 Genap',
      courses: [
        {
          id: 511,
          title: 'Struktur Data',
          teacher: 'Dr. Rina Wijaya',
          finalScore: 80,
          gradeLetter: 'B',
          colorClass: 'from-emerald-500 to-green-600',
          icon: 'git-branch',
          tag: 'Semester 2',
          description: 'Array, linked list, stack, queue, tree (BST, AVL), graph, dan hashing. Implementasi menggunakan Java dengan analisis kompleksitas waktu dan ruang.',
          modules: [
            { title: 'Array & Linked List', completed: true },
            { title: 'Stack & Queue', completed: true },
            { title: 'Binary Search Tree (BST)', completed: true },
            { title: 'Graph & BFS/DFS', completed: true },
            { title: 'Hashing & Hash Table', completed: true },
          ]
        },
        {
          id: 512,
          title: 'Pemrograman Web Lanjut',
          teacher: 'Ir. Hendra Gunawan, M.T.',
          finalScore: 91,
          gradeLetter: 'A',
          colorClass: 'from-orange-500 to-red-500',
          icon: 'globe-2',
          tag: 'Semester 2',
          description: 'Pengembangan web modern menggunakan PHP Laravel, RESTful API, autentikasi JWT, dan dasar-dasar Vue.js untuk front-end interaktif.',
          modules: [
            { title: 'PHP & MVC Pattern (Laravel)', completed: true },
            { title: 'Database Migration & Eloquent ORM', completed: true },
            { title: 'RESTful API dengan Laravel', completed: true },
            { title: 'Autentikasi JWT', completed: true },
            { title: 'Intro Vue.js & Axios', completed: true },
          ]
        },
        {
          id: 513,
          title: 'Matematika Diskrit',
          teacher: 'Dr. Sinta Melati',
          finalScore: 74,
          gradeLetter: 'B',
          colorClass: 'from-pink-500 to-rose-600',
          icon: 'function-square',
          tag: 'Semester 2',
          description: 'Logika proposisi, teori himpunan, relasi dan fungsi, kombinatorik, teori graf, dan aljabar boolean — fondasi matematika untuk ilmu komputer.',
          modules: [
            { title: 'Logika Proposisi & Predikat', completed: true },
            { title: 'Teori Himpunan & Relasi', completed: true },
            { title: 'Kombinatorik (Permutasi & Kombinasi)', completed: true },
            { title: 'Teori Graf Dasar', completed: true },
          ]
        },
        {
          id: 514,
          title: 'Basis Data',
          teacher: 'Dr. Rina Wijaya',
          finalScore: 87,
          gradeLetter: 'A',
          colorClass: 'from-cyan-500 to-blue-600',
          icon: 'table',
          tag: 'Semester 2',
          description: 'Pengenalan basis data relasional, model ER, normalisasi 1NF–3NF, dan query SQL (DDL, DML, DQL) menggunakan MySQL.',
          modules: [
            { title: 'Model Entity-Relationship (ER)', completed: true },
            { title: 'Normalisasi 1NF, 2NF, 3NF', completed: true },
            { title: 'SQL DDL: CREATE, ALTER, DROP', completed: true },
            { title: 'SQL DML: SELECT, JOIN, Subquery', completed: true },
          ]
        },
      ]
    },
    {
      period: 'Semester 1',
      year: '2024/2025 Ganjil',
      courses: [
        {
          id: 521,
          title: 'Algoritma & Pemrograman',
          teacher: 'Ir. Hendra Gunawan, M.T.',
          finalScore: 86,
          gradeLetter: 'A',
          colorClass: 'from-violet-500 to-indigo-600',
          icon: 'braces',
          tag: 'Semester 1',
          description: 'Dasar pemrograman prosedural menggunakan C/Python, flowchart, pseudocode, array, fungsi, dan pengenalan rekursi.',
          modules: [
            { title: 'Algoritma & Flowchart Dasar', completed: true },
            { title: 'Variabel, Tipe Data & Operator', completed: true },
            { title: 'Percabangan & Perulangan', completed: true },
            { title: 'Array & Fungsi', completed: true },
            { title: 'Pengenalan Rekursi', completed: true },
          ]
        },
        {
          id: 522,
          title: 'Kalkulus 1',
          teacher: 'Dr. Sinta Melati',
          finalScore: 72,
          gradeLetter: 'C',
          colorClass: 'from-amber-500 to-yellow-500',
          icon: 'trending-up',
          tag: 'Semester 1',
          description: 'Limit, turunan (diferensiasi) fungsi satu variabel, aturan rantai, maksimum-minimum, dan aplikasi turunan dalam pemodelan.',
          modules: [
            { title: 'Limit Fungsi', completed: true },
            { title: 'Turunan & Aturan Diferensiasi', completed: true },
            { title: 'Aturan Rantai (Chain Rule)', completed: true },
            { title: 'Aplikasi Turunan: Maks & Min', completed: true },
          ]
        },
        {
          id: 523,
          title: 'Pengantar Teknologi Informasi',
          teacher: 'Dr. Fajar Nugraha',
          finalScore: 89,
          gradeLetter: 'A',
          colorClass: 'from-sky-400 to-blue-500',
          icon: 'monitor',
          tag: 'Semester 1',
          description: 'Sejarah komputer, perkembangan teknologi informasi, etika digital, keamanan siber dasar, dan pengenalan sistem informasi.',
          modules: [
            { title: 'Sejarah & Generasi Komputer', completed: true },
            { title: 'Perangkat Keras & Lunak', completed: true },
            { title: 'Etika Digital & Privasi', completed: true },
            { title: 'Pengenalan Sistem Informasi', completed: true },
          ]
        },
        {
          id: 524,
          title: 'Bahasa Inggris Teknis',
          teacher: 'Bu Margaretha A.M.',
          finalScore: 83,
          gradeLetter: 'B',
          colorClass: 'from-red-400 to-rose-500',
          icon: 'languages',
          tag: 'Semester 1',
          description: 'Penguasaan kosakata teknis IT, membaca dokumentasi berbahasa Inggris, writing technical report, dan presentasi dalam Bahasa Inggris.',
          modules: [
            { title: 'Technical Vocabulary for IT', completed: true },
            { title: 'Reading Technical Documentation', completed: true },
            { title: 'Writing a Technical Report', completed: true },
          ]
        },
      ]
    },
  ],
};
