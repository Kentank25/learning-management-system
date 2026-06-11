import { sidebarTexts, coursesData } from './db.js';

(function() {
  const eduLevel = localStorage.getItem('edu-level') || 'smk';
  const username = localStorage.getItem('username') || 'Keane';

  // 1. Parse URL ID
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = parseInt(urlParams.get('id')) || 1;

  // 2. Fetch Active Course Data
  const activeLevelCourses = coursesData[eduLevel] || [];
  const course = activeLevelCourses.find(c => c.id === courseId) || activeLevelCourses[0];

  if (!course) {
    alert("Kelas tidak ditemukan.");
    window.location.href = 'courses.html';
    return;
  }

  // 3. Dynamic Profile Info
  const profileName = document.getElementById('profile-name');
  const profileImg = document.getElementById('profile-img');
  if (profileName) profileName.textContent = username;
  if (profileImg) {
    let avatarColor = '2563eb'; // blue
    if (eduLevel === 'sd') avatarColor = '0ea5e9'; // sky
    if (eduLevel === 'smk') avatarColor = 'eab308'; // amber
    if (eduLevel === 'kuliah') avatarColor = '6366f1'; // indigo
    profileImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=dbeafe&color=${avatarColor}`;
  }

  // 4. Sidebar Navigation Text Mapping
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

  // 5. Adapt Visual Theme (Gradients and badging)
  const courseBanner = document.getElementById('course-banner');
  const courseBadge = document.getElementById('course-badge');
  const courseTitleEl = document.getElementById('course-title');
  const courseTeacherEl = document.getElementById('course-teacher');
  const courseDescEl = document.getElementById('course-desc');

  const infoStatus = document.getElementById('info-status');
  const infoModulesCount = document.getElementById('info-modules-count');
  const infoWeight = document.getElementById('info-weight');
  const infoProgressPct = document.getElementById('info-progress-pct');
  const infoProgressBar = document.getElementById('info-progress-bar');

  const sdStarWidget = document.getElementById('sd-star-widget');
  const sdStarsCountLabel = document.getElementById('sd-stars-count');
  const kuliahAcademicWidget = document.getElementById('kuliah-academic-widget');
  const capIcon = document.querySelector('aside .text-accent-600');

  // Load saved dynamic progress/stars
  const savedProgress = localStorage.getItem(`progress-course-${course.id}`);
  const courseProgressVal = savedProgress !== null ? parseInt(savedProgress) : course.progress;
  
  const savedStars = localStorage.getItem(`kuis-stars-${course.id}`) || 0;

  // Apply colors and layout configs
  if (eduLevel === 'sd') {
    if (courseBanner) courseBanner.className = 'bg-gradient-sd rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-sky-300 relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px] hover-lift';
    if (courseBadge) courseBadge.textContent = 'Sekolah Dasar (SD)';
    if (infoWeight) infoWeight.className = 'hidden';
    if (sdStarWidget) {
      sdStarWidget.classList.remove('hidden');
      if (sdStarsCountLabel) sdStarsCountLabel.textContent = `${savedStars} Bintang ⭐`;
    }
    if (infoStatus) {
      if (courseProgressVal === 100) {
        infoStatus.className = 'font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs';
        infoStatus.textContent = 'Selesai 🏆';
      } else {
        infoStatus.className = 'font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full text-xs';
        infoStatus.textContent = 'Sedang Belajar';
      }
    }
    if (infoProgressBar) {
      infoProgressBar.className = 'bg-sky-400 h-2 rounded-full';
    }
    if (infoProgressPct) infoProgressPct.className = 'text-sky-500 font-bold';
    if (capIcon) {
      capIcon.classList.remove('text-accent-600');
      capIcon.classList.add('text-sky-500');
    }
  } else if (eduLevel === 'kuliah') {
    if (courseBanner) courseBanner.className = 'bg-gradient-kuliah rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500 relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px] hover-lift';
    if (courseBadge) courseBadge.textContent = course.tag; // SKS indicator
    if (infoWeight) {
      infoWeight.innerHTML = `<span class="text-surface-500 flex items-center gap-2"><i data-lucide="award" class="w-4.5 h-4.5 text-indigo-500"></i>Beban Kuliah</span> <span class="font-bold text-surface-900">${course.tag}</span>`;
    }
    if (kuliahAcademicWidget) kuliahAcademicWidget.classList.remove('hidden');
    if (infoStatus) {
      if (courseProgressVal === 100) {
        infoStatus.className = 'font-semibold text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full text-xs';
        infoStatus.textContent = 'Lulus';
      } else {
        infoStatus.className = 'font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full text-xs';
        infoStatus.textContent = 'Aktif';
      }
    }
    if (infoProgressBar) {
      infoProgressBar.className = 'bg-indigo-600 h-2 rounded-full';
    }
    if (infoProgressPct) infoProgressPct.className = 'text-indigo-600 font-bold';
    if (capIcon) {
      capIcon.classList.remove('text-accent-600');
      capIcon.classList.add('text-indigo-600');
    }
  } else {
    // SMK
    if (courseBanner) courseBanner.className = 'bg-gradient-smk rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-amber-400 relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px] hover-lift';
    if (courseBadge) courseBadge.textContent = 'SMK RPL - ' + course.tag;
    if (infoWeight) {
      infoWeight.innerHTML = `<span class="text-surface-500 flex items-center gap-2"><i data-lucide="award" class="w-4.5 h-4.5 text-amber-500"></i>Semester</span> <span class="font-bold text-surface-900">${course.tag}</span>`;
    }
    if (infoStatus) {
      if (courseProgressVal === 100) {
        infoStatus.className = 'font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs';
        infoStatus.textContent = 'Lulus Kompetensi';
      } else {
        infoStatus.className = 'font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full text-xs';
        infoStatus.textContent = 'Belajar Aktif';
      }
    }
    if (infoProgressBar) {
      infoProgressBar.className = 'bg-amber-500 h-2 rounded-full';
    }
    if (infoProgressPct) infoProgressPct.className = 'text-amber-600 font-bold';
    if (capIcon) {
      capIcon.classList.remove('text-accent-600');
      capIcon.classList.add('text-amber-500');
    }
  }

  // Populate dynamic header data
  if (courseTitleEl) courseTitleEl.textContent = course.title;
  if (courseTeacherEl) courseTeacherEl.innerHTML = `<i data-lucide="user" class="w-4 h-4"></i> Pengajar: ${course.teacher}`;
  if (courseDescEl) courseDescEl.textContent = course.description;

  const renderHeaderProgress = () => {
    const modules = getSavedModules();
    const completedCount = modules.filter(m => m.completed).length;
    const computedPct = Math.round((completedCount / modules.length) * 100);

    if (infoModulesCount) infoModulesCount.textContent = `${completedCount} / ${modules.length} Modul`;
    if (infoProgressPct) infoProgressPct.textContent = `${computedPct}%`;
    if (infoProgressBar) infoProgressBar.style.width = `${computedPct}%`;

    localStorage.setItem(`progress-course-${course.id}`, computedPct);
  };

  // Local storage modules state to enable completion toggles!
  const getSavedModules = () => {
    const key = `modules-course-${course.id}`;
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
    
    // Save defaults
    localStorage.setItem(key, JSON.stringify(course.modules));
    return course.modules;
  };

  const saveModulesState = (modules) => {
    localStorage.setItem(`modules-course-${course.id}`, JSON.stringify(modules));
    renderHeaderProgress();
  };

  // 6. Tabs Configuration
  const tabsNav = document.getElementById('tabs-navigation');
  const tabContent = document.getElementById('tab-content');

  const tabConfigs = {
    sd: [
      { id: 'modul', label: 'Modul Ceria 📖' },
      { id: 'kuis', label: 'Kuis Bintang ⭐' }
    ],
    smk: [
      { id: 'modul', label: 'Materi & Modul 📁' },
      { id: 'tugas', label: 'Dropbox Tugas 🚀' }
    ],
    kuliah: [
      { id: 'modul', label: 'Silabus & Modul 📚' },
      { id: 'tugas', label: 'Submisi Tugas 🎓' },
      { id: 'diskusi', label: 'Forum Diskusi 💬' }
    ]
  };

  let activeTab = 'modul';

  const renderTabsNav = () => {
    if (!tabsNav) return;
    tabsNav.innerHTML = '';
    
    const activeBtnClass = eduLevel === 'sd' 
      ? 'bg-sky-100 text-sky-700' 
      : (eduLevel === 'kuliah' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700');

    tabConfigs[eduLevel].forEach(tab => {
      const isSelected = tab.id === activeTab;
      const btn = document.createElement('button');
      btn.className = `flex-1 py-2 text-center rounded-lg cursor-pointer transition-all ${isSelected ? activeBtnClass : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'}`;
      btn.textContent = tab.label;
      
      btn.addEventListener('click', () => {
        activeTab = tab.id;
        renderTabsNav();
        renderTabContent();
      });

      tabsNav.appendChild(btn);
    });
  };

  // Render specific tab contents
  const renderTabContent = () => {
    if (!tabContent) return;
    tabContent.innerHTML = '';

    const listColor = eduLevel === 'sd' ? 'group-hover:text-sky-500' : (eduLevel === 'kuliah' ? 'group-hover:text-indigo-600' : 'group-hover:text-amber-600');
    const checkedColor = eduLevel === 'sd' ? 'text-sky-500 bg-sky-50' : (eduLevel === 'kuliah' ? 'text-indigo-600 bg-indigo-50' : 'text-amber-500 bg-amber-50');

    // TAB 1: MODUL/SILABUS
    if (activeTab === 'modul') {
      const savedModules = getSavedModules();
      
      let html = `<div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 class="font-bold text-surface-900 text-base flex items-center justify-between">
          <span>Daftar Materi Pembelajaran</span>
          <span class="text-xs font-medium text-surface-400">Klik ikon centang untuk menyelesaikan</span>
        </h3>
        <div class="space-y-2.5">`;

      savedModules.forEach((m, idx) => {
        const checkIcon = m.completed ? 'check-circle-2' : 'circle';
        const checkClass = m.completed ? checkedColor : 'text-surface-300 hover:text-surface-500';
        
        html += `
          <div class="flex items-center justify-between p-3.5 border border-surface-100 rounded-xl hover:bg-surface-50/50 hover:border-surface-200 hover-lift transition-all group">
            <div class="flex items-center gap-3">
              <span class="w-7 h-7 bg-surface-100 text-surface-600 flex items-center justify-center font-bold text-xs rounded-lg">${idx + 1}</span>
              <div>
                <h4 class="font-bold text-sm text-surface-900 group-hover:${listColor} transition-colors line-clamp-1">${m.title}</h4>
                <p class="text-xs text-surface-400 mt-0.5 flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${m.dur}</p>
              </div>
            </div>
            <button data-mod-idx="${idx}" class="toggle-module-btn p-1 ${checkClass} rounded-lg transition-colors cursor-pointer">
              <i data-lucide="${checkIcon}" class="w-5 h-5"></i>
            </button>
          </div>
        `;
      });

      html += `</div></div>`;
      tabContent.innerHTML = html;

      // Add click listeners to checkbox buttons
      document.querySelectorAll('.toggle-module-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-mod-idx'));
          const currentModules = getSavedModules();
          currentModules[idx].completed = !currentModules[idx].completed;
          saveModulesState(currentModules);
          renderTabContent();
        });
      });
    }

    // TAB 2: TUGAS/DROPBOX (SMK & Kuliah)
    else if (activeTab === 'tugas') {
      const task = course.tasks && course.tasks[0] ? course.tasks[0] : {
        title: 'Tugas Proyek Mandiri Kelas',
        due: 'Besok, 23:59 WIB',
        pts: 100
      };

      const taskKey = `tugas-status-${course.id}`;
      const isSubmitted = localStorage.getItem(taskKey) === 'true';

      const fileInputId = `file-uploader-${course.id}`;
      
      let uploadStatusHTML = '';
      if (isSubmitted) {
        uploadStatusHTML = `
          <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-800 text-sm font-medium">
            <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600"></i>
            <div>
              <p class="font-bold text-emerald-950">Berkas Tugas Sudah Dikumpulkan!</p>
              <p class="text-xs text-emerald-700 mt-0.5">Dikirim pada: Baru saja</p>
            </div>
          </div>
        `;
      } else {
        const themeBtnColor = eduLevel === 'kuliah' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-amber-500 hover:bg-amber-600';
        const focusRing = eduLevel === 'kuliah' ? 'focus:ring-indigo-200' : 'focus:ring-amber-200';
        uploadStatusHTML = `
          <div id="upload-panel" class="space-y-4">
            <!-- Drag Area -->
            <div id="drag-drop-zone" class="border-2 border-dashed border-surface-200 hover:border-accent-400 hover:bg-surface-50 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2">
              <i data-lucide="upload-cloud" class="w-10 h-10 text-surface-400"></i>
              <span class="text-sm font-semibold text-surface-800">Pilih Berkas Tugas Anda</span>
              <span class="text-xs text-surface-400 mt-0.5">PDF, ZIP, atau RAR (Maks. 20MB)</span>
              <!-- Mock Input File -->
              <input type="file" id="${fileInputId}" class="hidden" />
              <div id="selected-file-label" class="hidden text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg font-medium">
                Nama File: skema-toko-online.zip
              </div>
            </div>

            <!-- submit btn -->
            <button
              id="submit-task-btn"
              disabled
              class="w-full py-2.5 bg-surface-200 text-surface-400 cursor-not-allowed font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
            >
              Kumpulkan Berkas
            </button>
          </div>

          <!-- Uploading progress panel -->
          <div id="upload-progress-panel" class="hidden space-y-2 p-4 border border-surface-200 rounded-2xl">
            <div class="flex justify-between text-xs font-semibold text-surface-600">
              <span class="flex items-center gap-1"><i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i> Mengunggah berkas...</span>
              <span id="upload-progress-pct">0%</span>
            </div>
            <div class="w-full bg-surface-100 rounded-full h-1.5">
              <div id="upload-progress-bar" class="h-1.5 rounded-full ${eduLevel === 'kuliah' ? 'bg-indigo-600' : 'bg-amber-500'}" style="width: 0%"></div>
            </div>
          </div>
        `;
      }

      let html = `
        <div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-5">
          <div class="flex justify-between items-start border-b border-surface-100 pb-4">
            <div>
              <span class="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-50 text-orange-600"><i data-lucide="clock" class="w-2.5 h-2.5"></i> Tugas Proyek</span>
              <h3 class="font-bold text-surface-900 text-base mt-2">${task.title}</h3>
              <p class="text-xs text-surface-500 mt-1 flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> Batas Pengumpulan: <strong>${task.due}</strong></p>
            </div>
            <div class="text-right">
              <span class="text-xs text-surface-500 block">Bobot Nilai</span>
              <span class="font-extrabold text-lg text-surface-900">${task.pts} <span class="text-xs font-medium text-surface-400">Poin</span></span>
            </div>
          </div>

          <!-- Dropbox container -->
          <div class="space-y-4">
            <h4 class="font-bold text-sm text-surface-900">Pengumpulan Berkas Mandiri</h4>
            ${uploadStatusHTML}
          </div>
        </div>
      `;
      tabContent.innerHTML = html;

      // Handle Mock drag drop zone clicking
      const dragDropZone = document.getElementById('drag-drop-zone');
      const submitTaskBtn = document.getElementById('submit-task-btn');
      const fileLabel = document.getElementById('selected-file-label');

      if (dragDropZone) {
        dragDropZone.addEventListener('click', () => {
          // Mocking selecting a file directly
          if (fileLabel) {
            fileLabel.classList.remove('hidden');
            dragDropZone.classList.add('border-emerald-300', 'bg-emerald-50/10');
            
            // Enable Submit Button
            if (submitTaskBtn) {
              const themeBtnColor = eduLevel === 'kuliah' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-amber-500 hover:bg-amber-600';
              submitTaskBtn.className = `w-full py-2.5 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer ${themeBtnColor}`;
              submitTaskBtn.removeAttribute('disabled');
            }
          }
        });
      }

      // Handle Task Submission
      if (submitTaskBtn) {
        submitTaskBtn.addEventListener('click', () => {
          const uploadPanel = document.getElementById('upload-panel');
          const progressPanel = document.getElementById('upload-progress-panel');
          const progressBar = document.getElementById('upload-progress-bar');
          const progressPct = document.getElementById('upload-progress-pct');

          if (uploadPanel && progressPanel) {
            uploadPanel.classList.add('hidden');
            progressPanel.classList.remove('hidden');

            let count = 0;
            const interval = setInterval(() => {
              count += 10;
              if (progressBar) progressBar.style.width = `${count}%`;
              if (progressPct) progressPct.textContent = `${count}%`;

              if (count >= 100) {
                clearInterval(interval);
                
                // Save task submission to localStorage
                localStorage.setItem(taskKey, 'true');
                
                // Re-render
                renderTabContent();
              }
            }, 150);
          }
        });
      }
    }

    // TAB 3: KUIS (SD Only)
    else if (activeTab === 'kuis') {
      const quizList = course.kuis || [];
      
      let quizHTML = `
        <div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-6">
          <div class="border-b border-surface-100 pb-4">
            <h3 class="font-extrabold text-sky-600 text-lg flex items-center gap-2">
              <i data-lucide="star" class="w-6 h-6 fill-sky-400 text-sky-500"></i>
              Teka-Teki Kuis Ceria
            </h3>
            <p class="text-xs text-surface-500 mt-1">Jawab pertanyaan teka-teki dengan benar dan kumpulkan bintang prestasimu!</p>
          </div>
          
          <div class="space-y-5">
      `;

      quizList.forEach((q, idx) => {
        quizHTML += `
          <div class="space-y-3 p-4 border border-surface-100 rounded-2xl bg-surface-50/20">
            <h4 class="font-bold text-sm text-surface-900">${idx + 1}. ${q.q}</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        `;

        q.a.forEach((ans, oIdx) => {
          quizHTML += `
            <label class="option-label flex items-center gap-3 p-3 bg-white hover:bg-sky-50/50 border border-surface-200 hover:border-sky-300 rounded-xl cursor-pointer transition-all text-xs font-semibold">
              <input type="radio" name="quiz-q-${q.id}" value="${oIdx}" class="accent-sky-500 w-4 h-4 cursor-pointer" />
              <span>${ans}</span>
            </label>
          `;
        });

        quizHTML += `</div></div>`;
      });

      quizHTML += `
          </div>
          
          <button
            id="submit-quiz-btn"
            class="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2"
          >
            <i data-lucide="sparkles" class="w-4.5 h-4.5"></i>
            Periksa Hasil Kuis Ceria!
          </button>
        </div>
      `;
      
      tabContent.innerHTML = quizHTML;

      // Handle Quiz Submission
      const submitQuizBtn = document.getElementById('submit-quiz-btn');
      if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', () => {
          let allCorrect = true;
          let unanswered = false;

          quizList.forEach(q => {
            const selected = document.querySelector(`input[name="quiz-q-${q.id}"]:checked`);
            if (!selected) {
              unanswered = true;
            } else {
              const ansVal = parseInt(selected.value);
              if (ansVal !== q.correct) {
                allCorrect = false;
              }
            }
          });

          if (unanswered) {
            alert("Oops! Jawab semua pertanyaan dulu ya! 😊");
            return;
          }

          if (allCorrect) {
            // Perfect score! CONFETTI BLAST!
            if (typeof confetti !== 'undefined') {
              confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
              });
            }

            // Award 10 stars
            localStorage.setItem(`kuis-stars-${course.id}`, 10);
            
            // Update widget
            if (sdStarWidget && sdStarsCountLabel) {
              sdStarsCountLabel.textContent = "10 Bintang ⭐";
            }

            alert("Wah Hebat Sekali! Kamu menjawab 100% Benar! Kamu dapat 10 Bintang Prestasi! 🌟🎉");
          } else {
            alert("Ada jawaban yang belum tepat. Yuk coba periksa lagi, kamu pasti bisa! 💪");
          }
        });
      }
    }

    // TAB 4: DISKUSI (Kuliah Only)
    else if (activeTab === 'diskusi') {
      const getForumMessages = () => {
        const key = `forum-course-${course.id}`;
        const raw = localStorage.getItem(key);
        if (raw) return JSON.parse(raw);

        // Save default academic forum messages
        const defaultMessages = [
          { name: course.teacher, role: 'Pengajar', text: 'Selamat siang rekan-rekan mahasiswa. Silakan unggah laporan pengerjaan dokumen SRS Bab 3 kelompok Anda pada tenggat dropbox yang telah diaktifkan hari ini. Pastikan berkas sesuai standar format IEEE.', time: '11:15 WIB' },
          { name: 'Nabila Putri', role: 'Mahasiswa', text: 'Selamat siang Pak. Izin bertanya, untuk pemodelan UML apakah harus dijabarkan secara rinci sampai ke sequence diagram atau cukup structural diagram saja?', time: '11:32 WIB' },
          { name: course.teacher, role: 'Pengajar', text: 'Sequence diagram wajib dijabarkan terperinci untuk usecase skenario utama yang memiliki kompleksitas tinggi. Untuk usecase pelengkap cukup class diagram saja.', time: '11:40 WIB' }
        ];
        localStorage.setItem(key, JSON.stringify(defaultMessages));
        return defaultMessages;
      };

      const messages = getForumMessages();

      let forumHTML = `
        <div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col min-h-[380px]">
          <h3 class="font-bold text-surface-900 text-base border-b border-surface-100 pb-3 flex items-center gap-2">
            <i data-lucide="message-square" class="w-5 h-5 text-indigo-500"></i> Forum Diskusi Perkuliahan
          </h3>

          <!-- Chat messages area -->
          <div id="forum-thread" class="flex-1 space-y-4 max-h-[250px] overflow-y-auto pr-1">
      `;

      messages.forEach(msg => {
        const isTeacher = msg.role === 'Pengajar';
        const roleBadge = isTeacher 
          ? 'bg-red-50 text-red-600 border-red-100'
          : 'bg-indigo-50 text-indigo-600 border-indigo-100';

        forumHTML += `
          <div class="p-3 bg-surface-50 rounded-xl space-y-1.5 border border-surface-100">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="font-bold text-xs text-surface-900">${msg.name}</span>
                <span class="inline-flex items-center text-[9px] font-bold border px-1.5 py-0.5 rounded-full ${roleBadge}">${msg.role}</span>
              </div>
              <span class="text-[10px] text-surface-400 font-semibold">${msg.time}</span>
            </div>
            <p class="text-xs text-surface-700 leading-relaxed">${msg.text}</p>
          </div>
        `;
      });

      forumHTML += `
          </div>

          <!-- Typing textbox -->
          <div class="border-t border-surface-100 pt-4 flex gap-2">
            <input
              type="text"
              id="forum-input"
              placeholder="Tulis tanggapan atau pertanyaan Anda..."
              class="w-full px-3 py-2 border border-surface-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl text-sm outline-none transition-all"
            />
            <button
              id="send-forum-btn"
              class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md active:scale-98 transition-colors cursor-pointer text-sm flex items-center justify-center gap-1.5"
            >
              <span>Kirim</span>
              <i data-lucide="send" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `;

      tabContent.innerHTML = forumHTML;

      // Handle chat sending
      const forumInput = document.getElementById('forum-input');
      const sendForumBtn = document.getElementById('send-forum-btn');

      const sendMsg = () => {
        if (!forumInput) return;
        const text = forumInput.value.trim();
        if (!text) return;

        const currentHour = String(new Date().getHours()).padStart(2, '0');
        const currentMin = String(new Date().getMinutes()).padStart(2, '0');
        const timeStr = `${currentHour}:${currentMin} WIB`;

        const newMsg = {
          name: username,
          role: 'Mahasiswa',
          text,
          time: timeStr
        };

        const list = getForumMessages();
        list.push(newMsg);
        localStorage.setItem(`forum-course-${course.id}`, JSON.stringify(list));

        forumInput.value = '';
        renderTabContent();
        
        // Scroll to bottom
        setTimeout(() => {
          const thread = document.getElementById('forum-thread');
          if (thread) thread.scrollTop = thread.scrollHeight;
        }, 50);
      };

      if (sendForumBtn) sendForumBtn.addEventListener('click', sendMsg);
      if (forumInput) {
        forumInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') sendMsg();
        });
      }
    }

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };

  // Initial tab loading
  renderHeaderProgress();
  renderTabsNav();
  renderTabContent();
})();
