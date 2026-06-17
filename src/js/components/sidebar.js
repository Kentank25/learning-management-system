import { getState } from '../store.js';
import { sidebarTexts } from '../db.js';

/**
 * Renders the sidebar HTML content based on the current active page and educational level.
 * @returns {string} The HTML string for the sidebar.
 */
export function renderSidebar() {
  const eduLevel = getState('edu-level', 'smk');
  const isAdmin = getState('is-admin') === true;
  const texts = sidebarTexts[eduLevel] || sidebarTexts['smk'];
  const path = window.location.pathname;
  
  // Helper to check if a menu item is active
  const isActive = (fileName) => {
    // If we are on the root path, index.html is active
    if (fileName === 'index.html' && (path.endsWith('/') || path.endsWith('/index.html') || path === '')) {
      return true;
    }
    return path.endsWith(fileName);
  };

  const getLinkClass = (fileName) => {
    if (isActive(fileName)) {
      return 'flex items-center gap-3 px-3 py-2.5 bg-accent-50/50 text-accent-600 rounded-xl font-semibold transition-colors sidebar-active-indicator';
    }
    return 'flex items-center gap-3 px-3 py-2.5 text-surface-600 hover:bg-white/50 hover:text-surface-900 rounded-xl font-medium transition-colors';
  };

  // SD theme hides Calendar and Personal Files
  const isSD = eduLevel === 'sd';

  if (isAdmin) {
    return `
      <!-- Logo Area -->
      <div class="h-16 flex items-center px-6 border-b border-surface-200/50">
        <div class="flex items-center gap-2 text-accent-600 font-bold text-xl tracking-tight font-display">
          <i data-lucide="graduation-cap" class="w-6 h-6 text-accent-500"></i>
          <span>Sekolah<span class="text-surface-900">Mu</span> <span class="text-[10px] px-2 py-0.5 bg-red-50 text-red-600 rounded-full font-extrabold ml-1 uppercase border border-red-200/50">Admin</span></span>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <a href="admin.html" class="${getLinkClass('admin.html')}">
          <i data-lucide="shield-alert" class="w-5 h-5"></i>
          <span id="nav-admin-text">Admin Panel</span>
        </a>
      </nav>

      <!-- Bottom User Actions -->
      <div class="p-4 border-t border-surface-200/50">
        <a href="#" id="logout-btn" class="flex items-center gap-3 px-3 py-2 text-surface-600 hover:text-red-650 hover:bg-red-50/50 rounded-lg font-medium transition-colors">
          <i data-lucide="log-out" class="w-5 h-5"></i>
          Keluar
        </a>
      </div>
    `;
  }

  return `
    <!-- Logo Area -->
    <div class="h-16 flex items-center px-6 border-b border-surface-200/50">
      <div class="flex items-center gap-2 text-accent-600 font-bold text-xl tracking-tight font-display">
        <i data-lucide="graduation-cap" class="w-6 h-6 text-accent-500"></i>
        <span>Sekolah<span class="text-surface-900">Mu</span></span>
      </div>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
      <a href="index.html" class="${getLinkClass('index.html')}">
        <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
        <span id="nav-dashboard-text">${texts.dashboard}</span>
      </a>
      
      <a href="courses.html" class="${getLinkClass('courses.html')} ${path.endsWith('course-detail.html') ? 'bg-accent-50/10' : ''}">
        <i data-lucide="book-open" class="w-5 h-5"></i>
        <span id="nav-courses-text">${texts.courses}</span>
      </a>
      
      ${!isSD ? `
      <a href="calendar.html" class="${getLinkClass('calendar.html')}">
        <i data-lucide="calendar" class="w-5 h-5"></i>
        <span id="nav-calendar-text">${texts.calendar}</span>
      </a>
      ` : ''}
      
      <a href="grades.html" class="${getLinkClass('grades.html')}">
        <i data-lucide="award" class="w-5 h-5"></i>
        <span id="nav-grades-text">${texts.grades}</span>
      </a>
      
      ${!isSD ? `
      <a href="files.html" class="${getLinkClass('files.html')}">
        <i data-lucide="folder" class="w-5 h-5"></i>
        <span id="nav-files-text">${texts.files}</span>
      </a>
      ` : ''}
    </nav>

    <!-- Bottom User Actions -->
    <div class="p-4 border-t border-surface-200/50">
      <a href="#" id="logout-btn" class="flex items-center gap-3 px-3 py-2 text-surface-600 hover:text-red-650 hover:bg-red-50/50 rounded-lg font-medium transition-colors">
        <i data-lucide="log-out" class="w-5 h-5"></i>
        Keluar
      </a>
    </div>
  `;
}
