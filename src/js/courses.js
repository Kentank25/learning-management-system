import { sidebarTexts } from './db.js';
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

  // 2. Sidebar Navigation Text Mapping (Sync with dashboard.js)
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

  // 3. Page Header Dynamic Content
  const coursesPageTitle = document.getElementById('courses-page-title');
  const coursesPageDesc = document.getElementById('courses-page-desc');
  if (coursesPageTitle) coursesPageTitle.textContent = currentSidebar.pageTitle;
  if (coursesPageDesc) coursesPageDesc.textContent = currentSidebar.pageDesc;

  // 4. Fetch Supabase Data
  let currentCourses = [];
  let historyCoursesGrouped = [];

  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    try {
      // Fetch active courses
      const { data: activeCoursesDb } = await supabase
        .from('courses')
        .select('*, course_modules(id, title)')
        .eq('edu_level', eduLevel)
        .eq('is_active', true);

      // Fetch user module progress
      const { data: userProgress } = await supabase
        .from('user_module_progress')
        .select('module_id')
        .eq('user_id', session.user.id)
        .eq('completed', true);

      const completedModuleIds = new Set(userProgress?.map(p => p.module_id) || []);

      currentCourses = (activeCoursesDb || []).map(c => {
        const totalModules = c.course_modules?.length || 0;
        const completedCount = c.course_modules?.filter(m => completedModuleIds.has(m.id)).length || 0;
        const computedProgress = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
        
        return {
          id: c.id,
          title: c.title,
          teacher: c.teacher,
          progress: computedProgress,
          status: computedProgress === 100 ? 'completed' : 'ongoing',
          colorClass: c.color_class,
          icon: c.icon,
          tag: c.tag,
          description: c.description
        };
      });

      // Fetch historical courses
      const { data: historyCoursesDb } = await supabase
        .from('courses')
        .select('*, course_modules(id, title)')
        .eq('edu_level', eduLevel)
        .eq('is_active', false);

      // Group history by period & year
      (historyCoursesDb || []).forEach(c => {
        let periodGroup = historyCoursesGrouped.find(g => g.period === c.period && g.year === c.academic_year);
        if (!periodGroup) {
          periodGroup = {
            period: c.period,
            year: c.academic_year,
            courses: []
          };
          historyCoursesGrouped.push(periodGroup);
        }
        periodGroup.courses.push({
          id: c.id,
          title: c.title,
          teacher: c.teacher,
          finalScore: c.final_score,
          gradeLetter: c.grade_letter,
          colorClass: c.color_class,
          icon: c.icon,
          tag: c.tag,
          description: c.description,
          modules: c.course_modules || []
        });
      });
    } catch (e) {
      console.error('Failed to load courses from Supabase:', e);
    }
  }

  const gridContainer = document.getElementById('courses-grid');

  // Render function for cards
  const renderCards = (courses) => {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    if (courses.length === 0) {
      gridContainer.innerHTML = `
        <div class="col-span-full py-12 text-center text-surface-500">
          <i data-lucide="info" class="w-12 h-12 mx-auto mb-3 text-surface-300"></i>
          <p class="font-medium text-base">Tidak ada mata pelajaran yang cocok.</p>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    courses.forEach(course => {
      const courseProgress = course.progress;
      const isCompleted = courseProgress === 100;
      const accentTextColor = eduLevel === 'sd' ? 'text-sky-600' : (eduLevel === 'kuliah' ? 'text-indigo-600' : 'text-accent-600');
      
      const accentBtnClass = isCompleted 
        ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
        : (eduLevel === 'sd' ? 'bg-sky-400 hover:bg-sky-500 text-white border-transparent' : (eduLevel === 'kuliah' ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent' : 'bg-accent-400 hover:bg-accent-500 text-surface-900 border-transparent'));
      
      const btnText = isCompleted ? 'Tinjau Materi (Selesai)' : (courseProgress > 0 ? 'Lanjutkan Belajar' : 'Mulai Belajar');

      const cardHTML = `
        <div
          data-status="${course.status}"
          class="course-card bg-white border border-surface-200 rounded-2xl shadow-sm hover:shadow-md hover-lift transition-all group overflow-hidden flex flex-col"
        >
          <!-- Card Banner -->
          <div class="h-32 bg-gradient-to-br ${course.colorClass} relative p-4 flex items-end">
            <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="bg-white p-2 rounded-xl shadow-sm relative z-10 translate-y-6">
              <i data-lucide="${course.icon}" class="w-8 h-8 ${eduLevel === 'sd' ? 'text-sky-500' : (eduLevel === 'kuliah' ? 'text-indigo-600' : 'text-accent-600')}"></i>
            </div>
            <span class="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">${course.tag}</span>
          </div>

          <!-- Card Content -->
          <div class="p-5 pt-8 flex-1 flex flex-col">
            <div class="flex-1">
              <h3 class="font-bold text-surface-900 text-lg mb-1 group-hover:${accentTextColor} transition-colors line-clamp-2">${course.title}</h3>
              <p class="text-sm text-surface-500 flex items-center gap-1.5 mb-4">
                <i data-lucide="user" class="w-3.5 h-3.5"></i> ${course.teacher}
              </p>
            </div>

            <!-- Progress Section -->
            <div class="mt-auto">
              <div class="flex justify-between text-xs font-medium mb-1.5">
                <span class="text-surface-600">Progres Belajar</span>
                <span class="${eduLevel === 'sd' ? 'text-sky-500' : (eduLevel === 'kuliah' ? 'text-indigo-600' : 'text-accent-600')} font-bold">${courseProgress}%</span>
              </div>
              <div class="w-full bg-surface-100 rounded-full h-1.5 mb-4">
                <div class="${eduLevel === 'sd' ? 'bg-sky-500' : (eduLevel === 'kuliah' ? 'bg-indigo-600' : 'bg-accent-500')} h-1.5 rounded-full" style="width: ${courseProgress}%"></div>
              </div>

              <a
                href="course-detail.html?id=${course.id}"
                class="block w-full py-2 text-center text-sm font-semibold border rounded-lg transition-all shadow-sm ${accentBtnClass}"
              >
                ${btnText}
              </a>
            </div>
          </div>
        </div>
      `;
      gridContainer.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Re-create icons for dynamic elements
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };

  // Initial render of active courses
  renderCards(currentCourses);

  // ─── History Section ───────────────────────────────────────
  const renderHistorySection = () => {
    const historyContainer = document.getElementById('history-section');
    if (!historyContainer) return;

    const periodsForLevel = historyCoursesGrouped;
    if (periodsForLevel.length === 0) {
      historyContainer.classList.add('hidden');
      return;
    }

    historyContainer.classList.remove('hidden');

    // Grade letter color helper
    const gradeColor = (letter) => {
      if (letter === 'A') return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      if (letter === 'B') return 'text-blue-600 bg-blue-50 border-blue-200';
      if (letter === 'C') return 'text-amber-600 bg-amber-50 border-amber-200';
      return 'text-red-600 bg-red-50 border-red-200';
    };

    const accentColor = eduLevel === 'sd' ? 'text-sky-600' : (eduLevel === 'kuliah' ? 'text-indigo-600' : 'text-accent-600');
    const accentBorder = eduLevel === 'sd' ? 'border-sky-200' : (eduLevel === 'kuliah' ? 'border-indigo-200' : 'border-accent-200');
    const historyLabel = eduLevel === 'kuliah' ? 'Riwayat Semester Sebelumnya' : 'Riwayat Kelas Sebelumnya';

    // Section header
    let html = `
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-xl bg-surface-100">
            <i data-lucide="history" class="w-5 h-5 text-surface-500"></i>
          </div>
          <div>
            <h2 class="text-xl font-bold text-surface-800 font-display">${historyLabel}</h2>
            <p class="text-xs text-surface-500 mt-0.5">${periodsForLevel.length} periode tercatat dalam arsip akademik</p>
          </div>
        </div>
        <div class="flex-1 h-px bg-surface-200"></div>
      </div>
    `;

    // One accordion per period
    periodsForLevel.forEach((periodData, periodIdx) => {
      const accordionId = `history-accordion-${periodIdx}`;
      const bodyId = `history-body-${periodIdx}`;
      // First accordion starts open
      const isOpen = periodIdx === 0;

      // Count courses and compute avg score
      const avgScore = Math.round(periodData.courses.reduce((sum, c) => sum + (c.finalScore || 0), 0) / periodData.courses.length);

      html += `
        <div id="${accordionId}" class="glass-panel border border-surface-200/60 rounded-2xl overflow-hidden shadow-sm">
          <!-- Accordion Header -->
          <button
            onclick="(function(){
              const body = document.getElementById('${bodyId}');
              const btn = document.getElementById('${accordionId}-chevron');
              const isHidden = body.classList.contains('hidden');
              body.classList.toggle('hidden');
              btn.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
            })()"
            class="w-full flex items-center justify-between px-5 py-4 hover:bg-surface-50/80 transition-colors text-left cursor-pointer"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-xl bg-surface-100">
                <i data-lucide="calendar-check-2" class="w-4 h-4 text-surface-500"></i>
              </div>
              <div>
                <span class="font-bold text-surface-900 font-display">${periodData.period}</span>
                <span class="ml-2 text-xs text-surface-500">${periodData.year}</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-surface-500 font-medium hidden sm:inline">${periodData.courses.length} mata pelajaran</span>
              <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-surface-100 text-surface-600">Rata-rata: ${avgScore}</span>
              <i
                id="${accordionId}-chevron"
                data-lucide="chevron-down"
                class="w-4 h-4 text-surface-400 transition-transform duration-300"
                style="transform: rotate(${isOpen ? '180deg' : '0deg'})"
              ></i>
            </div>
          </button>

          <!-- Accordion Body -->
          <div id="${bodyId}" class="${isOpen ? '' : 'hidden'} border-t border-surface-100">
            <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
`;

      // Cards for each course in this period
      periodData.courses.forEach(course => {
        const gradeClass = gradeColor(course.gradeLetter);
        html += `
          <div class="bg-white/70 border border-surface-200/80 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-all group hover-lift">
            <!-- Muted Archive Banner -->
            <div class="h-24 bg-gradient-to-br ${course.colorClass} relative opacity-75 flex items-end p-3">
              <div class="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm relative z-10 translate-y-4">
                <i data-lucide="${course.icon}" class="w-6 h-6 text-surface-600"></i>
              </div>
              <div class="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                <i data-lucide="check-circle" class="w-2.5 h-2.5"></i>
                Lulus
              </div>
              <span class="absolute bottom-2 left-2 bg-black/20 backdrop-blur-sm text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">${course.tag}</span>
            </div>

            <!-- Card Content -->
            <div class="p-3.5 pt-6 flex-1 flex flex-col">
              <h4 class="font-bold text-surface-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:${accentColor} transition-colors">${course.title}</h4>
              <p class="text-xs text-surface-500 flex items-center gap-1 mb-3">
                <i data-lucide="user" class="w-3 h-3"></i> ${course.teacher}
              </p>

              <!-- Score row -->
              <div class="mt-auto flex items-center justify-between gap-2">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs text-surface-500">Nilai:</span>
                  <span class="text-sm font-extrabold text-surface-800">${course.finalScore}</span>
                </div>
                <span class="text-xs font-bold px-2 py-0.5 rounded-full border ${gradeClass}">${course.gradeLetter}</span>
              </div>

              <!-- Link button -->
              <a
                href="course-detail.html?id=${course.id}&archive=1"
                class="mt-3 block w-full py-1.5 text-center text-xs font-semibold rounded-lg border ${accentBorder} ${accentColor} hover:bg-surface-50 transition-colors"
              >
                Lihat Ringkasan
              </a>
            </div>
          </div>
`;
      });

      html += `
            </div>
          </div>
        </div>
`;
    });

    historyContainer.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  renderHistorySection();

  // 5. Course Filtering Logic (Status Tab)
  const filterBtns = document.querySelectorAll('.filter-btn');
  let activeFilter = 'all';

  const applyFiltersAndSearch = () => {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    const filtered = currentCourses.filter(course => {
      const matchStatus = activeFilter === 'all' || course.status === activeFilter;
      const matchQuery = course.title.toLowerCase().includes(query) || course.teacher.toLowerCase().includes(query);
      return matchStatus && matchQuery;
    });

    renderCards(filtered);
  };

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Reset active style from all filter buttons
        filterBtns.forEach(b => {
          b.classList.remove(
            'bg-accent-100', 'text-accent-700',
            'bg-sky-100', 'text-sky-700',
            'bg-indigo-100', 'text-indigo-700'
          );
          b.classList.add('text-surface-600', 'hover:bg-surface-50');
        });

        // Set active style to clicked button based on level
        btn.classList.remove('text-surface-600', 'hover:bg-surface-50');
        if (eduLevel === 'sd') {
          btn.classList.add('bg-sky-100', 'text-sky-700');
        } else if (eduLevel === 'kuliah') {
          btn.classList.add('bg-indigo-100', 'text-indigo-700');
        } else {
          btn.classList.add('bg-accent-100', 'text-accent-700');
        }

        // Scale micro-animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => btn.style.transform = 'scale(1)', 150);

        // Update active filter and apply
        activeFilter = btn.getAttribute('data-filter');
        applyFiltersAndSearch();
      });
    });
  }

  // 6. Active Search Logic
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      applyFiltersAndSearch();
    });
  }
})();
