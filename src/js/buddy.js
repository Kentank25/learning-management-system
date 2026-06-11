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
        totalStars += parseInt(localStorage.getItem(`kuis-stars-${i}`) || 0);
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
        const raw = localStorage.getItem(`modules-course-${cId}`);
        if (raw) {
          const list = JSON.parse(raw);
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
        const raw = localStorage.getItem(`modules-course-${cId}`);
        if (raw) {
          const list = JSON.parse(raw);
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

const fetchBuddyResponse = async (userMessage, level) => {
  // Simulate network latency (250ms - 550ms) for an organic AI feel
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 250));

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

(function() {
  const eduLevel = localStorage.getItem('edu-level') || 'smk';
  const username = localStorage.getItem('username') || 'Keane';
  const config = PERSONA_CONFIGS[eduLevel];

  // 1. Inject Custom Floating Animations to Document Head
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
    `;
    document.head.appendChild(styleEl);
  }

  // 2. Build and Inject DOM Widget Structure
  const container = document.createElement('div');
  container.id = 'sekolahmu-buddy-container';
  container.className = 'fixed bottom-6 right-6 z-40 font-sans flex flex-col items-end pointer-events-none';
  
  // Calculate dynamic progression stats
  const prog = config.getProgression();

  container.innerHTML = `
    <!-- Speech Bubble -->
    <div id="buddy-speech-bubble" class="hidden pointer-events-auto max-w-[240px] bg-white border border-surface-200 shadow-xl rounded-2xl p-3 mb-3 text-xs text-surface-800 relative transform scale-90 opacity-0 transition-all duration-300">
      <p id="buddy-speech-text" class="leading-relaxed font-semibold"></p>
      <!-- Arrow -->
      <div class="absolute bottom-[-6px] right-6 w-3 h-3 bg-white border-r border-b border-surface-200 rotate-45"></div>
    </div>

    <!-- Floating Avatar Icon -->
    <button id="buddy-avatar-btn" class="pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg border-2 cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 relative select-none buddy-floating-anim ${config.btnClass}">
      <span id="buddy-emoji">${prog.emoji}</span>
      <!-- Status Badge -->
      <span id="buddy-status-indicator" class="absolute top-[-3px] right-[-3px] px-1.5 py-0.5 rounded-full border-2 border-white text-[8px] font-extrabold shadow-sm ${config.indicatorColor}">
        ${prog.val}
      </span>
    </button>

    <!-- Interactive Chat Window Console -->
    <div id="buddy-chat-window" class="hidden pointer-events-auto w-[310px] sm:w-[350px] buddy-glass border border-surface-200 rounded-3xl shadow-2xl p-4 mt-3 flex flex-col max-h-[420px] transform translate-y-4 opacity-0 transition-all duration-300">
      <!-- Chat Header -->
      <div class="flex items-center justify-between border-b border-surface-100 pb-3">
        <div class="flex items-center gap-2.5">
          <span id="buddy-chat-avatar" class="text-3xl">${prog.emoji}</span>
          <div>
            <h4 class="font-extrabold text-sm text-surface-900 leading-tight">${config.name}</h4>
            <p id="buddy-chat-subtitle" class="text-[9px] text-surface-500 font-bold uppercase tracking-wider mt-0.5">${prog.label}</p>
          </div>
        </div>
        <button id="close-buddy-chat" class="p-1 hover:bg-surface-100 text-surface-400 hover:text-surface-600 rounded-lg cursor-pointer transition-all active:scale-90">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      <!-- Dialogue Thread -->
      <div id="buddy-chat-messages" class="flex-1 overflow-y-auto py-3.5 space-y-3 pr-1 text-xs max-h-[220px] scrollbar-thin">
        <!-- Initial Message -->
      </div>

      <!-- User Input Interface -->
      <div class="border-t border-surface-100 pt-3 flex gap-2">
        <input 
          type="text" 
          id="buddy-chat-input" 
          placeholder="Ketik pesan (tips, kuis, lelucon)..." 
          class="w-full px-3.5 py-2 border border-surface-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 rounded-xl text-xs outline-none transition-all"
        />
        <button 
          id="send-buddy-msg" 
          class="px-3.5 py-2 text-white font-bold rounded-xl text-xs shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center ${eduLevel === 'sd' ? 'bg-sky-500 hover:bg-sky-600' : (eduLevel === 'kuliah' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-amber-500 hover:bg-amber-600')}"
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
  const chatMessages = document.getElementById('buddy-chat-messages');
  const chatInput = document.getElementById('buddy-chat-input');
  const sendMsgBtn = document.getElementById('send-buddy-msg');

  // Trigger random greetings dynamically on idle intervals
  const showSpeechBubble = (text) => {
    if (!speechBubble || !speechText || !chatWindow.classList.contains('hidden')) return;
    
    speechText.textContent = text;
    speechBubble.classList.remove('hidden');
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

  // Launch initial random greeting after 3 seconds of page load
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
    hideSpeechBubble();
    if (!chatWindow) return;
    
    chatWindow.classList.remove('hidden');
    avatarBtn.classList.remove('buddy-floating-anim'); // Stop float animation during chat to keep it stable
    
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
      avatarBtn.classList.add('buddy-floating-anim');
    }, 300);
  };

  avatarBtn.addEventListener('click', () => {
    if (chatWindow.classList.contains('hidden')) {
      openChat();
    } else {
      closeChat();
    }
  });

  if (closeChatBtn) closeChatBtn.addEventListener('click', closeChat);

  // 5. Append message to obrolan thread helper
  const appendChatMessage = (senderName, text, role) => {
    if (!chatMessages) return;

    const isBot = role === 'bot';
    const alignClass = isBot ? 'justify-start' : 'justify-end';
    const bubbleCorners = isBot ? 'rounded-2xl rounded-tl-none' : 'rounded-2xl rounded-tr-none';
    
    let msgBg = 'bg-surface-100 text-surface-800 border-surface-200/60';
    if (!isBot) {
      msgBg = eduLevel === 'sd' 
        ? 'bg-gradient-to-tr from-sky-400 to-blue-500 text-white border-transparent shadow-sky-100' 
        : (eduLevel === 'kuliah' ? 'bg-gradient-to-tr from-indigo-500 to-violet-600 text-white border-transparent shadow-indigo-100' : 'bg-gradient-to-tr from-amber-500 to-amber-600 text-white border-transparent shadow-amber-100');
    } else {
      if (eduLevel === 'sd') msgBg = 'bg-sky-50/90 text-sky-950 border-sky-100/60';
      if (eduLevel === 'kuliah') msgBg = 'bg-indigo-50/90 text-indigo-950 border-indigo-100/60';
      if (eduLevel === 'smk') msgBg = 'bg-amber-50/90 text-amber-950 border-amber-100/60';
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
