/* Javificación · SA «El Maleficio de la Discordia»: piezas comunes de sus páginas
   Necesita comun/javi.js y datos.js. Filas en la Hoja con Alumno «MALEFICIO · 3ºA»:
   - Maleficio     CartaId = S1…S8 · Carta = {c: congelaciones, ok: 1/0}            (Medidor; con código)
   - MalTercio     CartaId = S5/S6/S7 · Carta = {l:[nombres]}                       (Sombrero; con código)
   - MalObs        CartaId = S5…S8 · Tipo = nombre · Carta = {n:{"3.1":7,…}, o:""}  (rúbrica; con código)
   - MalAuto       CartaId = auto · Tipo = nombre · Carta = {r:[1-4 ×6], mano?:1}    (diana; tablet SIN código pero con el código del día)
   - CodigoMerlin  CartaId = pacto | codigo · Carta = {n:[normas]}                  (con código)
   En todas manda la última fila. */
(function(){
'use strict';
var U = JAVI.util, M = window.MALEFICIO;
function $(id){ return document.getElementById(id); }
function esc(t){ var d = document.createElement('div'); d.textContent = t==null ? '' : t; return d.innerHTML; }
function leer(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
function guardar(k, v){ try{ if(v==null) localStorage.removeItem(k); else localStorage.setItem(k, v); }catch(e){} }
function TAG(g){ return 'MALEFICIO · '+g; }
function hoy(){ return U.clave(new Date()); }
function curso(g){ return String(g||'').charAt(0)==='3' ? '3' : '4'; }
function letra(g){ return curso(g)==='3' ? 'a' : 'b'; }
function jsonFila(f){ var i = String(f.carta||'').indexOf('{'); if(i<0) return null; try{ return JSON.parse(f.carta.slice(i)); }catch(e){ return null; } }
function conLlave(texto){ if(JAVI.llaveAbierta()) return true; JAVI.pedirCodigo({ texto:texto }); return false; }
function clases(){
  return JAVI.grupos().filter(function(g){ var r = JAVI.grupo(g); return r && (r.sistema==='ef' || (r.asignaturas||[]).indexOf('EF')>=0); })
    .sort(function(a, b){ return a.localeCompare(b); });
}
/* filas de una acción de la clase; ultimas() = la última por clave */
function filasDe(g, accion){
  var k = U.normal(TAG(g)), a = U.normal(accion);
  return JAVI.filas().filter(function(f){ return U.normal(f.alumno)===k && U.normal(f.accion)===a; });
}
function ultimas(g, accion, clave){
  var o = {};
  filasDe(g, accion).forEach(function(f){ var j = jsonFila(f); if(j) o[clave(f)] = { f:f, j:j }; });
  return o;
}
var avisoT = 0;
function aviso(t){
  var a = $('avisoT'); if(!a){ a = document.createElement('div'); a.id = 'avisoT'; a.className = 'j-aviso'; a.setAttribute('role','status'); document.body.appendChild(a); }
  a.textContent = t; a.hidden = false; clearTimeout(avisoT); avisoT = setTimeout(function(){ a.hidden = true; }, 3500);
}

/* ---------- botones de clase (se recuerda la última) ---------- */
function botonesClase(box, alCambiar){
  var cs = clases(), q = (location.search.match(/[?&]grupo=([^&#]+)/)||[])[1], g = q ? decodeURIComponent(q) : leer('maleficio-grupo');
  if(cs.indexOf(g)<0) g = cs[0];
  function poner(x){
    g = x; guardar('maleficio-grupo', x);
    Array.prototype.forEach.call(box.querySelectorAll('[data-g]'), function(b){ b.setAttribute('aria-pressed', b.dataset.g===x ? 'true' : 'false'); });
    alCambiar(x);
  }
  box.innerHTML = cs.map(function(c){ return '<button class="pillM" type="button" data-g="'+c+'">'+c+'</button>'; }).join('');
  box.addEventListener('click', function(e){ var b = e.target.closest('[data-g]'); if(b) poner(b.dataset.g); });
  poner(g);
}

/* ---------- congelaciones de hoy (las cuenta el Medidor y el breakout) ---------- */
function kCong(g){ return 'maleficio-cong|'+g+'|'+hoy(); }
function congelaciones(g){ return +(leer(kCong(g))||0); }
function ponerCongelaciones(g, n){ guardar(kCong(g), String(Math.max(0, n))); }

/* ---------- ¡Petrificus Totalus!: toda la clase congelada 30 segundos ---------- */
var css = document.createElement('style');
css.textContent =
  '.pillM{font-family:var(--f-sub);font-weight:700;font-size:16px;padding:8px 14px;border-radius:999px;border:2px solid var(--panel-borde);background:var(--panel);color:var(--tinta);cursor:pointer}'+
  '.pillM[aria-pressed="true"]{background:var(--acento);color:var(--acento-tinta);border-color:var(--acento)}'+
  '.petri{position:fixed;inset:0;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;text-align:center;padding:20px;'+
    'background:radial-gradient(circle at 50% 40%,rgba(190,225,255,.97),rgba(70,110,160,.98));color:#0d2340;animation:petriEntra .35s ease-out}'+
  '.petri::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(115deg,rgba(255,255,255,.18) 0 2px,transparent 2px 22px);pointer-events:none}'+
  '@keyframes petriEntra{0%{opacity:0;transform:scale(1.3)}100%{opacity:1;transform:none}}'+
  '.petri h2{font-family:var(--f-titulo,Cinzel,serif);font-size:clamp(36px,8vw,96px);line-height:1;letter-spacing:.04em;text-shadow:0 0 22px #fff}'+
  '.petri .seg{font-family:var(--f-titulo,Cinzel,serif);font-size:clamp(90px,22vw,240px);font-weight:900;line-height:1;text-shadow:0 0 30px #fff}'+
  '.petri p{font-size:clamp(20px,3vw,32px);font-weight:700;max-width:900px}'+
  '.petri .hielo{font-size:clamp(50px,9vw,100px);animation:petriBrillo 1.2s infinite alternate}'+
  '@keyframes petriBrillo{to{filter:drop-shadow(0 0 18px #fff);transform:scale(1.08)}}'+
  '.petri button{font-family:var(--f-sub);font-weight:800;font-size:20px;padding:10px 22px;border-radius:14px;border:2px solid #0d2340;background:#fff;color:#0d2340;cursor:pointer;position:relative}'+
  '.petri.fin{background:radial-gradient(circle at 50% 40%,rgba(255,246,210,.97),rgba(201,151,46,.98));color:#3a2a16}';
document.head.appendChild(css);

function sonar(fs, tipo, d){
  try{
    var c = sonar.c = sonar.c || new (window.AudioContext||window.webkitAudioContext)(); if(c.state==='suspended') c.resume();
    fs.forEach(function(f, i){ var o = c.createOscillator(), gn = c.createGain(), t = c.currentTime + i*(d||0.12);
      o.type = tipo||'sine'; o.frequency.value = f; gn.gain.setValueAtTime(0.12, t); gn.gain.exponentialRampToValueAtTime(0.0001, t+0.5);
      o.connect(gn); gn.connect(c.destination); o.start(t); o.stop(t+0.55); });
  }catch(e){}
}
function petrificus(g, alAcabar){
  var seg = 30, cap = document.createElement('div'); cap.className = 'petri'; cap.setAttribute('role','alertdialog');
  ponerCongelaciones(g, congelaciones(g)+1);
  sonar([1568,1046,784,523,392], 'triangle', 0.09);
  cap.innerHTML = '<div class="hielo">🧊⚡🧊</div><h2>¡PETRIFICUS TOTALUS!</h2><div class="seg" id="petriSeg">30</div>'+
    '<p>Toda la clase congelada como estatuas. Ni una palabra, ni un movimiento.</p><button type="button" data-fin>Terminar antes</button>';
  document.body.appendChild(cap);
  var t = setInterval(function(){
    seg--; var s = cap.querySelector('#petriSeg'); if(s) s.textContent = seg;
    if(seg<=5 && seg>0) sonar([880], 'sine');
    if(seg<=0) acabar();
  }, 1000);
  function acabar(){
    clearInterval(t);
    cap.classList.add('fin');
    cap.innerHTML = '<div class="hielo">✨</div><h2>¡Finite Incantatem!</h2><p>Ya podéis moveros. Recordad: el maleficio vuelve con cada insulto, burla o compañero excluido.</p><button type="button" data-cerrar>Seguir jugando</button>';
    sonar([523,659,784,1046], 'triangle');
    cap.querySelector('[data-cerrar]').addEventListener('click', function(){ cap.remove(); if(alAcabar) alAcabar(); });
  }
  cap.querySelector('[data-fin]').addEventListener('click', acabar);
}

/* ---------- código del día para la Diana en las tablets (lo ve el profe) ---------- */
function codigoDia(g){
  var base = JAVI.ajuste('codigo') || leer('javi-codigo') || '';
  if(!base) return Promise.resolve('');
  var datos = new TextEncoder().encode('maleficio:'+base+'|'+g+'|'+hoy());
  return crypto.subtle.digest('SHA-256', datos).then(function(b){ return String(1000 + new DataView(b).getUint32(0) % 9000); });
}

/* ---------- diana (SVG): 6 sectores (frases), 4 anillos (1 fuera → 4 centro) ---------- */
function dianaSVG(r, o){
  o = o || {};
  var N = 6, R = 140, cx = 160, cy = 160, cols = ['#e74c3c','#e74c3c','#3498db','#3498db','#27ae60','#27ae60'], h = '';
  function p(a, rr){ return [cx + rr*Math.cos(a), cy + rr*Math.sin(a)]; }
  for(var i=0;i<N;i++){
    var a0 = -Math.PI/2 + i*2*Math.PI/N, a1 = a0 + 2*Math.PI/N;
    for(var k=4;k>=1;k--){
      var rr = R*(5-k)/4, ri = R*(4-k)/4, A = p(a0, rr), B = p(a1, rr), C = p(a1, ri), D = p(a0, ri);
      var lleno = r && r[i]>=k;
      h += '<path d="M'+A+' A'+rr+','+rr+' 0 0 1 '+B+' L'+C+(ri>0 ? ' A'+ri+','+ri+' 0 0 0 '+D : '')+' Z" fill="'+(lleno ? cols[i] : '#fff')+'" fill-opacity="'+(lleno ? (0.45+0.15*k) : 1)+'" stroke="#7a5a2a" stroke-width="1.5"/>';
    }
    var t = p(a0 + Math.PI/N, R+14);
    h += '<text x="'+t[0]+'" y="'+t[1]+'" text-anchor="middle" dominant-baseline="middle" font-size="16" font-weight="700" fill="#3a2a16">'+(i+1)+'</text>';
  }
  return '<svg viewBox="0 0 320 320" width="'+(o.w||320)+'" role="img" aria-label="Diana del Pensadero">'+h+'</svg>';
}

/* ---------- datos de evaluación de una clase ---------- */
function evaluacion(g){
  var obs = {}, auto = {}, terc = {};
  filasDe(g, 'MalObs').forEach(function(f){ var j = jsonFila(f); if(!j || !j.n) return; var a = obs[f.tipo] = obs[f.tipo] || {}; a[f.cartaId] = j; });
  filasDe(g, 'MalAuto').forEach(function(f){ var j = jsonFila(f); if(j && j.r) auto[f.tipo] = j; });
  filasDe(g, 'MalTercio').forEach(function(f){ var j = jsonFila(f); if(j && j.l) terc[f.cartaId] = j.l; });
  return { obs:obs, auto:auto, terc:terc };
}
/* nota H de un criterio = media de las observaciones de ese alumno; A = media de sus dos frases × 2,5 */
function notaH(o, c){ if(!o) return null; var s = 0, n = 0; Object.keys(o).forEach(function(k){ var v = o[k].n && o[k].n[c]; if(v!=null && v!==''){ s += +v; n++; } }); return n ? s/n : null; }
function notaA(a, c){ if(!a) return null; var v = [], i; for(i=0;i<M.diana.length;i++) if(M.diana[i].c===c && a.r[i]) v.push(a.r[i]); return v.length ? v.reduce(function(x, y){ return x+y; }, 0)/v.length*2.5 : null; }
function notaFinal(h, a){ if(h==null && a==null) return null; if(a==null) return h; if(h==null) return a; return (M.pesos.hetero*h + M.pesos.auto*a)/100; }
function r1(x){ return x==null ? null : Math.round(x*10)/10; }
function coma(x){ return x==null ? '—' : String(r1(x)).replace('.', ','); }
function nivel(x){ if(x==null) return ''; x = Math.round(x); return x<5 ? 'IN' : x<6 ? 'SU' : x<7 ? 'BI' : x<9 ? 'NT' : 'SB'; }

window.MAL = { $:$, esc:esc, leer:leer, guardar:guardar, TAG:TAG, hoy:hoy, curso:curso, letra:letra, jsonFila:jsonFila, conLlave:conLlave,
  clases:clases, filasDe:filasDe, ultimas:ultimas, aviso:aviso, botonesClase:botonesClase, congelaciones:congelaciones, ponerCongelaciones:ponerCongelaciones,
  petrificus:petrificus, sonar:sonar, codigoDia:codigoDia, dianaSVG:dianaSVG, evaluacion:evaluacion, notaH:notaH, notaA:notaA, notaFinal:notaFinal,
  r1:r1, coma:coma, nivel:nivel };
})();
