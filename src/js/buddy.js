import { getState, setState } from './store.js';
import { coursesData } from './db.js';
import { supabase } from './supabaseClient.js';

// SekolahMu Buddy - Virtual Pet Belajar Adaptif
// This module dynamically injects a floating, interactive virtual pet buddy into the page,
// transforming visual character designs, dialog behaviors, progression trackers, and simulated AI chat panels.

const PERSONA_CONFIGS = {
  sd: {
    name: 'Piko',
    bgClass: 'bg-gradient-to-tr from-sky-400 to-blue-500 border-sky-300 text-white',
    btnClass: 'bg-sky-500 hover:bg-sky-600 focus:ring-sky-100 border-sky-300',
    indicatorColor: 'bg-amber-400 text-amber-950',
    chatHeaderClass: 'bg-sky-50 border-b-sky-100',
    getProgression: () => {
      let totalStars = 0;
      for (let i = 1; i <= 4; i++) {
        totalStars += parseInt(getState(`kuis-stars-${i}`) || 0);
      }
      
      let evol = 'egg';
      let title = 'Telur Piko 🥚';
      let currentEmoji = '🥚';
      if (totalStars > 0 && totalStars < 10) {
        evol = 'baby';
        title = 'Bayi Piko 🦕';
        currentEmoji = '🦕';
      } else if (totalStars >= 10 && totalStars < 30) {
        evol = 'junior';
        title = 'Piko Cilik 🦖';
        currentEmoji = '🦖';
      } else if (totalStars >= 30) {
        evol = 'wise';
        title = 'Naga Piko Bijak 🐉';
        currentEmoji = '🐉';
      }
      return { val: `${totalStars} ⭐`, label: title, emoji: currentEmoji, raw: totalStars };
    },
    greetings: [
      'Halo teman! Jangan lupa belajar ceria hari ini ya! Piko selalu bersamamu! 🦖🌟',
      'Piko lapar nih... Yuk selesaikan kuis untuk beri makan Piko Bintang! 😋🌟',
      'Wah, kamu hebat sekali! Piko senang kalau kamu rajin membaca buku! 📖💕',
      'Bermain sambil belajar itu sangat seru lho! Yuk, pilih kelasmu! 🚀'
    ],
    responses: {
      default: 'Wah hebat sekali! Piko suka dengar ceritamu! Piko mau belajar terus sama kamu ya! 🦖💖',
      tips: 'Tips Piko: Baca modulnya perlahan-lahan ya! Jangan terburu-buru, gambar yang ada di modul juga lucu lho! 📖✨',
      tugas: 'Tugas belajarmu asyik lho, jangan lupa dikerjakan agar dapat bintang tambahan dari guru! ⭐🎒',
      bintang: 'Kumpulkan bintang dari kuis ceria, nanti Piko bisa berevolusi menjadi Naga Besar yang gagah! 🐉🌟',
      lelucon: 'Kenapa buku matematika selalu sedih? Karena dia punya banyak sekali "masalah"! Hahaha! 😂'
    }
  },
  smk: {
    name: 'Dev-Bot 2.0',
    bgClass: 'bg-gradient-to-tr from-amber-400 to-amber-600 border-amber-300 text-white',
    btnClass: 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-100 border-amber-300',
    indicatorColor: 'bg-emerald-500 text-white',
    chatHeaderClass: 'bg-amber-50 border-b-amber-100',
    getProgression: () => {
      let totalCompleted = 0;
      let totalModules = 0;
      
      for (let cId = 1; cId <= 4; cId++) {
        const list = getState(`modules-course-${cId}`);
        if (list) {
          totalModules += list.length;
          totalCompleted += list.filter(m => m.completed).length;
        } else {
          totalModules += 3;
          totalCompleted += 1;
        }
      }
      const battery = Math.round((totalCompleted / totalModules) * 100) || 30;
      return { val: `${battery}% ⚡`, label: `Baterai Drone: ${battery}%`, emoji: '🤖', raw: battery };
    },
    greetings: [
      'Dev-Bot online. Siap mendampingi sesi koding Anda! 💻',
      'Sistem normal. Daya baterai optimal. Mari selesaikan modul kejuruan RPL hari ini!',
      'Jangan lupa git commit secara berkala, rekan developer! 🚀',
      'Ada modul pemrograman baru yang menanti untuk dipelajari. Let\'s compile!'
    ],
    responses: {
      default: 'Pesan diterima. Kode kompilasi sukses! Ada sintaksis pemrograman atau bug yang ingin Anda diskusikan? 🤖💻',
      tips: 'Tips Dev-Bot: Menulislah kode secara modular. Bersihkan bug satu per satu dan manfaatkan console.log untuk debugging! 🐛🛠️',
      tugas: 'Pastikan file tugas Anda sudah dikompresi menjadi format .zip atau .rar sebelum dikirim ke Dropbox Tugas ya!',
      lelucon: 'Kenapa programmer lebih suka tema gelap? Karena cahaya menarik serangga (bugs)! 🦟😂',
      bintang: 'Daya baterai saya diisi ulang setiap kali Anda menyelesaikan modul materi baru. Jaga baterai tetap 100% ya! ⚡'
    }
  },
  kuliah: {
    name: 'Athena',
    bgClass: 'bg-gradient-to-tr from-indigo-500 to-violet-700 border-indigo-400 text-white',
    btnClass: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-100 border-indigo-400',
    indicatorColor: 'bg-sky-400 text-sky-950',
    chatHeaderClass: 'bg-indigo-50 border-b-indigo-100',
    getProgression: () => {
      let totalCompleted = 0;
      let totalModules = 0;
      for (let cId = 1; cId <= 4; cId++) {
        const list = getState(`modules-course-${cId}`);
        if (list) {
          totalModules += list.length;
          totalCompleted += list.filter(m => m.completed).length;
        } else {
          totalModules += 4;
          totalCompleted += 2;
        }
      }
      const wisdom = Math.round((totalCompleted / totalModules) * 10) || 5;
      return { val: `Lvl ${wisdom}`, label: `Wisdom Level: ${wisdom}`, emoji: '🦉', raw: wisdom };
    },
    greetings: [
      'Selamat datang di Portal Akademik. Kiranya kebijaksanaan menuntun studi Anda hari ini. 🦉🎓',
      'Beban SKS semester ini terpantau stabil. Mari kelola waktu belajar mandiri Anda secara efisien.',
      'Apakah Anda memerlukan tips konsentrasi (Deep Work) untuk riset hari ini?',
      'Rencana belajar yang terstruktur adalah separuh dari kesuksesan akademik Anda.'
    ],
    responses: {
      default: 'Analisis akademis: Fokus adalah kunci utama. Sampaikan pertanyaan Anda mengenai silabus atau penulisan laporan dokumen SRS.',
      tips: 'Tips Athena: Gunakan metode Pomodoro (25 menit belajar intens, 5 menit istirahat). Jauhkan gawai Anda untuk mengaktifkan deep-work state. 🕰️🌿',
      tugas: 'Periksa kembali dokumen SRS Bab 3 Anda. Pastikan diagram Use Case sudah memiliki skenario utama yang terdokumentasi rapi.',
      lelucon: 'Mengapa burung hantu tidak pernah belajar SKS (Sistem Kebut Semalam) sebelum ujian? Karena mereka sudah tahu "Whoo-Whoo" (siapa-siapa) yang akan lulus! 😉',
      bintang: 'Pencapaian akademis sejati bukan tentang sekadar nilai angka, melainkan pemahaman mendalam tentang teori dan penerapannya di dunia nyata.'
    }
  }
};

// In-memory chat history (does not persist across page reloads)
let inMemoryHistory = [];

const getKeywordFallback = (userMessage, level) => {
  const text = userMessage.toLowerCase();
  const config = PERSONA_CONFIGS[level];

  if (text.includes('tips') || text.includes('trik') || text.includes('cara') || text.includes('fokus') || text.includes('belajar')) {
    return config.responses.tips;
  }
  if (text.includes('tugas') || text.includes('srs') || text.includes('tenggat') || text.includes('deadline') || text.includes('unggah')) {
    return config.responses.tugas;
  }
  if (text.includes('bintang') || text.includes('level') || text.includes('energi') || text.includes('progres') || text.includes('baterai') || text.includes('sks')) {
    return config.responses.bintang;
  }
  if (text.includes('lucu') || text.includes('lelucon') || text.includes('joke') || text.includes('tawa') || text.includes('lawak') || text.includes('humor')) {
    return config.responses.lelucon;
  }
  
  return config.responses.default;
};

const buildAcademicContext = (eduLevel, username) => {
  const courses = coursesData[eduLevel] || [];
  const taskList = [];
  const progressList = [];

  courses.forEach(course => {
    // 1. Get module progress
    const modules = getState(`modules-course-${course.id}`) || course.modules || [];
    const completedCount = modules.filter(m => m.completed).length;
    const totalCount = modules.length;
    progressList.push(`${course.title}: ${completedCount}/${totalCount} modul selesai`);

    // 2. Get tasks if any
    const tasks = course.tasks || [];
    tasks.forEach(task => {
      const isSubmitted = getState(`tugas-status-${course.id}`) === 'true' || getState(`tugas-status-${course.id}`) === true;
      taskList.push({
        course: course.title,
        title: task.title,
        deadline: task.due || 'tidak diketahui',
        submitted: isSubmitted
      });
    });
  });

  const incompleteTasks = taskList.filter(t => !t.submitted);
  const completedTasksCount = taskList.filter(t => t.submitted).length;

  const incompleteTasksText = incompleteTasks.length > 0 
    ? incompleteTasks.map(t => `"${t.title}" (Mata pelajaran: ${t.course}, deadline: ${t.deadline})`).join('; ') 
    : 'Tidak ada tugas yang belum dikerjakan';

  // 1. Batasan Universal (Guardrails & Rules)
  const guardrails = `
ATURAN MUTLAK YANG HARUS KAMU PATUHI:
1. Kamu adalah asisten virtual di aplikasi LMS SekolahMu DevLearn, BUKAN model bahasa AI umum. 
2. Tolak segala bentuk pertanyaan di luar konteks pendidikan, akademik, penjadwalan, atau navigasi LMS. Jika ditanya hal lain (politik, SARA, atau game non-edukasi), jawab dengan: 'Maaf, radarku hanya disetel untuk keperluan belajar dan sekolah!'.
3. Jangan pernah memberikan jawaban berupa kode lengkap, kunci jawaban ujian, atau esai utuh. Berikan hanya petunjuk (hints), konsep dasar, atau kerangka berpikir.
4. Jawabanmu harus selalu SINGKAT, PADAT, dan MAKSIMAL terdiri dari 3 kalimat pendek agar muat di dalam bubble chat UI.
5. Jangan pernah menyebutkan bahwa kamu adalah AI buatan Google, Groq, atau OpenAI. Kamu murni entitas dari SekolahMu.
  `.trim();

  // 2. Persona Dinamis Berdasarkan Level
  let personaPrompt = '';
  let menuMapping = '';

  if (eduLevel === 'sd') {
    personaPrompt = `
Nama kamu adalah Piko, seekor bayi dinosaurus (🦖) yang ceria dan menjadi teman belajar anak Sekolah Dasar (SD). 
- Gunakan bahasa sehari-hari yang sangat ramah, hangat, dan mudah dipahami anak kecil.
- Sapa pengguna dengan sebutan 'Teman Piko'.
- Wajib menggunakan setidaknya 2-3 emoji ceria di setiap jawaban (seperti 🌟, ✨, 🎈, 🚀).
- Selalu semangati mereka untuk mengumpulkan 'Bintang Prestasi' dari kuis.
    `.trim();
    menuMapping = `
Aplikasi LMS ini memiliki fitur dan menu berikut untuk anak SD:
- Dashboard/Beranda (index.html): Tempat melihat ringkasan belajar dan pengumuman.
- Kelas Saya (courses.html): Tempat mencari dan mendaftar mata pelajaran.
- Detail Kelas (course-detail.html): Tempat mengakses modul materi, dan mengerjakan Kuis Bintang.
- Kalender Belajar (calendar.html): Tempat melihat jadwal belajar dan ujian.
- Nilai & Bintang (grades.html): Tempat melihat rapor bintang prestasi.
- File Saya (files.html): Tempat menyimpan berkas pelajaran dan modul PDF.
    `.trim();
  } else if (eduLevel === 'smk') {
    personaPrompt = `
Nama kamu adalah Dev-Bot 2.0, sebuah asisten robot pintar (🤖) pendamping belajar siswa tingkat menengah (SMP/SMK).
- Gunakan bahasa yang santai, dinamis, bersahabat, dan khas anak sekolah (kasual).
- Sapa pengguna dengan sebutan 'Sobat Belajar'.
- Jika pengguna bertanya tentang tugas kejuruan, praktik, laporan, atau pelajaran umum, berikan jawaban praktis yang memandu mereka secara bertahap dan logis.
- Berikan tips belajar praktis, cara membagi waktu, atau metode belajar efektif agar mereka tetap termotivasi dan bebas stres.
    `.trim();
    menuMapping = `
Aplikasi LMS ini memiliki fitur dan menu berikut untuk siswa:
- Dashboard/Beranda (index.html): Tempat melihat ringkasan tugas dan agenda.
- Mata Pelajaran (courses.html): Tempat mencari dan mengakses kelas belajar.
- Detail Kelas (course-detail.html): Tempat mengakses modul materi, dan mengunggah berkas tugas.
- Kalender (calendar.html): Tempat melihat jadwal tugas dan ujian.
- Nilai & Rapor (grades.html): Tempat melihat perolehan nilai tugas dan rapor kelulusan.
- File Pribadi (files.html): Tempat menyimpan berkas file tugas atau materi pelajaran.
    `.trim();
  } else { // kuliah
    personaPrompt = `
Nama kamu adalah Athena, seekor burung hantu bijaksana (🦉) yang menjadi asisten akademik mahasiswa Perguruan Tinggi.
- Gunakan bahasa yang semi-formal, terstruktur, kritis, namun tetap suportif dan memotivasi.
- Sapa pengguna dengan sebutan 'Rekan Mahasiswa'.
- Bantu mereka mengarahkan pemikiran analitis saat menghadapi tugas besar, pencarian jurnal, atau diskusi di forum.
- Akhiri jawaban dengan kalimat yang mendorong mereka untuk berpikir lebih jauh.
    `.trim();
    menuMapping = `
Aplikasi LMS ini memiliki fitur dan menu berikut untuk mahasiswa:
- Portal Akademik (index.html): Tempat melihat ringkasan perkuliahan dan pengumuman kampus.
- Mata Kuliah (courses.html): Tempat mengakses daftar mata kuliah aktif semester ini.
- Detail Kelas (course-detail.html): Tempat mengakses modul materi, mengunggah tugas besar, dan berdiskusi di Forum Diskusi Mahasiswa.
- Agenda Kuliah (calendar.html): Tempat melihat jadwal kuliah, deadline, dan agenda akademik.
- KHS & Transkrip (grades.html): Tempat melihat rangkuman KHS (Kartu Hasil Studi) dan IPK.
- Drive Mahasiswa (files.html): Tempat menyimpan berkas tugas atau materi PDF kuliah.
    `.trim();
  }

  const systemPrompt = `
${guardrails}

${personaPrompt}

INFORMASI NAVIGASI MENU:
${menuMapping}
Jika pengguna bingung cara menggunakan aplikasi atau mencari menu tertentu, arahkan mereka ke menu di atas yang sesuai.

KONTEKS AKADEMIK USER (${username}) SAAT INI:
- Mata Pelajaran Aktif: ${courses.map(c => c.title).join(', ')}
- Progres Belajar: ${progressList.join(', ')}
- Tugas belum dikerjakan: ${incompleteTasksText}
- Tugas sudah dikerjakan: ${completedTasksCount} tugas selesai.
  `.trim();

  return systemPrompt;
};

const fetchBuddyResponse = async (userMessage, level) => {
  const username = getState('username', 'Keane');
  const systemPrompt = buildAcademicContext(level, username);
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  // Add user message to in-memory history
  inMemoryHistory.push({ role: 'user', content: userMessage });

  // Limit in-memory history to last 6 messages (3 turns)
  if (inMemoryHistory.length > 6) {
    inMemoryHistory = inMemoryHistory.slice(-6);
  }

  try {
    // 1. Coba hubungi Supabase Edge Function (Proxy Aman tanpa membocorkan API Key di client)
    try {
      const { data: funcData, error: funcError } = await supabase.functions.invoke('chat-buddy', {
        body: {
          messages: [
            { role: 'system', content: systemPrompt },
            ...inMemoryHistory
          ]
        }
      });

      if (!funcError && funcData && funcData.choices && funcData.choices[0]) {
        const reply = funcData.choices[0].message.content.trim();
        inMemoryHistory.push({ role: 'assistant', content: reply });
        return reply;
      }
      if (funcError) {
        console.warn('[Buddy AI] Supabase Edge Function mengembalikan error, mencoba direct fallback:', funcError);
      }
    } catch (edgeErr) {
      console.warn('[Buddy AI] Gagal memanggil Supabase Edge Function, mencoba direct fallback:', edgeErr);
    }

    // 2. Fallback ke pemanggilan Groq API langsung menggunakan API Key dari .env jika dikonfigurasi
    if (!apiKey || apiKey === 'VITE_GROQ_API_KEY' || apiKey.trim() === '') {
      console.warn('[Buddy AI] API Key Groq langsung tidak diatur di .env. Menggunakan fallback keyword.');
      throw new Error('No Groq API Key available for fallback');
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          ...inMemoryHistory
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content.trim();

    // Add assistant response to in-memory history
    inMemoryHistory.push({ role: 'assistant', content: reply });
    return reply;

  } catch (error) {
    console.warn('[Buddy AI] Gagal menghubungi API AI, menggunakan fallback keyword:', error);
    // Remove the last user message from history so it doesn't pollute the context
    inMemoryHistory.pop();
    
    return getKeywordFallback(userMessage, level);
  }
};

(function() {
  const eduLevel = getState('edu-level') || 'smk';
  const username = getState('username', 'Keane');
  const config = PERSONA_CONFIGS[eduLevel];

  // 1. Inject Custom Floating Animations & Minimized styles to Document Head
  if (!document.getElementById('buddy-custom-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'buddy-custom-styles';
    styleEl.textContent = `
      @keyframes buddy-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .buddy-floating-anim {
        animation: buddy-float 3s ease-in-out infinite;
      }
      .buddy-glass {
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      /* Minimized styles */
      .buddy-minimized #buddy-avatar-btn {
        transform: scale(0.7) !important;
        opacity: 0.6;
      }
      .buddy-minimized #buddy-speech-bubble,
      .buddy-minimized #buddy-chat-window {
        display: none !important;
      }
      .buddy-dragged {
        transition: none !important;
      }
    `;
    document.head.appendChild(styleEl);
  }

  // 2. Build and Inject DOM Widget Structure
  const container = document.createElement('div');
  container.id = 'sekolahmu-buddy-container';
  
  // Storing position and minimized state in store
  const savedPos = getState('buddy-position');
  const isMinimized = getState('buddy-minimized', false);
  
  let containerClasses = 'fixed z-50 font-sans pointer-events-none transition-all duration-300 w-14 h-14';
  if (isMinimized) {
    containerClasses += ' buddy-minimized';
  }
  
  container.className = containerClasses;
  
  const getClampedPosition = (x, y) => {
    const avatarWidth = 56;
    const avatarHeight = 56;
    const maxX = window.innerWidth - avatarWidth - 12;
    const maxY = window.innerHeight - avatarHeight - 12;
    return {
      x: Math.max(12, Math.min(maxX, x)),
      y: Math.max(12, Math.min(maxY, y))
    };
  };

  let initialX, initialY;
  if (savedPos && typeof savedPos.x === 'number' && typeof savedPos.y === 'number') {
    const clamped = getClampedPosition(savedPos.x, savedPos.y);
    initialX = clamped.x;
    initialY = clamped.y;
  } else {
    // Default position at bottom-right
    initialX = window.innerWidth - 56 - 24;
    initialY = window.innerHeight - 56 - 24;
  }
  
  container.style.left = `${initialX}px`;
  container.style.top = `${initialY}px`;
  
  // Calculate dynamic progression stats
  const prog = config.getProgression();

  container.innerHTML = `
    <!-- Speech Bubble -->
    <div id="buddy-speech-bubble" class="hidden pointer-events-auto max-w-[240px] bg-white/95 border border-surface-200/50 shadow-xl rounded-2xl p-3 text-xs text-surface-880 relative transform scale-90 opacity-0 transition-all duration-300">
      <p id="buddy-speech-text" class="leading-relaxed font-semibold"></p>
      <!-- Arrow -->
      <div id="buddy-speech-arrow" class="absolute w-3 h-3 bg-white border-rotate rotate-45"></div>
    </div>

    <!-- Floating Avatar Icon -->
    <button id="buddy-avatar-btn" title="Klik: Obrolan | Double Klik: Sembunyikan" class="pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg border-2 cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-all duration-300 relative select-none buddy-floating-anim ${config.btnClass}">
      <span id="buddy-emoji">${prog.emoji}</span>
      <!-- Status Badge -->
      <span id="buddy-status-indicator" class="absolute top-[-3px] right-[-3px] px-1.5 py-0.5 rounded-full border-2 border-white text-[8px] font-extrabold shadow-sm ${config.indicatorColor}">
        ${prog.val}
      </span>
    </button>

    <!-- Interactive Chat Window Console -->
    <div id="buddy-chat-window" class="hidden pointer-events-auto w-72 glass-panel rounded-2xl shadow-2xl p-4 flex flex-col max-h-[420px] transform translate-y-4 opacity-0 transition-all duration-300">
      <!-- Chat Header -->
      <div class="flex items-center justify-between border-b border-surface-100/50 pb-3">
        <div class="flex items-center gap-2.5">
          <span id="buddy-chat-avatar" class="text-3xl">${prog.emoji}</span>
          <div>
            <h4 class="font-extrabold text-sm text-surface-900 leading-tight">${config.name}</h4>
            <p id="buddy-chat-subtitle" class="text-[9px] text-surface-500 font-bold uppercase tracking-wider mt-0.5">${prog.label}</p>
          </div>
        </div>
        <div class="flex items-center gap-1.5">
          <!-- Minimize Button -->
          <button id="minimize-buddy-btn" title="Kecilkan Buddy" class="p-1 hover:bg-white/50 text-surface-400 hover:text-surface-600 rounded-lg cursor-pointer transition-all active:scale-90 border-none">
            <i data-lucide="minus" class="w-4 h-4"></i>
          </button>
          <button id="close-buddy-chat" title="Tutup Chat" class="p-1 hover:bg-white/50 text-surface-400 hover:text-surface-600 rounded-lg cursor-pointer transition-all active:scale-90 border-none">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <!-- Dialogue Thread -->
      <div id="buddy-chat-messages" class="flex-1 overflow-y-auto py-3.5 space-y-3 pr-1 text-xs max-h-[220px] scrollbar-thin">
        <!-- Initial Message -->
      </div>

      <!-- User Input Interface -->
      <div class="border-t border-surface-100/50 pt-3 flex gap-2">
        <input 
          type="text" 
          id="buddy-chat-input" 
          placeholder="Ketik pesan..." 
          class="w-full px-3.5 py-2 bg-white/60 border border-surface-200/50 focus:bg-white focus:border-accent-500 focus:ring-4 focus:ring-accent-100 rounded-full text-xs outline-none transition-all"
        />
        <button 
          id="send-buddy-msg" 
          class="px-3.5 py-2 text-white font-bold rounded-full text-xs shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center border-none ${eduLevel === 'sd' ? 'bg-sky-500 hover:bg-sky-600' : (eduLevel === 'kuliah' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-amber-500 hover:bg-amber-600')}"
        >
          <i data-lucide="send" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  // 3. Register Interactivity Elements
  const avatarBtn = document.getElementById('buddy-avatar-btn');
  const speechBubble = document.getElementById('buddy-speech-bubble');
  const speechText = document.getElementById('buddy-speech-text');
  const chatWindow = document.getElementById('buddy-chat-window');
  const closeChatBtn = document.getElementById('close-buddy-chat');
  const minimizeBuddyBtn = document.getElementById('minimize-buddy-btn');
  const chatMessages = document.getElementById('buddy-chat-messages');
  const chatInput = document.getElementById('buddy-chat-input');
  const sendMsgBtn = document.getElementById('send-buddy-msg');

  // Function to dynamically position floating elements (chat window & speech bubble) relative to container and viewport bounds
  const updateFloatingElementsPosition = () => {
    if (!chatWindow || !speechBubble) return;

    const rect = container.getBoundingClientRect();
    const x = rect.left;
    const y = rect.top;

    const chatW = 288;
    const chatH = 360; // approximate height when open
    const bubbleW = 240;
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // A. Position Chat Window
    let chatStyle = {
      position: 'absolute',
      left: 'auto',
      right: 'auto',
      top: 'auto',
      bottom: 'auto'
    };

    // Vertical placement for Chat Window
    const spaceBelow = winH - (y + 56 + 12);
    const spaceAbove = y - 12;

    if (spaceBelow >= chatH || spaceBelow >= spaceAbove) {
      chatStyle.top = '68px';
    } else {
      chatStyle.bottom = '68px';
    }

    // Horizontal placement for Chat Window
    const centerLeft = x + 28 - (chatW / 2);
    if (centerLeft < 12) {
      chatStyle.left = `${Math.max(-x + 12, -28)}px`;
    } else if (centerLeft + chatW > winW - 12) {
      chatStyle.right = `${Math.max(x + 56 - (winW - 12), -28)}px`;
    } else {
      chatStyle.left = '-116px'; // Center aligned: (56 - 288) / 2 = -116
    }

    Object.assign(chatWindow.style, chatStyle);

    // B. Position Speech Bubble
    let bubbleStyle = {
      position: 'absolute',
      left: 'auto',
      right: 'auto',
      top: 'auto',
      bottom: 'auto'
    };
    
    const arrow = document.getElementById('buddy-speech-arrow');
    const bubbleH = speechBubble.offsetHeight || 80;

    // Vertical placement for Speech Bubble
    if (y - 12 - bubbleH >= 12) {
      bubbleStyle.bottom = '68px';
      if (arrow) {
        arrow.className = 'absolute bottom-[-6px] w-3 h-3 bg-white border-r border-b border-surface-200/50 rotate-45';
      }
    } else {
      bubbleStyle.top = '68px';
      if (arrow) {
        arrow.className = 'absolute top-[-6px] w-3 h-3 bg-white border-l border-t border-surface-200/50 rotate-45';
      }
    }

    // Horizontal placement for Speech Bubble
    const bubbleCenterLeft = x + 28 - (bubbleW / 2);
    if (bubbleCenterLeft < 12) {
      bubbleStyle.left = `${-x + 12}px`;
      if (arrow) {
        const arrowLeft = Math.max(12, Math.min(bubbleW - 24, x + 16));
        arrow.style.left = `${arrowLeft}px`;
        arrow.style.right = 'auto';
        arrow.style.transform = 'rotate(45deg)';
      }
    } else if (bubbleCenterLeft + bubbleW > winW - 12) {
      bubbleStyle.right = `${x + 56 - (winW - 12)}px`;
      if (arrow) {
        const arrowRight = Math.max(12, Math.min(bubbleW - 24, winW - 12 - (x + 28)));
        arrow.style.right = `${arrowRight}px`;
        arrow.style.left = 'auto';
        arrow.style.transform = 'rotate(45deg)';
      }
    } else {
      bubbleStyle.left = '-92px'; // Center aligned: (56 - 240) / 2 = -92
      if (arrow) {
        arrow.style.left = '50%';
        arrow.style.right = 'auto';
        arrow.style.transform = 'translateX(-50%) rotate(45deg)';
      }
    }

    Object.assign(speechBubble.style, bubbleStyle);
  };

  // Run initial positioning
  setTimeout(updateFloatingElementsPosition, 50);

  // Resize Listener
  window.addEventListener('resize', () => {
    const rect = container.getBoundingClientRect();
    const clamped = getClampedPosition(rect.left, rect.top);
    container.style.left = `${clamped.x}px`;
    container.style.top = `${clamped.y}px`;
    updateFloatingElementsPosition();
  });

  // Trigger random greetings dynamically on idle intervals
  const showSpeechBubble = (text) => {
    if (getState('buddy-minimized', false)) return;
    if (!speechBubble || !speechText || !chatWindow.classList.contains('hidden')) return;
    
    speechText.textContent = text;
    speechBubble.classList.remove('hidden');
    
    // Reposition before showing
    updateFloatingElementsPosition();
    
    setTimeout(() => {
      speechBubble.classList.remove('scale-90', 'opacity-0');
    }, 10);

    // Auto close bubble after 6 seconds
    setTimeout(() => {
      hideSpeechBubble();
    }, 6000);
  };

  const hideSpeechBubble = () => {
    if (!speechBubble || speechBubble.classList.contains('hidden')) return;
    
    speechBubble.classList.add('scale-90', 'opacity-0');
    setTimeout(() => {
      speechBubble.classList.add('hidden');
    }, 300);
  };

  // Launch initial random greeting after 3.5 seconds of page load
  setTimeout(() => {
    const randomGreet = config.greetings[Math.floor(Math.random() * config.greetings.length)];
    showSpeechBubble(randomGreet);
  }, 3500);

  // Periodic random speeches (every 40 seconds)
  setInterval(() => {
    const randomGreet = config.greetings[Math.floor(Math.random() * config.greetings.length)];
    showSpeechBubble(randomGreet);
  }, 40000);

  // 4. Panel Chat Transitions
  const openChat = () => {
    if (getState('buddy-minimized', false)) return;
    hideSpeechBubble();
    if (!chatWindow) return;
    
    chatWindow.classList.remove('hidden');
    avatarBtn.classList.remove('buddy-floating-anim'); // Stop float animation during chat
    
    updateFloatingElementsPosition();
    
    setTimeout(() => {
      chatWindow.classList.remove('translate-y-4', 'opacity-0');
    }, 10);

    // Initial greeting in list if empty
    if (chatMessages && chatMessages.children.length === 0) {
      appendChatMessage(config.name, config.greetings[0], 'bot');
    }
  };

  const closeChat = () => {
    if (!chatWindow) return;
    
    chatWindow.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => {
      chatWindow.classList.add('hidden');
      if (!getState('buddy-minimized', false)) {
        avatarBtn.classList.add('buddy-floating-anim');
      }
    }, 300);
  };

  // Drag and Drop Logic with suppression of click event on drag
  let isDragging = false;
  let startX = 0, startY = 0;
  let dragThreshold = 5; // Pixels
  let totalMoved = 0;

  const onStart = (e) => {
    isDragging = true;
    container.classList.add('buddy-dragged');
    
    // Clear transitions
    container.style.transition = 'none';
    
    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
    
    const rect = container.getBoundingClientRect();
    
    // Offset from cursor to left-top corner of container
    startX = clientX - rect.left;
    startY = clientY - rect.top;
    
    totalMoved = 0;
    
    if (e.type === 'mousedown') {
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onEnd);
    } else {
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('touchend', onEnd);
    }
  };

  const onMove = (e) => {
    if (!isDragging) return;
    
    // Prevent default scrolling for touch devices
    if (e.type === 'touchmove') e.preventDefault();
    
    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
    
    // Calculate new position
    let newX = clientX - startX;
    let newY = clientY - startY;
    
    // Viewport constraints with 12px margin
    const finalX = Math.max(12, Math.min(window.innerWidth - 56 - 12, newX));
    const finalY = Math.max(12, Math.min(window.innerHeight - 56 - 12, newY));
    
    container.style.bottom = 'auto';
    container.style.right = 'auto';
    container.style.left = `${finalX}px`;
    container.style.top = `${finalY}px`;
    
    totalMoved += 1; // Count movements to determine drag vs click
    
    // Update bubble and chat window positions dynamically during drag
    updateFloatingElementsPosition();
  };

  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    container.classList.remove('buddy-dragged');
    container.style.transition = '';
    
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onEnd);
    
    // Save position to state
    const rect = container.getBoundingClientRect();
    setState('buddy-position', { x: rect.left, y: rect.top });
  };

  // Bind drag-and-drop triggers
  avatarBtn.addEventListener('mousedown', onStart);
  avatarBtn.addEventListener('touchstart', onStart, { passive: true });

  // Handle click to toggle chat
  avatarBtn.addEventListener('click', (e) => {
    // If the widget was dragged, ignore click action
    if (totalMoved > dragThreshold) {
      e.preventDefault();
      return;
    }
    
    const minimized = getState('buddy-minimized', false);
    if (minimized) {
      // Restore from minimized
      toggleMinimize(false);
    } else {
      if (chatWindow.classList.contains('hidden')) {
        openChat();
      } else {
        closeChat();
      }
    }
  });

  // Toggle Minimized State
  const toggleMinimize = (minimize) => {
    setState('buddy-minimized', minimize);
    if (minimize) {
      container.classList.add('buddy-minimized');
      avatarBtn.classList.remove('buddy-floating-anim');
      closeChat();
      hideSpeechBubble();
    } else {
      container.classList.remove('buddy-minimized');
      avatarBtn.classList.add('buddy-floating-anim');
      updateFloatingElementsPosition();
    }
  };

  // Double click on avatar toggles minimized
  avatarBtn.addEventListener('dblclick', () => {
    const current = getState('buddy-minimized', false);
    toggleMinimize(!current);
  });

  if (minimizeBuddyBtn) {
    minimizeBuddyBtn.addEventListener('click', () => {
      toggleMinimize(true);
    });
  }

  if (closeChatBtn) closeChatBtn.addEventListener('click', closeChat);

  // 5. Append message to obrolan thread helper
  const appendChatMessage = (senderName, text, role) => {
    if (!chatMessages) return;

    const isBot = role === 'bot';
    const alignClass = isBot ? 'justify-start' : 'justify-end';
    const bubbleCorners = isBot ? 'rounded-2xl rounded-tl-none' : 'rounded-2xl rounded-tr-none';
    
    let msgBg = '';
    if (!isBot) {
      msgBg = 'bg-accent text-white border-transparent ' + 
        (eduLevel === 'sd' 
          ? 'bg-gradient-to-tr from-sky-400 to-blue-500' 
          : (eduLevel === 'kuliah' ? 'bg-gradient-to-tr from-indigo-500 to-violet-600' : 'bg-gradient-to-tr from-amber-500 to-amber-600'));
    } else {
      msgBg = 'bg-gray-100 text-surface-800 border-surface-200/50';
    }

    const messageHTML = `
      <div class="flex ${alignClass} animate-fade-in duration-200">
        <div class="max-w-[85%] p-3 ${bubbleCorners} border text-xs leading-relaxed shadow-sm ${msgBg}">
          <div class="font-extrabold text-[8px] uppercase tracking-widest opacity-60 mb-0.5">${senderName}</div>
          <div>${text}</div>
        </div>
      </div>
    `;

    chatMessages.insertAdjacentHTML('beforeend', messageHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // 6. Handle Typing & Messages sending (AI Simulation)
  const handleUserSendMessage = async () => {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (!text) return;

    // Render user message
    appendChatMessage(username, text, 'user');
    chatInput.value = '';

    // Render loading indicator placeholder
    const loadingId = 'buddy-loading-' + Date.now();
    const loadingHTML = `
      <div id="${loadingId}" class="flex justify-start">
        <div class="max-w-[85%] p-2.5 rounded-2xl border bg-surface-50 border-surface-150 text-surface-500 text-[10px] italic flex items-center gap-1.5 shadow-sm">
          <span class="w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce"></span>
          <span class="w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span class="w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>
      </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', loadingHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Fetch Simulated AI Response
    try {
      const reply = await fetchBuddyResponse(text, eduLevel);
      
      // Remove loading indicator
      const loader = document.getElementById(loadingId);
      if (loader) loader.remove();

      // Render bot response
      appendChatMessage(config.name, reply, 'bot');
    } catch (e) {
      console.error(e);
    }
  };

  if (sendMsgBtn) sendMsgBtn.addEventListener('click', handleUserSendMessage);
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUserSendMessage();
    });
  }

  // Auto initialize Lucide icons if available
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
})();
