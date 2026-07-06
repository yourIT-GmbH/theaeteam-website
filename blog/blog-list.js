(function(){
  var posts=(window.BLOG_POSTS||[]);
  var grid=document.getElementById('blog-grid'), countEl=document.getElementById('blog-count'),
      searchEl=document.getElementById('blog-search'), catsEl=document.getElementById('blog-cats'),
      emptyEl=document.getElementById('blog-empty');
  var months=['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
  function fmt(d){var p=(d||'').split('-');if(p.length<2)return d||'';var day=p[2]?parseInt(p[2],10)+'. ':'';return day+months[parseInt(p[1],10)-1]+' '+p[0];}
  function esc(s){return (s||'').replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  var allCats={};posts.forEach(function(p){(p.cats||[]).forEach(function(c){allCats[c]=(allCats[c]||0)+1;});});
  var cats=Object.keys(allCats).filter(function(c){return !/buchstaben|silben|bustaben/i.test(c);}).sort(function(a,b){return allCats[b]-allCats[a]||a.localeCompare(b);}).slice(0,14);
  var activeCat=null,q='';
  function chip(label,val){var b=document.createElement('button');b.className='blog-chip'+(val===activeCat?' active':'');b.textContent=label;b.onclick=function(){activeCat=(activeCat===val?null:val);draw();};return b;}
  function drawChips(){catsEl.innerHTML='';catsEl.appendChild(chip('Alle',null));cats.forEach(function(c){catsEl.appendChild(chip(c,c));});}
  function draw(){
    drawChips();
    var qq=q.toLowerCase();
    var list=posts.filter(function(p){
      if(activeCat && (p.cats||[]).indexOf(activeCat)<0) return false;
      if(qq){var hay=(p.titel+' '+(p.blocks||[]).map(function(b){return b.x;}).join(' ')).toLowerCase();if(hay.indexOf(qq)<0)return false;}
      return true;
    });
    countEl.textContent=list.length+' Beiträge';
    grid.innerHTML='';emptyEl.hidden=list.length>0;
    var frag=document.createDocumentFragment();
    list.forEach(function(p){
      var a=document.createElement('a');a.className='blog-tile';a.href=(p.slug?p.slug+'/':'post.html?id='+p.id);
      var img=document.createElement('div');img.className='blog-tile-img';if(p.img)img.style.backgroundImage='url("'+p.img+'")';
      var body=document.createElement('div');body.className='blog-tile-body';
      body.innerHTML='<div class="blog-date">'+esc(fmt(p.datum))+'</div><div class="blog-title">'+esc(p.titel)+'</div><div class="blog-tile-cat">'+esc((p.cats||[])[0]||'')+'</div>';
      a.appendChild(img);a.appendChild(body);frag.appendChild(a);
    });
    grid.appendChild(frag);
  }
  searchEl.addEventListener('input',function(){q=searchEl.value;draw();});
  draw();
})();
