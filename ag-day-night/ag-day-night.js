/* AG Studio — Day/Night toggle, pilot 0.1.0 */
(function(){
 'use strict';
 if(window.__AG_THEME_TOGGLE__)return;
 window.__AG_THEME_TOGGLE__=true;
 const KEY='ag-studio-theme-v1';
 const THEMES=['white','white-bold','light','light-bold','bright','bright-inverse','dark','dark-bold','black','black-bold'];
 const DARK='black-bold';
 const originals=new WeakMap();
 let mode='light',button=null,observer=null;
 try{mode=localStorage.getItem(KEY)==='dark'?'dark':'light'}catch(e){}
 const root=document.documentElement;
 root.setAttribute('data-ag-theme',mode);
 root.style.colorScheme=mode;
 const targets=()=>Array.from(document.querySelectorAll('.page-section, #footer .page-section, footer .page-section'));
 function syncSection(el){
   if(!originals.has(el)){
     const original=THEMES.filter(c=>el.classList.contains(c));
     originals.set(el,original);
   }
   const original=originals.get(el);
   if(mode==='dark'){
     // Rely on Squarespace's native theme tokens (buttons, forms and text).
     for(const c of THEMES)el.classList.remove(c);
     el.classList.add(DARK);
   } else {
     for(const c of THEMES)el.classList.remove(c);
     for(const c of original)el.classList.add(c);
   }
 }
 function apply(){
   root.setAttribute('data-ag-theme',mode);
   root.style.colorScheme=mode;
   // Temporarily disconnect to avoid observer loops on our own class edits.
   if(observer)observer.disconnect();
   for(const el of targets())syncSection(el);
   if(observer)observer.observe(document.body,{subtree:true,childList:true});
   if(button){
     button.setAttribute('aria-label',mode==='dark'?'Attiva modalità giorno':'Attiva modalità notte');
     button.setAttribute('title',mode==='dark'?'Modalità giorno':'Modalità notte');
     button.setAttribute('aria-pressed',String(mode==='dark'));
   }
 }
 function createButton(){
   if(document.getElementById('ag-theme-switch'))return;
   button=document.createElement('button');button.type='button';button.id='ag-theme-switch';
   button.innerHTML='<svg class="ag-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg><svg class="ag-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.7 13.2A8.7 8.7 0 0 1 10.8 3.3a8.7 8.7 0 1 0 9.9 9.9Z"/></svg>';
   button.addEventListener('click',()=>{
     mode=mode==='dark'?'light':'dark';
     try{localStorage.setItem(KEY,mode)}catch(e){}
     apply();
   });
   document.body.append(button);
 }
 function init(){
   if(!document.body)return;
   createButton();
   observer=new MutationObserver(records=>{
     if(records.some(r=>Array.from(r.addedNodes).some(n=>n.nodeType===1)))apply();
   });
   apply();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
