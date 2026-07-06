(function(){
  var all=(window.AE_DOMAINS||[]).map(function(s){return s.trim();}).filter(Boolean);
  var input=document.getElementById('dp-search');
  if(!input) return;
  var list=document.getElementById('dp-list');
  var count=document.getElementById('dp-count');
  var empty=document.getElementById('dp-empty');
  var emptyText=document.getElementById('dp-empty-text');
  var emptyLink=document.getElementById('dp-empty-link');
  var hint=document.getElementById('dp-hint');
  var MAX=60;
  function norm(s){return s.toLowerCase().replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ae/g,'a').replace(/oe/g,'o').replace(/ue/g,'u');}
  var index=all.map(function(d){return {d:d,n:norm(d)};});
  function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function update(){
    var raw=input.value.trim(); var q=norm(raw);
    list.innerHTML='';
    if(!q){
      hint.hidden=true; empty.hidden=true;
      count.textContent=all.length+' Domains';
      var f0=document.createDocumentFragment();
      all.forEach(function(d){ var a=document.createElement('a'); a.className='dl-item'; a.style.display='block'; a.href='../kontakt/index.html?domain='+encodeURIComponent(d); a.title='„'+d+'" anfragen'; a.textContent=d; f0.appendChild(a); });
      list.appendChild(f0);
      return;
    }
    hint.hidden=true;
    var matches=index.filter(function(o){return o.n.indexOf(q)>-1;});
    if(!matches.length){
      empty.hidden=false;
      emptyText.innerHTML='Für <strong>„'+esc(raw)+'"</strong> haben wir aktuell keine passende Domain im Bestand, viele sichern wir <strong>individuell auf Anfrage</strong>.';
      emptyLink.href='../kontakt/index.html?domain='+encodeURIComponent(raw);
      count.textContent='0 Treffer';
      return;
    }
    empty.hidden=true;
    count.textContent=matches.length+' Treffer';
    var frag=document.createDocumentFragment();
    matches.slice(0,MAX).forEach(function(o){
      var a=document.createElement('a'); a.className='dl-item'; a.style.display='block';
      a.href='../kontakt/index.html?domain='+encodeURIComponent(o.d);
      a.title='„'+o.d+'" anfragen';
      a.textContent=o.d;
      frag.appendChild(a);
    });
    list.appendChild(frag);
    if(matches.length>MAX){
      var more=document.createElement('a'); more.className='dl-item'; more.style.display='block'; more.style.fontWeight='700';
      more.href='../domaen-liste/index.html?q='+encodeURIComponent(raw);
      more.textContent='+ '+(matches.length-MAX)+' weitere, zur vollständigen Liste →';
      list.appendChild(more);
    }
  }
  input.addEventListener('input',update);
  input.addEventListener('keydown',function(e){ if(e.key==='Enter'){ e.preventDefault(); location.href='../domaen-liste/index.html?q='+encodeURIComponent(input.value.trim()); } });
  document.querySelectorAll('[data-dp]').forEach(function(b){ b.addEventListener('click',function(){ input.value=b.getAttribute('data-dp'); input.focus(); update(); }); });
  update();
})();
