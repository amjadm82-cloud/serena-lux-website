// Mobile Navigation
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Videos: Platzhalter ausblenden, sobald ein Video geladen ist
  document.querySelectorAll('video').forEach(function (v) {
    v.addEventListener('loadeddata', function () {
      var ph = v.parentElement.querySelector('.media-ph');
      if (ph) ph.style.display = 'none';
    });
    v.addEventListener('error', function () { v.style.display = 'none'; }, true);
  });

  // Hinweistext je nach Weg (Zuweisung / Selbstzahler)
  var radios = document.querySelectorAll('input[name="weg"]');
  var hint = document.getElementById('weg-hinweis');
  var texts = {
    zuweisung: 'Bitte lassen Sie die Zuweisung Ihrer Hausärztin / Ihres Hausarztes direkt an uns senden. Die Beratungskonsultation wird über die Krankenkasse abgerechnet; die Injektion selbst ist meist Selbstzahlerleistung.',
    selbstzahler: 'Für die Terminreservation erheben wir ein Depot von CHF 250, das an die Behandlung angerechnet wird. Bezahlung vorab online oder bar vor Ort. Bei einer Absage wird das Depot auf einen neuen Termin übertragen.'
  };
  radios.forEach(function (r) {
    r.addEventListener('change', function () {
      if (hint) { hint.textContent = texts[r.value] || ''; hint.style.display = 'block'; }
    });
  });

  // Formular per fetch an send.php senden
  var form = document.getElementById('termin-form');
  var msg = document.getElementById('form-msg');
  if (form && msg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      msg.className = 'form-msg';
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      fetch(form.action, { method: 'POST', body: new FormData(form) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d && d.ok) {
            msg.textContent = 'Vielen Dank. Ihre Anfrage ist eingegangen – wir melden uns so rasch wie möglich bei Ihnen.';
            msg.className = 'form-msg ok';
            form.reset();
            if (hint) hint.style.display = 'none';
          } else {
            throw new Error((d && d.error) || 'Fehler');
          }
        })
        .catch(function () {
          msg.textContent = 'Die Anfrage konnte leider nicht gesendet werden. Bitte rufen Sie uns an: 061 322 61 11.';
          msg.className = 'form-msg err';
        })
        .finally(function () { btn.disabled = false; });
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* Hero: 3 Videos nacheinander abspielen */
(function(){
  var vids=[].slice.call(document.querySelectorAll('.hero-videos video'));
  var dots=[].slice.call(document.querySelectorAll('.hero-dots span'));
  if(!vids.length) return;
  var i=0;
  function show(n){
    vids.forEach(function(v,k){v.classList.toggle('is-active',k===n);});
    dots.forEach(function(d,k){d.classList.toggle('on',k===n);});
    var v=vids[n]; try{v.currentTime=0;}catch(e){}
    var p=v.play(); if(p&&p.catch) p.catch(function(){});
  }
  vids.forEach(function(v){
    v.addEventListener('ended',function(){ i=(i+1)%vids.length; show(i); });
    v.addEventListener('error',function(){ i=(i+1)%vids.length; show(i); },true);
  });
  show(0);
})();
