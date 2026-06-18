import { sidebarTexts, historyCoursesData } from './db.js';
import { getState, setState } from './store.js';
import { supabase } from './supabaseClient.js';

(async function() {
  const eduLevel = getState('edu-level', 'smk');
  const username = getState('username', 'Keane');

  // 1. Parse URL ID & detect archive mode
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = parseInt(urlParams.get('id')) || 1;
  const isArchiveMode = urlParams.get('archive') === '1';

  // Get active session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = 'login.html';
    return;
  }
  const userId = session.user.id;

  // 2. Fetch Course Data (active or archive) from Supabase
  let course = null;
  let archivePeriodInfo = null;
  let completedModuleIds = new Set();
  let quizAttemptsList = [];
  let taskSubmissionsList = [];
  let forumMessages = [];

  try {
    if (isArchiveMode) {
      // Fetch archived course
      const { data: c } = await supabase
        .from('courses')
        .select('*, course_modules(*)')
        .eq('id', courseId)
        .eq('is_active', false)
        .single();
      
      if (c) {
        course = {
          ...c,
          modules: (c.course_modules || []).sort((a, b) => a.sequence_number - b.sequence_number)
        };
        archivePeriodInfo = { period: c.period, year: c.academic_year };
      } else {
        // Fallback to static historyCoursesData from db.js if not found in Supabase
        const levels = ['sd', 'smk', 'kuliah'];
        let foundCourse = null;
        let foundPeriod = null;
        for (const lvl of levels) {
          const periods = historyCoursesData[lvl] || [];
          for (const p of periods) {
            const match = p.courses.find(item => item.id === courseId);
            if (match) {
              foundCourse = match;
              foundPeriod = p;
              break;
            }
          }
          if (foundCourse) break;
        }

        if (foundCourse) {
          course = {
            id: foundCourse.id,
            title: foundCourse.title,
            teacher: foundCourse.teacher,
            final_score: foundCourse.finalScore,
            grade_letter: foundCourse.gradeLetter,
            color_class: foundCourse.colorClass,
            icon: foundCourse.icon,
            tag: foundCourse.tag,
            description: foundCourse.description,
            modules: (foundCourse.modules || []).map((m, idx) => ({
              id: 9000 + idx, // dummy ID
              title: m.title,
              completed: m.completed
            }))
          };
          archivePeriodInfo = { period: foundPeriod.period, year: foundPeriod.year };
        }
      }
    } else {
      // Fetch active course
      const { data: c } = await supabase
        .from('courses')
        .select(`
          *,
          course_modules(*),
          course_quizzes(*),
          course_tasks(*)
        `)
        .eq('id', courseId)
        .eq('is_active', true)
        .single();
      
      if (c) {
        course = {
          ...c,
          modules: (c.course_modules || []).sort((a, b) => a.sequence_number - b.sequence_number),
          kuis: c.course_quizzes || [],
          tasks: c.course_tasks || []
        };

        // Fetch user module progress
        const { data: userProgress } = await supabase
          .from('user_module_progress')
          .select('module_id')
          .eq('user_id', userId)
          .eq('completed', true);
        if (userProgress) {
          completedModuleIds = new Set(userProgress.map(p => p.module_id));
        }

        // Map completed state locally
        course.modules.forEach(m => {
          m.completed = completedModuleIds.has(m.id);
        });

        // Fetch quiz attempts
        const { data: attempts } = await supabase
          .from('user_quiz_attempts')
          .select('*')
          .eq('user_id', userId);
        if (attempts) {
          quizAttemptsList = attempts;
        }

        // Fetch task submissions
        const { data: subs } = await supabase
          .from('user_task_submissions')
          .select('*')
          .eq('user_id', userId);
        if (subs) {
          taskSubmissionsList = subs;
        }

        // Fetch forum messages
        const { data: msgs } = await supabase
          .from('forum_messages')
          .select('*')
          .eq('course_id', course.id)
          .order('created_at', { ascending: true });
        
        if (msgs) {
          forumMessages = msgs.map(msg => ({
            name: msg.sender_name,
            role: msg.sender_role,
            text: msg.message_text,
            time: new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
          }));
        }
      }
    }
  } catch (e) {
    console.error('Error fetching course detail from Supabase:', e);
  }

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

  // ───── ARCHIVE MODE ─────────────────────────────────
  if (isArchiveMode && archivePeriodInfo) {
    const gradeColorMap = {
      A: { badge: 'bg-emerald-100 text-emerald-700 border-emerald-300', bar: 'bg-emerald-500' },
      B: { badge: 'bg-blue-100 text-blue-700 border-blue-300', bar: 'bg-blue-500' },
      C: { badge: 'bg-amber-100 text-amber-700 border-amber-300', bar: 'bg-amber-500' },
      D: { badge: 'bg-red-100 text-red-700 border-red-300', bar: 'bg-red-400' },
    };
    const grade = gradeColorMap[course.gradeLetter] || gradeColorMap.D;
    const accentColorBanner = eduLevel === 'sd' ? 'bg-gradient-sd' : (eduLevel === 'kuliah' ? 'bg-gradient-kuliah' : 'bg-gradient-smk');
    const accentBorderBanner = eduLevel === 'sd' ? 'border-sky-300' : (eduLevel === 'kuliah' ? 'border-indigo-500' : 'border-amber-400');
    const breadcrumbParent = document.getElementById('breadcrumb-parent');
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    if (breadcrumbParent) breadcrumbParent.textContent = `${archivePeriodInfo.period}`;
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = course.title;

    // Adapt banner styling
    const courseBanner = document.getElementById('course-banner');
    if (courseBanner) {
      courseBanner.className = `${accentColorBanner} rounded-3xl p-6 sm:p-8 text-white shadow-xl ${accentBorderBanner} border relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px] opacity-90`;
      const archiveStrip = document.createElement('div');
      archiveStrip.className = 'absolute top-0 inset-x-0 bg-amber-500/80 backdrop-blur-sm text-white text-xs font-bold flex items-center justify-center gap-2 py-1.5';
      archiveStrip.innerHTML = `<i data-lucide="archive" class="w-3.5 h-3.5"></i> Arsip Akademik &mdash; ${archivePeriodInfo.period} &bull; ${archivePeriodInfo.year}`;
      courseBanner.insertAdjacentElement('afterbegin', archiveStrip);
    }

    const courseBadgeEl = document.getElementById('course-badge');
    const courseTitleEl = document.getElementById('course-title');
    const courseTeacherEl = document.getElementById('course-teacher');
    const courseDescEl = document.getElementById('course-desc');
    if (courseBadgeEl) courseBadgeEl.textContent = course.tag;
    if (courseTitleEl) courseTitleEl.textContent = course.title;
    if (courseTeacherEl) courseTeacherEl.innerHTML = `<i data-lucide="user" class="w-4 h-4"></i> Pengajar: ${course.teacher}`;
    if (courseDescEl) courseDescEl.textContent = course.description;

    const tabsNavEl = document.getElementById('tabs-navigation');
    const tabContentEl = document.getElementById('tab-content');

    if (tabsNavEl) {
      tabsNavEl.closest('.glass-panel').outerHTML = '';
    }

    if (tabContentEl) {
      const modulesHtml = course.modules.map(m => `
        <div class="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
          <span class="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
            <i data-lucide="check" class="w-3 h-3 text-white"></i>
          </span>
          <span class="text-sm text-surface-800 font-medium">${m.title}</span>
        </div>
      `).join('');

      tabContentEl.innerHTML = `
        <div class="glass-panel rounded-2xl p-5 shadow-sm space-y-3">
          <h3 class="font-bold text-surface-900 text-base font-display flex items-center gap-2">
            <i data-lucide="list-checks" class="w-5 h-5 text-emerald-600"></i>
            Daftar Modul (${course.modules.length} modul)
          </h3>
          <div class="space-y-2">
            ${modulesHtml}
          </div>
        </div>
      `;
    }

    const infoStatus = document.getElementById('info-status');
    const infoModulesCount = document.getElementById('info-modules-count');
    const infoProgressPct = document.getElementById('info-progress-pct');
    const infoProgressBar = document.getElementById('info-progress-bar');
    const infoWeight = document.getElementById('info-weight');

    if (infoStatus) {
      infoStatus.className = `border ${grade.badge} font-bold text-xs px-2.5 py-0.5 rounded-full`;
      infoStatus.textContent = `Nilai Akhir: ${course.finalScore} (${course.gradeLetter})`;
    }
    if (infoModulesCount) infoModulesCount.textContent = `${course.modules.length} / ${course.modules.length} Modul`;
    if (infoProgressPct) infoProgressPct.textContent = `100%`;
    if (infoProgressBar) {
      infoProgressBar.className = `${grade.bar} h-2 rounded-full`;
      infoProgressBar.style.width = '100%';
    }
    if (infoWeight) {
      infoWeight.innerHTML = `<span class="text-surface-500 flex items-center gap-2"><i data-lucide="award" class="w-4.5 h-4.5 text-amber-500"></i>Arsip Periode</span> <span class="font-bold text-surface-900">${archivePeriodInfo.period}</span>`;
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  // ───── ACTIVE MODE ──────────────────────────────────
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

  // Load saved stars
  const quizAttempt = quizAttemptsList.find(a => a.course_id === course.id);
  const savedStars = quizAttempt ? quizAttempt.stars_earned : 0;

  // Apply colors and layout configs based on level
  if (eduLevel === 'sd') {
    if (courseBanner) courseBanner.className = 'bg-gradient-sd rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-sky-300 relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px] hover-lift';
    if (courseBadge) courseBadge.textContent = 'Sekolah Dasar (SD)';
    if (infoWeight) infoWeight.className = 'hidden';
    if (sdStarWidget) {
      sdStarWidget.classList.remove('hidden');
      if (sdStarsCountLabel) sdStarsCountLabel.textContent = `${savedStars} Bintang ⭐`;
    }
    if (infoStatus) {
      infoStatus.className = 'font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full text-xs';
      infoStatus.textContent = 'Sedang Belajar';
    }
    if (infoProgressBar) infoProgressBar.className = 'bg-sky-400 h-2 rounded-full';
    if (infoProgressPct) infoProgressPct.className = 'text-sky-500 font-bold';
    if (capIcon) {
      capIcon.classList.remove('text-accent-600');
      capIcon.classList.add('text-sky-500');
    }
  } else if (eduLevel === 'kuliah') {
    if (courseBanner) courseBanner.className = 'bg-gradient-kuliah rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500 relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px] hover-lift';
    if (courseBadge) courseBadge.textContent = course.tag;
    if (infoWeight) {
      infoWeight.innerHTML = `<span class="text-surface-500 flex items-center gap-2"><i data-lucide="award" class="w-4.5 h-4.5 text-indigo-500"></i>Beban Kuliah</span> <span class="font-bold text-surface-900">${course.tag}</span>`;
    }
    if (kuliahAcademicWidget) kuliahAcademicWidget.classList.remove('hidden');
    if (infoStatus) {
      infoStatus.className = 'font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full text-xs';
      infoStatus.textContent = 'Aktif';
    }
    if (infoProgressBar) infoProgressBar.className = 'bg-indigo-600 h-2 rounded-full';
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
      infoWeight.innerHTML = `<span class="text-surface-500 flex items-center gap-2"><i data-lucide="award" class="w-4.5 h-4.5 text-amber-500"></i>Kelas</span> <span class="font-bold text-surface-900">${course.tag}</span>`;
    }
    if (infoStatus) {
      infoStatus.className = 'font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full text-xs';
      infoStatus.textContent = 'Belajar Aktif';
    }
    if (infoProgressBar) infoProgressBar.className = 'bg-amber-500 h-2 rounded-full';
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
    const completedCount = course.modules.filter(m => m.completed).length;
    const computedPct = course.modules.length > 0 ? Math.round((completedCount / course.modules.length) * 100) : 0;

    if (infoModulesCount) infoModulesCount.textContent = `${completedCount} / ${course.modules.length} Modul`;
    if (infoProgressPct) infoProgressPct.textContent = `${computedPct}%`;
    if (infoProgressBar) infoProgressBar.style.width = `${computedPct}%`;

    if (infoStatus) {
      if (computedPct === 100) {
        infoStatus.className = 'font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs';
        infoStatus.textContent = eduLevel === 'sd' ? 'Selesai 🏆' : (eduLevel === 'kuliah' ? 'Lulus' : 'Lulus Kompetensi');
      } else {
        if (eduLevel === 'sd') {
          infoStatus.className = 'font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full text-xs';
          infoStatus.textContent = 'Sedang Belajar';
        } else if (eduLevel === 'kuliah') {
          infoStatus.className = 'font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full text-xs';
          infoStatus.textContent = 'Aktif';
        } else {
          infoStatus.className = 'font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full text-xs';
          infoStatus.textContent = 'Belajar Aktif';
        }
      }
    }

    // Bridge state so other pages know
    setState(`progress-course-${course.id}`, computedPct);
  };

  const saveModulesState = async (moduleId, isCompleted) => {
    // Upsert module completion to Supabase
    try {
      await supabase
        .from('user_module_progress')
        .upsert({
          user_id: userId,
          module_id: moduleId,
          completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null
        }, { onConflict: 'user_id,module_id' });
    } catch (e) {
      console.error('Failed to update module completion:', e);
    }
    
    // Update local variable
    const mod = course.modules.find(m => m.id === moduleId);
    if (mod) mod.completed = isCompleted;

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

    const configs = tabConfigs[eduLevel] || [];
    configs.forEach(tab => {
      const isSelected = tab.id === activeTab;
      let activeClass = '';
      
      if (isSelected) {
        activeClass = eduLevel === 'sd' ? 'bg-sky-500 text-white shadow-sm border-transparent' : (eduLevel === 'kuliah' ? 'bg-indigo-600 text-white shadow-sm border-transparent' : 'bg-accent-500 text-surface-900 shadow-sm border-transparent');
      } else {
        activeClass = 'bg-white hover:bg-surface-50 text-surface-600 border-surface-200';
      }

      const btn = document.createElement('button');
      btn.className = `px-4 py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer ${activeClass}`;
      btn.textContent = tab.label;
      btn.addEventListener('click', () => {
        activeTab = tab.id;
        renderTabsNav();
        renderTabContent();
      });
      tabsNav.appendChild(btn);
    });
  };

  // Setup Forum Realtime Subscription
  if (eduLevel === 'kuliah') {
    supabase
      .channel(`forum-course-${course.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'forum_messages',
        filter: `course_id=eq.${course.id}`
      }, (payload) => {
        const msg = payload.new;
        const timeStr = new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
        
        // Push message if not present
        forumMessages.push({
          name: msg.sender_name,
          role: msg.sender_role,
          text: msg.message_text,
          time: timeStr
        });

        if (activeTab === 'diskusi') {
          renderForumThread();
        }
      })
      .subscribe();
  }

  const renderForumThread = () => {
    const thread = document.getElementById('forum-thread');
    if (!thread) return;

    thread.innerHTML = forumMessages.map(msg => {
      const isTeacher = msg.role === 'Pengajar';
      const roleBadge = isTeacher 
        ? 'bg-red-50 text-red-600 border-red-100'
        : 'bg-indigo-50 text-indigo-600 border-indigo-100';

      return `
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
    }).join('');

    thread.scrollTop = thread.scrollHeight;
  };

  const renderTabContent = () => {
    if (!tabContent) return;
    tabContent.innerHTML = '';

    const listColor = eduLevel === 'sd' ? 'text-sky-600' : (eduLevel === 'kuliah' ? 'text-indigo-600' : 'text-accent-600');
    const checkedColor = eduLevel === 'sd' ? 'text-sky-500 hover:text-sky-600' : (eduLevel === 'kuliah' ? 'text-indigo-600 hover:text-indigo-700' : 'text-emerald-500 hover:text-emerald-600');

    // TAB 1: MODUL/SILABUS
    if (activeTab === 'modul') {
      let html = `<div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 class="font-bold text-surface-900 text-base flex items-center justify-between">
          <span>Daftar Materi Pembelajaran</span>
          <span class="text-xs font-medium text-surface-400">Klik ikon centang untuk menyelesaikan</span>
        </h3>
        <div class="space-y-2.5">`;

      course.modules.forEach((m, idx) => {
        const checkIcon = m.completed ? 'check-circle-2' : 'circle';
        const checkClass = m.completed ? checkedColor : 'text-surface-300 hover:text-surface-500';
        
        html += `
          <div class="flex items-center justify-between p-3.5 border border-surface-100 rounded-xl hover:bg-surface-50/50 hover:border-surface-200 hover-lift transition-all group">
            <div class="flex items-center gap-3">
              <span class="w-7 h-7 bg-surface-100 text-surface-600 flex items-center justify-center font-bold text-xs rounded-lg">${idx + 1}</span>
              <div>
                <h4 class="font-bold text-sm text-surface-900 group-hover:${listColor} transition-colors line-clamp-1">${m.title}</h4>
                <p class="text-xs text-surface-400 mt-0.5 flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${m.duration || '15 menit'}</p>
              </div>
            </div>
            <button data-mod-id="${m.id}" class="toggle-module-btn p-1 ${checkClass} rounded-lg transition-colors cursor-pointer border-none bg-transparent">
              <i data-lucide="${checkIcon}" class="w-5 h-5"></i>
            </button>
          </div>
        `;
      });

      html += `</div></div>`;
      tabContent.innerHTML = html;

      // Add click listeners to checkbox buttons
      document.querySelectorAll('.toggle-module-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const modId = parseInt(btn.getAttribute('data-mod-id'));
          const mod = course.modules.find(m => m.id === modId);
          if (mod) {
            const isCompleted = !mod.completed;
            await saveModulesState(modId, isCompleted);
            renderTabContent();
          }
        });
      });
    }

    // TAB 2: TUGAS/DROPBOX (SMK & Kuliah)
    else if (activeTab === 'tugas') {
      const task = course.tasks && course.tasks[0] ? course.tasks[0] : {
        id: 99,
        title: 'Tugas Proyek Mandiri Kelas',
        due_date: new Date(Date.now() + 86400000).toISOString(),
        max_points: 100
      };

      const formattedDueDate = new Date(task.due_date).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) + ', 23:59 WIB';

      const isSubmitted = taskSubmissionsList.some(s => s.task_id === task.id && s.completed);
      const fileInputId = `file-uploader-${course.id}`;
      
      let uploadStatusHTML = '';
      if (isSubmitted) {
        uploadStatusHTML = `
          <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-800 text-sm font-medium">
            <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600"></i>
            <div>
              <p class="font-bold text-emerald-950">Berkas Tugas Sudah Dikumpulkan!</p>
              <p class="text-xs text-emerald-700 mt-0.5">Status: Terkirim</p>
            </div>
          </div>
        `;
      } else {
        const themeBtnColor = eduLevel === 'kuliah' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-amber-500 hover:bg-amber-600';
        uploadStatusHTML = `
          <div id="upload-panel" class="space-y-4">
            <!-- Drag Area -->
            <div id="drag-drop-zone" class="border-2 border-dashed border-surface-200 hover:border-accent-400 hover:bg-surface-50 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2">
              <i data-lucide="upload-cloud" class="w-10 h-10 text-surface-400"></i>
              <span class="text-sm font-semibold text-surface-800">Pilih Berkas Tugas Anda</span>
              <span class="text-xs text-surface-400 mt-0.5">PDF, ZIP, atau RAR (Maks. 20MB)</span>
              <input type="file" id="${fileInputId}" class="hidden" />
              <div id="selected-file-label" class="hidden text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg font-medium">
                Nama File: skema-toko-online.zip
              </div>
            </div>

            <!-- submit btn -->
            <button
              id="submit-task-btn"
              disabled
              class="w-full py-2.5 bg-surface-200 text-surface-400 cursor-not-allowed font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 border-none"
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
              <p class="text-xs text-surface-500 mt-1 flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> Batas Pengumpulan: <strong>${formattedDueDate}</strong></p>
            </div>
            <div class="text-right">
              <span class="text-xs text-surface-500 block">Bobot Nilai</span>
              <span class="font-extrabold text-lg text-surface-900">${task.max_points || 100} <span class="text-xs font-medium text-surface-400">Poin</span></span>
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

      const dragDropZone = document.getElementById('drag-drop-zone');
      const submitTaskBtn = document.getElementById('submit-task-btn');
      const fileLabel = document.getElementById('selected-file-label');

      if (dragDropZone) {
        dragDropZone.addEventListener('click', () => {
          if (fileLabel) {
            fileLabel.classList.remove('hidden');
            dragDropZone.classList.add('border-emerald-300', 'bg-emerald-50/10');
            
            if (submitTaskBtn) {
              const themeBtnColor = eduLevel === 'kuliah' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-amber-500 hover:bg-amber-600';
              submitTaskBtn.className = `w-full py-2.5 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer border-none ${themeBtnColor}`;
              submitTaskBtn.removeAttribute('disabled');
            }
          }
        });
      }

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
            const interval = setInterval(async () => {
              count += 10;
              if (progressBar) progressBar.style.width = `${count}%`;
              if (progressPct) progressPct.textContent = `${count}%`;

              if (count >= 100) {
                clearInterval(interval);
                
                try {
                  // Upsert to Supabase
                  await supabase
                    .from('user_task_submissions')
                    .upsert({
                      user_id: userId,
                      task_id: task.id,
                      completed: true,
                      submitted_at: new Date().toISOString()
                    }, { onConflict: 'user_id,task_id' });

                  // Update local list
                  taskSubmissionsList.push({ task_id: task.id, completed: true });
                } catch (e) {
                  console.error('Failed to submit task to Supabase:', e);
                }
                
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
            <h4 class="font-bold text-sm text-surface-900">${idx + 1}. ${q.question}</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        `;

        q.options.forEach((ans, oIdx) => {
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
            class="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2 border-none"
          >
            <i data-lucide="sparkles" class="w-4.5 h-4.5"></i>
            Periksa Hasil Kuis Ceria!
          </button>
        </div>
      `;
      
      tabContent.innerHTML = quizHTML;

      const submitQuizBtn = document.getElementById('submit-quiz-btn');
      if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', async () => {
          let allCorrect = true;
          let unanswered = false;

          quizList.forEach(q => {
            const selected = document.querySelector(`input[name="quiz-q-${q.id}"]:checked`);
            if (!selected) {
              unanswered = true;
            } else {
              const ansVal = parseInt(selected.value);
              if (ansVal !== q.correct_option_index) {
                allCorrect = false;
              }
            }
          });

          if (unanswered) {
            alert("Oops! Jawab semua pertanyaan dulu ya! 😊");
            return;
          }

          if (allCorrect) {
            if (typeof confetti !== 'undefined') {
              confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
              });
            }

            try {
              // Upsert attempt to Supabase
              await supabase
                .from('user_quiz_attempts')
                .upsert({
                  user_id: userId,
                  course_id: course.id,
                  stars_earned: 10
                }, { onConflict: 'user_id,course_id' });
            } catch (e) {
              console.error('Failed to submit quiz attempt to Supabase:', e);
            }

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
      let forumHTML = `
        <div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col min-h-[380px]">
          <h3 class="font-bold text-surface-900 text-base border-b border-surface-100 pb-3 flex items-center gap-2">
            <i data-lucide="message-square" class="w-5 h-5 text-indigo-500"></i> Forum Diskusi Perkuliahan
          </h3>

          <!-- Chat messages area -->
          <div id="forum-thread" class="flex-1 space-y-4 max-h-[250px] overflow-y-auto pr-1">
      `;

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
              class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md active:scale-98 transition-colors cursor-pointer text-sm flex items-center justify-center gap-1.5 border-none"
            >
              <span>Kirim</span>
              <i data-lucide="send" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `;

      tabContent.innerHTML = forumHTML;
      renderForumThread();

      const forumInput = document.getElementById('forum-input');
      const sendForumBtn = document.getElementById('send-forum-btn');

      const sendMsg = async () => {
        if (!forumInput) return;
        const text = forumInput.value.trim();
        if (!text) return;

        forumInput.value = '';

        const senderRole = eduLevel === 'sd' ? 'Siswa' : (eduLevel === 'kuliah' ? 'Mahasiswa' : 'Siswa');
        
        try {
          await supabase
            .from('forum_messages')
            .insert({
              course_id: course.id,
              user_id: userId,
              sender_name: username,
              sender_role: senderRole,
              message_text: text
            });
        } catch (e) {
          console.error('Failed to send forum message to Supabase:', e);
        }
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
