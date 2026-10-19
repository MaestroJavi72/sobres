/* Javificación · barra común de las actividades de una SA (sda/<id>/iNN-*.html)
   ‹ anterior · sesión, fecha y si puntúa · siguiente ›  y  «Todos los juegos».
   Lee data/sda/indice.json; no necesita nada más. */
(function(){
var m = location.pathname.match(/\/sda\/([^\/]+)\/([^\/]+\.html)$/);
if(!m) return;
var ID = m[1], ARCHIVO = m[2], PROFE = /[?&]profe/.test(location.search) ? '?profe' : '';
var ICONOS = { 'I-1':'📖','I-2':'👏','I-3':'🔀','I-4':'🗂️','I-5':'🏭','I-6':'⚙️','I-7':'🔍','I-8':'🎡','I-9':'🃏','I-10':'🔮','I-11':'⚖️','I-12':'💡','I-13':'🎙️','I-14':'📚','I-15':'🎲','I-16':'⚔️' };
var DIAS = ['dom','lun','mar','mié','jue','vie','sáb'], MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

/* 🏠 Inicio junto a «← Volver» en las fichas (no cargan comun/javi.js, que lo pone en las demás páginas) */
(function(){
  if(document.querySelector('.jv-inicio') || window.JAVI) return;
  var v = document.getElementById('bVolver') || document.querySelector('a.volver'); if(!v) return;
  var a = v.cloneNode(false); a.removeAttribute('id'); a.removeAttribute('data-volver'); a.classList.add('jv-inicio');
  a.href = '../../'; a.textContent = '🏠 Inicio'; a.title = 'Ir a la portada';
  v.parentNode.insertBefore(a, v.nextSibling);
})();

var css = document.createElement('style');
css.textContent =
  '.barraAct{display:flex;gap:8px;flex-wrap:wrap;align-items:stretch;margin:0 0 14px}'+
  '.barraAct a,.barraAct span.info{display:flex;align-items:center;gap:8px;border-radius:12px;padding:8px 14px;font-family:var(--f-sub,Cinzel,serif);font-weight:700;font-size:15px;line-height:1.2;text-decoration:none}'+
  '.barraAct a{background:rgba(10,31,34,.85);color:#e8cf8a;border:2px solid #2f5a54}'+
  '.barraAct a:hover{border-color:#e8c872}'+
  '.barraAct a.todos{background:linear-gradient(180deg,#f3d27a,#c9972e);color:#2b1c05;border-color:#fff1b8}'+
  '.barraAct span.info{flex:1;min-width:200px;justify-content:center;text-align:center;background:rgba(0,0,0,.25);color:#d9cfae;border:2px dashed rgba(232,200,114,.35);font-weight:600}'+
  '.barraAct .etq{font-size:11px;padding:3px 7px;border-radius:999px;background:#f3d27a;color:#3a2a16;white-space:nowrap}'+
  '.barraAct .ic{font-size:20px}'+
  '.barraAct .vacio{visibility:hidden}'+
  '@media (max-width:620px){ .barraAct span.info{order:-1;flex-basis:100%} .barraAct a{flex:1;justify-content:center} }'+
  '@media print{ .barraAct{display:none!important} }';
document.head.appendChild(css);

function esc(t){ var d = document.createElement('div'); d.textContent = t==null ? '' : t; return d.innerHTML; }
fetch('../../data/sda/indice.json', { cache:'no-store' }).then(function(r){ return r.json(); }).then(function(j){
  var s = (j.sdas||[]).filter(function(x){ return x.id===ID; })[0]; if(!s || !s.enlaces) return;
  /* nombre, sesión y etiqueta de cada actividad, sacados de «interactivas» */
  var info = {};
  (s.sesiones||[]).forEach(function(se, i){
    (se.interactivas||'').split(/,\s*(?=I-)/).forEach(function(x){
      var k = x.trim().match(/^(I-\d+)\s+(.*?)\s*(?:\(([^)]*)\))?$/);
      if(k && !info[k[1]]) info[k[1]] = { nombre:k[2], etq:k[3]||'', n:i+1, fecha:se.fecha };
    });
  });
  var cods = Object.keys(s.enlaces).sort(function(a,b){ return +a.slice(2) - +b.slice(2); });
  var yo = cods.filter(function(c){ return s.enlaces[c].split('/').pop()===ARCHIVO; })[0];
  if(!yo){ barraRecurso(s); return; }
  var i = cods.indexOf(yo), ant = cods[i-1], sig = cods[i+1], d = info[yo] || {};
  function enl(c, flecha){
    if(!c) return '<a class="vacio" aria-hidden="true">·</a>';
    var n = (info[c]||{}).nombre || c, u = s.enlaces[c].split('/').pop()+PROFE;
    return '<a href="'+u+'" title="'+esc(c+' · '+n)+'">'+(flecha==='‹' ? '‹ <span class="ic">'+(((s.iconos||{})[c])||ICONOS[c]||'🎮')+'</span>'+esc(n) : esc(n)+' <span class="ic">'+(((s.iconos||{})[c])||ICONOS[c]||'🎮')+'</span> ›')+'</a>';
  }
  var f = d.fecha ? d.fecha.split('-') : null, dia = f ? DIAS[new Date(+f[0], +f[1]-1, +f[2], 12).getDay()]+' '+(+f[2])+' '+MESES[+f[1]-1] : '';
  var etq = /^puntúa$/i.test(d.etq) ? '<span class="etq">⭐ puntúa</span>' : /ampliaci/i.test(d.etq) ? '<span class="etq">➕ ampliación</span>' : '';
  var nav = document.createElement('nav'); nav.className = 'barraAct'; nav.setAttribute('aria-label', 'Actividades del tema');
  nav.innerHTML = enl(ant, '‹')+
    '<span class="info">'+esc(yo)+' de '+cods.length+(d.n ? ' · Sesión '+d.n+(dia ? ', '+dia : '') : '')+'</span>'+
    enl(sig, '›')+
    '<a class="todos" href="../?id='+encodeURIComponent(ID)+(PROFE ? '&profe' : '')+'#juegos">🎮 Todos los juegos</a>';
  colocar(nav);
  montarCrono(nav);
  if(window.JAVI) JAVI.listo(function(){ montarTurno(s, yo, d, nav); });
}).catch(function(){});

/* ============================================================
   ¿QUIÉN RESPONDE? (solo actividades)
   - Javi marca si la actividad da punto (ajuste «puntua:<sda>:<I-x>» = si/no;
     si no lo ha marcado, NO da punto).
   - Al azar sin repetir hasta que salga toda la clase (cola del día, compartida por todas las actividades)
     o elegido a mano. Quien falta (lista de la Sesión) no sale.
   - ✅ = +1 con JAVI.darPuntos (solo se guarda con el código). Deshacer = movimiento contrario.
   ============================================================ */
function montarTurno(s, cod, d, nav){
  var g = s.grupo, r = JAVI.grupo(g); if(!r) return;
  var hoy = JAVI.util.clave(new Date()), kCola = 'turnos|'+g+'|'+hoy, kFaltan = 'faltan|'+g+'|'+hoy, kPunto = 'puntua:'+ID+':'+cod;
  function leer(k, def){ try{ var v = localStorage.getItem(k); return v ? JSON.parse(v) : def; }catch(e){ return def; } }
  function guardar(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  function daPunto(){ return JAVI.ajuste(kPunto)==='si'; }   /* por defecto NO: solo da punto si Javi lo marca */
  function presentes(){ var f = leer(kFaltan, []); return r.nombres.filter(function(n){ return f.indexOf(n)<0; }); }
  var quien = null, mov = null, moneda = (JAVI.TEMAS[JAVI.temaDe(g)]||{}).moneda1 || 'galeón';

  var css = document.createElement('style');
  css.textContent =
    '.turnoAct{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:-6px 0 14px;padding:10px 12px;border-radius:14px;background:rgba(10,31,34,.85);border:2px solid #2f5a54;font-family:var(--f-sub,Cinzel,serif)}'+
    '.turnoAct button,.turnoAct select{font:700 15px var(--f-sub,Cinzel,serif);padding:8px 12px;border-radius:10px;border:2px solid #2f5a54;background:rgba(0,0,0,.3);color:#e8cf8a;cursor:pointer}'+
    '.turnoAct .dp[aria-pressed="true"]{background:linear-gradient(180deg,#f3d27a,#c9972e);color:#2b1c05;border-color:#fff1b8}'+
    '.turnoAct .quien{flex:1;min-width:160px;text-align:center;font-family:var(--f-titulo,Cinzel,serif);font-size:clamp(22px,3.4vw,34px);color:#f3d27a;text-shadow:0 2px 12px rgba(232,200,114,.4)}'+
    '.turnoAct .quien.gira{animation:jvTurno .09s infinite}'+
    '@keyframes jvTurno{50%{transform:translateY(-3px)}}'+
    '.turnoAct .ok{background:#2d6b47;color:#fff;border-color:#5fbf86}'+
    '.turnoAct .no{background:#7a2a22;color:#fff;border-color:#b6493f}'+
    '.turnoAct .hecho{color:#9be3b0;font-weight:700}'+
    '.turnoAct details{flex-basis:100%;color:#d9cfae;font-size:14px}'+
    '.turnoAct details summary{cursor:pointer}'+
    '.turnoAct .faltan{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}'+
    '.turnoAct .faltan button{font-size:13px;padding:4px 8px}'+
    '.turnoAct .faltan button[aria-pressed="true"]{background:#7a2a22;color:#fff;text-decoration:line-through}'+
    '@media print{ .turnoAct{display:none!important} }';
  document.head.appendChild(css);

  var box = document.createElement('div'); box.className = 'turnoAct'; box.setAttribute('aria-label', '¿Quién responde?');
  nav.parentNode.insertBefore(box, nav.nextSibling);

  function pintar(){
    var dp = daPunto(), pres = presentes();
    if(!JAVI.claseAbierta(g)){   /* privacidad: sin el código de la clase no se ven nombres */
      box.innerHTML = '<button type="button" class="dp" data-a="punto" aria-pressed="'+dp+'">'+(dp ? '⭐ Da punto' : '☆ No da punto')+'</button>'+
        '<button type="button" data-a="abrir">🔒 ¿Quién responde? (código de '+esc(g)+')</button>';
      return;
    }
    var h = '<button type="button" class="dp" data-a="punto" aria-pressed="'+dp+'" title="Toca para cambiarlo">'+(dp ? '⭐ Da punto' : '☆ No da punto')+'</button>'+
      '<button type="button" data-a="azar">🎲 Al azar</button>'+
      '<select data-a="elegir" aria-label="Elegir alumno"><option value="">o elige…</option>'+pres.map(function(n){ return '<option>'+esc(n)+'</option>'; }).join('')+'</select>'+
      '<span class="quien" id="jvQuien">'+(quien ? '🙋 '+esc(quien) : '¿Quién responde?')+'</span>';
    if(quien && dp) h += mov ? '<span class="hecho">✓ +1 '+esc(moneda)+'</span><button type="button" data-a="deshacer">↶ Deshacer</button>'
                             : '<button type="button" class="ok" data-a="ok">✅ +1</button><button type="button" class="no" data-a="mal">❌</button>';
    var f = leer(kFaltan, []);
    h += '<details><summary>🙋 Quién falta hoy'+(f.length ? ' ('+f.length+')' : '')+'</summary><div class="faltan">'+
      r.nombres.map(function(n){ return '<button type="button" data-falta="'+esc(n)+'" aria-pressed="'+(f.indexOf(n)>=0)+'">'+esc(n)+'</button>'; }).join('')+'</div></details>';
    var abierto = box.querySelector('details') && box.querySelector('details').open;
    box.innerHTML = h;
    if(abierto) box.querySelector('details').open = true;
  }
  function sacar(){
    var pres = presentes(), cola = leer(kCola, []).filter(function(n){ return pres.indexOf(n)>=0; });
    if(!cola.length) cola = pres.slice().sort(function(){ return JAVI.util.rnd()-.5; });
    var n = cola.shift(); guardar(kCola, cola); return n;
  }
  function girar(){
    var pres = presentes(); if(!pres.length) return;
    var fin = sacar(), el = box.querySelector('#jvQuien'), n = 0, vueltas = 12+Math.floor(JAVI.util.rnd()*6);
    el.classList.add('gira');
    (function paso(){
      n++; el.textContent = '🙋 '+(n>=vueltas ? fin : pres[Math.floor(JAVI.util.rnd()*pres.length)]);
      if(n<vueltas){ setTimeout(paso, 40+n*12); return; }
      el.classList.remove('gira'); quien = fin; mov = null; pintar();
    })();
  }
  box.addEventListener('click', function(e){
    var b = e.target.closest('button'); if(!b) return;
    if(b.dataset.falta){
      var f = leer(kFaltan, []), i = f.indexOf(b.dataset.falta); if(i>=0) f.splice(i,1); else f.push(b.dataset.falta);
      guardar(kFaltan, f); pintar(); return;
    }
    var a = b.dataset.a;
    if(a==='abrir'){ JAVI.protegerClase(g, { alAbrir:pintar }); return; }
    if(a==='punto'){ JAVI.guardarAjuste(kPunto, daPunto() ? 'no' : 'si'); pintar(); }
    if(a==='azar') girar();
    if(a==='ok' && quien && !mov){ mov = JAVI.darPuntos(g, quien, 1, 'Acierto', s.titulo+' · '+cod+' '+(d.nombre||'')); pintar(); }
    if(a==='mal'){ quien = null; mov = null; pintar(); }
    if(a==='deshacer' && mov){ JAVI.quitarPuntos(g, quien, mov, 'Acierto ('+cod+')'); mov = null; pintar(); }
  });
  box.addEventListener('change', function(e){
    if(e.target.dataset.a!=='elegir' || !e.target.value) return;
    quien = e.target.value; mov = null;
    var cola = leer(kCola, []), i = cola.indexOf(quien); if(i>=0){ cola.splice(i,1); guardar(kCola, cola); }   /* ya ha salido en esta ronda */
    pintar();
  });
  pintar();
}

/* ============================================================
   ⏱️ CRONÓMETRO (pedido por Javi, 19/10/2026): en todas las actividades.
   Botón en la barra con el tiempo; panel con cronómetro o cuenta atrás (1, 2, 3, 5, 10 min),
   ⛶ en grande para la pizarra y aviso con sonido al acabar.
   ============================================================ */
function montarCrono(nav){
  var css = document.createElement('style');
  css.textContent =
    '.jvCrono{position:relative;display:flex}'+
    '.jvCrono>button{display:flex;align-items:center;gap:6px;border-radius:12px;padding:8px 14px;font:700 16px var(--f-sub,Cinzel,serif);background:rgba(10,31,34,.85);color:#e8cf8a;border:2px solid #2f5a54;cursor:pointer;font-variant-numeric:tabular-nums}'+
    '.jvCrono.va>button{border-color:#5fbf86;color:#9be3b0}'+
    '.jvCrono.poco>button{border-color:#d0473f;color:#ffb0a8;animation:jvCrP .5s infinite alternate}'+
    '@keyframes jvCrP{to{transform:scale(1.06)}}'+
    '.jvCrono .pan{position:absolute;right:0;top:calc(100% + 6px);z-index:60;width:260px;background:#0e2a28;color:#f6ead0;border:2px solid #c9a34a;border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:8px;box-shadow:0 12px 30px rgba(0,0,0,.5)}'+
    '.jvCrono .pan[hidden]{display:none}'+
    '.jvCrono .t{font:900 44px/1 Cinzel,serif;text-align:center;color:#f3d27a;font-variant-numeric:tabular-nums}'+
    '.jvCrono .fila{display:flex;gap:5px;flex-wrap:wrap;justify-content:center}'+
    '.jvCrono .fila button{font:700 14px var(--f-sub,Cinzel,serif);padding:7px 10px;border-radius:10px;border:1px solid #2f5a54;background:rgba(255,255,255,.06);color:#f6ead0;cursor:pointer}'+
    '.jvCrono .fila button.on{background:#c9a34a;color:#2b1c05;border-color:#c9a34a}'+
    '.jvCronoG{position:fixed;inset:0;z-index:300;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;background:rgba(5,15,16,.94);color:#f3d27a;cursor:pointer}'+
    '.jvCronoG .t{font:900 clamp(120px,30vw,360px)/1 Cinzel,serif;font-variant-numeric:tabular-nums;text-shadow:0 0 40px rgba(243,210,122,.4)}'+
    '.jvCronoG.poco .t{color:#ff8a7a}'+
    '.jvCronoG.fin{animation:jvCrF .6s 4 alternate}'+
    '@keyframes jvCrF{to{background:rgba(122,32,48,.95)}}'+
    '.jvCronoG small{font:700 20px var(--f-sub,Cinzel,serif);color:#d9cfae}'+
    '@media print{ .jvCrono,.jvCronoG{display:none!important} }';
  document.head.appendChild(css);
  var modo = 'crono', total = 0, ini = 0, acum = 0, corre = false, tick = 0, grande = null;
  var box = document.createElement('div'); box.className = 'jvCrono';
  box.innerHTML = '<button type="button" title="Cronómetro" aria-label="Cronómetro">⏱️ <span>00:00</span></button>'+
    '<div class="pan" hidden><div class="fila"><button type="button" data-m="crono">⏱️ Cronómetro</button><button type="button" data-m="atras">⏳ Cuenta atrás</button></div>'+
    '<div class="t">00:00</div>'+
    '<div class="fila" data-pre>'+[1,2,3,5,10].map(function(m){ return '<button type="button" data-min="'+m+'">'+m+' min</button>'; }).join('')+'</div>'+
    '<div class="fila"><button type="button" data-a="go">▶ Empezar</button><button type="button" data-a="reset">↺ A cero</button><button type="button" data-a="grande">⛶ En grande</button></div></div>';
  nav.appendChild(box);
  function ms(){ return acum + (corre ? Date.now() - ini : 0); }
  function resto(){ return modo==='atras' ? Math.max(0, total - ms()) : ms(); }
  function fmt(x){ var s = Math.ceil(x/1000); if(modo==='crono') s = Math.floor(x/1000); return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); }
  function pitar(n){ try{ var c = pitar.c = pitar.c || new (window.AudioContext||window.webkitAudioContext)(); for(var i=0;i<n;i++){ var o = c.createOscillator(), g = c.createGain(), t = c.currentTime + i*0.35; o.frequency.value = 880; g.gain.setValueAtTime(0.2, t); g.gain.exponentialRampToValueAtTime(0.001, t+0.3); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+0.32); } }catch(e){} }
  function pintar(){
    var x = resto(), txt = fmt(x), poco = modo==='atras' && corre && x <= 10000;
    box.querySelector('span').textContent = txt; box.querySelector('.t').textContent = txt;
    box.classList.toggle('va', corre); box.classList.toggle('poco', poco);
    Array.prototype.forEach.call(box.querySelectorAll('[data-m]'), function(b){ b.classList.toggle('on', b.dataset.m===modo); });
    Array.prototype.forEach.call(box.querySelectorAll('[data-min]'), function(b){ b.classList.toggle('on', modo==='atras' && total===b.dataset.min*60000); });
    box.querySelector('[data-pre]').hidden = modo!=='atras';
    box.querySelector('[data-a="go"]').textContent = corre ? '⏸ Pausa' : (ms() ? '▶ Seguir' : '▶ Empezar');
    if(grande){ grande.querySelector('.t').textContent = txt; grande.classList.toggle('poco', poco); }
    if(modo==='atras' && corre && x<=0){
      corre = false; acum = total; clearInterval(tick); pitar(4);
      box.querySelector('span').textContent = '¡Tiempo!';
      if(grande){ grande.querySelector('.t').textContent = '¡Tiempo!'; grande.classList.add('fin'); }
    }
  }
  function parar(){ if(corre){ acum = ms(); corre = false; clearInterval(tick); } }
  box.addEventListener('click', function(e){
    var b = e.target.closest('button'); if(!b) return;
    if(b.parentNode===box){ var p = box.querySelector('.pan'); p.hidden = !p.hidden; return; }
    if(b.dataset.m){ parar(); modo = b.dataset.m; acum = 0; if(modo==='atras' && !total) total = 3*60000; }
    if(b.dataset.min){ parar(); modo = 'atras'; total = b.dataset.min*60000; acum = 0; }
    var a = b.dataset.a;
    if(a==='go'){
      if(corre) parar();
      else { if(modo==='atras' && ms()>=total) acum = 0; ini = Date.now(); corre = true; clearInterval(tick); tick = setInterval(pintar, 250); }
    }
    if(a==='reset'){ parar(); acum = 0; }
    if(a==='grande'){
      grande = document.createElement('div'); grande.className = 'jvCronoG'; grande.title = 'Toca para cerrar';
      grande.innerHTML = '<div class="t"></div><small>'+(modo==='atras' ? '⏳ Cuenta atrás' : '⏱️ Cronómetro')+' · toca para cerrar</small>';
      grande.addEventListener('click', function(){ grande.remove(); grande = null; });
      document.body.appendChild(grande);
    }
    pintar();
  });
  document.addEventListener('click', function(e){ if(!box.contains(e.target)) box.querySelector('.pan').hidden = true; });
  pintar();
}

/* debajo de la cabecera de la actividad, o debajo de la barra de imprimir de las fichas */
function colocar(nav){
  var ref = document.querySelector('header.cab') || document.querySelector('nav.barra');
  if(ref) ref.parentNode.insertBefore(nav, ref.nextSibling); else document.body.insertBefore(nav, document.body.firstChild);
}
function fechaCorta(f){ var p = f.split('-'); return DIAS[new Date(+p[0], +p[1]-1, +p[2], 12).getDay()]+' '+(+p[2])+' '+MESES[+p[1]-1]; }

/* fichas e imprimibles (recursos de indice.json) */
function barraRecurso(s){
  var rs = s.recursos || [], i = -1;
  rs.forEach(function(r, k){ if(r.url.split('/').pop()===ARCHIVO) i = k; });
  if(i<0) return;
  var r = rs[i], ant = rs[i-1], sig = rs[i+1];
  function corto(x){ return x.n.replace(/^Ficha para familias · /, 'Ficha: '); }
  function enl(x, flecha){
    if(!x) return '<a class="vacio" aria-hidden="true">·</a>';
    var u = x.url.split('/').pop()+PROFE;
    return '<a href="'+u+'" title="'+esc(x.n)+'">'+(flecha==='‹' ? '‹ <span class="ic">'+x.ic+'</span>'+esc(corto(x)) : esc(corto(x))+' <span class="ic">'+x.ic+'</span> ›')+'</a>';
  }
  var ses = (r.sesiones||[]).map(function(n){ var se = (s.sesiones||[])[n-1]; return se ? n+' ('+fechaCorta(se.fecha)+')' : String(n); });
  var nav = document.createElement('nav'); nav.className = 'barraAct'; nav.setAttribute('aria-label', 'Fichas del tema');
  nav.style.cssText = 'max-width:210mm;margin:12px auto 0;padding:0 10px';
  nav.innerHTML = enl(ant, '‹')+
    '<span class="info">'+r.ic+' '+(i+1)+' de '+rs.length+(ses.length ? ' · Sesi'+(ses.length>1 ? 'ones ' : 'ón ')+ses.join(', ') : '')+'</span>'+
    enl(sig, '›')+
    '<a class="todos" href="../?id='+encodeURIComponent(ID)+(PROFE ? '&profe' : '')+'#juegos">🖨️ Todas las fichas</a>';
  colocar(nav);
}
})();
