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
var st={run:0,timer:null,typer:null,x:0,y:0,open:false};
var mobile=function(){return window.innerWidth<=760};
function sz(){return em.offsetWidth||104}
function place(x,y,fly){
  if(fly&&!reduce){em.classList.add("go");var dx=x-st.x;em.style.setProperty("--tilt",(dx>=0?10:-10)+"deg");em.classList.add("fly");
    setTimeout(function(){em.classList.remove("fly")},1050)}
  else em.classList.remove("go");
  st.x=x;st.y=y;em.style.transform="translate3d("+Math.round(x)+"px,"+Math.round(y)+"px,0)";
}
function wait(ms){return new Promise(function(r){st.timer=setTimeout(r,ms)})}
function mood(m){em.classList.toggle("sad",m==="sad")}
function say(text,opts){
  opts=opts||{};clearInterval(st.typer);
  var side=opts.side||"r";
  bb.className=(bb.className.replace(/\b(on|l|r)\b/g,"")+" "+side).trim();
  var pg="";
  if(typeof opts.step==="number"){pg='<div class="em-pg">';for(var i=0;i<STEPS.length;i++)pg+='<i'+(i===opts.step?' class="a"':'')+'></i>';pg+='</div>'}
  bb.innerHTML='<button class="em-x" aria-label="Закрыть">×</button><div class="em-t"></div><div class="em-row"></div>'+pg;
  var row=bb.querySelector(".em-row");
  (opts.btns||[]).forEach(function(b){
    var el=document.createElement(b.href?"a":"button");el.className="em-btn"+(b.alt?" alt":"");el.textContent=b.l;
    if(b.href){el.href=b.href;el.setAttribute("download","")}
    el.addEventListener("click",function(e){if(!b.href)e.preventDefault();b.f&&b.f()});row.appendChild(el)});
  bb.querySelector(".em-x").addEventListener("click",function(){stop(true)});
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
  if(side==="r")x=st.x+sz()-4;else x=st.x-w+8;
  x=Math.max(12,Math.min(window.innerWidth-w-12,x));
  bb.style.left=x+"px";bb.style.top=Math.max(70,st.y-6)+"px";
}
function hideBubble(){bb.classList.remove("on");clearInterval(st.typer);em.classList.remove("talk")}
function scrollTo(el,block){
  return new Promise(function(res){
    var r=el.getBoundingClientRect();
    var top=window.scrollY+r.top-(mobile()?64:Math.max(70,(innerHeight-r.height)/2));
    top=Math.max(0,top);
    window.scrollTo({top:top,behavior:reduce?"auto":"smooth"});
    var last=-1,same=0,n=0;
    var iv=setInterval(function(){n++;
      if(Math.abs(window.scrollY-last)<1)same++;else same=0;
      last=window.scrollY;
      if(same>=3||n>40){clearInterval(iv);res()}},60);
  });
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
function home(){var r=btn.getBoundingClientRect();return {x:r.left+r.width/2-sz()/2,y:r.top+r.height/2-sz()/2}}

async function start(){
  if(st.open)return;st.open=true;var id=++st.run;
  btn.disabled=true;
  em.classList.remove("go","sad","pop");
  window.scrollTo({top:0,behavior:reduce?"auto":"smooth"});await wait(reduce?50:500);
  var h=home();place(h.x,h.y,false);
  void em.offsetWidth;em.classList.add("on");
  // выпрыгивает из кнопки
  em.classList.add("pop");
  var W=innerWidth,H=innerHeight,s=sz();
  var gx=mobile()?(W-s)/2:Math.max(12,h.x-s-30),gy=mobile()?Math.max(80,H*.22):Math.max(90,h.y-120);
  place(gx,gy,true);
  await wait(reduce?50:900);if(id!==st.run)return;
  em.classList.remove("pop");
  mood("happy");
  var side=(gx+sz()+330<W)?"r":"l";
  await say("Привет! Я Эмиль. Давай проведу тебя по кейсам?",{side:side,btns:[
    {l:"Да",f:function(){go(id)}},{l:"Нет",alt:true,f:function(){no(id)}}]});
}
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
    hideBubble();em.classList.add("fly");
    await scrollTo(sec);if(id!==st.run)return;
    var tg=target(sec,i);place(tg.x,tg.y,true);
    await wait(reduce?50:1250);if(id!==st.run)return;
    em.classList.remove("fly");
    var last=i===STEPS.length-1;
    var p=say(STEPS[i].t,{side:tg.side,step:i,btns:[{l:last?"Дальше":"Дальше",f:function(){st.skip&&st.skip()}}]});
    await p;if(id!==st.run)return;
    await sleepOrSkip(readTime(STEPS[i].t)-STEPS[i].t.length*22);
  }
  if(id!==st.run)return;
  hideBubble();
  var W=innerWidth,H=innerHeight,s=sz();
  await scrollTo(document.getElementById("resume"));
  place(mobile()?(W-s)/2:Math.max(12,W*.5-s-40),Math.max(90,H*.3),true);
  await wait(reduce?50:1250);if(id!==st.run)return;
  await say("Вот и всё! Если Данил тебе понравился, резюме можно скачать здесь. А я пойду отдыхать!",{side:"r",btns:[
    {l:"Скачать CV",href:"Balashov_Danil_Resume.pdf"},{l:"Пока!",alt:true,f:function(){stop(true)}}]});
}
async function stop(back){
  var id=++st.run;clearTimeout(st.timer);hideBubble();st.skip&&st.skip();
  if(back){
    window.scrollTo({top:0,behavior:reduce?"auto":"smooth"});
    await wait(reduce?50:700);if(id!==st.run)return;
    var h=home();place(h.x,h.y,true);em.classList.add("fly");
    await wait(reduce?50:1100);if(id!==st.run)return;
  }else{
    var h2=home();place(h2.x,h2.y,true);await wait(reduce?50:1200);if(id!==st.run)return;
  }
  em.classList.remove("on","fly","go");
  st.open=false;btn.disabled=false;
  var lab=btn.querySelector(".lb");if(lab)lab.textContent="Позвать Эмиля снова";
}
btn.addEventListener("click",start);
window.addEventListener("keydown",function(e){if(e.key==="Escape"&&st.open)stop(true)});
})();
