import{n as e,t}from"./store-CN3lFKhX.js";import{i as n,n as r,s as i}from"./buddy-BtKjbi9x.js";(function(){let a=t(`edu-level`,`smk`),o=t(`username`,`Keane`),s=new URLSearchParams(window.location.search),c=parseInt(s.get(`id`))||1,l=s.get(`archive`)===`1`,u,d=null;if(l){let e=n[a]||[];for(let t of e){let e=t.courses.find(e=>e.id===c);if(e){u=e,d={period:t.period,year:t.year};break}}}else{let e=r[a]||[];u=e.find(e=>e.id===c)||e[0]}if(!u){alert(`Kelas tidak ditemukan.`),window.location.href=`courses.html`;return}let f=document.getElementById(`profile-name`),p=document.getElementById(`profile-img`);if(f&&(f.textContent=o),p){let e=`2563eb`;a===`sd`&&(e=`0ea5e9`),a===`smk`&&(e=`eab308`),a===`kuliah`&&(e=`6366f1`),p.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(o)}&background=dbeafe&color=${e}`}if(l&&d){let e={A:{badge:`bg-emerald-100 text-emerald-700 border-emerald-300`,bar:`bg-emerald-500`},B:{badge:`bg-blue-100 text-blue-700 border-blue-300`,bar:`bg-blue-500`},C:{badge:`bg-amber-100 text-amber-700 border-amber-300`,bar:`bg-amber-500`},D:{badge:`bg-red-100 text-red-700 border-red-300`,bar:`bg-red-400`}},t=e[u.gradeLetter]||e.D,n=a===`sd`?`bg-gradient-sd`:a===`kuliah`?`bg-gradient-kuliah`:`bg-gradient-smk`,r=a===`sd`?`border-sky-300`:a===`kuliah`?`border-indigo-500`:`border-amber-400`,i=document.getElementById(`breadcrumb-parent`),o=document.getElementById(`breadcrumb-current`);i&&(i.textContent=`${d.period}`),o&&(o.textContent=u.title);let s=document.getElementById(`course-banner`);if(s){s.className=`${n} rounded-3xl p-6 sm:p-8 text-white shadow-xl ${r} border relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px] opacity-90`;let e=document.createElement(`div`);e.className=`absolute top-0 inset-x-0 bg-amber-500/80 backdrop-blur-sm text-white text-xs font-bold flex items-center justify-center gap-2 py-1.5`,e.innerHTML=`<i data-lucide="archive" class="w-3.5 h-3.5"></i> Arsip Akademik &mdash; ${d.period} &bull; ${d.year}`,s.insertAdjacentElement(`afterbegin`,e)}let c=document.getElementById(`course-badge`),l=document.getElementById(`course-title`),f=document.getElementById(`course-teacher`),p=document.getElementById(`course-desc`);c&&(c.textContent=u.tag),l&&(l.textContent=u.title),f&&(f.innerHTML=`<i data-lucide="user" class="w-4 h-4"></i> Pengajar: ${u.teacher}`),p&&(p.textContent=u.description);let m=document.getElementById(`tabs-navigation`),h=document.getElementById(`tab-content`);if(document.querySelector(`.space-y-6 .glass-panel`),m&&(m.closest(`.glass-panel`).outerHTML=``),h){let e=u.modules.map(e=>`
        <div class="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
          <span class="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
            <i data-lucide="check" class="w-3 h-3 text-white"></i>
          </span>
          <span class="text-sm text-surface-800 font-medium">${e.title}</span>
        </div>
      `).join(``);h.innerHTML=`
        <div class="glass-panel rounded-2xl p-5 shadow-sm space-y-3">
          <h3 class="font-bold text-surface-900 text-base font-display flex items-center gap-2">
            <i data-lucide="list-checks" class="w-5 h-5 text-emerald-600"></i>
            Daftar Modul (${u.modules.length} modul)
          </h3>
          <div class="space-y-2">
            ${e}
          </div>
        </div>
      `}let g=document.querySelector(`.lg\\:col-span-2`)?.nextElementSibling;g&&(g.innerHTML=`
        <div class="glass-panel rounded-2xl p-5 shadow-sm space-y-4">
          <h3 class="font-bold text-surface-900 text-base border-b border-surface-100/50 pb-3 font-display">Ringkasan Nilai</h3>
          <div class="flex flex-col items-center py-4">
            <span class="text-5xl font-black text-surface-900">${u.finalScore}</span>
            <span class="text-sm text-surface-500 mt-1">Nilai Akhir</span>
            <span class="mt-3 text-xl font-extrabold px-4 py-1 rounded-full border-2 ${t.badge}">
              Predikat ${u.gradeLetter}
            </span>
          </div>
          <div class="border-t border-surface-100 pt-4 space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-surface-500 flex items-center gap-2">
                <i data-lucide="award" class="w-4 h-4 text-emerald-500"></i>Status
              </span>
              <span class="font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs">Lulus ✅</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-surface-500 flex items-center gap-2">
                <i data-lucide="calendar" class="w-4 h-4 text-surface-400"></i>Periode
              </span>
              <span class="font-semibold text-surface-900 text-xs">${d.period}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-surface-500 flex items-center gap-2">
                <i data-lucide="book-marked" class="w-4 h-4 text-surface-400"></i>Tahun Ajaran
              </span>
              <span class="font-semibold text-surface-900 text-xs">${d.year}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-surface-500 flex items-center gap-2">
                <i data-lucide="book-open-check" class="w-4 h-4 text-surface-400"></i>Total Modul
              </span>
              <span class="font-semibold text-surface-900 text-xs">${u.modules.length} modul selesai</span>
            </div>
          </div>
          <!-- Score bar -->
          <div class="pt-2">
            <div class="flex justify-between text-xs font-semibold text-surface-600 mb-1.5">
              <span>Pencapaian Nilai</span>
              <span class="font-bold">${u.finalScore}/100</span>
            </div>
            <div class="w-full bg-surface-100 rounded-full h-2">
              <div class="${t.bar} h-2 rounded-full" style="width:${u.finalScore}%"></div>
            </div>
          </div>
        </div>
      `),typeof lucide<`u`&&lucide.createIcons();return}let m=i[a],h=document.getElementById(`nav-dashboard-text`),g=document.getElementById(`nav-courses-text`),_=document.getElementById(`nav-calendar-text`),v=document.getElementById(`nav-grades-text`),y=document.getElementById(`nav-files-text`);h&&(h.textContent=m.dashboard),g&&(g.textContent=m.courses),_&&(_.textContent=m.calendar),v&&(v.textContent=m.grades),y&&(y.textContent=m.files);let b=document.getElementById(`course-banner`),x=document.getElementById(`course-badge`),S=document.getElementById(`course-title`),C=document.getElementById(`course-teacher`),w=document.getElementById(`course-desc`),T=document.getElementById(`info-status`),E=document.getElementById(`info-modules-count`),D=document.getElementById(`info-weight`),O=document.getElementById(`info-progress-pct`),k=document.getElementById(`info-progress-bar`),A=document.getElementById(`sd-star-widget`),j=document.getElementById(`sd-stars-count`),M=document.getElementById(`kuliah-academic-widget`),N=document.querySelector(`aside .text-accent-600`),P=t(`progress-course-${u.id}`),F=P===null?u.progress:parseInt(P),I=t(`kuis-stars-${u.id}`)||0;a===`sd`?(b&&(b.className=`bg-gradient-sd rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-sky-300 relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px] hover-lift`),x&&(x.textContent=`Sekolah Dasar (SD)`),D&&(D.className=`hidden`),A&&(A.classList.remove(`hidden`),j&&(j.textContent=`${I} Bintang ⭐`)),T&&(F===100?(T.className=`font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs`,T.textContent=`Selesai 🏆`):(T.className=`font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full text-xs`,T.textContent=`Sedang Belajar`)),k&&(k.className=`bg-sky-400 h-2 rounded-full`),O&&(O.className=`text-sky-500 font-bold`),N&&(N.classList.remove(`text-accent-600`),N.classList.add(`text-sky-500`))):a===`kuliah`?(b&&(b.className=`bg-gradient-kuliah rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500 relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px] hover-lift`),x&&(x.textContent=u.tag),D&&(D.innerHTML=`<span class="text-surface-500 flex items-center gap-2"><i data-lucide="award" class="w-4.5 h-4.5 text-indigo-500"></i>Beban Kuliah</span> <span class="font-bold text-surface-900">${u.tag}</span>`),M&&M.classList.remove(`hidden`),T&&(F===100?(T.className=`font-semibold text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full text-xs`,T.textContent=`Lulus`):(T.className=`font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full text-xs`,T.textContent=`Aktif`)),k&&(k.className=`bg-indigo-600 h-2 rounded-full`),O&&(O.className=`text-indigo-600 font-bold`),N&&(N.classList.remove(`text-accent-600`),N.classList.add(`text-indigo-600`))):(b&&(b.className=`bg-gradient-smk rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-amber-400 relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px] hover-lift`),x&&(x.textContent=`SMK RPL - `+u.tag),D&&(D.innerHTML=`<span class="text-surface-500 flex items-center gap-2"><i data-lucide="award" class="w-4.5 h-4.5 text-amber-500"></i>Kelas</span> <span class="font-bold text-surface-900">${u.tag}</span>`),T&&(F===100?(T.className=`font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs`,T.textContent=`Lulus Kompetensi`):(T.className=`font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full text-xs`,T.textContent=`Belajar Aktif`)),k&&(k.className=`bg-amber-500 h-2 rounded-full`),O&&(O.className=`text-amber-600 font-bold`),N&&(N.classList.remove(`text-accent-600`),N.classList.add(`text-amber-500`))),S&&(S.textContent=u.title),C&&(C.innerHTML=`<i data-lucide="user" class="w-4 h-4"></i> Pengajar: ${u.teacher}`),w&&(w.textContent=u.description);let L=()=>{let t=R(),n=t.filter(e=>e.completed).length,r=Math.round(n/t.length*100);E&&(E.textContent=`${n} / ${t.length} Modul`),O&&(O.textContent=`${r}%`),k&&(k.style.width=`${r}%`),e(`progress-course-${u.id}`,r)},R=()=>{let n=`modules-course-${u.id}`;return t(n)||(e(n,u.modules),u.modules)},z=t=>{e(`modules-course-${u.id}`,t),L()},B=document.getElementById(`tabs-navigation`),V=document.getElementById(`tab-content`),H={sd:[{id:`modul`,label:`Modul Ceria 📖`},{id:`kuis`,label:`Kuis Bintang ⭐`}],smk:[{id:`modul`,label:`Materi & Modul 📁`},{id:`tugas`,label:`Dropbox Tugas 🚀`}],kuliah:[{id:`modul`,label:`Silabus & Modul 📚`},{id:`tugas`,label:`Submisi Tugas 🎓`},{id:`diskusi`,label:`Forum Diskusi 💬`}]},U=`modul`,W=()=>{if(!B)return;B.innerHTML=``;let e=a===`sd`?`bg-sky-100 text-sky-700`:a===`kuliah`?`bg-indigo-100 text-indigo-700`:`bg-amber-100 text-amber-700`;H[a].forEach(t=>{let n=t.id===U,r=document.createElement(`button`);r.className=`flex-1 py-2 text-center rounded-lg cursor-pointer transition-all ${n?e:`text-surface-600 hover:bg-surface-50 hover:text-surface-900`}`,r.textContent=t.label,r.addEventListener(`click`,()=>{U=t.id,W(),G()}),B.appendChild(r)})},G=()=>{if(!V)return;V.innerHTML=``;let n=a===`sd`?`group-hover:text-sky-500`:a===`kuliah`?`group-hover:text-indigo-600`:`group-hover:text-amber-600`,r=a===`sd`?`text-sky-500 bg-sky-50`:a===`kuliah`?`text-indigo-600 bg-indigo-50`:`text-amber-500 bg-amber-50`;if(U===`modul`){let e=R(),t=`<div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 class="font-bold text-surface-900 text-base flex items-center justify-between">
          <span>Daftar Materi Pembelajaran</span>
          <span class="text-xs font-medium text-surface-400">Klik ikon centang untuk menyelesaikan</span>
        </h3>
        <div class="space-y-2.5">`;e.forEach((e,i)=>{let a=e.completed?`check-circle-2`:`circle`,o=e.completed?r:`text-surface-300 hover:text-surface-500`;t+=`
          <div class="flex items-center justify-between p-3.5 border border-surface-100 rounded-xl hover:bg-surface-50/50 hover:border-surface-200 hover-lift transition-all group">
            <div class="flex items-center gap-3">
              <span class="w-7 h-7 bg-surface-100 text-surface-600 flex items-center justify-center font-bold text-xs rounded-lg">${i+1}</span>
              <div>
                <h4 class="font-bold text-sm text-surface-900 group-hover:${n} transition-colors line-clamp-1">${e.title}</h4>
                <p class="text-xs text-surface-400 mt-0.5 flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${e.dur}</p>
              </div>
            </div>
            <button data-mod-idx="${i}" class="toggle-module-btn p-1 ${o} rounded-lg transition-colors cursor-pointer">
              <i data-lucide="${a}" class="w-5 h-5"></i>
            </button>
          </div>
        `}),t+=`</div></div>`,V.innerHTML=t,document.querySelectorAll(`.toggle-module-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-mod-idx`)),n=R();n[t].completed=!n[t].completed,z(n),G()})})}else if(U===`tugas`){let n=u.tasks&&u.tasks[0]?u.tasks[0]:{title:`Tugas Proyek Mandiri Kelas`,due:`Besok, 23:59 WIB`,pts:100},r=`tugas-status-${u.id}`,i=t(r)===`true`||t(r)===!0,o=`file-uploader-${u.id}`,s=``;s=i?`
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
              <input type="file" id="${o}" class="hidden" />
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
              <div id="upload-progress-bar" class="h-1.5 rounded-full ${a===`kuliah`?`bg-indigo-600`:`bg-amber-500`}" style="width: 0%"></div>
            </div>
          </div>
        `,V.innerHTML=`
        <div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-5">
          <div class="flex justify-between items-start border-b border-surface-100 pb-4">
            <div>
              <span class="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-50 text-orange-600"><i data-lucide="clock" class="w-2.5 h-2.5"></i> Tugas Proyek</span>
              <h3 class="font-bold text-surface-900 text-base mt-2">${n.title}</h3>
              <p class="text-xs text-surface-500 mt-1 flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> Batas Pengumpulan: <strong>${n.due}</strong></p>
            </div>
            <div class="text-right">
              <span class="text-xs text-surface-500 block">Bobot Nilai</span>
              <span class="font-extrabold text-lg text-surface-900">${n.pts} <span class="text-xs font-medium text-surface-400">Poin</span></span>
            </div>
          </div>

          <!-- Dropbox container -->
          <div class="space-y-4">
            <h4 class="font-bold text-sm text-surface-900">Pengumpulan Berkas Mandiri</h4>
            ${s}
          </div>
        </div>
      `;let c=document.getElementById(`drag-drop-zone`),l=document.getElementById(`submit-task-btn`),d=document.getElementById(`selected-file-label`);c&&c.addEventListener(`click`,()=>{d&&(d.classList.remove(`hidden`),c.classList.add(`border-emerald-300`,`bg-emerald-50/10`),l&&(l.className=`w-full py-2.5 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer ${a===`kuliah`?`bg-indigo-600 hover:bg-indigo-700`:`bg-amber-500 hover:bg-amber-600`}`,l.removeAttribute(`disabled`)))}),l&&l.addEventListener(`click`,()=>{let t=document.getElementById(`upload-panel`),n=document.getElementById(`upload-progress-panel`),i=document.getElementById(`upload-progress-bar`),a=document.getElementById(`upload-progress-pct`);if(t&&n){t.classList.add(`hidden`),n.classList.remove(`hidden`);let o=0,s=setInterval(()=>{o+=10,i&&(i.style.width=`${o}%`),a&&(a.textContent=`${o}%`),o>=100&&(clearInterval(s),e(r,`true`),G())},150)}})}else if(U===`kuis`){let t=u.kuis||[],n=`
        <div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-6">
          <div class="border-b border-surface-100 pb-4">
            <h3 class="font-extrabold text-sky-600 text-lg flex items-center gap-2">
              <i data-lucide="star" class="w-6 h-6 fill-sky-400 text-sky-500"></i>
              Teka-Teki Kuis Ceria
            </h3>
            <p class="text-xs text-surface-500 mt-1">Jawab pertanyaan teka-teki dengan benar dan kumpulkan bintang prestasimu!</p>
          </div>
          
          <div class="space-y-5">
      `;t.forEach((e,t)=>{n+=`
          <div class="space-y-3 p-4 border border-surface-100 rounded-2xl bg-surface-50/20">
            <h4 class="font-bold text-sm text-surface-900">${t+1}. ${e.q}</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        `,e.a.forEach((t,r)=>{n+=`
            <label class="option-label flex items-center gap-3 p-3 bg-white hover:bg-sky-50/50 border border-surface-200 hover:border-sky-300 rounded-xl cursor-pointer transition-all text-xs font-semibold">
              <input type="radio" name="quiz-q-${e.id}" value="${r}" class="accent-sky-500 w-4 h-4 cursor-pointer" />
              <span>${t}</span>
            </label>
          `}),n+=`</div></div>`}),n+=`
          </div>
          
          <button
            id="submit-quiz-btn"
            class="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2"
          >
            <i data-lucide="sparkles" class="w-4.5 h-4.5"></i>
            Periksa Hasil Kuis Ceria!
          </button>
        </div>
      `,V.innerHTML=n;let r=document.getElementById(`submit-quiz-btn`);r&&r.addEventListener(`click`,()=>{let n=!0,r=!1;if(t.forEach(e=>{let t=document.querySelector(`input[name="quiz-q-${e.id}"]:checked`);t?parseInt(t.value)!==e.correct&&(n=!1):r=!0}),r){alert(`Oops! Jawab semua pertanyaan dulu ya! 😊`);return}n?(typeof confetti<`u`&&confetti({particleCount:150,spread:80,origin:{y:.6}}),e(`kuis-stars-${u.id}`,10),A&&j&&(j.textContent=`10 Bintang ⭐`),alert(`Wah Hebat Sekali! Kamu menjawab 100% Benar! Kamu dapat 10 Bintang Prestasi! 🌟🎉`)):alert(`Ada jawaban yang belum tepat. Yuk coba periksa lagi, kamu pasti bisa! 💪`)})}else if(U===`diskusi`){let n=()=>{let n=`forum-course-${u.id}`,r=t(n);if(r)return r;let i=[{name:u.teacher,role:`Pengajar`,text:`Selamat siang rekan-rekan mahasiswa. Silakan unggah laporan pengerjaan dokumen SRS Bab 3 kelompok Anda pada tenggat dropbox yang telah diaktifkan hari ini. Pastikan berkas sesuai standar format IEEE.`,time:`11:15 WIB`},{name:`Nabila Putri`,role:`Mahasiswa`,text:`Selamat siang Pak. Izin bertanya, untuk pemodelan UML apakah harus dijabarkan secara rinci sampai ke sequence diagram atau cukup structural diagram saja?`,time:`11:32 WIB`},{name:u.teacher,role:`Pengajar`,text:`Sequence diagram wajib dijabarkan terperinci untuk usecase skenario utama yang memiliki kompleksitas tinggi. Untuk usecase pelengkap cukup class diagram saja.`,time:`11:40 WIB`}];return e(n,i),i},r=n(),i=`
        <div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col min-h-[380px]">
          <h3 class="font-bold text-surface-900 text-base border-b border-surface-100 pb-3 flex items-center gap-2">
            <i data-lucide="message-square" class="w-5 h-5 text-indigo-500"></i> Forum Diskusi Perkuliahan
          </h3>

          <!-- Chat messages area -->
          <div id="forum-thread" class="flex-1 space-y-4 max-h-[250px] overflow-y-auto pr-1">
      `;r.forEach(e=>{let t=e.role===`Pengajar`?`bg-red-50 text-red-600 border-red-100`:`bg-indigo-50 text-indigo-600 border-indigo-100`;i+=`
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
        `}),i+=`
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
      `,V.innerHTML=i;let a=document.getElementById(`forum-input`),s=document.getElementById(`send-forum-btn`),c=()=>{if(!a)return;let t=a.value.trim();if(!t)return;let r={name:o,role:`Mahasiswa`,text:t,time:`${String(new Date().getHours()).padStart(2,`0`)}:${String(new Date().getMinutes()).padStart(2,`0`)} WIB`},i=n();i.push(r),e(`forum-course-${u.id}`,i),a.value=``,G(),setTimeout(()=>{let e=document.getElementById(`forum-thread`);e&&(e.scrollTop=e.scrollHeight)},50)};s&&s.addEventListener(`click`,c),a&&a.addEventListener(`keypress`,e=>{e.key===`Enter`&&c()})}typeof lucide<`u`&&lucide.createIcons()};L(),W(),G()})();