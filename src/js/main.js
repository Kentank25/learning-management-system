import { getState, setState } from './store.js';
import { renderSidebar } from './components/sidebar.js';
import { renderHeader } from './components/header.js';
import { supabase } from './supabaseClient.js';

(async function() {
  const currentPath = window.location.pathname;

  // 1. Session & Profile Sync
  let eduLevel = getState('edu-level');
  let username = getState('username');

  // Fetch Supabase session asynchronously
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    // Sync profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('username, edu_level, is_admin')
      .eq('id', session.user.id)
      .single();

    if (profileData) {
      eduLevel = profileData.edu_level;
      username = profileData.username;

      if (getState('edu-level') !== eduLevel) setState('edu-level', eduLevel);
      if (getState('username') !== username) setState('username', username);
      setState('is-admin', profileData.is_admin === true);

      // REDIRECT FOR ADMIN: If they are admin but on a student page, send them to admin.html
      if (profileData.is_admin === true && !currentPath.includes('admin.html') && !currentPath.includes('login.html')) {
        window.location.href = 'admin.html';
        return;
      }
    }
  } else {
    eduLevel = null;
    username = null;
    setState('edu-level', null);
    setState('username', null);
    setState('is-admin', false);
  }

  // Redirect to login if session is empty and not on login page
  const isAdmin = getState('is-admin') === true;
  if (!isAdmin && !eduLevel && !currentPath.includes('login')) {
    window.location.href = 'login.html';
    return;
  }

  // Apply theme attribute to html document
  if (isAdmin) {
    document.documentElement.setAttribute('data-theme', 'admin');
  } else if (eduLevel) {
    document.documentElement.setAttribute('data-theme', eduLevel);
  }

  // 2. Render Sidebar & Header Components
  const sidebar = document.getElementById('sidebar');
  const header = document.getElementById('header');

  if (sidebar) {
    sidebar.innerHTML = renderSidebar();
  }
  if (header) {
    header.innerHTML = renderHeader();
  }

  // Initialize Lucide Icons after elements are added to the DOM
  const initLucide = () => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };
  initLucide();

  // 3. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  if (sidebar) {
    const openSidebar = () => {
      sidebar.classList.remove('-translate-x-full');
      if (sidebarOverlay) {
        sidebarOverlay.classList.remove('hidden');
        setTimeout(() => sidebarOverlay.classList.remove('opacity-0'), 10);
      }
    };

    const closeSidebar = () => {
      sidebar.classList.add('-translate-x-full');
      if (sidebarOverlay) {
        sidebarOverlay.classList.add('opacity-0');
        setTimeout(() => sidebarOverlay.classList.add('hidden'), 300);
      }
    };

    const toggleMenu = () => {
      const isClosed = sidebar.classList.contains('-translate-x-full');
      if (isClosed) {
        openSidebar();
      } else {
        closeSidebar();
      }
    };

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', toggleMenu);
    }
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', closeSidebar);
    }
  }

  // 4. Profile Dropdown Panel Toggle & Switcher
  const profileMenuBtn = document.getElementById('profile-menu-btn');
  const profileDropdown = document.getElementById('profile-dropdown');
  const bellBtn = document.getElementById('notification-btn');
  const notificationDropdown = document.getElementById('notification-dropdown');

  if (profileMenuBtn && profileDropdown) {
    profileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('hidden');
      if (notificationDropdown) notificationDropdown.classList.add('hidden');
    });
  }

  // 5. Notification Dropdown Panel & Dynamic Rendering
  const notificationBadge = document.getElementById('notification-badge');
  const notificationList = document.getElementById('notification-list');
  const markAllReadBtn = document.getElementById('mark-all-read');

  const notificationsData = {
    admin: [
      { id: 1, text: 'Log Keamanan: Aturan database trigger universal admin telah aktif. 🛡️', read: false, time: 'Baru saja' },
      { id: 2, text: 'Sistem mendeteksi 2 pendaftaran pengguna baru hari ini. 👥', read: false, time: '2 jam yang lalu' },
      { id: 3, text: 'Penyimpanan berkas bucket `user-documents` berjalan aman. 📂', read: true, time: 'Kemarin' }
    ],
    sd: [
      { id: 1, text: 'Piko lapar nih! Yuk selesaikan kuis hari ini untuk kumpulkan Bintang! 🦖⭐', read: false, time: 'Baru saja' },
      { id: 2, text: 'Tugas kelas menggambar rumah impian belum dikirim. Ayo selesaikan! 🎨', read: false, time: '1 jam yang lalu' }
    ],
    smk: [
      { id: 1, text: 'Tenggat tugas \'Skema Database Toko Online\' tersisa 3 jam lagi! 🚀', read: false, time: 'Baru saja' },
      { id: 2, text: 'Modul baru \'Normalisasi Basis Data 1NF-3NF\' telah ditambahkan.', read: true, time: 'Kemarin' }
    ],
    kuliah: [
      { id: 1, text: 'Dr. Ir. Wahyu Wibowo membalas tanggapan Anda di Forum Diskusi RPL. 💬', read: false, time: '10 menit yang lalu' },
      { id: 2, text: 'Batas waktu pengumpulan Laporan SRS Bab 3 malam ini pukul 23:59 WIB.', read: false, time: '2 jam yang lalu' }
    ]
  };

  const renderNotifications = () => {
    if (!notificationList) return;
    notificationList.innerHTML = '';
    
    const items = isAdmin ? (notificationsData.admin || []) : (notificationsData[eduLevel] || []);
    let hasUnread = false;

    if (items.length === 0) {
      notificationList.innerHTML = `
        <div class="text-center py-6 text-surface-400 text-xs">
          Tidak ada pemberitahuan baru.
        </div>
      `;
      if (notificationBadge) notificationBadge.classList.add('hidden');
      return;
    }

    items.forEach(notif => {
      if (!notif.read) hasUnread = true;
      const readBg = notif.read ? 'bg-white' : 'bg-surface-50 border-accent-100';
      const indicatorColor = isAdmin ? 'bg-purple-600' : (eduLevel === 'sd' ? 'bg-sky-500' : (eduLevel === 'kuliah' ? 'bg-indigo-600' : 'bg-amber-500'));
      const dot = notif.read ? '' : `<span class="w-1.5 h-1.5 rounded-full ${indicatorColor} shrink-0 mt-1.5"></span>`;
      
      const notifHTML = `
        <div class="p-2.5 rounded-xl border border-surface-100 flex items-start gap-2.5 transition-colors ${readBg}">
          ${dot}
          <div class="flex-1 space-y-0.5">
            <p class="text-xs text-surface-850 font-medium leading-relaxed">${notif.text}</p>
            <span class="text-[9px] text-surface-400 font-bold block">${notif.time}</span>
          </div>
        </div>
      `;
      notificationList.insertAdjacentHTML('beforeend', notifHTML);
    });

    if (notificationBadge) {
      if (hasUnread) notificationBadge.classList.remove('hidden');
      else notificationBadge.classList.add('hidden');
    }
  };

  if (bellBtn && notificationDropdown) {
    renderNotifications();

    bellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notificationDropdown.classList.toggle('hidden');
      if (profileDropdown) profileDropdown.classList.add('hidden');
    });
  }

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
      const items = isAdmin ? (notificationsData.admin || []) : (notificationsData[eduLevel] || []);
      items.forEach(n => n.read = true);
      renderNotifications();
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    if (profileDropdown) profileDropdown.classList.add('hidden');
    if (notificationDropdown) notificationDropdown.classList.add('hidden');
  });

  // 6. Logout Interaction
  const logoutBtns = document.querySelectorAll('#logout-btn, #dropdown-logout-btn');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear session
      setState('edu-level', null);
      setState('username', null);
      
      // Redirect
      window.location.href = 'login.html';
    });
  });
})();
