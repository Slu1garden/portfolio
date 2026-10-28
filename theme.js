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
    var b=document.querySelectorAll('.theme-btn');
    for(var i=0;i<b.length;i++){b[i].setAttribute('aria-pressed',t==='light'?'true':'false');b[i].setAttribute('aria-label',t==='light'?'Включить тёмную тему':'Включить светлую тему')}
  }
  var panel=null;
  function makePanel(){
    panel=document.createElement('div');panel.className='tt';panel.setAttribute('aria-hidden','true');
    panel.innerHTML='<img class="tt-logo" src="logo.png" alt=""><span class="tt-letters"><i>D</i><i class="b">B</i></span><div class="tt-bar"><i></i></div>';
    var im=panel.firstChild;im.onerror=function(){im.style.display='none'};
    document.body.appendChild(panel);
  }
  function A(el,kf,o){return el.animate(kf,o)}
  function toggle(){
    if(busy)return;
    var next=cur()==='light'?'dark':'light';
    if(rm||!el_animate()){apply(next);return}
    busy=true;
    if(!panel)makePanel();
    var from=next==='light'?DARK.bg:LIGHT.bg,to=next==='light'?LIGHT.bg:DARK.bg;
    var logo=panel.querySelector('.tt-logo'),letters=panel.querySelector('.tt-letters'),bar=panel.querySelector('.tt-bar i');
    panel.style.background=from;panel.classList.toggle('on-light',next==='dark');panel.classList.add('show');
    panel.style.transform='translateY(101%)';logo.style.opacity=0;letters.style.opacity=0;bar.style.transform='scaleX(0)';
    // 1. шторка поднимается
    var up=A(panel,[{transform:'translateY(101%)'},{transform:'translateY(0)'}],{duration:600,easing:'cubic-bezier(.76,0,.24,1)',fill:'forwards'});
    up.onfinish=function(){
      panel.style.transform='translateY(0)';
      // 2. лого появляется, полоса заполняется
      var lg=[A(logo,[{opacity:0,transform:'translateY(14px) scale(.94)'},{opacity:1,transform:'none'}],{duration:500,delay:60,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'}),A(letters,[{opacity:0,transform:'translateY(14px) scale(.94)'},{opacity:1,transform:'none'}],{duration:500,delay:60,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'})];
      var fill=A(bar,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:900,delay:160,easing:'cubic-bezier(.6,0,.2,1)',fill:'forwards'});
      fill.onfinish=function(){
        // 3. под шторкой меняем тему, сама шторка плавно становится цвета новой темы
        apply(next);
        var bg=A(panel,[{backgroundColor:from},{backgroundColor:to}],{duration:480,easing:'ease',fill:'forwards'});
        panel.classList.toggle('on-light',next==='light');
        bg.onfinish=function(){
          // 4. шторка уезжает вверх, открывая новую тему
          var out=A(panel,[{transform:'translateY(0)'},{transform:'translateY(-101%)'}],{duration:700,delay:120,easing:'cubic-bezier(.76,0,.24,1)',fill:'forwards'});
          out.onfinish=function(){panel.classList.remove('show');panel.style.transform='translateY(101%)';[up,fill,bg,out].concat(lg).forEach(function(a){try{a.cancel()}catch(e){}});panel.style.background='';busy=false};
        };
      };
    };
  }
  function el_animate(){return typeof Element!=='undefined'&&!!Element.prototype.animate}
  var SVG='<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
   +'<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  function mount(){
    var host=document.querySelector('.topnav-in')||document.querySelector('.topbar .wrap');
    var b=document.createElement('button');b.type='button';b.className='theme-btn'+(host?'':' float');b.innerHTML=SVG;
    b.addEventListener('click',toggle);
    (host||document.body).appendChild(b);
    apply(cur());
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
