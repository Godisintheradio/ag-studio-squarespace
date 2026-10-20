/* AG Studio — Day/Night toggle, pilot 0.1.3 */
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
 const targets=()=>Array.from(document.querySelectorAll('.page-section, [data-section-theme], .footer-sections > section'));
 function syncSection(el){
   // Do not recolor the custom mobile overlay or switch.
   if(el.closest('#agmm, #ag-theme-switch'))return;
   if(!originals.has(el)){
     originals.set(el,{
       classes:THEMES.filter(c=>el.classList.contains(c)),
       themeAttribute:el.getAttribute('data-section-theme'),
       hasThemeAttribute:el.hasAttribute('data-section-theme')
     });
   }
   const original=originals.get(el);
   for(const c of THEMES)el.classList.remove(c);
   if(mode==='dark'){
     el.classList.add(DARK);
     el.setAttribute('data-section-theme',DARK);
   }else{
     for(const c of original.classes)el.classList.add(c);
     if(original.hasThemeAttribute)el.setAttribute('data-section-theme',original.themeAttribute);
     else el.removeAttribute('data-section-theme');
   }
 }
 // Scan nested Code Block surfaces, including inline backgrounds and !important declarations.
 const changed=new Map();
 function restoreCodeSurfaces(){
   for(const [el,props] of changed){
     if(!el.isConnected)continue;
     for(const [prop,entry] of Object.entries(props)){
       if(entry.value)el.style.setProperty(prop,entry.value,entry.priority);
       else el.style.removeProperty(prop);
     }
   }
   changed.clear();
 }
 function isWhite(color){
   const m=color.match(/^rgba?\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)(?:\\s*,\\s*([\\d.]+))?\\s*\\)$/i);
   return !!m && +m[1]>=250 && +m[2]>=250 && +m[3]>=250 && (m[4]===undefined || +m[4]>=0.98);
 }
 function isDark(color){
   const m=color.match(/^rgba?\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)/i);
   return !!m && (+m[1]*0.2126 + +m[2]*0.7152 + +m[3]*0.0722)<105;
 }
 function markWhiteCodeSurfaces(){
   restoreCodeSurfaces();
   if(mode!=='dark')return;
   document.querySelectorAll('.sqs-block-code .sqs-block-content').forEach(content=>{
     const nodes=[content,...content.querySelectorAll('*')];
     for(const el of nodes){
       if(el.matches('button,input,select,textarea,a,svg,canvas,video,iframe,img,picture') || el.closest('[data-ag-theme-ignore],.ag-theme-ignore'))continue;
       const style=getComputedStyle(el);
       if(style.backgroundImage!=='none' || !isWhite(style.backgroundColor))continue;
       const props={};
       for(const prop of ['background','background-color','color']){
         props[prop]={value:el.style.getPropertyValue(prop),priority:el.style.getPropertyPriority(prop)};
       }
       changed.set(el,props);
       el.style.setProperty('background','#000000','important');
       if(isDark(style.color))el.style.setProperty('color','#F5F3EE','important');
     }
   });
 }
 function apply(){
   root.setAttribute('data-ag-theme',mode);
   root.style.colorScheme=mode;
   if(observer)observer.disconnect();
   for(const el of targets())syncSection(el);
   markWhiteCodeSurfaces();
   if(observer)observer.observe(document.body,{subtree:true,childList:true});
   if(button){
     button.setAttribute('aria-label',mode==='dark'?'Attiva modalità giorno':'Attiva modalità notte');
     button.setAttribute('title',mode==='dark'?'Modalità giorno':'Modalità notte');
     button.setAttribute('aria-pressed',String(mode==='dark'));
   }
 }
 function createButton(){
   button=document.getElementById('ag-theme-switch');
   if(button)return;
   button=document.createElement('button');button.type='button';button.id='ag-theme-switch';
   button.setAttribute('aria-label','Attiva modalità notte');
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
