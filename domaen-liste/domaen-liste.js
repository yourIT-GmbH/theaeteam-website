(function(){
  var all = (window.AE_DOMAINS||[]).map(function(s){return s.trim();}).filter(Boolean);
  var listEl = document.getElementById('dl-list');
  var countEl = document.getElementById('dl-count');
  var emptyEl = document.getElementById('dl-empty');
  var emptyTextEl = document.getElementById('dl-empty-text');
  var emptyLinkEl = document.getElementById('dl-empty-link');
  var searchEl = document.getElementById('dl-search');
  var total = all.length;
  function norm(s){
    return s.toLowerCase()
      .replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u')
      .replace(/ae/g,'a').replace(/oe/g,'o').replace(/ue/g,'u');
  }
  var index = all.map(function(d){return {d:d, n:norm(d)};});
  function esc(s){ return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function render(items, rawQuery){
    listEl.innerHTML='';
    if(!items.length){
      if(rawQuery){
        emptyTextEl.innerHTML='Für <strong>„'+esc(rawQuery)+'“</strong> haben wir aktuell keine passende Domain im Bestand. Viele Umlaut-DOMÄNs sichern wir <strong>individuell auf Anfrage</strong>, sag uns einfach deinen Wunschbegriff.';
        emptyLinkEl.href='/kontakt?domain='+encodeURIComponent(rawQuery);
      }
      emptyEl.hidden=false;
      return;
    }
    emptyEl.hidden=true;
    var frag=document.createDocumentFragment();
    items.forEach(function(d){
      var li=document.createElement('li');
      li.className='dl-item';
      li.textContent=d;
      frag.appendChild(li);
    });
    listEl.appendChild(frag);
  }
  function update(){
    var raw=searchEl.value.trim();
    var q=norm(raw);
    var items;
    if(!q){ items=all; }
    else { items=index.filter(function(o){return o.n.indexOf(q)>-1;}).map(function(o){return o.d;}); }
    countEl.textContent = q ? (items.length+' von '+total+' Domains') : (total+' Domains');
    render(items, raw);
  }
  searchEl.addEventListener('input', update);
  // Vorbefüllung über ?q= (z. B. von der Startseiten-Suche)
  try {
    var pq = new URLSearchParams(location.search).get('q');
    if (pq) {
      searchEl.value = pq;
      var toolbar = document.querySelector('.dl-toolbar');
      if (toolbar) { var y = toolbar.getBoundingClientRect().top + window.pageYOffset - 90; window.scrollTo(0, y); }
    }
  } catch(e) {}
  update();
})();
