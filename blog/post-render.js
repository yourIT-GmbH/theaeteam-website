(function(){
  // Legacy-Weiterleitung: alte ?id=-Links auf die neue sprechende URL umlenken
  var id=parseInt(new URLSearchParams(location.search).get('id')||'0',10);
  var posts=(window.BLOG_POSTS||[]);
  var p=posts.filter(function(x){return x.id===id;})[0];
  if(p&&p.slug){
    location.replace('/blog/'+p.slug+'/');
    return;
  }
  // Fallback: zur Blog-Uebersicht
  var el=document.getElementById('post-content');
  if(el){el.innerHTML='<p>Dieser Beitrag ist umgezogen. <a href="index.html">Zur Blog-Übersicht</a>.</p>';}
})();
