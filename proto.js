(function(){var b=document.getElementById('protoBtn'),s=document.getElementById('proto'),f=document.getElementById('protoFrame'),box=document.getElementById('pdBox'),dev=document.getElementById('protoDev');if(!b||!s||!f)return;
var wide=s.classList.contains('wide'),LW=wide?1200:410,LH=wide?790:864,src=f.getAttribute('data-src'),lab=b.querySelector('span'),t0=lab.textContent,loaded=false;
function fit(){var sc=Math.min(1,dev.clientWidth/LW);if(!sc)return;box.style.setProperty('--s',sc);dev.style.height=Math.round(LH*sc)+'px'}
fit();window.addEventListener('resize',fit);
function open(v){b.setAttribute('aria-expanded',v?'true':'false');s.classList.toggle('open',v);lab.textContent=v?'Свернуть прототип':t0;
 if(v){fit();if(!loaded){f.src=src;loaded=true}setTimeout(function(){var r=s.getBoundingClientRect();if(r.top<60||r.bottom>innerHeight)s.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'})},120)}}
b.addEventListener('click',function(){open(b.getAttribute('aria-expanded')!=='true')});
var r=document.getElementById('protoReload');if(r)r.addEventListener('click',function(){f.src=src;loaded=true});
if(location.hash==='#proto')open(true);
})();
