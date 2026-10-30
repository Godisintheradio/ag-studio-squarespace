/* AG Studio — Global Day/Night Logo v1.1 (Squarespace 7.1) */
(function(){
  'use strict';
  if(window.__AG_LOGO_THEME__)return;
  window.__AG_LOGO_THEME__=true;

  const DARK_LOGO='https://static1.squarespace.com/static/5b6476223917eeb605c563f4/t/6ae320f38d4e95758258b329/1793270003136/Brand-AG-dark.png';
  const HEADER='header#header, header.Header, header.header, .header';
  const SELECTORS='.header-title-logo img, .header-title img, .header-branding img, .header-display-desktop .header-title img, .header-display-mobile .header-title img';
  const originals=new WeakMap();
  let scheduled=false;

  function save(img){
    if(!originals.has(img)){
      const attrs={};
      for(const name of ['src','srcset','sizes'])attrs[name]=img.getAttribute(name);
      const sources=Array.from(img.parentElement?.tagName==='PICTURE'?img.parentElement.querySelectorAll('source'):[]);
      originals.set(img,{attrs,sources:sources.map(node=>({node,srcset:node.getAttribute('srcset')}))});
      if(attrs.src)img.dataset.agOriginalLogoSrc=attrs.src;
    }
    return originals.get(img);
  }
  function setAttr(node,name,value){
    if(value===null)node.removeAttribute(name);
    else node.setAttribute(name,value);
  }
  function updateLogo(img,dark){
    const stored=save(img);
    const next=dark?'dark':'light';
    if(img.dataset.agLogoMode===next)return;
    if(dark){
      img.removeAttribute('srcset');
      img.removeAttribute('sizes');
      img.setAttribute('src',DARK_LOGO);
      stored.sources.forEach(({node})=>node.setAttribute('srcset',DARK_LOGO));
    }else{
      Object.entries(stored.attrs).forEach(([name,value])=>setAttr(img,name,value));
      stored.sources.forEach(({node,srcset})=>setAttr(node,'srcset',srcset));
    }
    img.dataset.agLogoMode=next;
  }
  function update(){
    scheduled=false;
    const dark=document.documentElement.getAttribute('data-ag-theme')==='dark';
    document.querySelectorAll(HEADER).forEach(header=>{
      header.querySelectorAll(SELECTORS).forEach(img=>updateLogo(img,dark));
    });
  }
  function schedule(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(update);
  }
  function init(){
    update();
    new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['data-ag-theme']});
    new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();