document.getElementById('contactForm').addEventListener('submit',function(e){
  e.preventDefault();
  if(document.getElementById('website_hp').value)return; // Honeypot
  var n=document.getElementById('name').value.trim(),
      em=document.getElementById('email').value.trim();
  if(!n||!em){alert('Bitte Name und E-Mail ausfüllen.');return;}
  var form=e.target,
      btn=form.querySelector('button[type=submit]'),
      box=document.getElementById('formMsg'),
      co=document.getElementById('company').value.trim(),
      pk=document.getElementById('pack').value,
      ph=document.getElementById('phone').value.trim(),
      ms=document.getElementById('message').value.trim();

  function fallbackMail(){
    var sub=encodeURIComponent('DOMÄN-PÄCK Anfrage'+(pk?': '+pk:''));
    var body=encodeURIComponent('Name: '+n+'\nUnternehmen: '+co+'\nE-Mail: '+em+'\nTelefon: '+ph+'\nGewünschtes Päck: '+pk+'\n\nNachricht:\n'+ms);
    btn.disabled=false; btn.textContent='Anfrage senden';
    box.hidden=false;
    box.style.background='#E9F7FD'; box.style.color='#0B5E80'; box.style.border='2px solid #0B7FA8';
    box.textContent='Wir öffnen euer E-Mail-Programm für den Versand an kontakt@theae.de …';
    window.location.href='mailto:kontakt@theae.de?subject='+sub+'&body='+body;
  }

  btn.disabled=true; btn.textContent='Wird gesendet …';
  var data=new URLSearchParams(new FormData(form)).toString();
  fetch(location.pathname,{
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:data
  })
  .then(function(r){
    if(!r.ok) throw new Error('http '+r.status);
    // Erfolg: auf die Danke-Seite weiterleiten (identisch zum JS-losen Fallback)
    window.location.href='/danke/';
  })
  .catch(function(){ fallbackMail(); });
});
