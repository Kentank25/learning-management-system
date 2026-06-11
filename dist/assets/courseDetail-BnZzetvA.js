import"./css-YCSnT0AX.js";import{n as e,o as t}from"./buddy-BMpf7Vy_.js";(function(){let n=localStorage.getItem(`edu-level`)||`smk`,r=localStorage.getItem(`username`)||`Keane`,i=new URLSearchParams(window.location.search),a=parseInt(i.get(`id`))||1,o=e[n]||[],s=o.find(e=>e.id===a)||o[0];if(!s){alert(`Kelas tidak ditemukan.`),window.location.href=`courses.html`;return}let c=document.getElementById(`profile-name`),l=document.getElementById(`profile-img`);if(c&&(c.textContent=r),l){let e=`2563eb`;n===`sd`&&(e=`0ea5e9`),n===`smk`&&(e=`eab308`),n===`kuliah`&&(e=`6366f1`),l.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(r)}&background=dbeafe&color=${e}`}let u=t[n],d=document.getElementById(`nav-dashboard-text`),f=document.getElementById(`nav-courses-text`),p=document.getElementById(`nav-calendar-text`),m=document.getElementById(`nav-grades-text`),h=document.getElementById(`nav-files-text`);d&&(d.textContent=u.dashboard),f&&(f.textContent=u.courses),p&&(p.textContent=u.calendar),m&&(m.textContent=u.grades),h&&(h.textContent=u.files);let g=document.getElementById(`course-banner`),_=document.getElementById(`course-badge`),v=document.getElementById(`course-title`),y=document.getElementById(`course-teacher`),b=document.getElementById(`course-desc`),x=document.getElementById(`info-status`),S=document.getElementById(`info-modules-count`),C=document.getElementById(`info-weight`),w=document.getElementById(`info-progress-pct`),T=document.getElementById(`info-progress-bar`),E=document.getElementById(`sd-star-widget`),D=document.getElementById(`sd-stars-count`),O=document.getElementById(`kuliah-academic-widget`),k=document.querySelector(`aside .text-accent-600`),A=localStorage.getItem(`progress-course-${s.id}`),j=A===null?s.progress:parseInt(A),M=localStorage.getItem(`kuis-stars-${s.id}`)||0;n===`sd`?(g&&(g.className=`bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-sky-300 relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px]`),_&&(_.textContent=`Sekolah Dasar (SD)`),C&&(C.className=`hidden`),E&&(E.classList.remove(`hidden`),D&&(D.textContent=`${M} Bintang ⭐`)),x&&(j===100?(x.className=`font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs`,x.textContent=`Selesai 🏆`):(x.className=`font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full text-xs`,x.textContent=`Sedang Belajar`)),T&&(T.className=`bg-sky-400 h-2 rounded-full`),w&&(w.className=`text-sky-500 font-bold`),k&&(k.classList.remove(`text-accent-600`),k.classList.add(`text-sky-500`))):n===`kuliah`?(g&&(g.className=`bg-gradient-to-r from-indigo-600 to-violet-800 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-indigo-400 relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px]`),_&&(_.textContent=s.tag),C&&(C.innerHTML=`<span class="text-surface-500 flex items-center gap-2"><i data-lucide="award" class="w-4.5 h-4.5 text-indigo-500"></i>Beban Kuliah</span> <span class="font-bold text-surface-900">${s.tag}</span>`),O&&O.classList.remove(`hidden`),x&&(j===100?(x.className=`font-semibold text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full text-xs`,x.textContent=`Lulus`):(x.className=`font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full text-xs`,x.textContent=`Aktif`)),T&&(T.className=`bg-indigo-600 h-2 rounded-full`),w&&(w.className=`text-indigo-600 font-bold`),k&&(k.classList.remove(`text-accent-600`),k.classList.add(`text-indigo-600`))):(g&&(g.className=`bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-amber-400 relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px]`),_&&(_.textContent=`SMK RPL - `+s.tag),C&&(C.innerHTML=`<span class="text-surface-500 flex items-center gap-2"><i data-lucide="award" class="w-4.5 h-4.5 text-amber-500"></i>Semester</span> <span class="font-bold text-surface-900">${s.tag}</span>`),x&&(j===100?(x.className=`font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs`,x.textContent=`Lulus Kompetensi`):(x.className=`font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full text-xs`,x.textContent=`Belajar Aktif`)),T&&(T.className=`bg-amber-500 h-2 rounded-full`),w&&(w.className=`text-amber-600 font-bold`),k&&(k.classList.remove(`text-accent-600`),k.classList.add(`text-amber-500`))),v&&(v.textContent=s.title),y&&(y.innerHTML=`<i data-lucide="user" class="w-4 h-4"></i> Pengajar: ${s.teacher}`),b&&(b.textContent=s.description);let N=()=>{let e=P(),t=e.filter(e=>e.completed).length,n=Math.round(t/e.length*100);S&&(S.textContent=`${t} / ${e.length} Modul`),w&&(w.textContent=`${n}%`),T&&(T.style.width=`${n}%`),localStorage.setItem(`progress-course-${s.id}`,n)},P=()=>{let e=`modules-course-${s.id}`,t=localStorage.getItem(e);return t?JSON.parse(t):(localStorage.setItem(e,JSON.stringify(s.modules)),s.modules)},F=e=>{localStorage.setItem(`modules-course-${s.id}`,JSON.stringify(e)),N()},I=document.getElementById(`tabs-navigation`),L=document.getElementById(`tab-content`),R={sd:[{id:`modul`,label:`Modul Ceria 📖`},{id:`kuis`,label:`Kuis Bintang ⭐`}],smk:[{id:`modul`,label:`Materi & Modul 📁`},{id:`tugas`,label:`Dropbox Tugas 🚀`}],kuliah:[{id:`modul`,label:`Silabus & Modul 📚`},{id:`tugas`,label:`Submisi Tugas 🎓`},{id:`diskusi`,label:`Forum Diskusi 💬`}]},z=`modul`,B=()=>{if(!I)return;I.innerHTML=``;let e=n===`sd`?`bg-sky-100 text-sky-700`:n===`kuliah`?`bg-indigo-100 text-indigo-700`:`bg-amber-100 text-amber-700`;R[n].forEach(t=>{let n=t.id===z,r=document.createElement(`button`);r.className=`flex-1 py-2 text-center rounded-lg cursor-pointer transition-all ${n?e:`text-surface-600 hover:bg-surface-50 hover:text-surface-900`}`,r.textContent=t.label,r.addEventListener(`click`,()=>{z=t.id,B(),V()}),I.appendChild(r)})},V=()=>{if(!L)return;L.innerHTML=``;let e=n===`sd`?`group-hover:text-sky-500`:n===`kuliah`?`group-hover:text-indigo-600`:`group-hover:text-amber-600`,t=n===`sd`?`text-sky-500 bg-sky-50`:n===`kuliah`?`text-indigo-600 bg-indigo-50`:`text-amber-500 bg-amber-50`;if(z===`modul`){let n=P(),r=`<div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 class="font-bold text-surface-900 text-base flex items-center justify-between">
          <span>Daftar Materi Pembelajaran</span>
          <span class="text-xs font-medium text-surface-400">Klik ikon centang untuk menyelesaikan</span>
        </h3>
        <div class="space-y-2.5">`;n.forEach((n,i)=>{let a=n.completed?`check-circle-2`:`circle`,o=n.completed?t:`text-surface-300 hover:text-surface-500`;r+=`
          <div class="flex items-center justify-between p-3.5 border border-surface-100 rounded-xl hover:bg-surface-50/50 hover:border-surface-200 transition-all group">
            <div class="flex items-center gap-3">
              <span class="w-7 h-7 bg-surface-100 text-surface-600 flex items-center justify-center font-bold text-xs rounded-lg">${i+1}</span>
              <div>
                <h4 class="font-bold text-sm text-surface-900 group-hover:${e} transition-colors line-clamp-1">${n.title}</h4>
                <p class="text-xs text-surface-400 mt-0.5 flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${n.dur}</p>
              </div>
            </div>
            <button data-mod-idx="${i}" class="toggle-module-btn p-1 ${o} rounded-lg transition-colors cursor-pointer">
              <i data-lucide="${a}" class="w-5 h-5"></i>
            </button>
          </div>
        `}),r+=`</div></div>`,L.innerHTML=r,document.querySelectorAll(`.toggle-module-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-mod-idx`)),n=P();n[t].completed=!n[t].completed,F(n),V()})})}else if(z===`tugas`){let e=s.tasks&&s.tasks[0]?s.tasks[0]:{title:`Tugas Proyek Mandiri Kelas`,due:`Besok, 23:59 WIB`,pts:100},t=`tugas-status-${s.id}`,r=localStorage.getItem(t)===`true`,i=`file-uploader-${s.id}`,a=``;a=r?`
          <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-800 text-sm font-medium">
            <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600"></i>
            <div>
              <p class="font-bold text-emerald-950">Berkas Tugas Sudah Dikumpulkan!</p>
              <p class="text-xs text-emerald-700 mt-0.5">Dikirim pada: Baru saja</p>
            </div>
          </div>
        `:`
          <div id="upload-panel" class="space-y-4">
            <!-- Drag Area -->
            <div id="drag-drop-zone" class="border-2 border-dashed border-surface-200 hover:border-accent-400 hover:bg-surface-50 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2">
              <i data-lucide="upload-cloud" class="w-10 h-10 text-surface-400"></i>
              <span class="text-sm font-semibold text-surface-800">Pilih Berkas Tugas Anda</span>
              <span class="text-xs text-surface-400 mt-0.5">PDF, ZIP, atau RAR (Maks. 20MB)</span>
              <!-- Mock Input File -->
              <input type="file" id="${i}" class="hidden" />
              <div id="selected-file-label" class="hidden text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg font-medium">
                Nama File: skema-toko-online.zip
              </div>
            </div>

            <!-- submit btn -->
            <button
              id="submit-task-btn"
              disabled
              class="w-full py-2.5 bg-surface-200 text-surface-400 cursor-not-allowed font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
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
              <div id="upload-progress-bar" class="h-1.5 rounded-full ${n===`kuliah`?`bg-indigo-600`:`bg-amber-500`}" style="width: 0%"></div>
            </div>
          </div>
        `,L.innerHTML=`
        <div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-5">
          <div class="flex justify-between items-start border-b border-surface-100 pb-4">
            <div>
              <span class="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-50 text-orange-600"><i data-lucide="clock" class="w-2.5 h-2.5"></i> Tugas Proyek</span>
              <h3 class="font-bold text-surface-900 text-base mt-2">${e.title}</h3>
              <p class="text-xs text-surface-500 mt-1 flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> Batas Pengumpulan: <strong>${e.due}</strong></p>
            </div>
            <div class="text-right">
              <span class="text-xs text-surface-500 block">Bobot Nilai</span>
              <span class="font-extrabold text-lg text-surface-900">${e.pts} <span class="text-xs font-medium text-surface-400">Poin</span></span>
            </div>
          </div>

          <!-- Dropbox container -->
          <div class="space-y-4">
            <h4 class="font-bold text-sm text-surface-900">Pengumpulan Berkas Mandiri</h4>
            ${a}
          </div>
        </div>
      `;let o=document.getElementById(`drag-drop-zone`),c=document.getElementById(`submit-task-btn`),l=document.getElementById(`selected-file-label`);o&&o.addEventListener(`click`,()=>{l&&(l.classList.remove(`hidden`),o.classList.add(`border-emerald-300`,`bg-emerald-50/10`),c&&(c.className=`w-full py-2.5 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer ${n===`kuliah`?`bg-indigo-600 hover:bg-indigo-700`:`bg-amber-500 hover:bg-amber-600`}`,c.removeAttribute(`disabled`)))}),c&&c.addEventListener(`click`,()=>{let e=document.getElementById(`upload-panel`),n=document.getElementById(`upload-progress-panel`),r=document.getElementById(`upload-progress-bar`),i=document.getElementById(`upload-progress-pct`);if(e&&n){e.classList.add(`hidden`),n.classList.remove(`hidden`);let a=0,o=setInterval(()=>{a+=10,r&&(r.style.width=`${a}%`),i&&(i.textContent=`${a}%`),a>=100&&(clearInterval(o),localStorage.setItem(t,`true`),V())},150)}})}else if(z===`kuis`){let e=s.kuis||[],t=`
        <div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-6">
          <div class="border-b border-surface-100 pb-4">
            <h3 class="font-extrabold text-sky-600 text-lg flex items-center gap-2">
              <i data-lucide="star" class="w-6 h-6 fill-sky-400 text-sky-500"></i>
              Teka-Teki Kuis Ceria
            </h3>
            <p class="text-xs text-surface-500 mt-1">Jawab pertanyaan teka-teki dengan benar dan kumpulkan bintang prestasimu!</p>
          </div>
          
          <div class="space-y-5">
      `;e.forEach((e,n)=>{t+=`
          <div class="space-y-3 p-4 border border-surface-100 rounded-2xl bg-surface-50/20">
            <h4 class="font-bold text-sm text-surface-900">${n+1}. ${e.q}</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        `,e.a.forEach((n,r)=>{t+=`
            <label class="option-label flex items-center gap-3 p-3 bg-white hover:bg-sky-50/50 border border-surface-200 hover:border-sky-300 rounded-xl cursor-pointer transition-all text-xs font-semibold">
              <input type="radio" name="quiz-q-${e.id}" value="${r}" class="accent-sky-500 w-4 h-4 cursor-pointer" />
              <span>${n}</span>
            </label>
          `}),t+=`</div></div>`}),t+=`
          </div>
          
          <button
            id="submit-quiz-btn"
            class="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2"
          >
            <i data-lucide="sparkles" class="w-4.5 h-4.5"></i>
            Periksa Hasil Kuis Ceria!
          </button>
        </div>
      `,L.innerHTML=t;let n=document.getElementById(`submit-quiz-btn`);n&&n.addEventListener(`click`,()=>{let t=!0,n=!1;if(e.forEach(e=>{let r=document.querySelector(`input[name="quiz-q-${e.id}"]:checked`);r?parseInt(r.value)!==e.correct&&(t=!1):n=!0}),n){alert(`Oops! Jawab semua pertanyaan dulu ya! 😊`);return}t?(typeof confetti<`u`&&confetti({particleCount:150,spread:80,origin:{y:.6}}),localStorage.setItem(`kuis-stars-${s.id}`,10),E&&D&&(D.textContent=`10 Bintang ⭐`),alert(`Wah Hebat Sekali! Kamu menjawab 100% Benar! Kamu dapat 10 Bintang Prestasi! 🌟🎉`)):alert(`Ada jawaban yang belum tepat. Yuk coba periksa lagi, kamu pasti bisa! 💪`)})}else if(z===`diskusi`){let e=()=>{let e=`forum-course-${s.id}`,t=localStorage.getItem(e);if(t)return JSON.parse(t);let n=[{name:s.teacher,role:`Pengajar`,text:`Selamat siang rekan-rekan mahasiswa. Silakan unggah laporan pengerjaan dokumen SRS Bab 3 kelompok Anda pada tenggat dropbox yang telah diaktifkan hari ini. Pastikan berkas sesuai standar format IEEE.`,time:`11:15 WIB`},{name:`Nabila Putri`,role:`Mahasiswa`,text:`Selamat siang Pak. Izin bertanya, untuk pemodelan UML apakah harus dijabarkan secara rinci sampai ke sequence diagram atau cukup structural diagram saja?`,time:`11:32 WIB`},{name:s.teacher,role:`Pengajar`,text:`Sequence diagram wajib dijabarkan terperinci untuk usecase skenario utama yang memiliki kompleksitas tinggi. Untuk usecase pelengkap cukup class diagram saja.`,time:`11:40 WIB`}];return localStorage.setItem(e,JSON.stringify(n)),n},t=e(),n=`
        <div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col min-h-[380px]">
          <h3 class="font-bold text-surface-900 text-base border-b border-surface-100 pb-3 flex items-center gap-2">
            <i data-lucide="message-square" class="w-5 h-5 text-indigo-500"></i> Forum Diskusi Perkuliahan
          </h3>

          <!-- Chat messages area -->
          <div id="forum-thread" class="flex-1 space-y-4 max-h-[250px] overflow-y-auto pr-1">
      `;t.forEach(e=>{let t=e.role===`Pengajar`?`bg-red-50 text-red-600 border-red-100`:`bg-indigo-50 text-indigo-600 border-indigo-100`;n+=`
          <div class="p-3 bg-surface-50 rounded-xl space-y-1.5 border border-surface-100">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="font-bold text-xs text-surface-900">${e.name}</span>
                <span class="inline-flex items-center text-[9px] font-bold border px-1.5 py-0.5 rounded-full ${t}">${e.role}</span>
              </div>
              <span class="text-[10px] text-surface-400 font-semibold">${e.time}</span>
            </div>
            <p class="text-xs text-surface-700 leading-relaxed">${e.text}</p>
          </div>
        `}),n+=`
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
              class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md active:scale-98 transition-colors cursor-pointer text-sm flex items-center justify-center gap-1.5"
            >
              <span>Kirim</span>
              <i data-lucide="send" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `,L.innerHTML=n;let i=document.getElementById(`forum-input`),a=document.getElementById(`send-forum-btn`),o=()=>{if(!i)return;let t=i.value.trim();if(!t)return;let n={name:r,role:`Mahasiswa`,text:t,time:`${String(new Date().getHours()).padStart(2,`0`)}:${String(new Date().getMinutes()).padStart(2,`0`)} WIB`},a=e();a.push(n),localStorage.setItem(`forum-course-${s.id}`,JSON.stringify(a)),i.value=``,V(),setTimeout(()=>{let e=document.getElementById(`forum-thread`);e&&(e.scrollTop=e.scrollHeight)},50)};a&&a.addEventListener(`click`,o),i&&i.addEventListener(`keypress`,e=>{e.key===`Enter`&&o()})}typeof lucide<`u`&&lucide.createIcons()};N(),B(),V()})();