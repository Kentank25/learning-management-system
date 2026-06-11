import { sidebarTexts, coursesData } from './db.js';

(function() {
  const eduLevel = localStorage.getItem('edu-level') || 'smk';
  const username = localStorage.getItem('username') || 'Keane';

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

  // 4. Dynamic Courses List Data
  const currentCourses = coursesData[eduLevel] || [];
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
      const isCompleted = course.progress === 100;
      const accentTextColor = eduLevel === 'sd' ? 'text-sky-600' : (eduLevel === 'kuliah' ? 'text-indigo-600' : 'text-accent-600');
      
      const accentBtnClass = isCompleted 
        ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
        : (eduLevel === 'sd' ? 'bg-sky-400 hover:bg-sky-500 text-white border-transparent' : (eduLevel === 'kuliah' ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent' : 'bg-accent-400 hover:bg-accent-500 text-surface-900 border-transparent'));
      
      const btnText = isCompleted ? 'Tinjau Materi (Selesai)' : (course.progress > 0 ? 'Lanjutkan Belajar' : 'Mulai Belajar');

      const cardHTML = `
        <div
          data-status="${course.status}"
          class="course-card bg-white border border-surface-200 rounded-2xl shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col"
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
                <span class="${eduLevel === 'sd' ? 'text-sky-500' : (eduLevel === 'kuliah' ? 'text-indigo-600' : 'text-accent-600')} font-bold">${course.progress}%</span>
              </div>
              <div class="w-full bg-surface-100 rounded-full h-1.5 mb-4">
                <div class="${eduLevel === 'sd' ? 'bg-sky-500' : (eduLevel === 'kuliah' ? 'bg-indigo-600' : 'bg-accent-500')} h-1.5 rounded-full" style="width: ${course.progress}%"></div>
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

  // Initial render of all courses
  renderCards(currentCourses);

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
