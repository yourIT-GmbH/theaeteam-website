(function(){
  var b=document.getElementById('burger'),m=document.getElementById('mnav');
  if(b)b.addEventListener('click',function(){m.style.display=m.style.display==='block'?'none':'block';});
  var all=(window.AE_DOMAINS||[]).map(function(s){return s.trim();}).filter(Boolean);
  var input=document.getElementById('hs');if(!input)return;
  var list=document.getElementById('hlist'),count=document.getElementById('hcount'),
      empty=document.getElementById('hempty'),et=document.getElementById('hempty-t'),
      el=document.getElementById('hempty-l'),hint=document.getElementById('hhint');
  var MAX=60;
  function norm(s){return s.toLowerCase().replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ae/g,'a').replace(/oe/g,'o').replace(/ue/g,'u');}
  var idx=all.map(function(d){return {d:d,n:norm(d)};});
  function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function upd(){
    var raw=input.value.trim(),q=norm(raw);list.innerHTML='';
    if(!q){hint.style.display='';empty.style.display='none';count.textContent='';return;}
    hint.style.display='none';
    var mm=idx.filter(function(o){return o.n.indexOf(q)>-1;});
    if(!mm.length){empty.style.display='block';et.innerHTML='Für <strong>„'+esc(raw)+'"</strong> haben wir aktuell keine passende Domain, viele sichern wir individuell auf Anfrage.';el.href='kontakt/index.html?domain='+encodeURIComponent(raw);count.textContent='0 Treffer';return;}
    empty.style.display='none';count.textContent=mm.length+' Treffer';
    var f=document.createDocumentFragment();
    mm.slice(0,MAX).forEach(function(o){var a=document.createElement('a');a.href='kontakt/index.html?domain='+encodeURIComponent(o.d);a.textContent=o.d;f.appendChild(a);});
    list.appendChild(f);
    if(mm.length>MAX){var a=document.createElement('a');a.style.fontWeight='800';a.href='domaen-liste/index.html?q='+encodeURIComponent(raw);a.textContent='+ '+(mm.length-MAX)+' weitere, zur vollständigen Liste →';list.appendChild(a);}
  }
  input.addEventListener('input',upd);
  input.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();location.href='domaen-liste/index.html?q='+encodeURIComponent(input.value.trim());}});
  document.querySelectorAll('[data-q]').forEach(function(x){x.addEventListener('click',function(){input.value=x.getAttribute('data-q');input.focus();upd();});});
})();
