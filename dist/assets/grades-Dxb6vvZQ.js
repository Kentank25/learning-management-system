import"./css-YCSnT0AX.js";import{n as e,o as t}from"./buddy-BMpf7Vy_.js";(function(){let n=localStorage.getItem(`edu-level`)||`smk`;localStorage.getItem(`username`);let r=t[n],i=document.getElementById(`nav-dashboard-text`),a=document.getElementById(`nav-courses-text`),o=document.getElementById(`nav-calendar-text`),s=document.getElementById(`nav-grades-text`),c=document.getElementById(`nav-files-text`);i&&(i.textContent=r.dashboard),a&&(a.textContent=r.courses),o&&(o.textContent=r.calendar),s&&(s.textContent=r.grades),c&&(c.textContent=r.files);let l=document.getElementById(`grades-page-title`),u=document.getElementById(`grades-page-desc`),d=document.getElementById(`semester-filter-container`);n===`sd`?(l&&(l.textContent=`Rapor Bintang Prestasi 🌟`),u&&(u.textContent=`Kumpulkan Bintang Emas dari kuis seru dan koleksi lencana belajarmu!`),d&&d.classList.add(`hidden`)):n===`kuliah`?(l&&(l.textContent=`Kartu Hasil Studi (KHS) 🎓`),u&&(u.textContent=`Lihat pencapaian Indeks Prestasi Kumulatif, beban SKS, dan evaluasi semester.`),d&&d.classList.remove(`hidden`)):(l&&(l.textContent=`Laporan Hasil Belajar (Rapor) 📝`),u&&(u.textContent=`Pantau nilai akademik kejuruan, kompetensi keahlian, dan evaluasi wali kelas.`),d&&d.classList.add(`hidden`));let f=document.getElementById(`grades-content-area`),p=e[n]||[],m=()=>{if(!f)return;let e=0,t={};p.forEach(n=>{let r=parseInt(localStorage.getItem(`kuis-stars-${n.id}`)||0);t[n.id]=r,e+=r});let n=[{id:1,name:`Juara Angka 🔢`,desc:`Selesaikan kuis Matematika Ceria dengan 10 Bintang`,icon:`calculator`,color:`bg-sky-100 text-sky-600 border-sky-200`,unlocked:t[1]>=10},{id:2,name:`Kutu Buku Cilik 📖`,desc:`Selesaikan kuis Bahasa Indonesia dengan 10 Bintang`,icon:`book-open`,color:`bg-emerald-100 text-emerald-600 border-emerald-200`,unlocked:t[2]>=10},{id:3,name:`Pelukis Hebat 🎨`,desc:`Menggambar & Mewarnai mencapai progres 100%`,icon:`palette`,color:`bg-purple-100 text-purple-600 border-purple-200`,unlocked:(localStorage.getItem(`progress-course-3`)||100)==100},{id:4,name:`Sahabat Garuda 🦅`,desc:`Selesaikan kuis Pendidikan Pancasila dengan 10 Bintang`,icon:`heart`,color:`bg-rose-100 text-rose-600 border-rose-200`,unlocked:t[4]>=10}],r=n.filter(e=>e.unlocked).length,i=`
      <!-- Header stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gradient-to-br from-sky-400 to-blue-500 text-white rounded-2xl p-5 shadow-sm border border-sky-300 flex items-center justify-between">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-sky-100">Bintang Terkumpul</span>
            <span class="text-3xl font-black block mt-1">${e} Bintang ⭐</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="star" class="w-8 h-8 fill-current"></i>
          </div>
        </div>

        <div class="bg-gradient-to-br from-yellow-400 to-amber-500 text-white rounded-2xl p-5 shadow-sm border border-yellow-300 flex items-center justify-between">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-yellow-100">Lencana Kehormatan</span>
            <span class="text-3xl font-black block mt-1">${r} / ${n.length} Didapat 🏆</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="award" class="w-8 h-8"></i>
          </div>
        </div>

        <div class="bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-2xl p-5 shadow-sm border border-emerald-300 flex items-center justify-between">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-emerald-100">Evaluasi Belajar</span>
            <span class="text-lg font-bold block mt-2">Belajar Sangat Ceria & Aktif!</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="heart" class="w-8 h-8 fill-current"></i>
          </div>
        </div>
      </div>

      <!-- Main report cards list -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Classes details -->
        <div class="lg:col-span-2 bg-white border border-surface-200 rounded-3xl p-5 shadow-sm space-y-4">
          <h3 class="font-bold text-surface-900 text-base flex items-center gap-2">
            <i data-lucide="book-marked" class="w-5 h-5 text-sky-500"></i> Detail Nilai Kelas Ceria
          </h3>
          
          <div class="space-y-3">
    `;p.forEach(e=>{let n=t[e.id];e.kuis&&e.kuis.length;let r=``;if(n>0)for(let e=0;e<n;e+=2)r+=`<i data-lucide="star" class="w-4 h-4 fill-amber-400 text-amber-500 shrink-0"></i>`;else r=`<span class="text-xs text-surface-400 font-semibold italic">Belum ada bintang</span>`;let a=n>=10?`<span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0"><i data-lucide="smile" class="w-3.5 h-3.5"></i> Selesai Ceria</span>`:`<a href="course-detail.html?id=${e.id}" class="text-xs font-bold text-sky-600 hover:text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">Main Kuis →</a>`;i+=`
        <div class="p-4 border border-surface-100 rounded-2xl flex items-center justify-between gap-4 hover:bg-surface-50/40 transition-colors">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-xl bg-sky-50 text-sky-500">
              <i data-lucide="${e.icon}" class="w-5 h-5"></i>
            </div>
            <div>
              <h4 class="font-bold text-sm text-surface-900 leading-snug">${e.title}</h4>
              <p class="text-[11px] text-surface-400 font-medium mt-0.5">${e.teacher}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex gap-0.5 items-center bg-amber-50/30 px-2 py-1 rounded-lg border border-amber-100/50">
              ${r}
            </div>
            ${a}
          </div>
        </div>
      `}),i+=`
          </div>
        </div>

        <!-- Badges board -->
        <div class="bg-white border border-surface-200 rounded-3xl p-5 shadow-sm flex flex-col space-y-4">
          <h3 class="font-bold text-surface-900 text-base flex items-center gap-2">
            <i data-lucide="award" class="w-5 h-5 text-amber-500"></i> Lencana Penghargaan
          </h3>
          <div class="grid grid-cols-1 gap-3 flex-1">
    `,n.forEach(e=>{let t=e.unlocked?``:`opacity-40`,n=e.unlocked?`<i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600"></i>`:`<i data-lucide="lock" class="w-5 h-5 text-surface-400"></i>`;i+=`
        <div class="p-3 border border-surface-150 rounded-2xl flex items-center justify-between gap-3 ${t} hover:shadow-sm transition-shadow">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-xl border ${e.color} shrink-0">
              <i data-lucide="${e.icon}" class="w-5 h-5"></i>
            </div>
            <div>
              <h4 class="font-bold text-xs text-surface-900 leading-tight">${e.name}</h4>
              <p class="text-[9px] text-surface-500 leading-relaxed mt-0.5">${e.desc}</p>
            </div>
          </div>
          <div class="shrink-0">
            ${n}
          </div>
        </div>
      `}),i+=`
          </div>
        </div>
      </div>
    `,f.innerHTML=i,typeof lucide<`u`&&lucide.createIcons()},h=()=>{if(!f)return;let e=0,t=0,n=[];p.forEach(r=>{let i=localStorage.getItem(`progress-course-${r.id}`),a=i===null?r.progress:parseInt(i),o=50+Math.round(a*.45);a===100?o=95:a===0&&(o=0),e+=o,t++;let s=`D`;o>=90?s=`A`:o>=80?s=`B`:o>=65&&(s=`C`);let c=o>=65?`<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1 w-fit"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Kompeten</span>`:`<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1 w-fit"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Belajar Aktif</span>`,l=`
        <tr class="border-b border-surface-150 hover:bg-surface-50/50 transition-colors">
          <td class="px-6 py-4.5">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-amber-50 text-amber-500 rounded-lg">
                <i data-lucide="${r.icon}" class="w-4 h-4"></i>
              </div>
              <div>
                <span class="font-bold text-surface-900 block leading-tight text-sm">${r.title}</span>
                <span class="text-[10px] text-surface-400 font-semibold block mt-0.5">${r.tag}</span>
              </div>
            </div>
          </td>
          <td class="px-6 py-4.5 text-xs text-surface-600 font-medium">${r.teacher}</td>
          <td class="px-6 py-4.5 text-center font-bold text-sm text-surface-950">${o}</td>
          <td class="px-6 py-4.5 text-center font-bold text-sm text-accent-700">${s}</td>
          <td class="px-6 py-4.5">${c}</td>
          <td class="px-6 py-4.5 text-xs text-surface-500 leading-relaxed font-medium max-w-xs">${{1:`Sangat menguasai struktur database dan kueri SQL tingkat lanjut.`,2:`Kreativitas desain antarmuka baik, tingkatkan pemahaman JavaScript ES6.`,3:`Kelulusan kompetensi sempurna. Pemahaman OOP Java sangat baik!`,4:`Ikuti sesi lab tambahan untuk mengoptimalkan proyek Flutter Anda.`}[r.id]||`-`}</td>
        </tr>
      `;n.push(l)});let r=Math.round(e/t)||0;f.innerHTML=`
      <!-- Header stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-2xl p-5 shadow-sm border border-amber-300 flex items-center justify-between">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-amber-100">Rata-rata Rapor</span>
            <span class="text-3xl font-black block mt-1">${r} / 100</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="percent" class="w-8 h-8"></i>
          </div>
        </div>

        <div class="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-2xl p-5 shadow-sm border border-indigo-300 flex items-center justify-between">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-indigo-100">Status Kelulusan</span>
            <span class="text-xl font-black block mt-2">${r>=75?`Kompeten Seutuhnya ✅`:`Tingkatkan Nilai Kompetensi`}</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="check-circle" class="w-8 h-8"></i>
          </div>
        </div>

        <div class="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-5 shadow-sm border border-emerald-300 flex items-center justify-between">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-emerald-100">Predikat Akademik</span>
            <span class="text-2xl font-black block mt-1">${r>=85?`Sangat Baik (A)`:`Baik (B)`}</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="award" class="w-8 h-8"></i>
          </div>
        </div>
      </div>

      <!-- Scorecard Table -->
      <div class="bg-white border border-surface-200 rounded-3xl shadow-sm overflow-hidden">
        <div class="p-5 border-b border-surface-100">
          <h3 class="font-bold text-surface-900 text-base flex items-center gap-2">
            <i data-lucide="list-todo" class="w-5 h-5 text-amber-500"></i> Hasil Kompetensi Kejuruan RPL
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-50 text-[10px] uppercase font-bold text-surface-500 tracking-wider border-b border-surface-150">
                <th class="px-6 py-3.5">Mata Pelajaran</th>
                <th class="px-6 py-3.5">Guru Pengampu</th>
                <th class="px-6 py-3.5 text-center">Nilai Angka</th>
                <th class="px-6 py-3.5 text-center">Nilai Huruf</th>
                <th class="px-6 py-3.5">Status</th>
                <th class="px-6 py-3.5">Catatan Evaluasi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-100">
              ${n.join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `,typeof lucide<`u`&&lucide.createIcons()},g=(e=`all`)=>{if(!f)return;let t=0,n=0,r=[],i={1:{score:88,letter:`A`,point:4},2:{score:78,letter:`B+`,point:3.3},3:{score:95,letter:`A`,point:4},4:{score:72,letter:`B`,point:3}};p.forEach(e=>{let a=parseInt(e.tag.replace(/\D/g,``))||3,o=localStorage.getItem(`progress-course-${e.id}`),s=o===null?e.progress:parseInt(o),c=i[e.id]||{score:80,letter:`A-`,point:3.7};s===100&&(c={score:95,letter:`A`,point:4}),t+=c.point*a,n+=a;let l=c.point>=2?`<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-100 flex items-center gap-1 w-fit"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Lulus</span>`:`<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100 flex items-center gap-1 w-fit"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Mengulang</span>`,u=`
        <tr class="border-b border-surface-150 hover:bg-surface-50/50 transition-colors">
          <td class="px-6 py-4.5">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-indigo-50 text-indigo-500 rounded-lg">
                <i data-lucide="${e.icon}" class="w-4 h-4"></i>
              </div>
              <div>
                <span class="font-bold text-surface-900 block leading-tight text-sm">${e.title}</span>
                <span class="text-[10px] text-surface-400 font-semibold block mt-0.5">Mata Kuliah Semester 4</span>
              </div>
            </div>
          </td>
          <td class="px-6 py-4.5 text-xs text-surface-600 font-medium">${e.teacher}</td>
          <td class="px-6 py-4.5 text-center font-bold text-sm text-surface-900">${a} SKS</td>
          <td class="px-6 py-4.5 text-center font-bold text-sm text-indigo-600">${c.letter}</td>
          <td class="px-6 py-4.5 text-center font-extrabold text-sm text-surface-950">${c.point.toFixed(2)}</td>
          <td class="px-6 py-4.5">${l}</td>
        </tr>
      `;r.push(u)});let a=t/n||3.85;f.innerHTML=`
      <!-- Header stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-2xl p-5 shadow-sm border border-indigo-500 flex items-center justify-between">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-indigo-100">IPK Semester (IPS)</span>
            <span class="text-3xl font-black block mt-1">${a.toFixed(2)} <span class="text-sm font-medium text-indigo-300">/ 4.00</span></span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="graduation-cap" class="w-8 h-8"></i>
          </div>
        </div>

        <div class="bg-gradient-to-br from-violet-600 to-violet-800 text-white rounded-2xl p-5 shadow-sm border border-violet-500 flex items-center justify-between">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-violet-100">Beban SKS Semester</span>
            <span class="text-3xl font-black block mt-1">${n} SKS</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="book-open" class="w-8 h-8"></i>
          </div>
        </div>

        <div class="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-5 shadow-sm border border-emerald-300 flex items-center justify-between">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-wider text-emerald-100">Predikat Kelulusan</span>
            <span class="text-2xl font-black block mt-1">${a>=3.51?`Dengan Pujian (Cumlaude)`:`Sangat Memuaskan`}</span>
          </div>
          <div class="p-3 bg-white/20 rounded-2xl text-white">
            <i data-lucide="award" class="w-8 h-8"></i>
          </div>
        </div>
      </div>

      <!-- KHS Table Card -->
      <div class="bg-white border border-surface-200 rounded-3xl shadow-sm overflow-hidden">
        <div class="p-5 border-b border-surface-100 flex items-center justify-between flex-wrap gap-2">
          <h3 class="font-bold text-surface-900 text-base flex items-center gap-2">
            <i data-lucide="clipboard-list" class="w-5 h-5 text-indigo-500"></i> Detail Kartu Hasil Studi (KHS)
          </h3>
          <span class="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">Tahun Ajaran: 2025/2026 Ganjil</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-50 text-[10px] uppercase font-bold text-surface-500 tracking-wider border-b border-surface-150">
                <th class="px-6 py-3.5">Kode & Nama Mata Kuliah</th>
                <th class="px-6 py-3.5">Dosen Pengampu</th>
                <th class="px-6 py-3.5 text-center">Beban SKS</th>
                <th class="px-6 py-3.5 text-center">Nilai Huruf</th>
                <th class="px-6 py-3.5 text-center">Bobot Indeks</th>
                <th class="px-6 py-3.5">Status Kelulusan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-100">
              ${r.join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `,typeof lucide<`u`&&lucide.createIcons()};if(n===`sd`)m();else if(n===`kuliah`){g();let e=document.getElementById(`semester-select`);e&&e.addEventListener(`change`,e=>{g(e.target.value)})}else h()})();