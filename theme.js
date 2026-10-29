(function(){
  var d=document.documentElement,KEY='theme',busy=false;
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var META=document.querySelector('meta[name="theme-color"]');
  var DARK={bg:'#0f0f11',meta:'#0f0f11'},LIGHT={bg:'#eef1f5',meta:'#eef1f5'};
  function cur(){return d.getAttribute('data-theme')==='light'?'light':'dark'}
  function apply(t){
    if(t==='light')d.setAttribute('data-theme','light');else d.removeAttribute('data-theme');
    try{localStorage.setItem(KEY,t)}catch(e){}
    if(META)META.setAttribute('content',t==='light'?LIGHT.meta:DARK.meta);
    try{document.dispatchEvent(new CustomEvent('dbtheme',{detail:t}))}catch(e){}
    var b=document.querySelectorAll('.theme-btn');
    for(var i=0;i<b.length;i++){b[i].setAttribute('aria-pressed',t==='light'?'true':'false');b[i].setAttribute('aria-label',t==='light'?'Включить тёмную тему':'Включить светлую тему')}
  }
  function toggle(){apply(cur()==='light'?'dark':'light')}
  function el_animate(){return typeof Element!=='undefined'&&!!Element.prototype.animate}
  var SVG='<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
   +'<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  function mount(){apply(cur())}
  window.DBTheme={toggle:toggle,set:apply,get:cur};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
