/* === JS Block 1 === */
// ===== THEME =====
(function(){
  const saved = localStorage.getItem('favikit-theme');
  if(saved === 'light') document.documentElement.classList.add('light');
  updateToggleUI();
})();

function toggleTheme(){
  const isLight = document.documentElement.classList.toggle('light');
  localStorage.setItem('favikit-theme', isLight ? 'light' : 'dark');
  updateToggleUI();
}
function updateToggleUI(){
  const isLight = document.documentElement.classList.contains('light');
  const lbl = document.getElementById('tglLbl');
  const thumb = document.getElementById('tglThumb');
  if(lbl) lbl.textContent = isLight ? '☀️ Light' : '🌙 Dark';
  if(thumb) thumb.textContent = isLight ? '☀️' : '🌙';
}
const S={html:{1:'',2:'',3:''},fname:{1:'',2:'',3:''},svg:'',imgB64:'',imgType:'image/png'};

// TABS
function sw(n){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  const m={svg:0,image:1,remove:2};
  document.querySelectorAll('.tab')[m[n]].classList.add('active');
  document.getElementById('panel-'+n).classList.add('active');
  cdd();
}

// DROPDOWN
function tdd(id){const el=document.getElementById(id),was=el.classList.contains('open');cdd();if(!was)el.classList.add('open');}
function cdd(){document.querySelectorAll('.dropdown').forEach(d=>d.classList.remove('open'));}
document.addEventListener('click',e=>{if(!e.target.closest('.more-btn'))cdd();});

// DRAG
function dg(e,id){e.preventDefault();document.getElementById(id).classList.add('dragover');}
function dl(id){document.getElementById(id).classList.remove('dragover');}

// LOAD HTML
function loadH(input,num){
  const f=input.files[0]; if(!f)return;
  const r=new FileReader();
  r.onload=e=>{S.html[num]=e.target.result;S.fname[num]=f.name;
    document.getElementById('fn'+num).innerHTML=`<div class="file-badge">📄 ${f.name} <span style="color:var(--muted);font-size:10px;">(${(f.size/1024).toFixed(1)}KB)</span></div>`;
    if(num===3)detect();
  };
  r.readAsText(f);
}
function dropH(e,dzId,num){
  e.preventDefault();dl(dzId);
  const f=e.dataTransfer.files[0];
  if(!f||(!f.name.endsWith('.html')&&!f.name.endsWith('.htm'))){showE('e'+num,'Sirf .html ya .htm file drop karo!');return;}
  const r=new FileReader();
  r.onload=ev=>{S.html[num]=ev.target.result;S.fname[num]=f.name;
    document.getElementById('fn'+num).innerHTML=`<div class="file-badge">📄 ${f.name}</div>`;
    if(num===3)detect();
  };
  r.readAsText(f);
}

// LOAD IMAGE
function loadI(input){
  const f=input.files[0];if(!f)return;S.imgType=f.type||'image/png';
  const r=new FileReader();
  r.onload=e=>{S.imgB64=e.target.result;document.getElementById('imgFN').innerHTML=`<div class="file-badge">🖼️ ${f.name}</div>`;showIP(S.imgB64);};
  r.readAsDataURL(f);
}
function dropI(e){
  e.preventDefault();dl('imgDZ');
  const f=e.dataTransfer.files[0];
  if(!f||!f.type.startsWith('image/')){showE('e2','Image file drop karo!');return;}
  S.imgType=f.type;
  const r=new FileReader();
  r.onload=ev=>{S.imgB64=ev.target.result;document.getElementById('imgFN').innerHTML=`<div class="file-badge">🖼️ ${f.name}</div>`;showIP(S.imgB64);};
  r.readAsDataURL(f);
}
function showIP(src){['ip48','ip32','ip16','ipTab'].forEach(id=>document.getElementById(id).src=src);document.getElementById('imgPW').style.display='flex';}
function clrImg(){S.imgB64='';document.getElementById('imgFN').innerHTML='';document.getElementById('imgPW').style.display='none';cdd();}

// SVG SAMPLES
const SVGs={
  om:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="48" fill="#FF6B00"/>
  <text x="50" y="70" font-size="62" text-anchor="middle" fill="white" font-family="serif">ॐ</text>
</svg>`,
  star:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="48" fill="#1a1000"/>
  <polygon points="50,12 61,39 90,39 67,57 76,84 50,66 24,84 33,57 10,39 39,39" fill="#FFD700"/>
</svg>`,
  fire:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="48" fill="#0f0500"/>
  <ellipse cx="50" cy="68" rx="24" ry="20" fill="#FF4500"/>
  <ellipse cx="50" cy="55" rx="15" ry="24" fill="#FF8C00"/>
  <ellipse cx="50" cy="42" rx="9" ry="17" fill="#FFD700"/>
</svg>`,
  code:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="18" fill="#f5a800"/>
  <text x="50" y="65" font-size="44" text-anchor="middle" fill="#0a0500" font-family="monospace" font-weight="bold">&lt;/&gt;</text>
</svg>`,
  sun:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="48" fill="#1a0f00"/>
  <circle cx="50" cy="50" r="18" fill="#FFD700"/>
  <line x1="50" y1="8" x2="50" y2="22" stroke="#FFD700" stroke-width="5" stroke-linecap="round"/>
  <line x1="50" y1="78" x2="50" y2="92" stroke="#FFD700" stroke-width="5" stroke-linecap="round"/>
  <line x1="8" y1="50" x2="22" y2="50" stroke="#FFD700" stroke-width="5" stroke-linecap="round"/>
  <line x1="78" y1="50" x2="92" y2="50" stroke="#FFD700" stroke-width="5" stroke-linecap="round"/>
  <line x1="21" y1="21" x2="31" y2="31" stroke="#FFD700" stroke-width="5" stroke-linecap="round"/>
  <line x1="69" y1="69" x2="79" y2="79" stroke="#FFD700" stroke-width="5" stroke-linecap="round"/>
  <line x1="79" y1="21" x2="69" y2="31" stroke="#FFD700" stroke-width="5" stroke-linecap="round"/>
  <line x1="21" y1="79" x2="31" y2="69" stroke="#FFD700" stroke-width="5" stroke-linecap="round"/>
</svg>`
};
function smpl(k){document.getElementById('svgIn').value=SVGs[k];S.svg=SVGs[k];upSVG();cdd();}
function clrSVG(){document.getElementById('svgIn').value='';S.svg='';upSVG();cdd();}
function cpSVG(){navigator.clipboard.writeText(S.svg||'').then(()=>toast('SVG Copied!'));cdd();}

// SVG PREVIEW
function upSVG(){
  S.svg=document.getElementById('svgIn').value.trim();
  if(!S.svg){
    document.getElementById('svgBig').innerHTML='<span style="color:var(--muted);font-size:9px">?</span>';
    document.getElementById('svgTab').innerHTML='<div style="width:12px;height:12px;background:var(--border);border-radius:2px;"></div>';
    return;
  }
  const u=`data:image/svg+xml,${encodeURIComponent(S.svg)}`;
  document.getElementById('svgBig').innerHTML=`<img src="${u}" style="width:34px;height:34px;">`;
  document.getElementById('svgTab').innerHTML=`<img src="${u}" style="width:14px;height:14px;">`;
}

// INJECT FAVICON
function inject(html,tag){
  let r=html.replace(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*\/?>/gi,'').replace(/<link[^>]*rel=["']apple-touch-icon["'][^>]*\/?>/gi,'');
  if(/<head[^>]*>/i.test(r))return r.replace(/(<head[^>]*>)/i,`$1\n  ${tag}`);
  if(/<html[^>]*>/i.test(r))return r.replace(/(<html[^>]*>)/i,`$1\n<head>\n  ${tag}\n</head>`);
  return `<head>\n  ${tag}\n</head>\n`+r;
}

// REFRESH CODE PREVIEW
function rfPrev(type){
  if(type==='svg'){
    if(!S.svg||!S.html[1]){document.getElementById('c1').innerHTML='<span class="code-ph">HTML file aur SVG dono chahiye preview ke liye...</span>';return;}
    const tag=`<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(S.svg)}" type="image/svg+xml">`;
    const out=inject(S.html[1],tag);
    document.getElementById('c1').textContent=out.slice(0,3000)+(out.length>3000?'\n\n... (file continues)':'');
  } else {
    if(!S.imgB64||!S.html[2]){document.getElementById('c2').innerHTML='<span class="code-ph">HTML file aur image dono chahiye...</span>';return;}
    const b64=document.getElementById('emb').checked,apple=document.getElementById('apl').checked;
    let tag=b64?`<link rel="icon" href="${S.imgB64}" type="${S.imgType}">`:`<link rel="icon" href="favicon.png" type="${S.imgType}">`;
    if(apple&&b64)tag+=`\n  <link rel="apple-touch-icon" href="${S.imgB64}">`;
    const out=inject(S.html[2],tag);
    document.getElementById('c2').textContent=out.slice(0,3000)+(out.length>3000?'\n\n... (file continues)':'');
  }
}

// ADD FAVICON & DOWNLOAD
function addFav(type){
  clrSuc();hideE('e1');hideE('e2');
  if(type==='svg'){
    if(!S.svg){showE('e1','SVG code paste karo!');return;}
    if(!S.html[1]){showE('e1','HTML file upload karo!');return;}
    const tag=`<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(S.svg)}" type="image/svg+xml">`;
    dl2(inject(S.html[1],tag),S.fname[1],'_with_favicon');
    rfPrev('svg');document.getElementById('s1').classList.add('show');
  } else {
    if(!S.imgB64){showE('e2','Image upload karo!');return;}
    if(!S.html[2]){showE('e2','HTML file upload karo!');return;}
    const b64=document.getElementById('emb').checked,apple=document.getElementById('apl').checked;
    let tag=b64?`<link rel="icon" href="${S.imgB64}" type="${S.imgType}">`:`<link rel="icon" href="favicon.png">`;
    if(apple&&b64)tag+=`\n  <link rel="apple-touch-icon" href="${S.imgB64}">`;
    dl2(inject(S.html[2],tag),S.fname[2],'_with_favicon');
    rfPrev('image');document.getElementById('s2').classList.add('show');
  }
}

// DETECT FAVICONS
function detect(){
  const html=S.html[3];
  const found=html.match(/<link[^>]*rel=["'](?:(?:shortcut )?icon|apple-touch-icon)["'][^>]*>/gi)||[];
  const card=document.getElementById('detCard');
  card.style.display='block';
  document.getElementById('detList').innerHTML=
    found.length
    ? found.map(f=>`<div style="background:var(--code-bg);border:1px solid var(--border);border-radius:8px;padding:9px 12px;margin-bottom:8px;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--code-text);word-break:break-all;">${esc(f)}</div>`).join('')
      +`<div style="margin-top:8px;"><span class="badge br">⚠️ ${found.length} favicon${found.length>1?'s':''} found</span></div>`
    : `<span class="badge bg">✅ Koi favicon nahi mila is file mein</span>`;
  prvRem();
}

// PREVIEW REMOVE
function prvRem(){
  if(!S.html[3]){document.getElementById('c3').innerHTML='<span class="code-ph">HTML file upload karo...</span>';return;}
  const cleaned=S.html[3].replace(/<link[^>]*rel=["'](?:(?:shortcut )?icon|apple-touch-icon)["'][^>]*\/?>/gi,'').replace(/\n\s*\n\s*\n/g,'\n\n');
  document.getElementById('c3').textContent=cleaned.slice(0,3000)+(cleaned.length>3000?'\n\n... (file continues)':'');
}

// REMOVE FAVICON
function remFav(){
  hideE('e3');clrSuc();
  if(!S.html[3]){showE('e3','HTML file upload karo!');return;}
  const cleaned=S.html[3].replace(/<link[^>]*rel=["'](?:(?:shortcut )?icon|apple-touch-icon)["'][^>]*\/?>/gi,'').replace(/\n\s*\n\s*\n/g,'\n\n');
  dl2(cleaned,S.fname[3],'_no_favicon');
  prvRem();document.getElementById('s3').classList.add('show');
}

// UTILS
function dl2(content,fname,suffix){
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([content],{type:'text/html'}));
  a.download=(fname||'output').replace(/\.(html|htm)$/i,'')+suffix+'.html';
  a.click();URL.revokeObjectURL(a.href);
}
function cpCode(id){
  navigator.clipboard.writeText(document.getElementById(id).textContent).then(()=>toast('Code Copied! 📋'));
}
function showE(id,msg){const el=document.getElementById(id);if(el){el.textContent='⚠️ '+msg;el.classList.add('show');}}
function hideE(id){const el=document.getElementById(id);if(el)el.classList.remove('show');}
function clrSuc(){document.querySelectorAll('.suc-box').forEach(e=>e.classList.remove('show'));}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function toast(msg){
  const t=document.createElement('div');
  t.textContent=msg;
  t.style.cssText='position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#f5a800,#ff6a00);color:#0a0500;padding:10px 22px;border-radius:30px;font-size:13px;font-weight:800;font-family:Syne,sans-serif;z-index:9999;box-shadow:0 4px 20px rgba(245,168,0,0.5);white-space:nowrap;';
  document.body.appendChild(t);setTimeout(()=>t.remove(),2000);
}