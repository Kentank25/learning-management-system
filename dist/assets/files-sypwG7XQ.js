import"./css-YCSnT0AX.js";import{o as e}from"./buddy-BMpf7Vy_.js";(function(){let t=localStorage.getItem(`edu-level`)||`smk`;localStorage.getItem(`username`);let n=e[t],r=document.getElementById(`nav-dashboard-text`),i=document.getElementById(`nav-courses-text`),a=document.getElementById(`nav-calendar-text`),o=document.getElementById(`nav-grades-text`),s=document.getElementById(`nav-files-text`);r&&(r.textContent=n.dashboard),i&&(i.textContent=n.courses),a&&(a.textContent=n.calendar),o&&(o.textContent=n.grades),s&&(s.textContent=n.files);let c=document.getElementById(`files-page-title`),l=document.getElementById(`files-page-desc`),u=document.getElementById(`upload-file-trigger`);t===`sd`?(c&&(c.textContent=`File Saya 🎨`),l&&(l.textContent=`Unduh lembar kertas menggambar atau kuis yang ingin kamu cetak di rumah!`),u&&(u.className=`px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl text-sm shadow-md active:scale-98 transition-all flex items-center gap-2 cursor-pointer border-none`)):t===`kuliah`?(c&&(c.textContent=`Drive Mahasiswa 🌐`),l&&(l.textContent=`Akses penyimpanan cloud berkas riset, jurnal, slide perkuliahan, dan bimbingan skripsi Anda.`),u&&(u.className=`px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md active:scale-98 transition-all flex items-center gap-2 cursor-pointer border-none`)):(c&&(c.textContent=`Penyimpanan File Pribadi 📁`),l&&(l.textContent=`Simpan draf coding projek web, skema database, dan sertifikat kompetensi Anda.`),u&&(u.className=`px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-sm shadow-md active:scale-98 transition-all flex items-center gap-2 cursor-pointer border-none`));let d={sd:[{name:`Piko Mewarnai Ceria.pdf`,size:`1.2 MB`,date:`Baru saja`,type:`pdf`},{name:`Matematika Dasar - Penjumlahan.pdf`,size:`850 KB`,date:`Kemarin`,type:`pdf`},{name:`Cerita Dongeng Kancil & Buaya.docx`,size:`320 KB`,date:`3 hari yang lalu`,type:`doc`}],smk:[{name:`skema-database-toko-online.sql`,size:`45 KB`,date:`Baru saja`,type:`code`},{name:`sertifikat-kompetensi-rpl.pdf`,size:`2.4 MB`,date:`Kemarin`,type:`pdf`},{name:`Landing_Page_VueJS.zip`,size:`8.1 MB`,date:`2 hari yang lalu`,type:`archive`}],kuliah:[{name:`draf-proposal-skripsi-v2.docx`,size:`420 KB`,date:`1 jam yang lalu`,type:`doc`},{name:`jurnal-penelitian-microservices.pdf`,size:`3.6 MB`,date:`Kemarin`,type:`pdf`},{name:`ieee-journal-template.doc`,size:`150 KB`,date:`3 hari yang lalu`,type:`doc`}]},f=()=>{let e=`personal-files-${t}`,n=localStorage.getItem(e);return n?JSON.parse(n):(localStorage.setItem(e,JSON.stringify(d[t])),d[t])},p=e=>{let n=`personal-files-${t}`;localStorage.setItem(n,JSON.stringify(e)),h()},m=document.getElementById(`files-content-area`),h=()=>{if(!m)return;m.innerHTML=``;let e=f(),n=e=>e===`pdf`?`file-text`:e===`doc`?`file-type`:e===`code`?`file-code-2`:e===`archive`?`file-archive`:`file`,r=t===`sd`?`text-sky-500`:t===`kuliah`?`text-indigo-600`:`text-amber-500`,i=``;if(t===`smk`)i=`
        <div class="space-y-2.5">
          <span class="text-xs uppercase font-extrabold text-surface-400 block px-2">Folder Saya</span>
          <div class="space-y-1">
            <button class="w-full flex items-center gap-2.5 px-3 py-2 text-surface-700 bg-amber-50/50 text-amber-700 border border-amber-100 rounded-xl text-left text-xs font-bold transition-all">
              <i data-lucide="folder-open" class="w-4 h-4"></i> / root
            </button>
            <button class="w-full flex items-center gap-2.5 px-3 py-2 text-surface-500 hover:bg-surface-100 hover:text-surface-800 rounded-xl text-left text-xs font-semibold transition-all">
              <i data-lucide="folder" class="w-4 h-4"></i> Projek-Web
            </button>
            <button class="w-full flex items-center gap-2.5 px-3 py-2 text-surface-500 hover:bg-surface-100 hover:text-surface-800 rounded-xl text-left text-xs font-semibold transition-all">
              <i data-lucide="folder" class="w-4 h-4"></i> Tugas-BasisData
            </button>
          </div>
        </div>
      `;else if(t===`kuliah`){let t=0;e.forEach(e=>{let n=parseFloat(e.size);e.size.includes(`KB`)&&(t+=n*1024),e.size.includes(`MB`)&&(t+=n*1024*1024)});let n=(t/(1024*1024)).toFixed(2),r=Math.min(n/15*100,100).toFixed(1);i=`
        <div class="space-y-5">
          <div class="space-y-2.5">
            <span class="text-xs uppercase font-extrabold text-surface-400 block px-2">Folder Saya</span>
            <div class="space-y-1">
              <button class="w-full flex items-center gap-2.5 px-3 py-2 text-surface-700 bg-indigo-50/50 text-indigo-700 border border-indigo-100 rounded-xl text-left text-xs font-bold transition-all">
                <i data-lucide="folder-open" class="w-4 h-4"></i> / Drive Utama
              </button>
              <button class="w-full flex items-center gap-2.5 px-3 py-2 text-surface-500 hover:bg-surface-100 hover:text-surface-800 rounded-xl text-left text-xs font-semibold transition-all">
                <i data-lucide="folder" class="w-4 h-4"></i> Draf-Skripsi
              </button>
              <button class="w-full flex items-center gap-2.5 px-3 py-2 text-surface-500 hover:bg-surface-100 hover:text-surface-800 rounded-xl text-left text-xs font-semibold transition-all">
                <i data-lucide="folder" class="w-4 h-4"></i> Jurnal-Riset
              </button>
            </div>
          </div>
          
          <!-- Capacity Widget -->
          <div class="border-t border-surface-150 pt-4 px-2 space-y-2">
            <span class="text-xs font-bold text-surface-800 block">Kapasitas Cloud</span>
            <div class="w-full bg-surface-100 rounded-full h-2">
              <div class="bg-indigo-600 h-2 rounded-full" style="width: ${r}%"></div>
            </div>
            <span class="text-[10px] text-surface-400 font-semibold block">${n} MB dari 15 GB digunakan (${r}%)</span>
          </div>
        </div>
      `}let a=`
      <div class="space-y-4">
        <h3 class="font-bold text-surface-900 text-base flex items-center gap-2">
          <i data-lucide="files" class="w-5 h-5 ${r}"></i> Berkas Tersimpan
        </h3>
        
        <div class="space-y-2.5">
    `;e.length===0?a+=`
        <div class="border border-dashed border-surface-200 rounded-2xl py-12 text-center text-surface-400">
          <i data-lucide="inbox" class="w-10 h-10 mx-auto mb-2 text-surface-300"></i>
          <p class="text-sm font-semibold">Folder ini kosong</p>
          <p class="text-xs text-surface-400 mt-0.5">Unggah berkas baru untuk menyimpannya di sini.</p>
        </div>
      `:e.forEach((e,t)=>{a+=`
          <div class="p-3.5 border border-surface-150 rounded-2xl bg-white flex items-center justify-between gap-4 hover:shadow-sm hover:border-surface-200 transition-all group">
            <div class="flex items-center gap-3">
              <div class="p-2.5 rounded-xl bg-surface-50 text-surface-500 group-hover:${r} group-hover:bg-accent-50/20 transition-all shrink-0">
                <i data-lucide="${n(e.type)}" class="w-5.5 h-5.5"></i>
              </div>
              <div class="min-w-0">
                <h4 class="font-bold text-sm text-surface-900 leading-snug truncate group-hover:${r} transition-colors">${e.name}</h4>
                <p class="text-[10px] text-surface-400 font-semibold mt-0.5 flex items-center gap-1.5 flex-wrap">
                  <span>${e.size}</span>
                  <span>•</span>
                  <span>Diunggah: ${e.date}</span>
                </p>
              </div>
            </div>
            
            <div class="flex items-center gap-1">
              <button 
                data-dl-name="${e.name}"
                class="download-btn p-2 hover:bg-surface-100 rounded-xl text-surface-500 hover:text-surface-700 transition-colors cursor-pointer"
                title="Unduh"
              >
                <i data-lucide="download" class="w-4 h-4"></i>
              </button>
              <button 
                data-del-idx="${t}"
                class="delete-btn p-2 hover:bg-red-50 rounded-xl text-surface-400 hover:text-red-600 transition-colors cursor-pointer"
                title="Hapus"
              >
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        `}),a+=`
        </div>
      </div>
    `,i?m.innerHTML=`
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <!-- Left sidebar folders -->
          <div class="bg-white border border-surface-200 rounded-3xl p-5 shadow-sm space-y-4">
            ${i}
          </div>
          <!-- Right main files list -->
          <div class="lg:col-span-3 bg-white border border-surface-200 rounded-3xl p-5 shadow-sm">
            ${a}
          </div>
        </div>
      `:m.innerHTML=`
        <div class="bg-white border border-surface-200 rounded-3xl p-5 shadow-sm">
          ${a}
        </div>
      `,document.querySelectorAll(`.download-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-dl-name`);alert(`Mengunduh berkas: ${t}...`)})}),document.querySelectorAll(`.delete-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-del-idx`));if(confirm(`Apakah Anda yakin ingin menghapus berkas ini?`)){let e=f();e.splice(t,1),p(e)}})}),typeof lucide<`u`&&lucide.createIcons()},g=document.getElementById(`files-hidden-input`);u&&g&&(u.addEventListener(`click`,()=>{g.click()}),g.addEventListener(`change`,e=>{let t=e.target.files[0];if(!t)return;let n=t.size>1024*1024?(t.size/(1024*1024)).toFixed(1)+` MB`:(t.size/1024).toFixed(0)+` KB`,r=`file`,i=t.name.toLowerCase();i.endsWith(`.pdf`)?r=`pdf`:i.endsWith(`.doc`)||i.endsWith(`.docx`)?r=`doc`:i.endsWith(`.sql`)||i.endsWith(`.html`)||i.endsWith(`.css`)||i.endsWith(`.js`)?r=`code`:(i.endsWith(`.zip`)||i.endsWith(`.rar`))&&(r=`archive`);let a={name:t.name,size:n,date:`Baru saja`,type:r};u.setAttribute(`disabled`,`true`);let o=u.innerHTML;u.innerHTML=`<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>Mengunggah...</span>`,typeof lucide<`u`&&lucide.createIcons(),setTimeout(()=>{let e=f();e.unshift(a),p(e),u.removeAttribute(`disabled`),u.innerHTML=o,typeof lucide<`u`&&lucide.createIcons(),g.value=``,alert(`Sukses mengunggah berkas: ${t.name}`)},1e3)})),h()})();