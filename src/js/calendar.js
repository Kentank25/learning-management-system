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

  // 3. Page Header Dynamic Content
  const calendarPageTitle = document.getElementById('calendar-page-title');
  const calendarPageDesc = document.getElementById('calendar-page-desc');

  const pageHeaders = {
    sd: {
      title: 'Kalender Belajar Ceria 📅',
      desc: 'Lihat hari-hari penting, kelas seru, dan tenggat tugas belajarmu di sini!'
    },
    smk: {
      title: 'Kalender Kegiatan Siswa',
      desc: 'Pantau jadwal kelas virtual, tenggat pengumpulan tugas, dan agenda RPL Anda.'
    },
    kuliah: {
      title: 'Agenda Akademik Terpadu',
      desc: 'Akses jadwal perkuliahan aktif, beban SKS, praktikum, dan agenda ujian semester.'
    }
  };

  if (calendarPageTitle) calendarPageTitle.textContent = pageHeaders[eduLevel].title;
  if (calendarPageDesc) calendarPageDesc.textContent = pageHeaders[eduLevel].desc;

  // Adapt colors for primary elements (Submit & Add buttons)
  const addAgendaBtn = document.getElementById('add-agenda-btn');
  const submitAgendaFormBtn = document.querySelector('#agenda-form button[type="submit"]');
  const calendarCapIcon = document.querySelector('aside .text-accent-600');

  if (eduLevel === 'sd') {
    if (addAgendaBtn) addAgendaBtn.className = 'w-full mt-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 border-none';
    if (submitAgendaFormBtn) submitAgendaFormBtn.className = 'w-full py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2 border-none';
    if (calendarCapIcon) {
      calendarCapIcon.classList.remove('text-accent-600');
      calendarCapIcon.classList.add('text-sky-500');
    }
  } else if (eduLevel === 'kuliah') {
    if (addAgendaBtn) addAgendaBtn.className = 'w-full mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 border-none';
    if (submitAgendaFormBtn) submitAgendaFormBtn.className = 'w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2 border-none';
    if (calendarCapIcon) {
      calendarCapIcon.classList.remove('text-accent-600');
      calendarCapIcon.classList.add('text-indigo-600');
    }
  } else {
    // SMK
    if (addAgendaBtn) addAgendaBtn.className = 'w-full mt-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 border-none';
    if (submitAgendaFormBtn) submitAgendaFormBtn.className = 'w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2 border-none';
    if (calendarCapIcon) {
      calendarCapIcon.classList.remove('text-accent-600');
      calendarCapIcon.classList.add('text-amber-500');
    }
  }

  // 4. Interactive Calendar Logic
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth(); 
  let currentYear = currentDate.getFullYear(); 
  
  // Selected date defaults to today or May 21, 2026
  let selectedDateStr = '2026-05-21';
  let allAgendas = [];

  // Fetch all agendas from Supabase
  const fetchAgendas = async () => {
    try {
      const { data, error } = await supabase
        .from('calendar_agendas')
        .select('*')
        .eq('edu_level', eduLevel);

      if (data) {
        allAgendas = data;
      }
    } catch (e) {
      console.error('Failed to fetch agendas from Supabase:', e);
    }
  };

  const getAgendasForLevel = () => {
    return allAgendas;
  };

  // UI elements
  const calendarGrid = document.getElementById('calendar-grid');
  const monthYearLabel = document.getElementById('calendar-month-year');
  const prevMonthBtn = document.getElementById('prev-month-btn');
  const nextMonthBtn = document.getElementById('next-month-btn');
  const agendaContainer = document.getElementById('agenda-container');
  const selectedDateLabel = document.getElementById('selected-date-str');

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const formatFullDateStr = (dateObj) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const dayName = days[dateObj.getDay()];
    const dateNum = dateObj.getDate();
    const monthName = months[dateObj.getMonth()];
    const yearNum = dateObj.getFullYear();
    
    return `${dayName}, ${dateNum} ${monthName} ${yearNum}`;
  };

  const renderCalendar = () => {
    if (!calendarGrid) return;
    calendarGrid.innerHTML = '';
    
    // Set Month Year Title
    if (monthYearLabel) monthYearLabel.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDayIndex = firstDay.getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthTotalDays = new Date(currentYear, currentMonth, 0).getDate();

    const agendas = getAgendasForLevel();

    // 1. Render previous month's trailing days (grayed out)
    for (let i = startDayIndex - 1; i >= 0; i--) {
      const dateNum = prevMonthTotalDays - i;
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dateNum).padStart(2, '0')}`;
      
      const dayEl = document.createElement('button');
      dayEl.className = 'aspect-square bg-surface-50 border border-surface-100 rounded-lg text-surface-300 text-[10px] sm:text-xs font-semibold p-1 cursor-default opacity-50 flex flex-col justify-between items-start overflow-hidden relative border-none';
      dayEl.innerHTML = `<span>${dateNum}</span>`;
      calendarGrid.appendChild(dayEl);
    }

    // 2. Render current month's days
    for (let i = 1; i <= totalDays; i++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayAgendas = agendas.filter(ag => ag.date === dateStr);
      const isSelected = dateStr === selectedDateStr;

      let dayBtnClass = 'aspect-square border rounded-lg text-xs font-semibold p-1 transition-all flex flex-col justify-between items-start cursor-pointer overflow-hidden relative ';
      
      if (isSelected) {
        if (eduLevel === 'sd') {
          dayBtnClass += 'bg-sky-500 border-sky-500 text-white shadow-md shadow-sky-100 ';
        } else if (eduLevel === 'kuliah') {
          dayBtnClass += 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100 ';
        } else {
          dayBtnClass += 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-100 ';
        }
      } else {
        dayBtnClass += 'bg-white border-surface-200 hover:border-surface-300 text-surface-800 ';
      }

      const dayEl = document.createElement('button');
      dayEl.className = dayBtnClass;
      dayEl.setAttribute('data-date', dateStr);

      // Render dots for agendas on this day (Max 3 dots center bottom)
      let dotsHTML = '';
      if (dayAgendas.length > 0) {
        const visibleAgendas = dayAgendas.slice(0, 3);
        dotsHTML = `<div class="flex gap-1 absolute bottom-1.5 left-1/2 -translate-x-1/2 justify-center">`;
        visibleAgendas.forEach(ag => {
          let dotColor = 'bg-emerald-500'; 
          if (ag.type === 'deadline') dotColor = 'bg-orange-500';
          if (ag.type === 'event') dotColor = 'bg-indigo-500';
          
          if (isSelected) dotColor = 'bg-white'; 
          dotsHTML += `<span class="w-1 h-1 rounded-full ${dotColor}"></span>`;
        });
        dotsHTML += `</div>`;
      }

      dayEl.innerHTML = `<span>${i}</span>${dotsHTML}`;
      
      dayEl.addEventListener('click', () => {
        selectedDateStr = dateStr;
        renderCalendar();
        renderAgendasList(dateStr);
      });

      calendarGrid.appendChild(dayEl);
    }

    // 3. Render next month's starting days to fill grid
    const totalCellsRendered = startDayIndex + totalDays;
    const remainingCells = totalCellsRendered % 7 === 0 ? 0 : 7 - (totalCellsRendered % 7);
    
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      
      const dayEl = document.createElement('button');
      dayEl.className = 'aspect-square bg-surface-50 border border-surface-100 rounded-lg text-surface-300 text-[10px] sm:text-xs font-semibold p-1 cursor-default opacity-50 flex flex-col justify-between items-start overflow-hidden relative border-none';
      dayEl.innerHTML = `<span>${i}</span>`;
      calendarGrid.appendChild(dayEl);
    }

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };

  // Render list of agendas in the right panel
  const renderAgendasList = (dateStr) => {
    if (!agendaContainer) return;
    agendaContainer.innerHTML = '';

    const dParts = dateStr.split('-');
    const dObj = new Date(parseInt(dParts[0]), parseInt(dParts[1]) - 1, parseInt(dParts[2]));
    if (selectedDateLabel) selectedDateLabel.textContent = formatFullDateStr(dObj);

    const agendas = getAgendasForLevel().filter(ag => ag.date === dateStr);

    if (agendas.length === 0) {
      agendaContainer.innerHTML = `
        <div class="h-48 flex flex-col items-center justify-center text-center text-surface-400">
          <i data-lucide="coffee" class="w-8 h-8 mb-2 text-surface-300"></i>
          <p class="text-xs font-semibold">Tidak ada kegiatan terjadwal.</p>
          <p class="text-[10px] text-surface-400 mt-0.5">Nikmati waktu istirahat Anda!</p>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    agendas.forEach(ag => {
      let iconName = 'calendar';
      let iconColor = 'text-emerald-500 bg-emerald-50 border-emerald-100';
      
      if (ag.type === 'deadline') {
        iconName = 'alert-circle';
        iconColor = 'text-orange-500 bg-orange-50 border-orange-100';
      } else if (ag.type === 'event') {
        iconName = 'award';
        iconColor = 'text-indigo-500 bg-indigo-50 border-indigo-100';
      }

      const agendaEl = document.createElement('div');
      agendaEl.className = 'flex items-start gap-3 p-3.5 border border-surface-200/80 rounded-2xl hover:shadow-sm transition-all hover-lift cursor-pointer bg-white';
      agendaEl.innerHTML = `
        <div class="p-2 border rounded-xl ${iconColor} shrink-0">
          <i data-lucide="${iconName}" class="w-4.5 h-4.5"></i>
        </div>
        <div>
          <h4 class="font-bold text-xs text-surface-900 leading-snug">${ag.title}</h4>
          <span class="text-[10px] text-surface-400 font-bold block mt-1 uppercase tracking-wide">${ag.type === 'class' ? 'Sesi Kelas' : (ag.type === 'deadline' ? 'Tenggat Waktu' : 'Acara Khusus')}</span>
        </div>
      `;
      agendaContainer.appendChild(agendaEl);
    });

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };

  // Fetch initial data
  await fetchAgendas();

  if (prevMonthBtn && nextMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });
  }

  // Modal New Agenda Interaction
  const modal = document.getElementById('agenda-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const agendaForm = document.getElementById('agenda-form');
  const agendaDateInput = document.getElementById('agenda-date');

  const openModal = () => {
    if (!modal) return;
    if (agendaDateInput) {
      agendaDateInput.value = selectedDateStr;
    }
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.querySelector('.transform').classList.remove('scale-95');
    }, 10);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.add('opacity-0');
    modal.querySelector('.transform').classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  };

  if (addAgendaBtn) addAgendaBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  // Form Submission
  if (agendaForm) {
    agendaForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = document.getElementById('agenda-title').value;
      const date = document.getElementById('agenda-date').value;
      const type = document.getElementById('agenda-type').value;

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      try {
        const { data, error } = await supabase
          .from('calendar_agendas')
          .insert({
            user_id: session.user.id,
            edu_level: eduLevel,
            date: date,
            title: title,
            type: type
          })
          .select()
          .single();

        if (error) throw error;

        if (data) {
          allAgendas.push(data);
        }
      } catch (err) {
        console.error('Failed to add custom agenda to Supabase:', err);
      }

      // Reset Form & Close Modal
      agendaForm.reset();
      closeModal();

      // Refresh Calendar
      selectedDateStr = date;
      const dateParts = date.split('-');
      currentYear = parseInt(dateParts[0]);
      currentMonth = parseInt(dateParts[1]) - 1;

      renderCalendar();
      renderAgendasList(selectedDateStr);
    });
  }

  // Initial execution
  renderCalendar();
  renderAgendasList(selectedDateStr);
})();
