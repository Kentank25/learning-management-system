import{t as e}from"./store-JTud2RYC.js";import{i as t,n,s as r}from"./buddy-BeuqbOLB.js";(function(){let i=e(`edu-level`,`smk`),a=e(`username`,`Keane`),o=document.getElementById(`profile-name`),s=document.getElementById(`profile-img`);if(o&&(o.textContent=a),s){let e=`2563eb`;i===`sd`&&(e=`0ea5e9`),i===`smk`&&(e=`eab308`),i===`kuliah`&&(e=`6366f1`),s.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(a)}&background=dbeafe&color=${e}`}let c=r[i],l=document.getElementById(`nav-dashboard-text`),u=document.getElementById(`nav-courses-text`),d=document.getElementById(`nav-calendar-text`),f=document.getElementById(`nav-grades-text`),p=document.getElementById(`nav-files-text`);l&&(l.textContent=c.dashboard),u&&(u.textContent=c.courses),d&&(d.textContent=c.calendar),f&&(f.textContent=c.grades),p&&(p.textContent=c.files);let m=document.getElementById(`courses-page-title`),h=document.getElementById(`courses-page-desc`);m&&(m.textContent=c.pageTitle),h&&(h.textContent=c.pageDesc);let g=n[i]||[],_=document.getElementById(`courses-grid`),v=t=>{if(_){if(_.innerHTML=``,t.length===0){_.innerHTML=`
        <div class="col-span-full py-12 text-center text-surface-500">
          <i data-lucide="info" class="w-12 h-12 mx-auto mb-3 text-surface-300"></i>
          <p class="font-medium text-base">Tidak ada mata pelajaran yang cocok.</p>
        </div>
      `,typeof lucide<`u`&&lucide.createIcons();return}t.forEach(t=>{let n=e(`progress-course-${t.id}`),r=n===null?t.progress:parseInt(n),a=r===100,o=i===`sd`?`text-sky-600`:i===`kuliah`?`text-indigo-600`:`text-accent-600`,s=a?`bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100`:i===`sd`?`bg-sky-400 hover:bg-sky-500 text-white border-transparent`:i===`kuliah`?`bg-indigo-600 hover:bg-indigo-700 text-white border-transparent`:`bg-accent-400 hover:bg-accent-500 text-surface-900 border-transparent`,c=a?`Tinjau Materi (Selesai)`:r>0?`Lanjutkan Belajar`:`Mulai Belajar`,l=`
        <div
          data-status="${t.status}"
          class="course-card bg-white border border-surface-200 rounded-2xl shadow-sm hover:shadow-md hover-lift transition-all group overflow-hidden flex flex-col"
        >
          <!-- Card Banner -->
          <div class="h-32 bg-gradient-to-br ${t.colorClass} relative p-4 flex items-end">
            <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="bg-white p-2 rounded-xl shadow-sm relative z-10 translate-y-6">
              <i data-lucide="${t.icon}" class="w-8 h-8 ${i===`sd`?`text-sky-500`:i===`kuliah`?`text-indigo-600`:`text-accent-600`}"></i>
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
                <span class="${i===`sd`?`text-sky-500`:i===`kuliah`?`text-indigo-600`:`text-accent-600`} font-bold">${r}%</span>
              </div>
              <div class="w-full bg-surface-100 rounded-full h-1.5 mb-4">
                <div class="${i===`sd`?`bg-sky-500`:i===`kuliah`?`bg-indigo-600`:`bg-accent-500`} h-1.5 rounded-full" style="width: ${r}%"></div>
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
      `;_.insertAdjacentHTML(`beforeend`,l)}),typeof lucide<`u`&&lucide.createIcons()}};v(g),(()=>{let e=document.getElementById(`history-section`);if(!e)return;let n=t[i]||[];if(n.length===0){e.classList.add(`hidden`);return}e.classList.remove(`hidden`);let r=e=>e===`A`?`text-emerald-600 bg-emerald-50 border-emerald-200`:e===`B`?`text-blue-600 bg-blue-50 border-blue-200`:e===`C`?`text-amber-600 bg-amber-50 border-amber-200`:`text-red-600 bg-red-50 border-red-200`,a=i===`sd`?`text-sky-600`:i===`kuliah`?`text-indigo-600`:`text-accent-600`,o=i===`sd`?`border-sky-200`:i===`kuliah`?`border-indigo-200`:`border-accent-200`,s=`
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-xl bg-surface-100">
            <i data-lucide="history" class="w-5 h-5 text-surface-500"></i>
          </div>
          <div>
            <h2 class="text-xl font-bold text-surface-800 font-display">${i===`kuliah`?`Riwayat Semester Sebelumnya`:`Riwayat Kelas Sebelumnya`}</h2>
            <p class="text-xs text-surface-500 mt-0.5">${n.length} periode tercatat dalam arsip akademik</p>
          </div>
        </div>
        <div class="flex-1 h-px bg-surface-200"></div>
      </div>
    `;n.forEach((e,t)=>{let n=`history-accordion-${t}`,i=`history-body-${t}`,c=t===0,l=Math.round(e.courses.reduce((e,t)=>e+t.finalScore,0)/e.courses.length);s+=`
        <div id="${n}" class="glass-panel border border-surface-200/60 rounded-2xl overflow-hidden shadow-sm">
          <!-- Accordion Header -->
          <button
            onclick="(function(){
              const body = document.getElementById('${i}');
              const btn = document.getElementById('${n}-chevron');
              const isHidden = body.classList.contains('hidden');
              body.classList.toggle('hidden');
              btn.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
            })()"
            class="w-full flex items-center justify-between px-5 py-4 hover:bg-surface-50/80 transition-colors text-left cursor-pointer"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-xl bg-surface-100">
                <i data-lucide="calendar-check-2" class="w-4 h-4 text-surface-500"></i>
              </div>
              <div>
                <span class="font-bold text-surface-900 font-display">${e.period}</span>
                <span class="ml-2 text-xs text-surface-500">${e.year}</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-surface-500 font-medium hidden sm:inline">${e.courses.length} mata pelajaran</span>
              <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-surface-100 text-surface-600">Rata-rata: ${l}</span>
              <i
                id="${n}-chevron"
                data-lucide="chevron-down"
                class="w-4 h-4 text-surface-400 transition-transform duration-300"
                style="transform: rotate(${c?`180deg`:`0deg`})"
              ></i>
            </div>
          </button>

          <!-- Accordion Body -->
          <div id="${i}" class="${c?``:`hidden`} border-t border-surface-100">
            <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
`,e.courses.forEach(e=>{let t=r(e.gradeLetter);s+=`
          <div class="bg-white/70 border border-surface-200/80 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-all group hover-lift">
            <!-- Muted Archive Banner -->
            <div class="h-24 bg-gradient-to-br ${e.colorClass} relative opacity-75 flex items-end p-3">
              <div class="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm relative z-10 translate-y-4">
                <i data-lucide="${e.icon}" class="w-6 h-6 text-surface-600"></i>
              </div>
              <div class="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                <i data-lucide="check-circle" class="w-2.5 h-2.5"></i>
                Lulus
              </div>
              <span class="absolute bottom-2 left-2 bg-black/20 backdrop-blur-sm text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">${e.tag}</span>
            </div>

            <!-- Card Content -->
            <div class="p-3.5 pt-6 flex-1 flex flex-col">
              <h4 class="font-bold text-surface-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:${a} transition-colors">${e.title}</h4>
              <p class="text-xs text-surface-500 flex items-center gap-1 mb-3">
                <i data-lucide="user" class="w-3 h-3"></i> ${e.teacher}
              </p>

              <!-- Score row -->
              <div class="mt-auto flex items-center justify-between gap-2">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs text-surface-500">Nilai:</span>
                  <span class="text-sm font-extrabold text-surface-800">${e.finalScore}</span>
                </div>
                <span class="text-xs font-bold px-2 py-0.5 rounded-full border ${t}">${e.gradeLetter}</span>
              </div>

              <!-- Link button -->
              <a
                href="course-detail.html?id=${e.id}&archive=1"
                class="mt-3 block w-full py-1.5 text-center text-xs font-semibold rounded-lg border ${o} ${a} hover:bg-surface-50 transition-colors"
              >
                Lihat Ringkasan
              </a>
            </div>
          </div>
`}),s+=`
            </div>
          </div>
        </div>
`}),e.innerHTML=s,typeof lucide<`u`&&lucide.createIcons()})();let y=document.querySelectorAll(`.filter-btn`),b=`all`,x=()=>{let e=S?S.value.toLowerCase().trim():``;v(g.filter(t=>{let n=b===`all`||t.status===b,r=t.title.toLowerCase().includes(e)||t.teacher.toLowerCase().includes(e);return n&&r}))};y.length>0&&y.forEach(e=>{e.addEventListener(`click`,()=>{y.forEach(e=>{e.classList.remove(`bg-accent-100`,`text-accent-700`,`bg-sky-100`,`text-sky-700`,`bg-indigo-100`,`text-indigo-700`),e.classList.add(`text-surface-600`,`hover:bg-surface-50`)}),e.classList.remove(`text-surface-600`,`hover:bg-surface-50`),i===`sd`?e.classList.add(`bg-sky-100`,`text-sky-700`):i===`kuliah`?e.classList.add(`bg-indigo-100`,`text-indigo-700`):e.classList.add(`bg-accent-100`,`text-accent-700`),e.style.transform=`scale(0.95)`,setTimeout(()=>e.style.transform=`scale(1)`,150),b=e.getAttribute(`data-filter`),x()})});let S=document.getElementById(`search-input`);S&&S.addEventListener(`input`,()=>{x()})})();