(function(){var b=document.getElementById('protoBtn'),s=document.getElementById('proto'),f=document.getElementById('protoFrame'),box=document.getElementById('pdBox'),dev=document.getElementById('protoDev');if(!b||!s||!f)return;
var wide=s.classList.contains('wide'),bare=s.classList.contains('bare'),LW=wide?1200:bare?411:410,LH=wide?790:bare?870:864,src=f.getAttribute('data-src'),lab=b.querySelector('span'),t0=lab.textContent,loaded=false;
function fit(){var row=s.querySelector('.proto-row'),cs=getComputedStyle(row),rw=row.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);if(rw<=0)return;
 var aw=wide?rw:(innerWidth>900?Math.min(LW,rw-360-72):rw),sc=Math.min(1,aw/LW,(innerHeight*0.86)/LH);if(sc<.4)sc=.4;box.style.setProperty('--s',sc);dev.style.width=Math.round(LW*sc)+'px';dev.style.height=Math.round(LH*sc)+'px'}
fit();window.addEventListener('resize',fit);
function open(v){b.setAttribute('aria-expanded',v?'true':'false');s.classList.toggle('open',v);lab.textContent=v?'Свернуть прототип':t0;
 if(v){fit();if(!loaded){f.src=src;loaded=true}setTimeout(function(){var r=s.getBoundingClientRect();if(r.top<60||r.bottom>innerHeight)s.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'})},120)}}
b.addEventListener('click',function(){open(b.getAttribute('aria-expanded')!=='true')});
var r=document.getElementById('protoReload');if(r)r.addEventListener('click',function(){f.src=src;loaded=true});
if(location.hash==='#proto')open(true);
})();
