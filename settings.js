/* Кнопка настроек (шестерёнка слева внизу): тема, музыка, громкость. */
(function(){
  var open=false,btn,panel,mRow,vRow,tDark,tLight,mSw,vol;
  var GEAR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>';
  function theme(){return window.DBTheme?window.DBTheme.get():'dark'}
  function sync(){
    if(!panel)return;
    var l=theme()==='light';
    tDark.setAttribute('aria-pressed',l?'false':'true');
    tLight.setAttribute('aria-pressed',l?'true':'false');
    if(window.DBMusic){
      mRow.hidden=vRow.hidden=false;
      mSw.setAttribute('aria-checked',window.DBMusic.isOn()?'true':'false');
      vol.value=Math.round(window.DBMusic.getVolume()*100);
      vol.style.setProperty('--v',vol.value+'%');
    }
  }
  function setOpen(o,back){
    open=o;
    panel.classList.toggle('show',o);
    btn.setAttribute('aria-expanded',o?'true':'false');
    if(o)sync();
    else if(back)btn.focus();
  }
  function mk(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html)e.innerHTML=html;return e}
  function build(){
    btn=mk('button','set-btn',GEAR);
    btn.type='button';btn.setAttribute('aria-label','Настройки');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls','setPanel');
    panel=mk('div','set-panel');panel.id='setPanel';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Настройки');
    var r1=mk('div','set-row','<span class="set-l">Тема</span>');
    var seg=mk('div','set-seg');
    tDark=mk('button','','Тёмная');tLight=mk('button','','Светлая');
    tDark.type=tLight.type='button';
    seg.appendChild(tDark);seg.appendChild(tLight);r1.appendChild(seg);
    mRow=mk('div','set-row','<span class="set-l">Музыка</span>');mRow.hidden=true;
    mSw=mk('button','set-sw','<i></i>');mSw.type='button';mSw.setAttribute('role','switch');mSw.setAttribute('aria-label','Музыка');mSw.setAttribute('aria-checked','false');
    mRow.appendChild(mSw);
    vRow=mk('div','set-row','<span class="set-l">Громкость</span>');vRow.hidden=true;
    vol=mk('input','set-vol');vol.type='range';vol.min=0;vol.max=100;vol.step=1;vol.setAttribute('aria-label','Громкость');
    vRow.appendChild(vol);
    panel.appendChild(r1);panel.appendChild(mRow);panel.appendChild(vRow);
    document.body.appendChild(panel);document.body.appendChild(btn);
    btn.addEventListener('click',function(e){e.stopPropagation();setOpen(!open)});
    panel.addEventListener('click',function(e){e.stopPropagation()});
    tDark.addEventListener('click',function(){window.DBTheme&&window.DBTheme.set('dark')});
    tLight.addEventListener('click',function(){window.DBTheme&&window.DBTheme.set('light')});
    mSw.addEventListener('click',function(){window.DBMusic&&window.DBMusic.toggle()});
    vol.addEventListener('input',function(){
      vol.style.setProperty('--v',vol.value+'%');
      window.DBMusic&&window.DBMusic.setVolume(vol.value/100);
    });
    document.addEventListener('click',function(){if(open)setOpen(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&open)setOpen(false,true)});
    document.addEventListener('dbtheme',sync);
    document.addEventListener('dbmusic',sync);
    document.addEventListener('dbmusic-ready',sync);
    sync();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
