import"./css-YCSnT0AX.js";import{n as e,o as t}from"./buddy-BMpf7Vy_.js";(function(){let n=localStorage.getItem(`edu-level`)||`smk`,r=localStorage.getItem(`username`)||`Keane`,i=document.getElementById(`profile-name`),a=document.getElementById(`profile-img`);if(i&&(i.textContent=r),a){let e=`2563eb`;n===`sd`&&(e=`0ea5e9`),n===`smk`&&(e=`eab308`),n===`kuliah`&&(e=`6366f1`),a.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(r)}&background=dbeafe&color=${e}`}let o=t[n],s=document.getElementById(`nav-dashboard-text`),c=document.getElementById(`nav-courses-text`),l=document.getElementById(`nav-calendar-text`),u=document.getElementById(`nav-grades-text`),d=document.getElementById(`nav-files-text`);s&&(s.textContent=o.dashboard),c&&(c.textContent=o.courses),l&&(l.textContent=o.calendar),u&&(u.textContent=o.grades),d&&(d.textContent=o.files);let f=document.getElementById(`courses-page-title`),p=document.getElementById(`courses-page-desc`);f&&(f.textContent=o.pageTitle),p&&(p.textContent=o.pageDesc);let m=e[n]||[],h=document.getElementById(`courses-grid`),g=e=>{if(h){if(h.innerHTML=``,e.length===0){h.innerHTML=`
        <div class="col-span-full py-12 text-center text-surface-500">
          <i data-lucide="info" class="w-12 h-12 mx-auto mb-3 text-surface-300"></i>
          <p class="font-medium text-base">Tidak ada mata pelajaran yang cocok.</p>
        </div>
      `,typeof lucide<`u`&&lucide.createIcons();return}e.forEach(e=>{let t=e.progress===100,r=n===`sd`?`text-sky-600`:n===`kuliah`?`text-indigo-600`:`text-accent-600`,i=t?`bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100`:n===`sd`?`bg-sky-400 hover:bg-sky-500 text-white border-transparent`:n===`kuliah`?`bg-indigo-600 hover:bg-indigo-700 text-white border-transparent`:`bg-accent-400 hover:bg-accent-500 text-surface-900 border-transparent`,a=t?`Tinjau Materi (Selesai)`:e.progress>0?`Lanjutkan Belajar`:`Mulai Belajar`,o=`
        <div
          data-status="${e.status}"
          class="course-card bg-white border border-surface-200 rounded-2xl shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col"
        >
          <!-- Card Banner -->
          <div class="h-32 bg-gradient-to-br ${e.colorClass} relative p-4 flex items-end">
            <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="bg-white p-2 rounded-xl shadow-sm relative z-10 translate-y-6">
              <i data-lucide="${e.icon}" class="w-8 h-8 ${n===`sd`?`text-sky-500`:n===`kuliah`?`text-indigo-600`:`text-accent-600`}"></i>
            </div>
            <span class="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">${e.tag}</span>
          </div>

          <!-- Card Content -->
          <div class="p-5 pt-8 flex-1 flex flex-col">
            <div class="flex-1">
              <h3 class="font-bold text-surface-900 text-lg mb-1 group-hover:${r} transition-colors line-clamp-2">${e.title}</h3>
              <p class="text-sm text-surface-500 flex items-center gap-1.5 mb-4">
                <i data-lucide="user" class="w-3.5 h-3.5"></i> ${e.teacher}
              </p>
            </div>

            <!-- Progress Section -->
            <div class="mt-auto">
              <div class="flex justify-between text-xs font-medium mb-1.5">
                <span class="text-surface-600">Progres Belajar</span>
                <span class="${n===`sd`?`text-sky-500`:n===`kuliah`?`text-indigo-600`:`text-accent-600`} font-bold">${e.progress}%</span>
              </div>
              <div class="w-full bg-surface-100 rounded-full h-1.5 mb-4">
                <div class="${n===`sd`?`bg-sky-500`:n===`kuliah`?`bg-indigo-600`:`bg-accent-500`} h-1.5 rounded-full" style="width: ${e.progress}%"></div>
              </div>

              <a
                href="course-detail.html?id=${e.id}"
                class="block w-full py-2 text-center text-sm font-semibold border rounded-lg transition-all shadow-sm ${i}"
              >
                ${a}
              </a>
            </div>
          </div>
        </div>
      `;h.insertAdjacentHTML(`beforeend`,o)}),typeof lucide<`u`&&lucide.createIcons()}};g(m);let _=document.querySelectorAll(`.filter-btn`),v=`all`,y=()=>{let e=b?b.value.toLowerCase().trim():``;g(m.filter(t=>{let n=v===`all`||t.status===v,r=t.title.toLowerCase().includes(e)||t.teacher.toLowerCase().includes(e);return n&&r}))};_.length>0&&_.forEach(e=>{e.addEventListener(`click`,()=>{_.forEach(e=>{e.classList.remove(`bg-accent-100`,`text-accent-700`,`bg-sky-100`,`text-sky-700`,`bg-indigo-100`,`text-indigo-700`),e.classList.add(`text-surface-600`,`hover:bg-surface-50`)}),e.classList.remove(`text-surface-600`,`hover:bg-surface-50`),n===`sd`?e.classList.add(`bg-sky-100`,`text-sky-700`):n===`kuliah`?e.classList.add(`bg-indigo-100`,`text-indigo-700`):e.classList.add(`bg-accent-100`,`text-accent-700`),e.style.transform=`scale(0.95)`,setTimeout(()=>e.style.transform=`scale(1)`,150),v=e.getAttribute(`data-filter`),y()})});let b=document.getElementById(`search-input`);b&&b.addEventListener(`input`,()=>{y()})})();