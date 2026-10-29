(function(){
  /* Фоновая музыка: выключена по умолчанию, включается кнопкой. Если файла нет, кнопка не появляется. */
  var SRC='music.mp3?v=1',KEY='music',TKEY='music_t',VOL=.38,FADE=1800;
  var CREDIT_PRE='Cover by Danil Balashov · Song “Train Station” by ',ARTIST='Andreas Rönnberg';
  var ARTIST_URL='https://www.patreon.com/c/andreas_ronnberg/home'; /* ссылка на страницу автора: вставить сюда */
  function fillCredit(el){
    el.appendChild(document.createTextNode(CREDIT_PRE));
    if(ARTIST_URL){var a=document.createElement('a');a.href=ARTIST_URL;a.target='_blank';a.rel='noopener';a.textContent=ARTIST;el.appendChild(a)}
    else el.appendChild(document.createTextNode(ARTIST));
  }
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var audio=null,btn=null,want=false,fadeT=null,toast=null,toastT=null;
  function store(k,v){try{if(v==null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){}}
  function read(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function ss(k,v){try{if(v==null)sessionStorage.removeItem(k);else sessionStorage.setItem(k,v)}catch(e){}}
  function sr(k){try{return sessionStorage.getItem(k)}catch(e){return null}}
  var ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/><path class="off" d="M3 3l18 18"/></svg>';
  function ramp(to,ms,done){
    clearInterval(fadeT);
    if(!audio)return;
    if(rm||!ms){audio.volume=to;done&&done();return}
    var from=audio.volume,t0=performance.now();
    fadeT=setInterval(function(){
      var k=Math.min(1,(performance.now()-t0)/ms);
      audio.volume=Math.max(0,Math.min(1,from+(to-from)*k));
      if(k>=1){clearInterval(fadeT);done&&done()}
    },40);
  }
  function setState(on){
    want=on;
    if(btn){btn.setAttribute('aria-pressed',on?'true':'false');btn.classList.toggle('on',on);
      btn.setAttribute('aria-label',on?'Выключить музыку':'Включить музыку');btn.title=on?'Выключить музыку':'Включить музыку'}
  }
  function ensure(){
    if(audio)return audio;
    audio=new Audio(SRC);audio.loop=true;audio.preload='auto';audio.volume=0;
    var t=parseFloat(sr(TKEY));
    if(t>0)audio.addEventListener('loadedmetadata',function(){try{if(isFinite(audio.duration))audio.currentTime=t%audio.duration}catch(e){}},{once:true});
    return audio;
  }
  function play(){
    var a=ensure();
    var p=a.play();
    if(p&&p.then){p.then(function(){ramp(VOL,FADE)},function(){ /* автозапуск запрещён: ждём первого касания */
      var go=function(){document.removeEventListener('pointerdown',go,true);document.removeEventListener('keydown',go,true);if(want)play()};
      document.addEventListener('pointerdown',go,true);document.addEventListener('keydown',go,true)})}
    else ramp(VOL,FADE);
  }
  function stop(){ramp(0,FADE*.7,function(){audio&&audio.pause()})}
  function showToast(){
    if(!toast){toast=document.createElement('div');toast.className='music-toast';toast.setAttribute('role','status');document.body.appendChild(toast)}
    toast.innerHTML='';
    var t=document.createElement('span');fillCredit(t);toast.appendChild(t);
    toast.classList.add('show');clearTimeout(toastT);toastT=setTimeout(function(){toast.classList.remove('show')},5200);
  }
  function toggle(){
    if(want){setState(false);store(KEY,'off');stop()}
    else{setState(true);store(KEY,'on');play();showToast()}
  }
  function revealCredit(){
    var els=document.querySelectorAll('.music-credit');
    for(var i=0;i<els.length;i++){
      var el=els[i];el.textContent='';fillCredit(el);el.hidden=false;
    }
  }
  function mount(){
    var host=document.querySelector('.topnav-in')||document.querySelector('.topbar .wrap');
    btn=document.createElement('button');btn.type='button';btn.className='music-btn'+(host?'':' float');btn.innerHTML=ICON;
    btn.addEventListener('click',toggle);
    var tb=host&&host.querySelector('.theme-btn');
    if(host&&tb)host.insertBefore(btn,tb);else(host||document.body).appendChild(btn);
    setState(false);
    revealCredit();
    if(read(KEY)==='on'){setState(true);play()}
    document.addEventListener('visibilitychange',function(){
      if(!audio)return;
      if(document.hidden){clearInterval(fadeT);audio.pause()}
      else if(want)play();
    });
    window.addEventListener('pagehide',function(){if(audio&&want)ss(TKEY,String(audio.currentTime||0))});
  }
  function init(){
    /* кнопка и подпись появляются только если файл существует */
    var done=function(ok){if(ok)mount()};
    try{fetch(SRC,{method:'HEAD'}).then(function(r){done(r.ok)},function(){done(false)})}catch(e){}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
