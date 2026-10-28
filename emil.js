(function(){
"use strict";
var SVG='<svg viewBox="0 0 100 100" aria-hidden="true">'
+'<g class="dot1"><circle class="cl" style="stroke-width:3.5" cx="22" cy="86" r="5"/></g>'
+'<g class="dot2"><circle class="cl" style="stroke-width:3.5" cx="12" cy="95" r="2.6"/></g>'
+'<g id="emc"><g class="cl-o">'
+'<circle class="cl" cx="50" cy="52" r="26"/><circle class="cl" cx="27" cy="58" r="17"/><circle class="cl" cx="73" cy="58" r="17"/>'
+'<circle class="cl" cx="36" cy="38" r="17"/><circle class="cl" cx="64" cy="37" r="17"/><circle class="cl" cx="50" cy="28" r="15"/><circle class="cl" cx="40" cy="72" r="15"/><circle class="cl" cx="62" cy="72" r="15"/></g>'
+'<g><circle class="cf" cx="50" cy="52" r="26"/><circle class="cf" cx="27" cy="58" r="17"/><circle class="cf" cx="73" cy="58" r="17"/>'
+'<circle class="cf" cx="36" cy="38" r="17"/><circle class="cf" cx="64" cy="37" r="17"/><circle class="cf" cx="50" cy="28" r="15"/><circle class="cf" cx="40" cy="72" r="15"/><circle class="cf" cx="62" cy="72" r="15"/></g></g>'
+'<g class="f-happy"><g class="eyes"><circle class="ink" cx="39" cy="52" r="4"/><circle class="ink" cx="61" cy="52" r="4"/><circle fill="#fff" cx="40.4" cy="50.6" r="1.3"/><circle fill="#fff" cx="62.4" cy="50.6" r="1.3"/></g>'
+'<ellipse class="blush" cx="30" cy="63" rx="5" ry="3"/><ellipse class="blush" cx="70" cy="63" rx="5" ry="3"/>'
+'<g class="mouth"><path class="ink" d="M41 62 Q50 77 59 62 Z" stroke="#111" stroke-width="2.4" stroke-linejoin="round"/><path d="M45 69 Q50 73 55 69 Q50 66.5 45 69Z" fill="#ff7d93"/></g></g>'
+'<g class="f-sad"><path class="line" d="M33 54 Q39 59 45 54"/><path class="line" d="M55 54 Q61 59 67 54"/>'
+'<path class="line" d="M32 49 L44 45"/><path class="line" d="M68 49 L56 45"/>'
+'<path class="line" d="M42 72 Q50 64 58 72"/><path class="tear" d="M65 59 Q69 65 65 68 Q61 65 65 59Z"/></g>'
+'<g class="shades"><path d="M29 45 H48 Q49 57 39 57 Q29 57 29 45Z" fill="#111"/><path d="M52 45 H71 Q71 57 61 57 Q51 57 52 45Z" fill="#111"/><path d="M47 46.5 Q50 44 53 46.5" stroke="#111" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M29 46 L22 43.5 M71 46 L78 43.5" stroke="#111" stroke-width="2.6" stroke-linecap="round"/><path d="M32 47.5 L37 47.5 L33 52Z M55 47.5 L60 47.5 L56 52Z" fill="#fff" opacity=".55"/></g>'
+'<g class="zz-eyes"><path class="line" d="M33 52 Q39 57 45 52"/><path class="line" d="M55 52 Q61 57 67 52"/></g>'
+'<g class="cap"><path d="M34 22 C33 5 54 -4 72 6 C83 12 87 25 85 35 C80 25 72 21 66 22Z" fill="#4a6cf7" stroke="#111" stroke-width="2.4" stroke-linejoin="round"/><path d="M40 12 Q52 4 66 8" stroke="#fff" stroke-width="2" fill="none" opacity=".55" stroke-linecap="round"/><rect x="30" y="18" width="40" height="9" rx="4.5" fill="#fff" stroke="#111" stroke-width="2.4"/><circle cx="85" cy="38" r="6" fill="#fff" stroke="#111" stroke-width="2.4"/></g>'
+'<g class="zzz"><text x="74" y="22" font-size="11" font-weight="800" fill="#111" font-family="Inter,sans-serif">z</text><text x="82" y="12" font-size="8" font-weight="800" fill="#111" font-family="Inter,sans-serif">z</text></g>'
+'</svg>';
var ICON='<svg viewBox="0 0 100 100" aria-hidden="true"><g stroke="#111" stroke-width="7" fill="#111"><circle cx="50" cy="52" r="26"/><circle cx="27" cy="58" r="17"/><circle cx="73" cy="58" r="17"/><circle cx="36" cy="38" r="17"/><circle cx="64" cy="37" r="17"/><circle cx="50" cy="28" r="15"/></g><circle cx="40" cy="54" r="4" fill="#d8d3c4"/><circle cx="60" cy="54" r="4" fill="#d8d3c4"/><path d="M41 63 Q50 74 59 63" stroke="#d8d3c4" stroke-width="4.5" fill="none" stroke-linecap="round"/></svg>';

var STEPS=[
 {id:"food",  t:"Самое невероятное знаешь в чем? Он написал на почту этой доставке с предложением о сотрудничестве, и знаешь что? Ему ответили!"},
 {id:"fintech",t:"Это первая работа, попавшая в портфолио. Это ребенок Данила, где он набивал руку и учился всему."},
 {id:"saas",  t:"О! А этот проект он вырвал зубами. Он сам пошёл и продал себя мужику, который спокойно жил с тетрадкой. Но это ведь стоило того?"},
 {id:"kivi",  t:"Если описать, что делал Данил здесь: он был на роли product ultra mega turbo+ дизайнера. Делал абсолютно все: сайты, сайты для городов, брендинг и печатную продукцию, администрирование, расстановку интерьера, даже нативное приложение для школы! Жаль, разраба не нашли и проект свернули… но исходники остались, не все потеряно."}
];
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches;
var btn=document.getElementById("emil-call");
if(!btn)return;
var em=document.createElement("div");em.id="emil";em.setAttribute("aria-hidden","true");
em.innerHTML='<div class="em-hop"><div class="em-tilt"><div class="em-bob">'+SVG+'</div></div></div>';
var bb=document.createElement("div");bb.id="emil-b";bb.setAttribute("role","dialog");bb.setAttribute("aria-live","polite");bb.setAttribute("aria-label","Эмиль");
document.body.appendChild(em);document.body.appendChild(bb);
// единый id для контуров (чтобы ids не дублировались)
var st={run:0,timer:null,typer:null,x:0,y:0,s:1,dir:1,open:false};
var mobile=function(){return window.innerWidth<=760};
function sz(){return em.offsetWidth||104}
function apply(){em.style.transform="translate3d("+Math.round(st.x)+"px,"+Math.round(st.y)+"px,0) scale("+st.s+")"}
function place(x,y){st.x=x;st.y=y;apply()}
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
// полёт по дуге; одновременно с ним (если задано) плавно крутится скролл
function flyTo(tx,ty,dur,o){
  o=o||{};
  return new Promise(function(res){
    var x0=st.x,y0=st.y,s0=st.s,s1=o.scale==null?1:o.scale,sc0=window.scrollY,sc1=o.scroll;
    if(reduce){place(tx,ty);st.s=s1;apply();if(sc1!=null)window.scrollTo({top:sc1,behavior:"instant"});return res()}
    var dx=tx-x0,dy=ty-y0,len=Math.hypot(dx,dy)||1;
    var amp=(o.arc==null?Math.min(150,len*.28):o.arc)*(st.dir=-st.dir||1);
    var cx=(x0+tx)/2+(-dy/len)*amp,cy=(y0+ty)/2+(dx/len)*amp;
    var t0=null,px=x0,id=st.run;
    em.classList.add("fly");
    function step(ts){
      if(id!==st.run&&!o.force){em.classList.remove("fly");return res()}
      if(t0===null)t0=ts;
      var t=Math.min(1,(ts-t0)/dur),e=ease(t),m=1-e;
      var x=m*m*x0+2*m*e*cx+e*e*tx,y=m*m*y0+2*m*e*cy+e*e*ty;
      st.x=x;st.y=y;st.s=s0+(s1-s0)*e;apply();
      var vx=x-px;px=x;
      em.style.setProperty("--tilt",Math.max(-16,Math.min(16,vx*1.6))+"deg");
      if(sc1!=null)window.scrollTo({top:sc0+(sc1-sc0)*e,behavior:"instant"});
      if(t<1)requestAnimationFrame(step);
      else{em.style.setProperty("--tilt","0deg");em.classList.remove("fly");res()}
    }
    requestAnimationFrame(step);
  });
}
function wait(ms){return new Promise(function(r){st.timer=setTimeout(r,ms)})}
function mood(m){em.classList.toggle("sad",m==="sad")}
function say(text,opts){
  opts=opts||{};clearInterval(st.typer);
  var side=opts.side||"r";
  bb.className=(bb.className.replace(/\b(on|l|r|c)\b/g,"")+" "+side).trim();
  var pg="";
  if(typeof opts.step==="number"){pg='<div class="em-pg">';for(var i=0;i<STEPS.length;i++)pg+='<i'+(i===opts.step?' class="a"':'')+'></i>';pg+='</div>'}
  bb.innerHTML='<button class="em-x" aria-label="Закрыть">×</button><div class="em-t"></div><div class="em-row"></div>'+pg;
  var row=bb.querySelector(".em-row");
  (opts.btns||[]).forEach(function(b){
    var el=document.createElement(b.href?"a":"button");el.className="em-btn"+(b.alt?" alt":"");el.textContent=b.l;
    if(b.href){el.href=b.href;el.setAttribute("download","")}
    el.addEventListener("click",function(e){if(!b.href)e.preventDefault();b.f&&b.f()});row.appendChild(el)});
  bb.querySelector(".em-x").addEventListener("click",function(){opts.close?opts.close():stop(true)});
  positionBubble(side);
  bb.classList.add("on");
  var t=bb.querySelector(".em-t"),i=0;
  return new Promise(function(res){
    if(reduce){t.textContent=text;em.classList.remove("talk");return res()}
    em.classList.add("talk");
    st.typer=setInterval(function(){i++;t.textContent=text.slice(0,i);
      if(i>=text.length){clearInterval(st.typer);em.classList.remove("talk");res()}},22);
  });
}
function positionBubble(side){
  if(mobile())return;
  var w=bb.offsetWidth||310,x;
  if(side==="c"){bb.style.left=Math.round((innerWidth-w)/2)+"px";bb.style.top=Math.round(st.y+sz()+6)+"px";return}
  if(side==="r")x=st.x+sz()-4;else x=st.x-w+8;
  x=Math.max(12,Math.min(window.innerWidth-w-12,x));
  bb.style.left=x+"px";bb.style.top=Math.max(70,st.y-6)+"px";
}
function hideBubble(){bb.classList.remove("on");clearInterval(st.typer);em.classList.remove("talk")}
function scrollTop(el){
  var r=el.getBoundingClientRect();
  var top=window.scrollY+r.top-(mobile()?64:Math.max(70,(innerHeight-r.height)/2));
  return Math.max(0,Math.min(top,document.documentElement.scrollHeight-innerHeight));
}
function target(sec,i){
  var W=innerWidth,H=innerHeight,s=sz();
  if(mobile())return {x:(i%2?12:W-s-12),y:78,side:"r"};
  var vis=sec.querySelector(".f-visual"),wide=sec.querySelector(".feature.wide");
  var r=vis?vis.getBoundingClientRect():{left:W*.55,right:W-60};
  var w=310;
  if(wide){var x=Math.min(r.right-s-8,W-s-w-12); // пузырь слева
    return {x:Math.max(w+20,x),y:Math.max(90,H*.28),side:"l"}}
  return {x:Math.max(12,Math.min(r.left+8,W-s-w-12)),y:Math.max(90,H*.28),side:"r"};
}
function readTime(t){return Math.max(4200,t.length*55+1400)}
function skipable(){return new Promise(function(res){st.skip=res})}
function sleepOrSkip(ms){return Promise.race([wait(ms),new Promise(function(r){st.skip=r})])}
function home(){var r=btn.getBoundingClientRect(),y=window.scrollY;return {x:r.left+r.width/2-sz()/2,y:r.top+y+r.height/2-sz()/2}}
async function start(){
  if(st.open)return;st.open=true;var id=++st.run;
  btn.disabled=true;
  document.documentElement.style.scrollBehavior="auto";
  em.classList.remove("sad","pop");
  if(window.scrollY>2){await flyScrollTop(id)}
  if(id!==st.run)return;
  var h=home();st.s=.2;place(h.x,h.y);
  void em.offsetWidth;em.classList.add("on");
  em.classList.add("pop");
  btn.classList.remove("emil-catch");void btn.offsetWidth;btn.classList.add("emil-throw");
  var W=innerWidth,H=innerHeight,s=sz();
  var gx=mobile()?(W-s-12):Math.max(12,h.x-s-30),gy=mobile()?Math.max(80,H*.22):Math.max(90,h.y-120);
  await flyTo(gx,gy,reduce?10:1100,{scale:1,arc:-90});if(id!==st.run)return;
  em.classList.remove("pop");
  mood("happy");
  var side=(gx+sz()+330<W)?"r":"l";
  await say("Привет! Я Эмиль. Давай проведу тебя по кейсам?",{side:side,btns:[
    {l:"Да",f:function(){go(id)}},{l:"Нет",alt:true,f:function(){no(id)}}]});
}
function flyScrollTop(id){return new Promise(function(r){
  var y0=window.scrollY,t0=null,d=Math.min(1400,500+y0*.2);
  if(reduce){window.scrollTo({top:0,behavior:"instant"});return r()}
  (function f(ts){if(t0===null)t0=ts;var t=Math.min(1,(ts-t0)/d);window.scrollTo({top:y0*(1-ease(t)),behavior:"instant"});t<1?requestAnimationFrame(f):r()})(performance.now());})}
async function no(id){
  mood("sad");
  var side=bb.classList.contains("l")?"l":"r";
  await say("Если нужно, я здесь!",{side:side});
  await wait(2600);if(id!==st.run)return;
  stop(false);
}
async function go(id){
  hideBubble();
  for(var i=0;i<STEPS.length;i++){
    if(id!==st.run)return;
    var sec=document.getElementById(STEPS[i].id);
    hideBubble();
    var tg=target(sec,i),top=scrollTop(sec);
    var dist=Math.abs(top-window.scrollY),dur=reduce?10:Math.max(1500,Math.min(2600,900+dist*.4));
    await flyTo(tg.x,tg.y,dur,{scroll:top});if(id!==st.run)return;
    var last=i===STEPS.length-1;
    em.classList.remove("cool");if(STEPS[i].id==="saas")em.classList.add("cool");
    st.nx=false;
    await say(STEPS[i].t,{side:tg.side,step:i,btns:[{l:"Дальше",f:function(){st.nx=true;st.skip&&st.skip()}}]});
    if(id!==st.run)return;
    if(!st.nx)await skipable(); /* ждём нажатия «Дальше», сам не идёт */
  }
  if(id!==st.run)return;
  hideBubble();
  var W=innerWidth,H=innerHeight,s=sz(),rs=document.getElementById("resume");
  var tp=scrollTop(rs);
  await flyTo(mobile()?(W-s)/2:Math.max(12,W*.5-s-40),Math.max(90,H*.3),reduce?10:Math.max(1500,Math.min(2600,900+Math.abs(tp-window.scrollY)*.4)),{scroll:tp});
  if(id!==st.run)return;
  em.classList.remove("cool");em.classList.add("sleepy");
  await say("Вот и всё! Если Данил тебе понравился, резюме можно скачать здесь. А я пойду отдыхать!",{side:"r",btns:[
    {l:"Скачать CV",href:"Balashov_Danil_Resume.pdf"},{l:"Пока!",alt:true,f:function(){stop(true)}}]});
}
async function stop(back){
  var id=++st.run;clearTimeout(st.timer);hideBubble();st.skip&&st.skip();
  mood("happy");
  // скролл пользователя не трогаем: если кнопка в кадре — влетаем в неё, иначе просто уменьшаемся на месте
  var r=btn.getBoundingClientRect(),visible=r.bottom>0&&r.top<innerHeight;
  if(visible){
    var h=home(),dur=reduce?10:1300;
    await flyTo(h.x,h.y,dur,{scale:.12,arc:110,force:true});
  }else{
    await flyTo(st.x,st.y-30,reduce?10:650,{scale:.05,arc:0,force:true});
  }
  // «влетел»: кнопка подпрыгивает
  em.classList.remove("on","fly","pop","cool","sleepy");st.s=1;
  btn.classList.remove("emil-throw");void btn.offsetWidth;btn.classList.add("emil-catch");
  document.documentElement.style.scrollBehavior="";
  st.open=false;btn.disabled=false;
  var lab=btn.querySelector(".lb");if(lab)lab.textContent="Позвать Эмиля снова";
}
btn.addEventListener("click",start);
// «Узнать меня получше» — личная история
var pl=document.getElementById("emil-more"),ov=document.createElement("div");ov.id="emil-ov";document.body.appendChild(ov);
function plPos(){var r=pl.getBoundingClientRect();return {x:r.left+r.width/2-sz()/2,y:r.top+r.height/2-sz()/2}}
async function openPersonal(){
  if(st.open)return;st.open=true;var id=++st.run;
  var p=plPos();st.s=.2;place(p.x,p.y);
  ov.classList.add("on");
  void em.offsetWidth;em.classList.add("on","pop");mood("happy");
  var W=innerWidth,H=innerHeight,s=sz();
  await flyTo((W-s)/2,Math.max(70,H/2-s-(mobile()?40:30)),reduce?10:1100,{scale:1,arc:-80});if(id!==st.run)return;
  em.classList.remove("pop");
  await say("Слушай, здесь нет кейсов, нет метрик. Если ты просто ищешь дизайнера, тебе сюда не нужно. Это личная история. Ты уверен, что хочешь продолжить?",{side:"c",close:closePersonal,btns:[
    {l:"Да",f:function(){/* пока никуда не ведёт */}},{l:"Нет",alt:true,f:closePersonal}]});
}
async function closePersonal(){
  var id=++st.run;hideBubble();st.skip&&st.skip();
  var p=plPos();
  await flyTo(p.x,p.y,reduce?10:1100,{scale:.12,arc:90,force:true});
  em.classList.remove("on","fly","pop");st.s=1;
  ov.classList.remove("on");st.open=false;
}
if(pl)pl.addEventListener("click",function(e){e.preventDefault();openPersonal()});
window.addEventListener("keydown",function(e){if(e.key==="Escape"&&ov.classList.contains("on"))closePersonal()});

window.addEventListener("keydown",function(e){if(e.key==="Escape"&&st.open&&!ov.classList.contains("on"))stop(true)});
})();

/* десктоп: правый блок (фото + кнопка Эмиля) по высоте равен видимому левому тексту */
(function(){
  var hs=document.querySelector(".hero-side"),tx=document.querySelector(".hero-text");
  if(!hs||!tx)return;
  var b=hs.querySelector(".emil-call");
  function fit(){
    hs.style.width="";hs.style.justifySelf="";hs.style.marginTop="";
    if(innerWidth<761)return;
    var first=tx.firstElementChild,last=tx.lastElementChild;if(!first||!last)return;
    var col=hs.offsetWidth,ft=first.offsetTop,h0=hs.offsetTop;
    var H=last.offsetTop+last.offsetHeight-ft,gap=14,bh=b?b.offsetHeight:42;
    var s=Math.round(H-gap-bh);
    if(s<150)return;
    hs.style.width=Math.min(s,col)+"px";hs.style.justifySelf="end";
    hs.style.marginTop=Math.max(0,Math.round(ft-h0))+"px";
  }
  fit();addEventListener("resize",fit);addEventListener("load",fit);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
})();
