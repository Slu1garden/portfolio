(function(){
  var SEL='.btn-resume,.btn,.scroll-top,.links a,.brand,.xp-deck,.f-fan,.theme-btn', VOL=0.6, FAN=0.5;  // FAN: множитель громкости для вееров   // VOL: общая громкость клика (0..1)
  var AC=window.AudioContext||window.webkitAudioContext; if(!AC)return;
  var raw=null,ctx=null,buf=null,cur=null;
  try{raw=fetch('click.mp3').then(function(r){return r.arrayBuffer()}).catch(function(){return null})}catch(e){}
  /* декодируем сразу при загрузке без жеста (OfflineAudioContext), чтобы звук был готов уже к первому клику */
  var OAC=window.OfflineAudioContext||window.webkitOfflineAudioContext;
  if(raw&&OAC){raw.then(function(a){if(!a||buf)return;try{var oc=new OAC(1,1,44100);var r=oc.decodeAudioData(a.slice(0),function(b){buf=b},function(){});if(r&&r.then)r.then(function(b){buf=b},function(){}).catch(function(){})}catch(e){}})}
  function init(){
    if(!ctx){try{ctx=new AC()}catch(e){return}}
    if(!buf&&raw)raw.then(function(a){if(!a||buf)return;var r=ctx.decodeAudioData(a.slice(0),function(b){buf=b},function(){});if(r&&r.catch)r.catch(function(){})});
  }
  function play(k){
    if(!ctx||!buf)return;
    if(ctx.state==='suspended')ctx.resume();
    var t=ctx.currentTime;
    if(cur){try{cur.g.gain.cancelScheduledValues(t);cur.g.gain.setValueAtTime(cur.g.gain.value,t);cur.g.gain.linearRampToValueAtTime(0,t+.014);cur.s.stop(t+.02)}catch(e){}}
    var s=ctx.createBufferSource(),g=ctx.createGain();
    s.buffer=buf;g.gain.value=VOL*(k||1);s.connect(g);g.connect(ctx.destination);
    s.start(t+.016);
    var me={s:s,g:g};cur=me;
    s.onended=function(){if(cur===me)cur=null};
  }
  document.addEventListener('pointerdown',init,{capture:true,passive:true});
  document.addEventListener('keydown',init,{capture:true,passive:true});
  document.addEventListener('click',function(e){
    var el=e.target.closest&&e.target.closest(SEL);
    if(!el)return;
    init();play(el.closest('.f-fan')?FAN:1);
  },true);
})();
