import { sidebarTexts } from './db.js';
import { getState } from './store.js';
import { supabase } from './supabaseClient.js';

(async function() {
  const eduLevel = getState('edu-level', 'smk');
  const username = getState('username', 'Keane');

  // 1. Sidebar Navigation Text Mapping
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

  // 2. Adjust Page Headers and Styles
  const pageTitle = document.getElementById('files-page-title');
  const pageDesc = document.getElementById('files-page-desc');
  const uploadTrigger = document.getElementById('upload-file-trigger');

  if (eduLevel === 'sd') {
    if (pageTitle) pageTitle.textContent = 'File Saya 🎨';
    if (pageDesc) pageDesc.textContent = 'Unduh lembar kertas menggambar atau kuis yang ingin kamu cetak di rumah!';
    if (uploadTrigger) {
      uploadTrigger.className = 'px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl text-sm shadow-md active:scale-98 transition-all flex items-center gap-2 cursor-pointer border-none';
    }
  } else if (eduLevel === 'kuliah') {
    if (pageTitle) pageTitle.textContent = 'Drive Mahasiswa 🌐';
    if (pageDesc) pageDesc.textContent = 'Akses penyimpanan cloud berkas riset, jurnal, slide perkuliahan, dan bimbingan skripsi Anda.';
    if (uploadTrigger) {
      uploadTrigger.className = 'px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md active:scale-98 transition-all flex items-center gap-2 cursor-pointer border-none';
    }
  } else {
    // SMK
    if (pageTitle) pageTitle.textContent = 'Penyimpanan File Pribadi 📁';
    if (pageDesc) pageDesc.textContent = 'Simpan draf coding projek web, skema database, dan sertifikat kompetensi Anda.';
    if (uploadTrigger) {
      uploadTrigger.className = 'px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-sm shadow-md active:scale-98 transition-all flex items-center gap-2 cursor-pointer border-none';
    }
  }

  // Get active session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = 'login.html';
    return;
  }
  const userId = session.user.id;

  let files = [];

  // Fetch files from Supabase
  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('user_files')
        .select('*')
        .eq('user_id', userId)
        .eq('edu_level', eduLevel)
        .order('created_at', { ascending: false });

      if (data) {
        files = data;
      }
    } catch (e) {
      console.error('Failed to load files from Supabase:', e);
    }
  };

  const contentArea = document.getElementById('files-content-area');

  const renderFiles = () => {
    if (!contentArea) return;
    contentArea.innerHTML = '';

    // Helper file icon renderer
    const getFileIcon = (type) => {
      if (type === 'pdf') return 'file-text';
      if (type === 'doc') return 'file-type';
      if (type === 'code') return 'file-code-2';
      if (type === 'archive') return 'file-archive';
      return 'file';
    };

    const iconAccent = eduLevel === 'sd' ? 'text-sky-500' : (eduLevel === 'kuliah' ? 'text-indigo-600' : 'text-amber-500');

    // Calculate capacity
    const totalBytes = files.reduce((sum, f) => sum + (f.bytes_size || 0), 0);
    const currentMB = (totalBytes / (1024 * 1024)).toFixed(2);

    let sidebarFoldersHTML = '';
    if (eduLevel === 'smk' || eduLevel === 'kuliah') {
      const isKuliah = eduLevel === 'kuliah';
      const limitGB = isKuliah ? 15 : 10;
      const limitMB = limitGB * 1024;
      const capacityPct = Math.min(((currentMB / limitMB) * 100), 100).toFixed(1);
      const strokeDasharray = 226.2;
      const strokeDashoffset = strokeDasharray - (strokeDasharray * capacityPct) / 100;
      
      const gradientId = isKuliah ? 'indigo-grad' : 'amber-grad';
      const stopStartColor = isKuliah ? '#6366f1' : '#f59e0b';
      const stopEndColor = isKuliah ? '#4338ca' : '#b45309';

      const folderListHTML = isKuliah ? `
        <button class="w-full flex items-center gap-2.5 px-3 py-2 text-surface-700 bg-indigo-50/50 text-indigo-700 border border-indigo-100 rounded-xl text-left text-xs font-bold transition-all border-solid">
          <i data-lucide="folder-open" class="w-4 h-4"></i> / Drive Utama
        </button>
        <button class="w-full flex items-center gap-2.5 px-3 py-2 text-surface-500 hover:bg-surface-100 hover:text-surface-800 rounded-xl text-left text-xs font-semibold transition-all border-none bg-transparent cursor-pointer">
          <i data-lucide="folder" class="w-4 h-4"></i> Draf-Skripsi
        </button>
        <button class="w-full flex items-center gap-2.5 px-3 py-2 text-surface-500 hover:bg-surface-100 hover:text-surface-800 rounded-xl text-left text-xs font-semibold transition-all border-none bg-transparent cursor-pointer">
          <i data-lucide="folder" class="w-4 h-4"></i> Jurnal-Riset
        </button>
      ` : `
        <button class="w-full flex items-center gap-2.5 px-3 py-2 text-surface-700 bg-amber-50/50 text-amber-700 border border-amber-100 rounded-xl text-left text-xs font-bold transition-all border-solid">
          <i data-lucide="folder-open" class="w-4 h-4"></i> / root
        </button>
        <button class="w-full flex items-center gap-2.5 px-3 py-2 text-surface-500 hover:bg-surface-100 hover:text-surface-800 rounded-xl text-left text-xs font-semibold transition-all border-none bg-transparent cursor-pointer">
          <i data-lucide="folder" class="w-4 h-4"></i> Projek-Web
        </button>
        <button class="w-full flex items-center gap-2.5 px-3 py-2 text-surface-500 hover:bg-surface-100 hover:text-surface-800 rounded-xl text-left text-xs font-semibold transition-all border-none bg-transparent cursor-pointer">
          <i data-lucide="folder" class="w-4 h-4"></i> Tugas-BasisData
        </button>
      `;

      sidebarFoldersHTML = `
        <div class="space-y-5">
          <div class="space-y-2.5">
            <span class="text-xs uppercase font-extrabold text-surface-400 block px-2">Folder Saya</span>
            <div class="space-y-1">
              ${folderListHTML}
            </div>
          </div>
          
          <!-- Capacity Widget with Radial Progress Ring -->
          <div class="border-t border-surface-150 pt-5 px-1 flex flex-col items-center text-center space-y-3">
            <span class="text-xs font-extrabold text-surface-400 uppercase tracking-wider block self-start">Kapasitas Cloud</span>
            
            <div class="relative w-28 h-28 flex items-center justify-center">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="36" stroke="var(--color-surface-100)" stroke-width="7" fill="transparent" />
                <circle cx="50" cy="50" r="36" stroke="url(#${gradientId})" stroke-width="7" fill="transparent" 
                  stroke-dasharray="${strokeDasharray}" stroke-dashoffset="${strokeDashoffset}" stroke-linecap="round" 
                  class="transition-all duration-1000" />
                <defs>
                  <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${stopStartColor}" />
                    <stop offset="100%" stop-color="${stopEndColor}" />
                  </linearGradient>
                </defs>
              </svg>
              <div class="absolute flex flex-col items-center justify-center">
                <span class="text-lg font-black text-surface-900 leading-none">${capacityPct}%</span>
                <span class="text-[9px] font-bold text-surface-400 mt-1 uppercase tracking-tight">Terpakai</span>
              </div>
            </div>
            
            <div class="space-y-0.5">
              <span class="text-xs font-bold text-surface-700 block">${currentMB} MB dari ${limitGB} GB digunakan</span>
              <span class="text-[10px] text-surface-400 font-semibold block">Penyimpanan Pribadi</span>
            </div>
          </div>
        </div>
      `;
    }

    let mainListHTML = `
      <div class="space-y-4">
        <h3 class="font-bold text-surface-900 text-base flex items-center gap-2">
          <i data-lucide="files" class="w-5 h-5 ${iconAccent}"></i> Berkas Tersimpan
        </h3>
        
        <div class="space-y-2.5">
    `;

    if (files.length === 0) {
      mainListHTML += `
        <div class="border border-dashed border-surface-200 rounded-2xl py-12 text-center text-surface-400">
          <i data-lucide="inbox" class="w-10 h-10 mx-auto mb-2 text-surface-300"></i>
          <p class="text-sm font-semibold">Folder ini kosong</p>
          <p class="text-xs text-surface-400 mt-0.5">Unggah berkas baru untuk menyimpannya di sini.</p>
        </div>
      `;
    } else {
      files.forEach((file, idx) => {
        const uploadDate = new Date(file.created_at).toLocaleDateString('id-ID', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });

        mainListHTML += `
          <div class="p-3.5 border border-surface-150 rounded-2xl bg-white flex items-center justify-between gap-4 hover:shadow-sm hover:border-surface-200 transition-all group">
            <div class="flex items-center gap-3">
              <div class="p-2.5 rounded-xl bg-surface-50 text-surface-500 group-hover:${iconAccent} group-hover:bg-accent-50/20 transition-all shrink-0">
                <i data-lucide="${getFileIcon(file.file_type)}" class="w-5.5 h-5.5"></i>
              </div>
              <div class="min-w-0">
                <h4 class="font-bold text-sm text-surface-900 leading-snug truncate group-hover:${iconAccent} transition-colors">${file.name}</h4>
                <p class="text-[10px] text-surface-400 font-semibold mt-0.5 flex items-center gap-1.5 flex-wrap">
                  <span>${file.size_str}</span>
                  <span>•</span>
                  <span>Diunggah: ${uploadDate}</span>
                </p>
              </div>
            </div>
            
            <div class="flex items-center gap-1">
              <button 
                data-dl-idx="${idx}"
                class="download-btn p-2 hover:bg-surface-100 rounded-xl text-surface-500 hover:text-surface-700 transition-colors cursor-pointer border-none bg-transparent"
                title="Unduh"
              >
                <i data-lucide="download" class="w-4 h-4"></i>
              </button>
              <button 
                data-del-idx="${idx}"
                class="delete-btn p-2 hover:bg-red-50 rounded-xl text-surface-400 hover:text-red-600 transition-colors cursor-pointer border-none bg-transparent"
                title="Hapus"
              >
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        `;
      });
    }

    mainListHTML += `
        </div>
      </div>
    `;

    // Wrap list and sidebar folders if present
    if (sidebarFoldersHTML) {
      contentArea.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <!-- Left sidebar folders -->
          <div class="bg-white border border-surface-200 rounded-3xl p-5 shadow-sm space-y-4">
            ${sidebarFoldersHTML}
          </div>
          <!-- Right main files list -->
          <div class="lg:col-span-3 bg-white border border-surface-200 rounded-3xl p-5 shadow-sm">
            ${mainListHTML}
          </div>
        </div>
      `;
    } else {
      // SD (Full screen width)
      contentArea.innerHTML = `
        <div class="bg-white border border-surface-200 rounded-3xl p-5 shadow-sm">
          ${mainListHTML}
        </div>
      `;
    }

    // Register button handlers
    document.querySelectorAll('.download-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = parseInt(btn.getAttribute('data-dl-idx'));
        const fileObj = files[idx];
        
        try {
          // Generate Signed URL for secure download
          const { data, error } = await supabase.storage
            .from('user-documents')
            .createSignedUrl(fileObj.storage_path, 60);

          if (error || !data) throw error || new Error('URL null');

          const a = document.createElement('a');
          a.href = data.signedUrl;
          a.download = fileObj.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } catch (e) {
          alert(`Gagal mengunduh berkas: ${e.message}`);
        }
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = parseInt(btn.getAttribute('data-del-idx'));
        const fileObj = files[idx];
        
        if (confirm('Apakah Anda yakin ingin menghapus berkas ini secara permanen dari Supabase Storage?')) {
          try {
            // Delete from storage
            const { error: storageErr } = await supabase.storage
              .from('user-documents')
              .remove([fileObj.storage_path]);

            if (storageErr) console.warn('Peringatan: Berkas fisik di Storage tidak ditemukan/gagal dihapus.', storageErr);

            // Delete database record
            const { error: dbErr } = await supabase
              .from('user_files')
              .delete()
              .eq('id', fileObj.id);

            if (dbErr) throw dbErr;

            files.splice(idx, 1);
            renderFiles();
            alert('Berkas berhasil dihapus.');
          } catch (e) {
            alert(`Gagal menghapus berkas: ${e.message}`);
          }
        }
      });
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  // Initial Data Fetch
  await fetchFiles();
  renderFiles();

  // 4. File Upload Handler integration with Supabase Storage
  const hiddenInput = document.getElementById('files-hidden-input');
  if (uploadTrigger && hiddenInput) {
    uploadTrigger.addEventListener('click', () => {
      hiddenInput.click();
    });

    hiddenInput.addEventListener('change', async (e) => {
      const selectedFile = e.target.files[0];
      if (!selectedFile) return;

      const sizeStr = selectedFile.size > 1024 * 1024
        ? (selectedFile.size / (1024 * 1024)).toFixed(1) + ' MB'
        : (selectedFile.size / 1024).toFixed(0) + ' KB';

      let type = 'doc'; // Default ke 'doc' (kategori dokumen umum)
      const name = selectedFile.name.toLowerCase();
      if (name.endsWith('.pdf')) {
        type = 'pdf';
      } else if (
        name.endsWith('.doc') || 
        name.endsWith('.docx') || 
        name.endsWith('.xls') || 
        name.endsWith('.xlsx') || 
        name.endsWith('.ppt') || 
        name.endsWith('.pptx') || 
        name.endsWith('.txt')
      ) {
        type = 'doc';
      } else if (
        name.endsWith('.sql') || 
        name.endsWith('.html') || 
        name.endsWith('.css') || 
        name.endsWith('.js') || 
        name.endsWith('.json') || 
        name.endsWith('.py') || 
        name.endsWith('.cpp')
      ) {
        type = 'code';
      } else if (
        name.endsWith('.zip') || 
        name.endsWith('.rar') || 
        name.endsWith('.7z') || 
        name.endsWith('.tar') || 
        name.endsWith('.gz')
      ) {
        type = 'archive';
      }

      // Set Loading State
      uploadTrigger.setAttribute('disabled', 'true');
      const oldHTML = uploadTrigger.innerHTML;
      uploadTrigger.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>Mengunggah...</span>`;
      if (typeof lucide !== 'undefined') lucide.createIcons();

      try {
        const storagePath = `${userId}/${eduLevel}/${Date.now()}_${selectedFile.name}`;

        console.log('Mengunggah berkas ke Storage path:', storagePath);
        // Upload physical file to Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('user-documents')
          .upload(storagePath, selectedFile);

        if (uploadError) {
          console.error('Detail Error Storage:', uploadError);
          throw new Error(`[Storage] ${uploadError.message || JSON.stringify(uploadError)}`);
        }

        console.log('Berhasil mengunggah ke Storage. Menyimpan metadata ke DB...');
        // Insert metadata row to public.user_files
        const { data: dbData, error: dbError } = await supabase
          .from('user_files')
          .insert({
            user_id: userId,
            edu_level: eduLevel,
            name: selectedFile.name,
            size_str: sizeStr,
            bytes_size: selectedFile.size,
            file_type: type,
            folder_name: eduLevel === 'sd' ? null : (eduLevel === 'kuliah' ? 'Drive Utama' : 'root'),
            storage_path: storagePath
          })
          .select()
          .single();

        if (dbError) {
          console.error('Detail Error Database:', dbError);
          throw new Error(`[Database] ${dbError.message || JSON.stringify(dbError)}`);
        }

        if (dbData) {
          files.unshift(dbData);
        }

        renderFiles();
        alert(`Sukses mengunggah berkas: ${selectedFile.name}`);
      } catch (err) {
        alert(`Gagal mengunggah berkas ke Supabase: ${err.message || err}`);
      } finally {
        uploadTrigger.removeAttribute('disabled');
        uploadTrigger.innerHTML = oldHTML;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        hiddenInput.value = ''; // Reset input
      }
    });
  }
})();
