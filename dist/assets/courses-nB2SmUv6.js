import{t as e}from"./store-5R8oxc92.js";import{n as t,o as n}from"./buddy-CvtKqBNh.js";(function(){let r=e(`edu-level`,`smk`),i=e(`username`,`Keane`),a=document.getElementById(`profile-name`),o=document.getElementById(`profile-img`);if(a&&(a.textContent=i),o){let e=`2563eb`;r===`sd`&&(e=`0ea5e9`),r===`smk`&&(e=`eab308`),r===`kuliah`&&(e=`6366f1`),o.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(i)}&background=dbeafe&color=${e}`}let s=n[r],c=document.getElementById(`nav-dashboard-text`),l=document.getElementById(`nav-courses-text`),u=document.getElementById(`nav-calendar-text`),d=document.getElementById(`nav-grades-text`),f=document.getElementById(`nav-files-text`);c&&(c.textContent=s.dashboard),l&&(l.textContent=s.courses),u&&(u.textContent=s.calendar),d&&(d.textContent=s.grades),f&&(f.textContent=s.files);let p=document.getElementById(`courses-page-title`),m=document.getElementById(`courses-page-desc`);p&&(p.textContent=s.pageTitle),m&&(m.textContent=s.pageDesc);let h=t[r]||[],g=document.getElementById(`courses-grid`),_=t=>{if(g){if(g.innerHTML=``,t.length===0){g.innerHTML=`
        <div class="col-span-full py-12 text-center text-surface-500">
          <i data-lucide="info" class="w-12 h-12 mx-auto mb-3 text-surface-300"></i>
          <p class="font-medium text-base">Tidak ada mata pelajaran yang cocok.</p>
        </div>
      `,typeof lucide<`u`&&lucide.createIcons();return}t.forEach(t=>{let n=e(`progress-course-${t.id}`),i=n===null?t.progress:parseInt(n),a=i===100,o=r===`sd`?`text-sky-600`:r===`kuliah`?`text-indigo-600`:`text-accent-600`,s=a?`bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100`:r===`sd`?`bg-sky-400 hover:bg-sky-500 text-white border-transparent`:r===`kuliah`?`bg-indigo-600 hover:bg-indigo-700 text-white border-transparent`:`bg-accent-400 hover:bg-accent-500 text-surface-900 border-transparent`,c=a?`Tinjau Materi (Selesai)`:i>0?`Lanjutkan Belajar`:`Mulai Belajar`,l=`
        <div
          data-status="${t.status}"
          class="course-card bg-white border border-surface-200 rounded-2xl shadow-sm hover:shadow-md hover-lift transition-all group overflow-hidden flex flex-col"
        >
          <!-- Card Banner -->
          <div class="h-32 bg-gradient-to-br ${t.colorClass} relative p-4 flex items-end">
            <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="bg-white p-2 rounded-xl shadow-sm relative z-10 translate-y-6">
              <i data-lucide="${t.icon}" class="w-8 h-8 ${r===`sd`?`text-sky-500`:r===`kuliah`?`text-indigo-600`:`text-accent-600`}"></i>
            </div>
            <span class="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">${t.tag}</span>
          </div>

          <!-- Card Content -->
          <div class="p-5 pt-8 flex-1 flex flex-col">
            <div class="flex-1">
              <h3 class="font-bold text-surface-900 text-lg mb-1 group-hover:${o} transition-colors line-clamp-2">${t.title}</h3>
              <p class="text-sm text-surface-500 flex items-center gap-1.5 mb-4">
                <i data-lucide="user" class="w-3.5 h-3.5"></i> ${t.teacher}
              </p>
            </div>

            <!-- Progress Section -->
            <div class="mt-auto">
              <div class="flex justify-between text-xs font-medium mb-1.5">
                <span class="text-surface-600">Progres Belajar</span>
                <span class="${r===`sd`?`text-sky-500`:r===`kuliah`?`text-indigo-600`:`text-accent-600`} font-bold">${i}%</span>
              </div>
              <div class="w-full bg-surface-100 rounded-full h-1.5 mb-4">
                <div class="${r===`sd`?`bg-sky-500`:r===`kuliah`?`bg-indigo-600`:`bg-accent-500`} h-1.5 rounded-full" style="width: ${i}%"></div>
              </div>

              <a
                href="course-detail.html?id=${t.id}"
                class="block w-full py-2 text-center text-sm font-semibold border rounded-lg transition-all shadow-sm ${s}"
              >
                ${c}
              </a>
            </div>
          </div>
        </div>
      `;g.insertAdjacentHTML(`beforeend`,l)}),typeof lucide<`u`&&lucide.createIcons()}};_(h);let v=document.querySelectorAll(`.filter-btn`),y=`all`,b=()=>{let e=x?x.value.toLowerCase().trim():``;_(h.filter(t=>{let n=y===`all`||t.status===y,r=t.title.toLowerCase().includes(e)||t.teacher.toLowerCase().includes(e);return n&&r}))};v.length>0&&v.forEach(e=>{e.addEventListener(`click`,()=>{v.forEach(e=>{e.classList.remove(`bg-accent-100`,`text-accent-700`,`bg-sky-100`,`text-sky-700`,`bg-indigo-100`,`text-indigo-700`),e.classList.add(`text-surface-600`,`hover:bg-surface-50`)}),e.classList.remove(`text-surface-600`,`hover:bg-surface-50`),r===`sd`?e.classList.add(`bg-sky-100`,`text-sky-700`):r===`kuliah`?e.classList.add(`bg-indigo-100`,`text-indigo-700`):e.classList.add(`bg-accent-100`,`text-accent-700`),e.style.transform=`scale(0.95)`,setTimeout(()=>e.style.transform=`scale(1)`,150),y=e.getAttribute(`data-filter`),b()})});let x=document.getElementById(`search-input`);x&&x.addEventListener(`input`,()=>{b()})})();