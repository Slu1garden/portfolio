(function(){
  var d=document.documentElement,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(d.classList.contains('pt-on')){setTimeout(function(){d.classList.remove('pt-on');d.classList.add('pt-leave');setTimeout(function(){d.classList.remove('pt-leave')},800)},rm?0:550)}
  window.addEventListener('pageshow',function(e){if(e.persisted)d.classList.remove('pt-go','pt-on','pt-leave')});
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;
    var h=a.getAttribute('href');
    if(!h||h.charAt(0)==='#'||a.target==='_blank'||a.hasAttribute('download')||/^(https?:|mailto:|tel:)/.test(h))return;
    if(!/\.html?($|[?#])/.test(h)||rm)return;
    e.preventDefault();
    try{sessionStorage.setItem('pt','1')}catch(x){}
    d.classList.add('pt-go');
    setTimeout(function(){location.href=a.href},700);
  });
})();
