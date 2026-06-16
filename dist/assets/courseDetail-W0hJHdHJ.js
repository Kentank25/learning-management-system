import{n as e,t}from"./store-5R8oxc92.js";import{n,o as r}from"./buddy-CvtKqBNh.js";(function(){let i=t(`edu-level`,`smk`),a=t(`username`,`Keane`),o=new URLSearchParams(window.location.search),s=parseInt(o.get(`id`))||1,c=n[i]||[],l=c.find(e=>e.id===s)||c[0];if(!l){alert(`Kelas tidak ditemukan.`),window.location.href=`courses.html`;return}let u=document.getElementById(`profile-name`),d=document.getElementById(`profile-img`);if(u&&(u.textContent=a),d){let e=`2563eb`;i===`sd`&&(e=`0ea5e9`),i===`smk`&&(e=`eab308`),i===`kuliah`&&(e=`6366f1`),d.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(a)}&background=dbeafe&color=${e}`}let f=r[i],p=document.getElementById(`nav-dashboard-text`),m=document.getElementById(`nav-courses-text`),h=document.getElementById(`nav-calendar-text`),g=document.getElementById(`nav-grades-text`),_=document.getElementById(`nav-files-text`);p&&(p.textContent=f.dashboard),m&&(m.textContent=f.courses),h&&(h.textContent=f.calendar),g&&(g.textContent=f.grades),_&&(_.textContent=f.files);let v=document.getElementById(`course-banner`),y=document.getElementById(`course-badge`),b=document.getElementById(`course-title`),x=document.getElementById(`course-teacher`),S=document.getElementById(`course-desc`),C=document.getElementById(`info-status`),w=document.getElementById(`info-modules-count`),T=document.getElementById(`info-weight`),E=document.getElementById(`info-progress-pct`),D=document.getElementById(`info-progress-bar`),O=document.getElementById(`sd-star-widget`),k=document.getElementById(`sd-stars-count`),A=document.getElementById(`kuliah-academic-widget`),j=document.querySelector(`aside .text-accent-600`),M=t(`progress-course-${l.id}`),N=M===null?l.progress:parseInt(M),P=t(`kuis-stars-${l.id}`)||0;i===`sd`?(v&&(v.className=`bg-gradient-sd rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-sky-300 relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px] hover-lift`),y&&(y.textContent=`Sekolah Dasar (SD)`),T&&(T.className=`hidden`),O&&(O.classList.remove(`hidden`),k&&(k.textContent=`${P} Bintang ⭐`)),C&&(N===100?(C.className=`font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs`,C.textContent=`Selesai 🏆`):(C.className=`font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full text-xs`,C.textContent=`Sedang Belajar`)),D&&(D.className=`bg-sky-400 h-2 rounded-full`),E&&(E.className=`text-sky-500 font-bold`),j&&(j.classList.remove(`text-accent-600`),j.classList.add(`text-sky-500`))):i===`kuliah`?(v&&(v.className=`bg-gradient-kuliah rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500 relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px] hover-lift`),y&&(y.textContent=l.tag),T&&(T.innerHTML=`<span class="text-surface-500 flex items-center gap-2"><i data-lucide="award" class="w-4.5 h-4.5 text-indigo-500"></i>Beban Kuliah</span> <span class="font-bold text-surface-900">${l.tag}</span>`),A&&A.classList.remove(`hidden`),C&&(N===100?(C.className=`font-semibold text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full text-xs`,C.textContent=`Lulus`):(C.className=`font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full text-xs`,C.textContent=`Aktif`)),D&&(D.className=`bg-indigo-600 h-2 rounded-full`),E&&(E.className=`text-indigo-600 font-bold`),j&&(j.classList.remove(`text-accent-600`),j.classList.add(`text-indigo-600`))):(v&&(v.className=`bg-gradient-smk rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-amber-400 relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[200px] hover-lift`),y&&(y.textContent=`SMK RPL - `+l.tag),T&&(T.innerHTML=`<span class="text-surface-500 flex items-center gap-2"><i data-lucide="award" class="w-4.5 h-4.5 text-amber-500"></i>Kelas</span> <span class="font-bold text-surface-900">${l.tag}</span>`),C&&(N===100?(C.className=`font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs`,C.textContent=`Lulus Kompetensi`):(C.className=`font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full text-xs`,C.textContent=`Belajar Aktif`)),D&&(D.className=`bg-amber-500 h-2 rounded-full`),E&&(E.className=`text-amber-600 font-bold`),j&&(j.classList.remove(`text-accent-600`),j.classList.add(`text-amber-500`))),b&&(b.textContent=l.title),x&&(x.innerHTML=`<i data-lucide="user" class="w-4 h-4"></i> Pengajar: ${l.teacher}`),S&&(S.textContent=l.description);let F=()=>{let t=I(),n=t.filter(e=>e.completed).length,r=Math.round(n/t.length*100);w&&(w.textContent=`${n} / ${t.length} Modul`),E&&(E.textContent=`${r}%`),D&&(D.style.width=`${r}%`),e(`progress-course-${l.id}`,r)},I=()=>{let n=`modules-course-${l.id}`;return t(n)||(e(n,l.modules),l.modules)},L=t=>{e(`modules-course-${l.id}`,t),F()},R=document.getElementById(`tabs-navigation`),z=document.getElementById(`tab-content`),B={sd:[{id:`modul`,label:`Modul Ceria 📖`},{id:`kuis`,label:`Kuis Bintang ⭐`}],smk:[{id:`modul`,label:`Materi & Modul 📁`},{id:`tugas`,label:`Dropbox Tugas 🚀`}],kuliah:[{id:`modul`,label:`Silabus & Modul 📚`},{id:`tugas`,label:`Submisi Tugas 🎓`},{id:`diskusi`,label:`Forum Diskusi 💬`}]},V=`modul`,H=()=>{if(!R)return;R.innerHTML=``;let e=i===`sd`?`bg-sky-100 text-sky-700`:i===`kuliah`?`bg-indigo-100 text-indigo-700`:`bg-amber-100 text-amber-700`;B[i].forEach(t=>{let n=t.id===V,r=document.createElement(`button`);r.className=`flex-1 py-2 text-center rounded-lg cursor-pointer transition-all ${n?e:`text-surface-600 hover:bg-surface-50 hover:text-surface-900`}`,r.textContent=t.label,r.addEventListener(`click`,()=>{V=t.id,H(),U()}),R.appendChild(r)})},U=()=>{if(!z)return;z.innerHTML=``;let n=i===`sd`?`group-hover:text-sky-500`:i===`kuliah`?`group-hover:text-indigo-600`:`group-hover:text-amber-600`,r=i===`sd`?`text-sky-500 bg-sky-50`:i===`kuliah`?`text-indigo-600 bg-indigo-50`:`text-amber-500 bg-amber-50`;if(V===`modul`){let e=I(),t=`<div class="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm space-y-4">
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
        `}),t+=`</div></div>`,z.innerHTML=t,document.querySelectorAll(`.toggle-module-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-mod-idx`)),n=I();n[t].completed=!n[t].completed,L(n),U()})})}else if(V===`tugas`){let n=l.tasks&&l.tasks[0]?l.tasks[0]:{title:`Tugas Proyek Mandiri Kelas`,due:`Besok, 23:59 WIB`,pts:100},r=`tugas-status-${l.id}`,a=t(r)===`true`||t(r)===!0,o=`file-uploader-${l.id}`,s=``;s=a?`
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
              <div id="upload-progress-bar" class="h-1.5 rounded-full ${i===`kuliah`?`bg-indigo-600`:`bg-amber-500`}" style="width: 0%"></div>
            </div>
          </div>
        `,z.innerHTML=`
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
      `;let c=document.getElementById(`drag-drop-zone`),u=document.getElementById(`submit-task-btn`),d=document.getElementById(`selected-file-label`);c&&c.addEventListener(`click`,()=>{d&&(d.classList.remove(`hidden`),c.classList.add(`border-emerald-300`,`bg-emerald-50/10`),u&&(u.className=`w-full py-2.5 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer ${i===`kuliah`?`bg-indigo-600 hover:bg-indigo-700`:`bg-amber-500 hover:bg-amber-600`}`,u.removeAttribute(`disabled`)))}),u&&u.addEventListener(`click`,()=>{let t=document.getElementById(`upload-panel`),n=document.getElementById(`upload-progress-panel`),i=document.getElementById(`upload-progress-bar`),a=document.getElementById(`upload-progress-pct`);if(t&&n){t.classList.add(`hidden`),n.classList.remove(`hidden`);let o=0,s=setInterval(()=>{o+=10,i&&(i.style.width=`${o}%`),a&&(a.textContent=`${o}%`),o>=100&&(clearInterval(s),e(r,`true`),U())},150)}})}else if(V===`kuis`){let t=l.kuis||[],n=`
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
      `,z.innerHTML=n;let r=document.getElementById(`submit-quiz-btn`);r&&r.addEventListener(`click`,()=>{let n=!0,r=!1;if(t.forEach(e=>{let t=document.querySelector(`input[name="quiz-q-${e.id}"]:checked`);t?parseInt(t.value)!==e.correct&&(n=!1):r=!0}),r){alert(`Oops! Jawab semua pertanyaan dulu ya! 😊`);return}n?(typeof confetti<`u`&&confetti({particleCount:150,spread:80,origin:{y:.6}}),e(`kuis-stars-${l.id}`,10),O&&k&&(k.textContent=`10 Bintang ⭐`),alert(`Wah Hebat Sekali! Kamu menjawab 100% Benar! Kamu dapat 10 Bintang Prestasi! 🌟🎉`)):alert(`Ada jawaban yang belum tepat. Yuk coba periksa lagi, kamu pasti bisa! 💪`)})}else if(V===`diskusi`){let n=()=>{let n=`forum-course-${l.id}`,r=t(n);if(r)return r;let i=[{name:l.teacher,role:`Pengajar`,text:`Selamat siang rekan-rekan mahasiswa. Silakan unggah laporan pengerjaan dokumen SRS Bab 3 kelompok Anda pada tenggat dropbox yang telah diaktifkan hari ini. Pastikan berkas sesuai standar format IEEE.`,time:`11:15 WIB`},{name:`Nabila Putri`,role:`Mahasiswa`,text:`Selamat siang Pak. Izin bertanya, untuk pemodelan UML apakah harus dijabarkan secara rinci sampai ke sequence diagram atau cukup structural diagram saja?`,time:`11:32 WIB`},{name:l.teacher,role:`Pengajar`,text:`Sequence diagram wajib dijabarkan terperinci untuk usecase skenario utama yang memiliki kompleksitas tinggi. Untuk usecase pelengkap cukup class diagram saja.`,time:`11:40 WIB`}];return e(n,i),i},r=n(),i=`
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
      `,z.innerHTML=i;let o=document.getElementById(`forum-input`),s=document.getElementById(`send-forum-btn`),c=()=>{if(!o)return;let t=o.value.trim();if(!t)return;let r={name:a,role:`Mahasiswa`,text:t,time:`${String(new Date().getHours()).padStart(2,`0`)}:${String(new Date().getMinutes()).padStart(2,`0`)} WIB`},i=n();i.push(r),e(`forum-course-${l.id}`,i),o.value=``,U(),setTimeout(()=>{let e=document.getElementById(`forum-thread`);e&&(e.scrollTop=e.scrollHeight)},50)};s&&s.addEventListener(`click`,c),o&&o.addEventListener(`keypress`,e=>{e.key===`Enter`&&c()})}typeof lucide<`u`&&lucide.createIcons()};F(),H(),U()})();