/* AG Studio — desktop header switch v0.2; structure verified from Squarespace HTML */
(function(){
 'use strict';
 if(window.__AG_HEADER_THEME__)return;
 window.__AG_HEADER_THEME__=true;
 const media=window.matchMedia('(min-width:768px)');
 let pending=false;
 function place(){
   if(!media.matches)return;
   const toggle=document.getElementById('ag-theme-switch');
   const actions=document.querySelector('.header-display-desktop .header-actions');
   if(!toggle||!actions)return;
   // CTA must be a DIRECT child. Cart and account wrappers live in
   // showOnMobile/showOnDesktop and may be hidden at desktop widths.
   const cta=actions.querySelector(':scope > .header-actions-action--cta');
   if(!cta)return;
   let slot=actions.querySelector(':scope > .ag-header-theme-slot');
   if(!slot){
     slot=actions.querySelector('.ag-header-theme-slot') ||
          document.createElement('span');
     slot.classList.add('ag-header-theme-slot');
   }
   // Always move the slot out of any showOnMobile/showOnDesktop wrapper.
   if(slot.parentElement!==actions||slot.nextElementSibling!==cta){
     actions.insertBefore(slot,cta);
   }
   if(toggle.parentElement!==slot)slot.append(toggle);
 }
 function schedule(){
   if(pending)return;
   pending=true;
   requestAnimationFrame(()=>{pending=false;place()});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',place,{once:true});
 else place();
 media.addEventListener('change',schedule);
 const observer=new MutationObserver(records=>{
   if(!media.matches)return;
   if(records.some(record=>Array.from(record.addedNodes).some(node=>
     node.nodeType===1&&(node.id==='ag-theme-switch'||node.matches?.('.header-actions,.header-display-desktop,#header'))
   )))schedule();
 });
 observer.observe(document.documentElement,{childList:true,subtree:true});
})();
