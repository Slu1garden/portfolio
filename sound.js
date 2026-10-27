(function(){
  var SEL='.btn-resume,.btn,.scroll-top,.links a,.brand,.xp-deck', VOL=0.6;   // VOL: общая громкость клика (0..1)
  var AC=window.AudioContext||window.webkitAudioContext; if(!AC)return;
  var raw=null,ctx=null,buf=null,cur=null;
  try{raw=fetch('click.mp3').then(function(r){return r.arrayBuffer()}).catch(function(){return null})}catch(e){}
  function init(){
    if(ctx||!raw)return;
    try{ctx=new AC()}catch(e){return}
    raw.then(function(a){if(!a)return;ctx.decodeAudioData(a,function(b){buf=b},function(){})});
  }
  function play(){
    if(!ctx||!buf)return;
    if(ctx.state==='suspended')ctx.resume();
    var t=ctx.currentTime;
    if(cur){try{cur.g.gain.cancelScheduledValues(t);cur.g.gain.setValueAtTime(cur.g.gain.value,t);cur.g.gain.linearRampToValueAtTime(0,t+.014);cur.s.stop(t+.02)}catch(e){}}
    var s=ctx.createBufferSource(),g=ctx.createGain();
    s.buffer=buf;g.gain.value=VOL;s.connect(g);g.connect(ctx.destination);
    s.start(t+.016);
    var me={s:s,g:g};cur=me;
    s.onended=function(){if(cur===me)cur=null};
  }
  document.addEventListener('pointerdown',init,{capture:true,passive:true});
  document.addEventListener('keydown',init,{capture:true,passive:true});
  document.addEventListener('click',function(e){
    var el=e.target.closest&&e.target.closest(SEL);
    if(!el)return;
    init();play();
  },true);
})();
