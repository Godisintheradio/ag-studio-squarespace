/* AG Studio — navigation icons 7.1 beta 0.1.0. Visual decoration only. */
(function(){
'use strict';
if(window.__AG_NAV_ICONS__)return;window.__AG_NAV_ICONS__=true;
const icons={
home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
wrench:'<path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18a2 2 0 0 0 3 3l5.3-5.3a5 5 0 0 0 6.4-6.4L14 13l-3-3z"/>',
video:'<rect x="3" y="5" width="13" height="14" rx="3"/><path d="m16 10 5-3v10l-5-3"/>',
code:'<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-12-3 16"/>',
bag:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/>',
monitor:'<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M12 18v3m-5 0h10"/>',
shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 12h20m-12 0v2h4v-2"/>',
book:'<path d="M12 6c-3-2-6-2-10-1v14c4-1 7-1 10 1 3-2 6-2 10-1V5c-4-1-7-1-10 1zm0 0v14"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 22v-2a8 8 0 0 1 16 0v2"/>',
mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 7 9-7"/>',
layers:'<path d="m12 2 9 5-9 5-9-5 9-5zm-9 10 9 5 9-5m-18 5 9 5 9-5"/>',
sparkles:'<path d="m12 3 1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5zM19 18l.5 1.5L21 20l-1.5.5L19 22l-.5-1.5L17 20l1.5-.5z"/>'
};
const rules=[
[/^(home|homepage|inizio)(\b|\s|$)/,'home'],
[/assistenza|supporto tecnico/,'wrench'],
[/consulenza|formazione|coaching/,'video'],
[/sviluppo|personalizzat/,'code'],
[/code shop|shop|negozio/,'bag'],
[/realizzazione|siti squarespace|web design/,'monitor'],
[/manutenzione|supporto continuativo/,'shield'],
[/portfolio|progetti|casi studio/,'briefcase'],
[/guide|blog|articoli/,'book'],
[/chi sono|about|studio/,'user'],
[/contatti|contattami|richiedi/,'mail'],
[/brand|grafica|creative/,'sparkles'],
[/servizi/,'layers']
];
const svg=(key)=>{const span=document.createElement('span');span.className='ag-nav-icon';span.setAttribute('aria-hidden','true');span.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+icons[key]+'</svg>';return span};
function decorate(el){
 if(el.dataset.agIconReady==='1')return;
 if(el.closest('.header-menu')&&!el.closest('#agmm'))return; // native menu remains a fallback
 const label=(el.textContent||'').trim().toLocaleLowerCase('it-IT');
 const key=rules.find(([pattern])=>pattern.test(label))?.[1];
 if(!key)return;
 el.dataset.agIconReady='1';el.classList.add('ag-icon-label');el.prepend(svg(key));
}
function run(){
 document.querySelectorAll('.header-nav-list .header-nav-item a, .header-nav-list .header-nav-item--folder .header-nav-folder-title, #agmm .agmm-row > .agmm-link, #agmm .agmm-row > .agmm-label, #agmm .agmm-children a, #agmm .agmm-action, #agmm .agmm-cta').forEach(decorate);
}
let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;run()})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{run();new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true})},{once:true});
else{run();new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true})}
})();
