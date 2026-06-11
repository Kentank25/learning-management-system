import { sidebarTexts, coursesData } from './db.js';

(function() {
  const eduLevel = localStorage.getItem('edu-level') || 'smk';
  const username = localStorage.getItem('username') || 'Keane';

  // 1. Sidebar Navigation Text Mapping (Sync with main.js)
  const currentSidebar = sidebarTexts[eduLevel];
  const navDashboardText = document.getElementById('nav-dashboard-text');
  const navCoursesText = document.getElementById('nav-courses-text');
  const navCalendarText = document.getElementById('nav-calendar-text');
  const navGradesText = document.getElementById('nav-grades-text');
  const navFilesText = document.getElementById('nav-files-text');

  if (navDashboardText) navDashboardText.textContent = currentSidebar.dashboard;
  if (navCoursesText) navCoursesText.textContent = currentSidebar.courses;
  if (navCalendarText) navCalendarText.textContent = currentSidebar.calendar;
  if (navGradesText) navGradesText.textContent = currentSidebar.grades;
  if (navFilesText) navFilesText.textContent = currentSidebar.files;

  // 2. Adjust Page Headers
  const pageTitle = document.getElementById('grades-page-title');
  const pageDesc = document.getElementById('grades-page-desc');
  const semesterFilter = document.getElementById('semester-filter-container');

  if (eduLevel === 'sd') {
    if (pageTitle) pageTitle.textContent = 'Rapor Bintang Prestasi 🌟';
    if (pageDesc) pageDesc.textContent = 'Kumpulkan Bintang Emas dari kuis seru dan koleksi lencana belajarmu!';
    if (semesterFilter) semesterFilter.classList.add('hidden');
  } else if (eduLevel === 'kuliah') {
    if (pageTitle) pageTitle.textContent = 'Kartu Hasil Studi (KHS) 🎓';
    if (pageDesc) pageDesc.textContent = 'Lihat pencapaian Indeks Prestasi Kumulatif, beban SKS, dan evaluasi semester.';
    if (semesterFilter) semesterFilter.classList.remove('hidden');
  } else {
    // SMK
    if (pageTitle) pageTitle.textContent = 'Laporan Hasil Belajar (Rapor) 📝';
    if (pageDesc) pageDesc.textContent = 'Pantau nilai akademik kejuruan, kompetensi keahlian, dan evaluasi wali kelas.';
    if (semesterFilter) semesterFilter.classList.add('hidden');
  }

  // 3. Render dynamic content
  const contentArea = document.getElementById('grades-content-area');
  const courses = coursesData[eduLevel] || [];

  const renderSDGrades = () => {
    if (!contentArea) return;
    
    // Calculate stars
    let totalStars = 0;
    const courseStars = {};
    courses.forEach(c => {
      const stars = parseInt(localStorage.getItem(`kuis-stars-${c.id}`) || 0);
      courseStars[c.id] = stars;
      totalStars += stars;
    });

    // Unlocked badges criteria
    const badges = [
      { id: 1, name: 'Juara Angka 🔢', desc: 'Selesaikan kuis Matematika Ceria dengan 10 Bintang', icon: 'calculator', color: 'bg-sky-100 text-sky-600 border-sky-200', unlocked: courseStars[1] >= 10 },
      { id: 2, name: 'Kutu Buku Cilik 📖', desc: 'Selesaikan kuis Bahasa Indonesia dengan 10 Bintang', icon: 'book-open', color: 'bg-emerald-100 text-emerald-600 border-emerald-200', unlocked: courseStars[2] >= 10 },
      { id: 3, name: 'Pelukis Hebat 🎨', desc: 'Menggambar & Mewarnai mencapai progres 100%', icon: 'palette', color: 'bg-purple-100 text-purple-600 border-purple-200', unlocked: (localStorage.getItem('progress-course-3') || 100) == 100 },
      { id: 4, name: 'Sahabat Garuda 🦅', desc: 'Selesaikan kuis Pendidikan Pancasila dengan 10 Bintang', icon: 'heart', color: 'bg-rose-100 text-rose-600 border-rose-200', unlocked: courseStars[4] >= 10 }
    ];

    const unlockedCount = badges.filter(b => b.unlocked).length;

    let html = `
      <!-- Header stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gradient-to-br from-sky-400 to-blue-500 text-white rounded-2xl p-5 shadow-lg border border-sky-300 flex items-center justify-between hover-lift">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-sky-100">Bintang Terkumpul</span>
            <span class="text-3xl font-black block mt-1">${totalStars} Bintang ⭐</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="star" class="w-8 h-8 fill-current"></i>
          </div>
        </div>

        <div class="bg-gradient-to-br from-yellow-400 to-amber-500 text-white rounded-2xl p-5 shadow-lg border border-yellow-300 flex items-center justify-between hover-lift">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-yellow-100">Lencana Kehormatan</span>
            <span class="text-3xl font-black block mt-1">${unlockedCount} / ${badges.length} Didapat 🏆</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="award" class="w-8 h-8"></i>
          </div>
        </div>

        <div class="bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-2xl p-5 shadow-lg border border-emerald-300 flex items-center justify-between hover-lift">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-emerald-100">Evaluasi Belajar</span>
            <span class="text-lg font-bold block mt-2">Belajar Sangat Ceria & Aktif!</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="heart" class="w-8 h-8 fill-current"></i>
          </div>
        </div>
      </div>

      <!-- Main report cards list -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Classes details -->
        <div class="lg:col-span-2 bg-white border border-surface-200 rounded-3xl p-5 shadow-sm space-y-4">
          <h3 class="font-bold text-surface-900 text-base flex items-center gap-2">
            <i data-lucide="book-marked" class="w-5 h-5 text-sky-500"></i> Detail Nilai Kelas Ceria
          </h3>
          
          <div class="space-y-3">
    `;

    courses.forEach(c => {
      const stars = courseStars[c.id];
      const hasKuis = c.kuis && c.kuis.length > 0;
      
      let starIconsHTML = '';
      if (stars > 0) {
        for (let s = 0; s < stars; s += 2) {
          starIconsHTML += `<i data-lucide="star" class="w-4 h-4 fill-amber-400 text-amber-500 shrink-0"></i>`;
        }
      } else {
        starIconsHTML = `<span class="text-xs text-surface-400 font-semibold italic">Belum ada bintang</span>`;
      }

      const statusMsg = stars >= 10 
        ? `<span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0"><i data-lucide="smile" class="w-3.5 h-3.5"></i> Selesai Ceria</span>`
        : `<a href="course-detail.html?id=${c.id}" class="text-xs font-bold text-sky-600 hover:text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">Main Kuis →</a>`;

      html += `
        <div class="p-4 border border-surface-100 rounded-2xl flex items-center justify-between gap-4 hover:bg-surface-50/40 transition-colors">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-xl bg-sky-50 text-sky-500">
              <i data-lucide="${c.icon}" class="w-5 h-5"></i>
            </div>
            <div>
              <h4 class="font-bold text-sm text-surface-900 leading-snug">${c.title}</h4>
              <p class="text-[11px] text-surface-400 font-medium mt-0.5">${c.teacher}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex gap-0.5 items-center bg-amber-50/30 px-2 py-1 rounded-lg border border-amber-100/50">
              ${starIconsHTML}
            </div>
            ${statusMsg}
          </div>
        </div>
      `;
    });

    html += `
          </div>
        </div>

        <!-- Badges board -->
        <div class="bg-white border border-surface-200 rounded-3xl p-5 shadow-sm flex flex-col space-y-4">
          <h3 class="font-bold text-surface-900 text-base flex items-center gap-2">
            <i data-lucide="award" class="w-5 h-5 text-amber-500"></i> Lencana Penghargaan
          </h3>
          <div class="grid grid-cols-1 gap-3 flex-1">
    `;

    badges.forEach(b => {
      const lockClass = b.unlocked ? '' : 'opacity-40';
      const lockIcon = b.unlocked 
        ? `<i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600"></i>`
        : `<i data-lucide="lock" class="w-5 h-5 text-surface-400"></i>`;
      
      html += `
        <div class="p-3 border border-surface-150 rounded-2xl flex items-center justify-between gap-3 ${lockClass} hover:shadow-sm transition-shadow">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-xl border ${b.color} shrink-0">
              <i data-lucide="${b.icon}" class="w-5 h-5"></i>
            </div>
            <div>
              <h4 class="font-bold text-xs text-surface-900 leading-tight">${b.name}</h4>
              <p class="text-[9px] text-surface-500 leading-relaxed mt-0.5">${b.desc}</p>
            </div>
          </div>
          <div class="shrink-0">
            ${lockIcon}
          </div>
        </div>
      `;
    });

    html += `
          </div>
        </div>
      </div>
    `;

    contentArea.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  const renderSMKGrades = () => {
    if (!contentArea) return;

    let totalScore = 0;
    let countedCourses = 0;
    const itemsHTML = [];

    courses.forEach(c => {
      const savedProg = localStorage.getItem(`progress-course-${c.id}`);
      const progressVal = savedProg !== null ? parseInt(savedProg) : c.progress;
      
      // Calculate dynamic mock score (e.g. progress = 100 -> score 95, progress = 65 -> score 78)
      let score = 50 + Math.round(progressVal * 0.45);
      if (progressVal === 100) score = 95;
      else if (progressVal === 0) score = 0;

      totalScore += score;
      countedCourses++;

      let gradeLetter = 'D';
      if (score >= 90) gradeLetter = 'A';
      else if (score >= 80) gradeLetter = 'B';
      else if (score >= 65) gradeLetter = 'C';

      const isPassed = score >= 65;
      const statusBadge = isPassed
        ? `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1 w-fit"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Kompeten</span>`
        : `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1 w-fit"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Belajar Aktif</span>`;

      // Mock comments
      const comments = {
        1: 'Sangat menguasai struktur database dan kueri SQL tingkat lanjut.',
        2: 'Kreativitas desain antarmuka baik, tingkatkan pemahaman JavaScript ES6.',
        3: 'Kelulusan kompetensi sempurna. Pemahaman OOP Java sangat baik!',
        4: 'Ikuti sesi lab tambahan untuk mengoptimalkan proyek Flutter Anda.'
      };

      const courseHTML = `
        <tr class="border-b border-surface-150 hover:bg-surface-50/50 transition-colors">
          <td class="px-6 py-4.5">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-amber-50 text-amber-500 rounded-lg">
                <i data-lucide="${c.icon}" class="w-4 h-4"></i>
              </div>
              <div>
                <span class="font-bold text-surface-900 block leading-tight text-sm">${c.title}</span>
                <span class="text-[10px] text-surface-400 font-semibold block mt-0.5">${c.tag}</span>
              </div>
            </div>
          </td>
          <td class="px-6 py-4.5 text-xs text-surface-600 font-medium">${c.teacher}</td>
          <td class="px-6 py-4.5 text-center font-bold text-sm text-surface-950">${score}</td>
          <td class="px-6 py-4.5 text-center font-bold text-sm text-accent-700">${gradeLetter}</td>
          <td class="px-6 py-4.5">${statusBadge}</td>
          <td class="px-6 py-4.5 text-xs text-surface-500 leading-relaxed font-medium max-w-xs">${comments[c.id] || '-'}</td>
        </tr>
      `;
      itemsHTML.push(courseHTML);
    });

    const average = Math.round(totalScore / countedCourses) || 0;
    const competencyStatus = average >= 75 ? 'Kompeten Seutuhnya ✅' : 'Tingkatkan Nilai Kompetensi';

    let html = `
      <!-- Header stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-2xl p-5 shadow-lg border border-amber-300 flex items-center justify-between hover-lift">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-amber-100">Rata-rata Rapor</span>
            <span class="text-3xl font-black block mt-1">${average} / 100</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="percent" class="w-8 h-8"></i>
          </div>
        </div>

        <div class="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-2xl p-5 shadow-lg border border-indigo-300 flex items-center justify-between hover-lift">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-indigo-100">Status Kelulusan</span>
            <span class="text-xl font-black block mt-2">${competencyStatus}</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="check-circle" class="w-8 h-8"></i>
          </div>
        </div>

        <div class="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-5 shadow-lg border border-emerald-300 flex items-center justify-between hover-lift">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-emerald-100">Predikat Akademik</span>
            <span class="text-2xl font-black block mt-1">${average >= 85 ? 'Sangat Baik (A)' : 'Baik (B)'}</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="award" class="w-8 h-8"></i>
          </div>
        </div>
      </div>

      <!-- Scorecard Table -->
      <div class="bg-white border border-surface-200 rounded-3xl shadow-sm overflow-hidden">
        <div class="p-5 border-b border-surface-100">
          <h3 class="font-bold text-surface-900 text-base flex items-center gap-2">
            <i data-lucide="list-todo" class="w-5 h-5 text-amber-500"></i> Hasil Kompetensi Kejuruan RPL
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-50 text-[10px] uppercase font-bold text-surface-500 tracking-wider border-b border-surface-150">
                <th class="px-6 py-3.5">Mata Pelajaran</th>
                <th class="px-6 py-3.5">Guru Pengampu</th>
                <th class="px-6 py-3.5 text-center">Nilai Angka</th>
                <th class="px-6 py-3.5 text-center">Nilai Huruf</th>
                <th class="px-6 py-3.5">Status</th>
                <th class="px-6 py-3.5">Catatan Evaluasi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-100">
              ${itemsHTML.join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    contentArea.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  const renderKuliahGrades = (selectedSem = 'all') => {
    if (!contentArea) return;

    let totalGPPoints = 0;
    let totalSKS = 0;
    const itemsHTML = [];

    // Mock scores per course
    const courseGrades = {
      1: { score: 88, letter: 'A', point: 4.0 }, // RPL
      2: { score: 78, letter: 'B+', point: 3.3 }, // Basis Data Lanjut
      3: { score: 95, letter: 'A', point: 4.0 }, // Analisis Algoritma
      4: { score: 72, letter: 'B', point: 3.0 } // Pemweb Enterprise
    };

    courses.forEach(c => {
      // SKS weight parsing from tag (e.g. "3 SKS" -> 3)
      const sksVal = parseInt(c.tag.replace(/\D/g, '')) || 3;
      
      const savedProg = localStorage.getItem(`progress-course-${c.id}`);
      const progressVal = savedProg !== null ? parseInt(savedProg) : c.progress;

      // Dynamic calculation helper
      let scoreInfo = courseGrades[c.id] || { score: 80, letter: 'A-', point: 3.7 };
      if (progressVal === 100) scoreInfo = { score: 95, letter: 'A', point: 4.0 };
      
      totalGPPoints += scoreInfo.point * sksVal;
      totalSKS += sksVal;

      const isPassed = scoreInfo.point >= 2.0;
      const statusBadge = isPassed
        ? `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-100 flex items-center gap-1 w-fit"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Lulus</span>`
        : `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100 flex items-center gap-1 w-fit"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Mengulang</span>`;

      const courseHTML = `
        <tr class="border-b border-surface-150 hover:bg-surface-50/50 transition-colors">
          <td class="px-6 py-4.5">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-indigo-50 text-indigo-500 rounded-lg">
                <i data-lucide="${c.icon}" class="w-4 h-4"></i>
              </div>
              <div>
                <span class="font-bold text-surface-900 block leading-tight text-sm">${c.title}</span>
                <span class="text-[10px] text-surface-400 font-semibold block mt-0.5">Mata Kuliah Semester 4</span>
              </div>
            </div>
          </td>
          <td class="px-6 py-4.5 text-xs text-surface-600 font-medium">${c.teacher}</td>
          <td class="px-6 py-4.5 text-center font-bold text-sm text-surface-900">${sksVal} SKS</td>
          <td class="px-6 py-4.5 text-center font-bold text-sm text-indigo-600">${scoreInfo.letter}</td>
          <td class="px-6 py-4.5 text-center font-extrabold text-sm text-surface-950">${scoreInfo.point.toFixed(2)}</td>
          <td class="px-6 py-4.5">${statusBadge}</td>
        </tr>
      `;
      
      itemsHTML.push(courseHTML);
    });

    const gpa = (totalGPPoints / totalSKS) || 3.85;

    let html = `
      <!-- Header stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-2xl p-5 shadow-lg border border-indigo-500 flex items-center justify-between hover-lift">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-indigo-100">IPK Semester (IPS)</span>
            <span class="text-3xl font-black block mt-1">${gpa.toFixed(2)} <span class="text-sm font-medium text-indigo-300">/ 4.00</span></span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="graduation-cap" class="w-8 h-8"></i>
          </div>
        </div>

        <div class="bg-gradient-to-br from-violet-600 to-violet-800 text-white rounded-2xl p-5 shadow-lg border border-violet-500 flex items-center justify-between hover-lift">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-violet-100">Beban SKS Semester</span>
            <span class="text-3xl font-black block mt-1">${totalSKS} SKS</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="book-open" class="w-8 h-8"></i>
          </div>
        </div>

        <div class="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-5 shadow-lg border border-emerald-300 flex items-center justify-between hover-lift">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-emerald-100">Predikat Kelulusan</span>
            <span class="text-2xl font-black block mt-1">${gpa >= 3.51 ? 'Dengan Pujian (Cumlaude)' : 'Sangat Memuaskan'}</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="award" class="w-8 h-8"></i>
          </div>
        </div>
      </div>

      <!-- KHS Table Card -->
      <div class="bg-white border border-surface-200 rounded-3xl shadow-sm overflow-hidden">
        <div class="p-5 border-b border-surface-100 flex items-center justify-between flex-wrap gap-2">
          <h3 class="font-bold text-surface-900 text-base flex items-center gap-2">
            <i data-lucide="clipboard-list" class="w-5 h-5 text-indigo-500"></i> Detail Kartu Hasil Studi (KHS)
          </h3>
          <span class="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">Tahun Ajaran: 2025/2026 Ganjil</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-50 text-[10px] uppercase font-bold text-surface-500 tracking-wider border-b border-surface-150">
                <th class="px-6 py-3.5">Kode & Nama Mata Kuliah</th>
                <th class="px-6 py-3.5">Dosen Pengampu</th>
                <th class="px-6 py-3.5 text-center">Beban SKS</th>
                <th class="px-6 py-3.5 text-center">Nilai Huruf</th>
                <th class="px-6 py-3.5 text-center">Bobot Indeks</th>
                <th class="px-6 py-3.5">Status Kelulusan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-100">
              ${itemsHTML.join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    contentArea.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  // Dispatch rendering based on active level
  if (eduLevel === 'sd') {
    renderSDGrades();
  } else if (eduLevel === 'kuliah') {
    renderKuliahGrades();
    
    // Semester select listener
    const select = document.getElementById('semester-select');
    if (select) {
      select.addEventListener('change', (e) => {
        renderKuliahGrades(e.target.value);
      });
    }
  } else {
    renderSMKGrades();
  }
})();
