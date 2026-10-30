/* ISON Watch page logic. Content lives in catalog.js. */
(function(){
const $=s=>document.querySelector(s);
const ROWS=[["series","Series"],["short","Shorts"],["trailer","Trailers"]];
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ready=i=>i.episodes.some(e=>e.youtube);
const label=t=>({series:"Series",short:"Short",trailer:"Trailer"}[t]||t);
let feat=CATALOG.find(i=>i.id===FEATURED_ID)||CATALOG[0], timer=null, hover=false;

function bill(i){feat=i;$("#bill").style.backgroundImage=`url("${i.thumb}")`;
 $("#bcase").textContent=i.id+" · "+label(i.type);$("#btitle").textContent=i.title;$("#bsyn").textContent=i.synopsis;
 $("#bmeta").textContent=[i.year,i.tags.join(" / "),i.episodes.length+(i.episodes.length>1?" episodes":" video")].join("  ·  ");
 $("#bplay").innerHTML=ready(i)?"&#9654; Play":"Coming soon &middot; Details";}
function cycle(){if(reduce||CATALOG.length<2)return;clearInterval(timer);timer=setInterval(()=>{
 if(hover||$("#q").value||$("#player").classList.contains("open")||document.hidden)return;
 bill(CATALOG[(CATALOG.indexOf(feat)+1)%CATALOG.length]);},7000);}
function card(i){const b=document.createElement("button");b.className="card";
 b.innerHTML=`<div class="th" style="background-image:url('${esc(i.thumb)}')"><b class="mono">${esc(i.id)}</b>${ready(i)?"":'<i class="mono">Coming soon</i>'}</div><div class="meta"><h3>${esc(i.title)}</h3><p>${esc(i.year)} · ${esc(i.tags.join(" / "))}</p></div>`;
 b.onclick=()=>openP(i);b.onmouseenter=()=>{hover=true;bill(i)};b.onmouseleave=()=>hover=false;b.onfocus=()=>bill(i);return b;}
function rows(){const q=$("#q").value.trim().toLowerCase(),R=$("#rows");R.innerHTML="";
 const m=i=>!q||(i.title+" "+i.id+" "+i.tags.join(" ")+" "+i.synopsis+" "+label(i.type)).toLowerCase().includes(q);
 let any=0;ROWS.forEach(([t,l])=>{const it=CATALOG.filter(i=>i.type===t&&m(i));if(q&&!it.length)return;any+=it.length;
  const s=document.createElement("section");s.className="row";s.innerHTML=`<h2 class="mono">${l}</h2>`;const c=document.createElement("div");c.className="cards";
  if(!it.length)c.innerHTML='<p class="empty mono">Nothing here yet. Transmission pending.</p>';it.forEach(i=>c.appendChild(card(i)));s.appendChild(c);R.appendChild(s);});
 if(q&&!any)R.innerHTML=`<section class="row"><p class="empty">Nothing in the archive matches "${esc(q)}".</p></section>`;}
let cur=null;
function openP(i,n){cur=i;const P=$("#player");P.classList.add("open");$("#ptitle").textContent=i.id+" — "+i.title;
 const E=$("#eps");E.innerHTML="";i.episodes.forEach((e,k)=>{const li=document.createElement("li");
  li.innerHTML=`<button><span class="mono">${String(k+1).padStart(2,"0")}</span><span>${esc(e.title)}</span><span class="mono">${esc(e.youtube?e.runtime:"Soon")}</span></button>`;
  li.firstChild.onclick=()=>ep(k);E.appendChild(li);});
 ep(n??Math.max(0,i.episodes.findIndex(e=>e.youtube)));P.scrollIntoView({behavior:reduce?"auto":"smooth"});}
function ep(k){const e=cur.episodes[k],S=$("#screen");[...$("#eps").children].forEach((li,j)=>li.firstChild.classList.toggle("on",j===k));
 $("#pnote").textContent=e.note||cur.synopsis;
 if(e.youtube){S.style.backgroundImage="";S.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(e.youtube)}?autoplay=1&rel=0" title="${esc(e.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;}
 else{S.style.backgroundImage=`url("${cur.thumb}")`;S.innerHTML=`<div class="soon"><span class="mono case">${esc(e.title)}</span><strong>Coming soon</strong><a class="fallback" href="#insiders">Get notified first &rarr;</a></div>`;}}
$("#pclose").onclick=()=>{$("#player").classList.remove("open");$("#screen").innerHTML="";};
$("#bplay").onclick=()=>openP(feat);$("#bill").onmouseenter=()=>hover=true;$("#bill").onmouseleave=()=>hover=false;
$("#q").oninput=rows;bill(feat);rows();cycle();
})();
