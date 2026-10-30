/* AG Mobile Menu 7.1 — beta 0.1.0 + native theme switch relocation. Reads Squarespace's original mobile navigation. */
(function(){
'use strict';
if(window.__AGMM71__)return;
window.__AGMM71__=true;
const ID='agmm';
const config={nav:'.header-menu-nav-list',burger:'.header-burger-btn'};
let overlay,opener,lastFocus,restoreOverflow='',inerted=[],closeDelay=null;
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
   function toggle(){const opening=list.hidden;container.querySelectorAll('.agmm-children').forEach(el=>{el.hidden=true});container.querySelectorAll('.agmm-toggle[aria-expanded]').forEach(el=>el.setAttribute('aria-expanded','false'));container.querySelectorAll('.agmm-icon').forEach(el=>{el.textContent='+'});list.hidden=!opening;button.setAttribute('aria-expanded',String(opening));icon.setAttribute('aria-expanded',String(opening));icon.textContent=opening?'−':'+';icon.setAttribute('aria-label',(opening?'Chiudi ':'Espandi ')+item.title)}
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
 container.append(secondary);return container;
}
/* Relocate the actual AG theme switch; never clone or replace its behavior. */
let themeSlot=null,themePlaceholder=null,themeButton=null;
function syncThemeSwitch(){
 if(!themeSlot)return;
 const mobile=window.matchMedia('(max-width: 767px)').matches;
 const btn=themeButton&&themeButton.isConnected?themeButton:document.querySelector('#ag-theme-switch');
 if(!btn)return;
 if(mobile){
  if(btn.parentNode!==themeSlot){
   if(!themePlaceholder){
    themePlaceholder=document.createComment('ag-theme-switch-original-position');
    btn.parentNode.insertBefore(themePlaceholder,btn);
   }
   themeButton=btn;
   themeSlot.appendChild(btn);
  }
 }else if(themePlaceholder&&themePlaceholder.parentNode&&btn.parentNode===themeSlot){
  themePlaceholder.parentNode.insertBefore(btn,themePlaceholder);
  themePlaceholder.remove();
  themePlaceholder=null;
 }
}
function setup(){
 if(document.getElementById(ID))return;
 const nav=document.querySelector(config.nav),burger=document.querySelector(config.burger);if(!nav||!burger)return;
 const initial=build();if(!initial)return;
 overlay=document.createElement('div');overlay.id=ID;overlay.hidden=true;
 const panel=document.createElement('section');panel.className='agmm-panel';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Navigazione principale');
 const head=document.createElement('div');head.className='agmm-head';
 const brand=document.createElement('a');brand.className='agmm-brand';brand.href='/';brand.setAttribute('aria-label','Vai alla homepage');
 const logo=document.querySelector('.header-title-logo img, .header-title img, .header-branding img');
 if(logo){
  const img=document.createElement('img');img.alt=logo.alt||'Logo';
  img.className='agmm-brand-logo';
  brand.append(img);
  const darkLogo='https://static1.squarespace.com/static/5b6476223917eeb605c563f4/t/6ae320f38d4e95758258b329/1793270003136/Brand-AG-dark.png';
  const updateBrand=()=>{
   const dark=document.documentElement.getAttribute('data-ag-theme')==='dark';
   const src=dark?darkLogo:(logo.currentSrc||logo.src);
   if(src&&img.getAttribute('src')!==src)img.src=src;
  };
  updateBrand();
  new MutationObserver(updateBrand).observe(document.documentElement,{attributes:true,attributeFilter:['data-ag-theme']});
 }else brand.textContent='Antonio Giardiello';
 const x=document.createElement('button');x.type='button';x.className='agmm-close';x.textContent='×';x.setAttribute('aria-label','Chiudi menu');x.addEventListener('click',()=>close());
 head.append(brand,x);const body=document.createElement('nav');body.className='agmm-body';body.setAttribute('aria-label','Menu mobile');body.append(initial);
 themeSlot=document.createElement('div');themeSlot.className='agmm-theme-slot';
 const themeLabel=document.createElement('span');themeLabel.className='agmm-theme-label';themeLabel.textContent='Aspetto';
 themeSlot.append(themeLabel);body.append(themeSlot);
 panel.append(head,body);overlay.append(panel);document.body.append(overlay);
 syncThemeSwitch();
 const themeFinder=new MutationObserver(()=>{if(!themeButton||!themeButton.isConnected)syncThemeSwitch()});
 themeFinder.observe(document.body,{childList:true,subtree:true});
 overlay.addEventListener('click',e=>{if(e.target===overlay)close();else if(e.target.closest('#agmm a[href]'))close(false)});
 document.addEventListener('click',e=>{
  const btn=e.target.closest?.(config.burger);if(!btn||!visible(btn))return;
  e.preventDefault();e.stopImmediatePropagation();if(!overlay.hidden){close();return}
  const current=build();if(!current)return;body.insertBefore(current,themeSlot);Array.from(body.children).forEach(node=>{if(node!==current&&node!==themeSlot)node.remove()});syncThemeSwitch();
  opener=btn;lastFocus=document.activeElement;restoreOverflow=document.body.style.overflow;
  inerted=Array.from(document.body.children).filter(n=>n!==overlay).map(n=>[n,n.inert]);inerted.forEach(([n])=>n.inert=true);
  document.body.style.overflow='hidden';overlay.hidden=false;btn.setAttribute('aria-expanded','true');
  requestAnimationFrame(()=>requestAnimationFrame(()=>{if(!overlay.hidden)overlay.classList.add('agmm-open')}));x.focus();
 },true);
 document.addEventListener('keydown',e=>{if(overlay.hidden)return;if(e.key==='Escape'){e.preventDefault();close();return}if(e.key!=='Tab')return;
  const focusables=Array.from(panel.querySelectorAll('a[href],button:not([disabled])')).filter(el=>visible(el));if(!focusables.length)return;
  const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 });
 window.addEventListener('resize',()=>{syncThemeSwitch();if(!overlay.hidden&&!visible(burger))close(false)});
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