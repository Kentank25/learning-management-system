import { sidebarTexts, scheduleData } from './db.js';
import { getState } from './store.js';
import { supabase } from './supabaseClient.js';

(async function() {
  const eduLevel = getState('edu-level', 'smk');
  const username = getState('username', 'Keane');

  // 1. Dynamic Profile Info
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

  // 2. Sidebar Navigation Text Mapping
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

  // Get active session
  const { data: { session } } = await supabase.auth.getSession();
  let uncompletedTasks = [];
  let courseProgresses = [];

  if (session) {
    try {
      // 1. Fetch active courses and modules for progress
      const { data: activeCoursesDb } = await supabase
        .from('courses')
        .select('*, course_modules(id)')
        .eq('edu_level', eduLevel)
        .eq('is_active', true);

      // Fetch user module progress
      const { data: userProgress } = await supabase
        .from('user_module_progress')
        .select('module_id')
        .eq('user_id', session.user.id)
        .eq('completed', true);

      const completedModuleIds = new Set(userProgress?.map(p => p.module_id) || []);

      courseProgresses = (activeCoursesDb || []).map(c => {
        const total = c.course_modules?.length || 0;
        const completed = c.course_modules?.filter(m => completedModuleIds.has(m.id)).length || 0;
        const val = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        let color = 'bg-amber-500';
        let text = 'text-amber-600';
        if (eduLevel === 'sd') {
          if (c.title.includes('Matematika')) { color = 'bg-sky-500'; text = 'text-sky-500'; }
          else if (c.title.includes('Bahasa')) { color = 'bg-emerald-500'; text = 'text-emerald-500'; }
          else { color = 'bg-purple-500'; text = 'text-purple-500'; }
        } else {
          // SMK / Kuliah
          if (c.title.includes('Basis Data') || c.title.includes('RPL')) { color = 'bg-indigo-500'; text = 'text-indigo-500'; }
          else if (c.title.includes('Front End') || c.title.includes('Web')) { color = 'bg-emerald-500'; text = 'text-emerald-500'; }
          else { color = 'bg-amber-500'; text = 'text-amber-600'; }
        }

        return { name: c.title, val: `${val}%`, color, text };
      });

      // 2. Fetch active courses with tasks for deadlines
      const { data: activeCoursesWithTasks } = await supabase
        .from('courses')
        .select('*, course_tasks(*)')
        .eq('edu_level', eduLevel)
        .eq('is_active', true);

      // Fetch user task submissions
      const { data: taskSubmissions } = await supabase
        .from('user_task_submissions')
        .select('task_id')
        .eq('user_id', session.user.id)
        .eq('completed', true);

      const submittedTaskIds = new Set(taskSubmissions?.map(s => s.task_id) || []);

      // Extract uncompleted tasks
      (activeCoursesWithTasks || []).forEach(c => {
        (c.course_tasks || []).forEach(t => {
          if (!submittedTaskIds.has(t.id)) {
            uncompletedTasks.push({
              title: t.title,
              subject: c.title,
              due: new Date(t.due_date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }) + ', 23:59 WIB',
              borderColor: 'border-orange-100 bg-orange-50/50 hover:bg-orange-50',
              textColor: 'text-orange-600'
            });
          }
        });
      });
    } catch (e) {
      console.error('Failed to load dashboard data from Supabase:', e);
    }
  }

  // 3. Welcome Banner Custom Wording & Badge
  const bannerTitle = document.getElementById('banner-title');
  const bannerDesc = document.getElementById('banner-desc');
  const bannerBadgeContainer = document.getElementById('banner-badge-container');
  const bannerContainer = document.getElementById('welcome-banner-container');

  const taskCountText = uncompletedTasks.length > 0 
    ? `memiliki <strong>${uncompletedTasks.length} tugas</strong>`
    : `<strong>tidak memiliki tugas tersisa</strong>`;

  if (eduLevel === 'sd') {
    if (bannerContainer) bannerContainer.className = 'bg-gradient-sd rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-sky-300 relative overflow-hidden hover-lift';
    if (bannerTitle) {
      bannerTitle.className = 'text-2xl sm:text-3xl font-extrabold tracking-tight mb-2';
      bannerTitle.innerHTML = `Halo kembali, ${username}! 🌟`;
    }
    if (bannerDesc) {
      bannerDesc.className = 'text-sky-50 max-w-xl text-sm sm:text-base leading-relaxed';
      bannerDesc.innerHTML = `Hari ini kamu ${taskCountText} yang harus diselesaikan. Yuk, selesaikan sekarang dan kumpulkan bintangmu!`;
    }
    if (bannerBadgeContainer) {
      bannerBadgeContainer.innerHTML = `<i data-lucide="award" class="w-12 h-12 text-sky-400 drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)]"></i>`;
    }
  } else if (eduLevel === 'kuliah') {
    if (bannerContainer) bannerContainer.className = 'bg-gradient-kuliah rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500 relative overflow-hidden hover-lift';
    if (bannerTitle) {
      bannerTitle.className = 'text-2xl sm:text-3xl font-extrabold tracking-tight mb-2';
      bannerTitle.innerHTML = `Selamat datang di Portal, ${username}. 🎓`;
    }
    if (bannerDesc) {
      bannerDesc.className = 'text-indigo-150 max-w-xl text-sm sm:text-base leading-relaxed';
      bannerDesc.innerHTML = `Anda ${taskCountText} kuliah dengan tenggat waktu hari ini. Silakan periksa kelengkapan berkas submisi Anda.`;
    }
    if (bannerBadgeContainer) {
      bannerBadgeContainer.innerHTML = `<i data-lucide="book-open" class="w-12 h-12 text-indigo-300 drop-shadow-[0_4px_10px_rgba(99,102,241,0.3)]"></i>`;
    }
  } else {
    // SMK
    if (bannerContainer) bannerContainer.className = 'bg-gradient-smk rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-amber-400 relative overflow-hidden hover-lift';
    if (bannerTitle) {
      bannerTitle.className = 'text-2xl sm:text-3xl font-extrabold tracking-tight mb-2';
      bannerTitle.innerHTML = `Selamat datang kembali, ${username}! 👋`;
    }
    if (bannerDesc) {
      bannerDesc.className = 'text-amber-50 max-w-xl text-sm sm:text-base leading-relaxed';
      bannerDesc.innerHTML = `Anda ${taskCountText} yang tenggat waktunya hari ini. Mari selesaikan proyek kreatif Anda dan pertahankan nilai luar biasa itu!`;
    }
    if (bannerBadgeContainer) {
      bannerBadgeContainer.innerHTML = `<i data-lucide="rocket" class="w-12 h-12 text-amber-300 drop-shadow-[0_4px_10px_rgba(245,158,11,0.3)]"></i>`;
    }
  }

  // 4. Today's Schedule Timeline Dynamic Rendering
  const scheduleTitle = document.getElementById('schedule-title');
  const scheduleDate = document.getElementById('schedule-date');
  const scheduleContainer = document.getElementById('schedule-container');

  const currentSchedule = scheduleData[eduLevel];
  if (scheduleTitle) scheduleTitle.innerHTML = `<i data-lucide="clock" class="w-5 h-5 text-accent-500"></i> ${currentSchedule.title}`;
  if (scheduleDate) {
    scheduleDate.textContent = currentSchedule.date;
    if (eduLevel === 'sd') {
      scheduleDate.className = 'text-xs font-medium bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full';
    } else if (eduLevel === 'kuliah') {
      scheduleDate.className = 'text-xs font-medium bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full';
    } else {
      scheduleDate.className = 'text-xs font-medium bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full';
    }
  }

  if (scheduleContainer) {
    scheduleContainer.innerHTML = '';
    currentSchedule.items.forEach((item, idx) => {
      const isLast = idx === currentSchedule.items.length - 1;
      const statusBadge = item.statusType === 'active' 
        ? `<span class="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-medium">Sedang Berlangsung</span>`
        : `<span class="bg-surface-100 text-surface-600 text-xs px-2 py-0.5 rounded font-medium">Akan Datang</span>`;
      
      const lineClass = isLast ? '' : '<div class="w-0.5 h-full bg-surface-200 absolute top-3"></div>';
      const itemBorderColor = eduLevel === 'sd' ? 'hover:border-sky-300' : (eduLevel === 'kuliah' ? 'hover:border-indigo-300' : 'hover:border-accent-300');
      const timeTextColor = eduLevel === 'sd' ? 'text-sky-600' : (eduLevel === 'kuliah' ? 'text-indigo-600' : 'text-accent-600');
      const dotBgColor = item.statusType === 'active' 
        ? (eduLevel === 'sd' ? 'bg-sky-500' : (eduLevel === 'kuliah' ? 'bg-indigo-500' : 'bg-accent-500'))
        : 'bg-surface-300';
      
      const actionButton = item.statusType === 'active'
        ? `<button class="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm mt-3 ${eduLevel === 'sd' ? 'bg-sky-400 hover:bg-sky-500 text-white' : (eduLevel === 'kuliah' ? 'bg-indigo-50 hover:bg-indigo-600 text-white' : 'bg-accent-400 hover:bg-accent-500 text-surface-900')} border-none cursor-pointer">Masuk Kelas</button>`
        : '';

      const timelineHTML = `
        <div class="flex gap-4 relative">
          <div class="flex flex-col items-center">
            <div class="w-3 h-3 rounded-full ${dotBgColor} z-10 ring-4 ring-white"></div>
            ${lineClass}
          </div>
          <div class="pb-4 w-full">
            <div class="bg-white rounded-xl p-4 border border-surface-200 hover:shadow-md transition-all hover-lift group cursor-pointer ${itemBorderColor} ${item.statusType !== 'active' ? 'opacity-70 hover:opacity-100' : ''}">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <span class="text-xs font-bold ${timeTextColor} mb-1 block">${item.time}</span>
                  <h3 class="font-bold text-surface-900 group-hover:text-accent-600 transition-colors">${item.title}</h3>
                </div>
                ${statusBadge}
              </div>
              <p class="text-sm text-surface-500 mb-1">${item.subtitle}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-xs text-surface-500 mt-2">
                  <i data-lucide="${item.icon === 'smile' ? 'smile' : (item.icon === 'book' ? 'book' : (item.icon === 'palette' ? 'palette' : (item.icon === 'cpu' ? 'cpu' : (item.icon === 'database' ? 'database' : 'code'))))}" class="w-3.5 h-3.5"></i>
                  ${item.location}
                </div>
                ${actionButton}
              </div>
            </div>
          </div>
        </div>
      `;
      scheduleContainer.insertAdjacentHTML('beforeend', timelineHTML);
    });
  }

  // 5. Dynamic Upcoming Deadlines Rendering
  const deadlinesTitle = document.getElementById('deadlines-title');
  const deadlinesContainer = document.getElementById('deadlines-container');

  const deadlineHeadlineText = eduLevel === 'sd' ? 'Tugas Belajar' : (eduLevel === 'kuliah' ? 'Tenggat Kuliah' : 'Tugas Mendatang');
  if (deadlinesTitle) deadlinesTitle.innerHTML = `<i data-lucide="alert-circle" class="w-5 h-5 text-orange-500"></i> ${deadlineHeadlineText}`;
  
  if (deadlinesContainer) {
    deadlinesContainer.innerHTML = '';
    if (uncompletedTasks.length === 0) {
      deadlinesContainer.innerHTML = `
        <div class="p-6 text-center text-surface-500 bg-white border border-surface-100 rounded-2xl flex flex-col items-center justify-center space-y-2">
          <i data-lucide="check-circle" class="w-8 h-8 text-emerald-500"></i>
          <p class="font-bold text-xs text-surface-800">Semua tugas telah diselesaikan!</p>
          <p class="text-[10px] text-surface-400">Pertahankan kerja kerasmu! 🎉</p>
        </div>
      `;
    } else {
      uncompletedTasks.forEach(task => {
        const taskHTML = `
          <div class="p-3 border rounded-xl transition-all hover-lift cursor-pointer bg-white ${task.borderColor}">
            <h4 class="font-semibold text-sm text-surface-900 mb-1">${task.title}</h4>
            <p class="text-xs text-surface-500 mb-2">${task.subject}</p>
            <div class="flex items-center justify-between text-xs font-medium">
              <span class="${task.textColor} flex items-center gap-1">
                <i data-lucide="clock" class="w-3 h-3"></i> ${task.due}
              </span>
              <span class="text-surface-450 font-semibold">Belum Dikumpul</span>
            </div>
          </div>
        `;
        deadlinesContainer.insertAdjacentHTML('beforeend', taskHTML);
      });
    }
  }

  // 6. Dynamic Progress Section OR Custom GPA Card (For College Level)
  const progressTitle = document.getElementById('progress-title');
  const progressContainer = document.getElementById('progress-container');

  if (eduLevel === 'kuliah') {
    if (progressTitle) progressTitle.innerHTML = `<i data-lucide="award" class="w-5 h-5 text-indigo-500"></i> Hasil Studi Akademik`;
    if (progressContainer) {
      progressContainer.innerHTML = `
        <div class="text-center py-4 space-y-4">
          <div class="inline-block relative p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
            <span class="text-[10px] uppercase tracking-wider text-indigo-500 font-bold block mb-1">IPK Semester Ini</span>
            <span class="text-4xl font-extrabold text-indigo-700 tracking-tight">3.85 <span class="text-sm font-medium text-indigo-400">/ 4.00</span></span>
          </div>
          
          <div class="space-y-3 text-left">
            <div class="flex justify-between items-center text-sm border-b border-surface-100 pb-2">
              <span class="text-surface-500">SKS Selesai</span>
              <span class="font-bold text-surface-900">18 / 22 SKS</span>
            </div>
            <div class="flex justify-between items-center text-sm border-b border-surface-100 pb-2">
              <span class="text-surface-500">Status Akademik</span>
              <span class="font-bold text-green-600 flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Aktif
              </span>
            </div>
          </div>
          
          <div class="text-left">
            <div class="flex justify-between text-xs text-surface-500 mb-1">
              <span>Beban Studi Terlewati</span>
              <span>81%</span>
            </div>
            <div class="w-full bg-surface-100 rounded-full h-2">
              <div class="bg-indigo-600 h-2 rounded-full" style="width: 81%"></div>
            </div>
          </div>
        </div>
      `;
    }
  } else {
    const progressHeadlineText = eduLevel === 'sd' ? 'Kemajuan Belajar' : 'Progress Belajar';
    if (progressTitle) progressTitle.innerHTML = `<i data-lucide="bar-chart-2" class="w-5 h-5 ${eduLevel === 'sd' ? 'text-sky-500' : 'text-accent-500'}"></i> ${progressHeadlineText}`;
    
    if (progressContainer) {
      progressContainer.innerHTML = '';
      courseProgresses.forEach(c => {
        const progHTML = `
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="font-medium text-surface-700">${c.name}</span>
              <span class="${c.text} font-bold">${c.val}</span>
            </div>
            <div class="w-full bg-surface-100 rounded-full h-2">
              <div class="${c.color} h-2 rounded-full" style="width: ${c.val}"></div>
            </div>
          </div>
        `;
        progressContainer.insertAdjacentHTML('beforeend', progHTML);
      });
    }
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
})();
