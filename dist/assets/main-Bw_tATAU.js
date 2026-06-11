import"./css-Cl0y6LQG.js";import{a as e,i as t,o as n,r}from"./buddy-vJ5S9m2q.js";(function(){let i=localStorage.getItem(`edu-level`)||`smk`,a=localStorage.getItem(`username`)||`Keane`,o=document.getElementById(`profile-name`),s=document.getElementById(`profile-img`);if(o&&(o.textContent=a),s){let e=`2563eb`;i===`sd`&&(e=`0ea5e9`),i===`smk`&&(e=`eab308`),i===`kuliah`&&(e=`6366f1`),s.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(a)}&background=dbeafe&color=${e}`}let c=n[i],l=document.getElementById(`nav-dashboard-text`),u=document.getElementById(`nav-courses-text`),d=document.getElementById(`nav-calendar-text`),f=document.getElementById(`nav-grades-text`),p=document.getElementById(`nav-files-text`);l&&(l.textContent=c.dashboard),u&&(u.textContent=c.courses),d&&(d.textContent=c.calendar),f&&(f.textContent=c.grades),p&&(p.textContent=c.files);let m=document.getElementById(`banner-title`),h=document.getElementById(`banner-desc`),g=document.getElementById(`banner-badge-container`),_=document.getElementById(`welcome-banner-container`);i===`sd`?(_&&(_.className=`bg-gradient-sd rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-sky-300 relative overflow-hidden hover-lift`),m&&(m.className=`text-2xl sm:text-3xl font-extrabold tracking-tight mb-2`,m.innerHTML=`Halo kembali, ${a}! 🌟`),h&&(h.className=`text-sky-50 max-w-xl text-sm sm:text-base leading-relaxed`,h.innerHTML=`Hari ini kamu memiliki <strong>2 tugas seru</strong> yang harus diselesaikan. Yuk, selesaikan sekarang dan kumpulkan poinmu!`),g&&(g.innerHTML=`<i data-lucide="award" class="w-12 h-12 text-sky-400 drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)]"></i>`)):i===`kuliah`?(_&&(_.className=`bg-gradient-kuliah rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500 relative overflow-hidden hover-lift`),m&&(m.className=`text-2xl sm:text-3xl font-extrabold tracking-tight mb-2`,m.innerHTML=`Selamat datang di Portal, ${a}. 🎓`),h&&(h.className=`text-indigo-150 max-w-xl text-sm sm:text-base leading-relaxed`,h.innerHTML=`Anda memiliki <strong>2 tugas kuliah</strong> dengan tenggat waktu hari ini. Silakan periksa kelengkapan berkas submisi Anda.`),g&&(g.innerHTML=`<i data-lucide="book-open" class="w-12 h-12 text-indigo-300 drop-shadow-[0_4px_10px_rgba(99,102,241,0.3)]"></i>`)):(_&&(_.className=`bg-gradient-smk rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-amber-400 relative overflow-hidden hover-lift`),m&&(m.className=`text-2xl sm:text-3xl font-extrabold tracking-tight mb-2`,m.innerHTML=`Selamat datang kembali, ${a}! 👋`),h&&(h.className=`text-amber-50 max-w-xl text-sm sm:text-base leading-relaxed`,h.innerHTML=`Anda memiliki <strong>2 tugas</strong> yang tenggat waktunya hari ini. Mari selesaikan proyek kreatif Anda dan pertahankan nilai luar biasa itu!`),g&&(g.innerHTML=`<i data-lucide="rocket" class="w-12 h-12 text-amber-300 drop-shadow-[0_4px_10px_rgba(245,158,11,0.3)]"></i>`));let v=document.getElementById(`schedule-title`),y=document.getElementById(`schedule-date`),b=document.getElementById(`schedule-container`),x=e[i];v&&(v.innerHTML=`<i data-lucide="clock" class="w-5 h-5 text-accent-500"></i> ${x.title}`),y&&(y.textContent=x.date,i===`sd`?y.className=`text-xs font-medium bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full`:i===`kuliah`?y.className=`text-xs font-medium bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full`:y.className=`text-xs font-medium bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full`),b&&(b.innerHTML=``,x.items.forEach((e,t)=>{let n=t===x.items.length-1,r=e.statusType===`active`?`<span class="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-medium">Sedang Berlangsung</span>`:`<span class="bg-surface-100 text-surface-600 text-xs px-2 py-0.5 rounded font-medium">Akan Datang</span>`,a=n?``:`<div class="w-0.5 h-full bg-surface-200 absolute top-3"></div>`,o=i===`sd`?`hover:border-sky-300`:i===`kuliah`?`hover:border-indigo-300`:`hover:border-accent-300`,s=i===`sd`?`text-sky-600`:i===`kuliah`?`text-indigo-600`:`text-accent-600`,c=e.statusType===`active`?i===`sd`?`bg-sky-500`:i===`kuliah`?`bg-indigo-500`:`bg-accent-500`:`bg-surface-300`,l=e.statusType===`active`?`<button class="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm mt-3 ${i===`sd`?`bg-sky-400 hover:bg-sky-500 text-white`:i===`kuliah`?`bg-indigo-500 hover:bg-indigo-600 text-white`:`bg-accent-400 hover:bg-accent-500 text-surface-900`}">Masuk Kelas</button>`:``,u=`
        <div class="flex gap-4 relative">
          <div class="flex flex-col items-center">
            <div class="w-3 h-3 rounded-full ${c} z-10 ring-4 ring-white"></div>
            ${a}
          </div>
          <div class="pb-4 w-full">
            <div class="bg-white rounded-xl p-4 border border-surface-200 hover:shadow-md transition-all hover-lift group cursor-pointer ${o} ${e.statusType===`active`?``:`opacity-70 hover:opacity-100`}">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <span class="text-xs font-bold ${s} mb-1 block">${e.time}</span>
                  <h3 class="font-bold text-surface-900 group-hover:text-accent-600 transition-colors">${e.title}</h3>
                </div>
                ${r}
              </div>
              <p class="text-sm text-surface-500 mb-1">${e.subtitle}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-xs text-surface-500 mt-2">
                  <i data-lucide="${e.icon===`smile`?`smile`:e.icon===`book`?`book`:e.icon===`palette`?`palette`:e.icon===`cpu`?`cpu`:e.icon===`database`?`database`:`code`}" class="w-3.5 h-3.5"></i>
                  ${e.location}
                </div>
                ${l}
              </div>
            </div>
          </div>
        </div>
      `;b.insertAdjacentHTML(`beforeend`,u)}));let S=document.getElementById(`deadlines-title`),C=document.getElementById(`deadlines-container`),w=r[i];S&&(S.innerHTML=`<i data-lucide="alert-circle" class="w-5 h-5 text-orange-500"></i> ${w.title}`),C&&(C.innerHTML=``,w.items.forEach(e=>{let t=`
        <div class="p-3 border rounded-xl transition-all hover-lift cursor-pointer ${e.borderColor}">
          <h4 class="font-semibold text-sm text-surface-900 mb-1">${e.title}</h4>
          <p class="text-xs text-surface-500 mb-2">${e.subject}</p>
          <div class="flex items-center justify-between text-xs font-medium">
            <span class="${e.textColor} flex items-center gap-1">
              <i data-lucide="clock" class="w-3 h-3"></i> ${e.due}
            </span>
            <span class="text-surface-400">Belum Dikumpul</span>
          </div>
        </div>
      `;C.insertAdjacentHTML(`beforeend`,t)}));let T=document.getElementById(`progress-title`),E=document.getElementById(`progress-container`);if(i===`kuliah`)T&&(T.innerHTML=`<i data-lucide="award" class="w-5 h-5 text-indigo-500"></i> Hasil Studi Akademik`),E&&(E.innerHTML=`
        <div class="text-center py-4 space-y-4">
          <div class="inline-block relative p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
            <span class="text-[10px] uppercase tracking-wider text-indigo-500 font-bold block mb-1">IPK Semester Ini</span>
            <span class="text-4xl font-extrabold text-indigo-700 tracking-tight">3.85 <span class="text-sm font-medium text-indigo-400">/ 4.00</span></span>
          </div>
          
          <div class="space-y-3 text-left">
            <div class="flex justify-between items-center text-sm border-b border-surface-100 pb-2">
              <span class="text-surface-500">SKS Selesai</span>
              <span class="font-bold text-surface-900">18 / 22 SKS</span>
            </div>
            <div class="flex justify-between items-center text-sm border-b border-surface-100 pb-2">
              <span class="text-surface-500">Status Akademik</span>
              <span class="font-bold text-green-600 flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Aktif
              </span>
            </div>
          </div>
          
          <div class="text-left">
            <div class="flex justify-between text-xs text-surface-500 mb-1">
              <span>Beban Studi Terlewati</span>
              <span>81%</span>
            </div>
            <div class="w-full bg-surface-100 rounded-full h-2">
              <div class="bg-indigo-600 h-2 rounded-full" style="width: 81%"></div>
            </div>
          </div>
        </div>
      `);else{let e=t[i];T&&(T.innerHTML=`<i data-lucide="bar-chart-2" class="w-5 h-5 ${i===`sd`?`text-sky-500`:`text-accent-500`}"></i> ${e.title}`),E&&(E.innerHTML=``,e.items.forEach(e=>{let t=`
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="font-medium text-surface-700">${e.name}</span>
              <span class="${e.text} font-bold">${e.val}</span>
            </div>
            <div class="w-full bg-surface-100 rounded-full h-2">
              <div class="${e.color} h-2 rounded-full" style="width: ${e.val}"></div>
            </div>
          </div>
        `;E.insertAdjacentHTML(`beforeend`,t)}))}typeof lucide<`u`&&lucide.createIcons()})();