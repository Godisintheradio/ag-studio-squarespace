/* AG Studio — header desktop theme switch v0.1 */
(function(){
 'use strict';
 if(window.__AG_HEADER_THEME__)return;
 window.__AG_HEADER_THEME__=true;
 const media=window.matchMedia('(min-width:768px)');
 let scheduled=false;
 function place(){
   if(!media.matches)return;
   const toggle=document.getElementById('ag-theme-switch');
   if(!toggle)return;
   const header=document.querySelector('.header-display-desktop, header#header, header.Header');
   if(!header)return;
   const cta=header.querySelector('.header-actions-action--cta, .header-actions .sqs-button-element, .header-actions .header-actions-action');
   const action=cta?.closest('.header-actions-action--cta')||cta;
   const actions=action?.parentElement||header.querySelector('.header-actions');
   if(!actions)return;
   let slot=header.querySelector('.ag-header-theme-slot');
   if(!slot){slot=document.createElement('span');slot.className='ag-header-theme-slot'}
   if(action&&action!==slot)actions.insertBefore(slot,action);
   else if(!slot.isConnected)actions.append(slot);
   if(toggle.parentElement!==slot)slot.append(toggle);
 }
 function enqueue(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;place()})}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',place,{once:true});else place();
 media.addEventListener('change',enqueue);
 new MutationObserver(records=>{if(records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1&&(n.id==='ag-theme-switch'||n.matches?.('.header-actions,.header-display-desktop')))))enqueue()}).observe(document.documentElement,{childList:true,subtree:true});
})();
