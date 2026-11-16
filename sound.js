(function(){
  // Какие элементы кликают. Чтобы выключить звук на элементе, добавь ему класс no-click
  var SEL='a[href],button,[role="button"],summary,.btn-resume,.btn,.scroll-top,.links a,.brand,.xp-deck,.f-fan,.theme-btn', SKIP='.no-click,[disabled],.ds-open';
  var VOL=0.05, FAN=1;  // VOL: общая громкость (0..1), FAN: множитель для вееров
  var SRC='click.mp3?v=2';
  var AC=window.AudioContext||window.webkitAudioContext; if(!AC)return;
  var raw=null,ctx=null,buf=null,cur=null,pend=0,pendK=1,lastT=0;
  try{raw=fetch(SRC,{cache:'force-cache'}).then(function(r){return r.arrayBuffer()}).catch(function(){return null})}catch(e){}
  function ready(b){
    buf=b;
    if(pend&&Date.now()-pend<400){pend=0;play(pendK)}
  }
  // декодируем сразу при загрузке, без жеста, чтобы звук был готов к первому клику
  var OAC=window.OfflineAudioContext||window.webkitOfflineAudioContext;
  if(raw&&OAC){raw.then(function(a){if(!a||buf)return;try{var oc=new OAC(1,1,44100);var r=oc.decodeAudioData(a.slice(0),function(b){if(!buf)ready(b)},function(){});if(r&&r.then)r.then(function(b){if(!buf)ready(b)},function(){}).catch(function(){})}catch(e){}})}
  function init(){
    if(!ctx){try{ctx=new AC()}catch(e){return}}
    if(ctx.state!=='running'){try{var p=ctx.resume();if(p&&p.catch)p.catch(function(){})}catch(e){}}
    if(!buf&&raw)raw.then(function(a){if(!a||buf)return;var r=ctx.decodeAudioData(a.slice(0),function(b){if(!buf)ready(b)},function(){});if(r&&r.catch)r.catch(function(){})});
  }
  function play(k){
    if(!ctx)return;
    if(!buf){pend=Date.now();pendK=k;return}
    if(ctx.state!=='running'){try{ctx.resume()}catch(e){}}
    var t=ctx.currentTime;
    if(cur){try{cur.g.gain.cancelScheduledValues(t);cur.g.gain.setValueAtTime(cur.g.gain.value,t);cur.g.gain.linearRampToValueAtTime(0,t+.014);cur.s.stop(t+.02)}catch(e){}}
    var s=ctx.createBufferSource(),g=ctx.createGain();
    s.buffer=buf;g.gain.value=VOL*(k||1);s.connect(g);g.connect(ctx.destination);
    s.start(t+.005);
    var me={s:s,g:g};cur=me;
    s.onended=function(){if(cur===me)cur=null};
  }
  function target(e){
    var el=e.target&&e.target.closest&&e.target.closest(SEL);
    if(!el||el.closest(SKIP))return null;
    return el;
  }
  function fire(el){lastT=Date.now();init();play(el.closest('.f-fan')?FAN:1)}
  var down=null;
  // Мышь: играем в момент нажатия, пока страница не успела уйти по ссылке.
  // Тач: играем при касании без прокрутки (pointerup рядом с pointerdown).
  document.addEventListener('pointerdown',function(e){
    init();
    var el=target(e);
    if(!el){down=null;return}
    if(e.pointerType==='touch'){down={el:el,x:e.clientX,y:e.clientY};return}
    down=null;fire(el);
  },{capture:true,passive:true});
  document.addEventListener('pointerup',function(e){
    if(!down)return;
    var d=down;down=null;
    if(e.pointerType!=='touch')return;
    if(Math.abs(e.clientX-d.x)<10&&Math.abs(e.clientY-d.y)<10)fire(d.el);
  },{capture:true,passive:true});
  document.addEventListener('pointercancel',function(){down=null},{capture:true,passive:true});
  // Клавиатура (Enter/пробел на кнопке) и всё, что не поймали выше
  document.addEventListener('click',function(e){
    if(Date.now()-lastT<500)return;
    var el=target(e);
    if(el)fire(el);
  },true);
  document.addEventListener('keydown',init,{capture:true,passive:true});
  document.addEventListener('visibilitychange',function(){if(!document.hidden&&ctx&&ctx.state!=='running'){try{ctx.resume()}catch(e){}}});
})();
