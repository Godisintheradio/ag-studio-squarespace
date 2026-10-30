/* AG Mobile Menu 7.1 — beta 0.1.5. Reads Squarespace's original mobile navigation. */
(function(){
'use strict';
if(window.__AGMM71__)return;
window.__AGMM71__=true;
const ID='agmm';
const config={nav:'.header-menu-nav-list',burger:'.header-burger-btn'};
let overlay,opener,lastFocus,restoreOverflow='',inerted=[],closeDelay=null;
function tapAnimation(el){if(!el)return;el.classList.remove('agmm-tapped');void el.offsetWidth;el.classList.add('agmm-tapped');setTimeout(()=>el.classList.remove('agmm-tapped'),400)}
const visible=el=>!!(el&&el.getClientRects().length);
const text=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
function permittedHref(el){
 const raw=el?.getAttribute('href');if(!raw)return null;
 try{const u=new URL(raw,location.href);return ['http:','https:','mailto:','tel:'].includes(u.protocol)?u.href:null}catch{return null}
}
function makeLink(source,label){
 const a=document.createElement('a');a.className='agmm-link';a.textContent=label||text(source);
 const url=permittedHref(source);if(!url)return null;
 a.href=url;if(source.target==='_blank'){a.target='_blank';a.rel='noopener noreferrer'}
 return a;
}
/* Day/night proxy: use the existing global toggle rather than a second theme engine. */
const themeToggleSelectors=[
 '[data-ag-theme-toggle]',
 '.ag-theme-toggle',
 '.ag-day-night-toggle',
 '.ag-day-night-switch',
 '#ag-theme-toggle',
 '#ag-day-night-toggle',
 '[aria-label*="giorno" i][aria-label*="notte" i]',
 '[aria-label*="light" i][aria-label*="dark" i]'
];
function findThemeToggle(){
 for(const selector of themeToggleSelectors){
  const candidates=document.querySelectorAll(selector);
  for(const el of candidates){
   if(el.closest('#agmm'))continue;
   if(el.matches('input[type="checkbox"]'))return el;
   const clickable=el.matches('button,[role="switch"],[role="button"]')?el:el.querySelector('button,input[type="checkbox"],[role="switch"]');
   if(clickable)return clickable;
  }
 }
 return null;
}
function addThemeControl(secondary){
 const wrap=document.createElement('div');wrap.className='agmm-theme-row';
 const label=document.createElement('span');label.textContent='Modalità notte';
 const toggle=document.createElement('button');toggle.type='button';toggle.className='agmm-theme-toggle';
 toggle.setAttribute('role','switch');toggle.setAttribute('aria-label','Attiva o disattiva la modalità notte');
 const track=document.createElement('span');track.className='agmm-theme-track';
 const thumb=document.createElement('span');thumb.className='agmm-theme-thumb';track.append(thumb);toggle.append(track);
 function sync(){
  const dark=document.documentElement.getAttribute('data-ag-theme')==='dark';
  toggle.setAttribute('aria-checked',String(dark));
  wrap.classList.toggle('agmm-theme-dark',dark);
 }
 toggle.addEventListener('click',()=>{
  const target=findThemeToggle();
  if(!target)return;
  // Delegate to the site's actual theme control, preserving its persistence.
  if(target.matches('input[type="checkbox"]'))target.click();
  else target.click();
  requestAnimationFrame(sync);
 });
 const observer=new MutationObserver(sync);
 observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-ag-theme']});
 wrap.append(label,toggle);secondary.append(wrap);sync();
}
function build(){
 const nav=document.querySelector(config.nav),root=nav?.querySelector('[data-folder="root"]');
 if(!root)return null;
 const items=[];
 root.querySelectorAll('.header-menu-nav-wrapper > .header-menu-nav-item').forEach(node=>{
  const source=node.querySelector(':scope > a');if(!source)return;
  const title=text(source.querySelector('.header-nav-folder-title-text')||source.querySelector('.header-menu-nav-item-content')||source);
  if(!title)return;
  const folderId=source.getAttribute('data-folder-id');
  const submenu=folderId?Array.from(nav.querySelectorAll('.header-menu-nav-folder')).find(el=>el.getAttribute('data-folder')===folderId):null;
  const children=submenu?Array.from(submenu.querySelectorAll('.header-menu-nav-item > a[href]')).filter(a=>!a.closest('.header-menu-controls')):[];
  items.push({title,source,children});
 });
 if(!items.length)return null;
 const container=document.createElement('div');
 items.forEach((item,i)=>{
  const group=document.createElement('div');group.className='agmm-group';
  const row=document.createElement('div');row.className='agmm-row';
  if(item.children.length){
   const button=document.createElement('button');button.type='button';button.className='agmm-toggle agmm-label';button.textContent=item.title;
   const icon=document.createElement('button');icon.type='button';icon.className='agmm-toggle agmm-icon';icon.textContent='+';icon.setAttribute('aria-label','Espandi '+item.title);
   const list=document.createElement('ul');list.className='agmm-children';list.id='agmm-sub-'+i;list.hidden=true;
   for(const child of item.children){const a=makeLink(child);if(!a)continue;a.className='';const li=document.createElement('li');li.append(a);list.append(li)}
   function toggle(){tapAnimation(icon);const opening=list.hidden;container.querySelectorAll('.agmm-children').forEach(el=>{el.hidden=true});container.querySelectorAll('.agmm-toggle[aria-expanded]').forEach(el=>el.setAttribute('aria-expanded','false'));container.querySelectorAll('.agmm-icon').forEach(el=>{el.textContent='+'});list.hidden=!opening;button.setAttribute('aria-expanded',String(opening));icon.setAttribute('aria-expanded',String(opening));icon.textContent='+';icon.setAttribute('aria-label',(opening?'Chiudi ':'Espandi ')+item.title)}
   [button,icon].forEach(b=>{b.setAttribute('aria-controls',list.id);b.setAttribute('aria-expanded','false');b.addEventListener('click',toggle)});
   row.append(button,icon);group.append(row,list);
  }else{const a=makeLink(item.source,item.title);if(a){row.append(a);group.append(row)}}
  container.append(group);
 });
 const secondary=document.createElement('div');secondary.className='agmm-secondary';
 const account=root.querySelector('.user-accounts-link a');
 if(account){const button=document.createElement('button');button.type='button';button.className='agmm-action';button.textContent=text(account)||'Accedi';button.addEventListener('click',()=>{close(false);account.click()});secondary.append(button)}
 const cta=root.querySelector('.header-menu-cta a[href]');
 if(cta){const a=makeLink(cta);if(a){a.className='agmm-cta';secondary.append(a)}}
 addThemeControl(secondary);container.append(secondary);return container;
}
function setup(){
 if(document.getElementById(ID))return;
 const nav=document.querySelector(config.nav),burger=document.querySelector(config.burger);if(!nav||!burger)return;
 const initial=build();if(!initial)return;
 overlay=document.createElement('div');overlay.id=ID;overlay.hidden=true;
 const panel=document.createElement('section');panel.className='agmm-panel';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Navigazione principale');
 const head=document.createElement('div');head.className='agmm-head';
 const brand=document.createElement('a');brand.className='agmm-brand';brand.href='/';brand.setAttribute('aria-label','Vai alla homepage');
 // Reuse the actual Squarespace header branding, prioritizing its logo image.
 const header=document.querySelector('header#header, header.Header, .header');
 const logo=header?.querySelector('.header-title-logo img, .header-title img, .header-branding img');
 const logoUrl=logo&&(logo.currentSrc||logo.getAttribute('src')||logo.getAttribute('data-src'));
 if(logoUrl){
  const img=document.createElement('img');
  img.src='https://static1.squarespace.com/static/5b6476223917eeb605c563f4/t/6ae320f38d4e95758258b329/1793270003136/Brand-AG-dark.png';
  img.alt=logo.alt||'Antonio Giardiello';
  img.decoding='async';
  img.onerror=()=>{img.onerror=null;img.src=logoUrl};
  brand.append(img);
 }
 else {
  const label=header?.querySelector('.header-title-text a, .header-title-text, .header-title a, .header-title');
  brand.textContent=text(label)||'Antonio Giardiello';
 }
 const x=document.createElement('button');x.type='button';x.className='agmm-close';x.textContent='×';x.setAttribute('aria-label','Chiudi menu');x.addEventListener('click',()=>{tapAnimation(x);setTimeout(()=>close(),110)});
 head.append(brand,x);const body=document.createElement('nav');body.className='agmm-body';body.setAttribute('aria-label','Menu mobile');body.append(initial);panel.append(head,body);overlay.append(panel);document.body.append(overlay);
 overlay.addEventListener('click',e=>{if(e.target===overlay)close();else if(e.target.closest('#agmm a[href]'))close(false)});
 document.addEventListener('click',e=>{
  const btn=e.target.closest?.(config.burger);if(!btn||!visible(btn))return;
  e.preventDefault();e.stopImmediatePropagation();tapAnimation(btn);if(!overlay.hidden){close();return}
  const current=build();if(!current)return;body.replaceChildren(current);
  opener=btn;lastFocus=document.activeElement;restoreOverflow=document.body.style.overflow;
  inerted=Array.from(document.body.children).filter(n=>n!==overlay).map(n=>[n,n.inert]);inerted.forEach(([n])=>n.inert=true);
  document.body.style.overflow='hidden';overlay.hidden=false;btn.setAttribute('aria-expanded','true');
  requestAnimationFrame(()=>requestAnimationFrame(()=>{if(!overlay.hidden)overlay.classList.add('agmm-open')}));x.focus();
 },true);
 document.addEventListener('keydown',e=>{if(overlay.hidden)return;if(e.key==='Escape'){e.preventDefault();close();return}if(e.key!=='Tab')return;
  const focusables=Array.from(panel.querySelectorAll('a[href],button:not([disabled])')).filter(el=>visible(el));if(!focusables.length)return;
  const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 });
 window.addEventListener('resize',()=>{if(!overlay.hidden&&!visible(burger))close(false)});
}
function close(returnFocus=true){
 if(!overlay||overlay.hidden)return;
 overlay.classList.remove('agmm-open');opener?.setAttribute('aria-expanded','false');
 if(closeDelay)clearTimeout(closeDelay);
 closeDelay=setTimeout(()=>{overlay.hidden=true;document.body.style.overflow=restoreOverflow;inerted.forEach(([n,was])=>n.inert=was);inerted=[];
  if(returnFocus&&lastFocus?.isConnected)lastFocus.focus();},window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:330);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
})();