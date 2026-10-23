/* Javificación · ⏳ MEDIDOR DE TIEMPO PERDIDO siempre a mano en las páginas de EF (pedido por Javi, 23/10/2026)
   Una pastilla abajo (al lado del 🎵) con la clase y lo que queda para bajar (cuenta desde la hora del horario y NO se para; regla de Javi) y «✅ ¡Bajamos!».
   La cuenta es JAVI.tiempoClase (comun/javi.js), la misma que ef/tiempo.html; tocar el reloj lo abre en grande.
   Límite: 3º → 20 min, 4º → 30 min (al llegar: «📚 ¡Teoría!»).
   Sale en: ef/, ef/teoria/, boveda/, sorteos/, sesion/ (si la sesión es de EF), las páginas del Maleficio y la portada en #ef.
   La clase: la que tiene elegida la página; si no, la de EF de ahora según el horario; si no, la última usada. */
(function(){
'use strict';
if(window.JAVI_MEDIDOR || /[?&](solo|alumno)\b/.test(location.search)) return;
var J = window.JAVI; if(!J) return;
var ruta = location.pathname, base = J.BASE;
function rel(){ try{ return new URL(location.href).pathname.replace(new URL(base, location.href).pathname, ''); }catch(e){ return ruta; } }
function leerL(k){ try{ var v = localStorage.getItem(k); if(v==null) return null; try{ return JSON.parse(v); }catch(e){ return v; } }catch(e){ return null; } }
function qGrupo(){ var m = location.search.match(/[?&]grupo=([^&#]+)/); return m ? decodeURIComponent(m[1]).replace(/o/i, 'º').toUpperCase() : null; }
/* ¿esta pantalla es de EF? y la clave donde la página guarda su clase */
function contexto(){
  var r = rel();
  if(/^ef\/tiempo\.html/.test(r)) return null;                              /* ya es el medidor grande */
  if(/^ef\/teoria\//.test(r)) return { k:'teoria-grupo' };
  if(/^ef\//.test(r)) return { k:'ef-grupo' };
  if(/^boveda\//.test(r)) return { k:'boveda-grupo' };
  if(/^sorteos\//.test(r)) return { k:'sorteos-grupo' };
  if(/^sesion\//.test(r)){ var b = document.getElementById('bTiempo'); return b && b.style.display!=='none' ? { k:'sesion-grupo' } : null; }
  if(/^sda\/maleficio-ef\//.test(r) || (/^sda\//.test(r) && /[?&]id=maleficio-ef/.test(location.search))) return { k:null };
  if((r==='' || r==='index.html') && /^#ef\b/.test(location.hash)) return { k:null };
  return null;
}
function clasesEF(){ var H = J.horario(), l = []; (H ? H.sesiones : []).forEach(function(s){ if(s.asig==='EF' && l.indexOf(s.grupo)<0) l.push(s.grupo); }); return l; }
function claseAhora(){
  var d = new Date(), m = d.getHours()*60+d.getMinutes(), r = null;
  J.sesionesDelDia(J.util.clave(d)).forEach(function(s){ if(s.asig!=='EF') return; var a = s.ini.split(':'), b = s.fin.split(':'); if(m >= +a[0]*60 + +a[1] - 10 && m < +b[0]*60 + +b[1]) r = s.grupo; });
  return r;
}
function grupoActual(cx){
  /* lo que se ve en la página manda: su botón de clase marcado (aria-pressed / aria-selected) */
  var vis = null;
  Array.prototype.some.call(document.querySelectorAll('[aria-pressed="true"],[aria-selected="true"]'), function(b){
    if(el.contains(b)) return false;
    var t = (b.dataset && b.dataset.g) || String(b.textContent||'').trim(); if(/^[1-6]º[A-Z]$/.test(t)){ vis = t; return true; } return false;
  });
  var cs = clasesEF(), ahora = claseAhora(), l = [vis, cx.k ? leerL(cx.k) : null, qGrupo(), ahora, leerL('tiempo-grupo')].filter(function(x){ return x && cs.indexOf(x)>=0; });
  /* la elegida si hoy tiene EF; si no, la clase de EF de ahora; si no, cualquiera de las elegidas que tenga EF hoy (23/10/2026: antes se escondía) */
  function hoyEF(x){ return J.tiempoClase(x).estado!=='sinclase'; }
  if(l[0] && hoyEF(l[0])) return l[0];
  if(ahora) return ahora;
  for(var i=0;i<l.length;i++) if(hoyEF(l[i])) return l[i];
  return l[0] || cs[0] || null;
}
function mmss(s){ s = Math.max(0, Math.floor(s)); return J.util.pad(Math.floor(s/60))+':'+J.util.pad(s%60); }
function hhmm(ms){ var d = new Date(ms); return d.getHours()+':'+J.util.pad(d.getMinutes()); }

var css = document.createElement('style');
css.textContent =
  '.jv-med{position:fixed;z-index:9995;left:66px;bottom:10px;display:flex;align-items:center;gap:6px;padding:5px 6px 5px 12px;border-radius:999px;font:800 15px/1 system-ui,sans-serif;color:#fff;background:#1c4d31;border:2px solid #6fd39a;box-shadow:0 4px 14px rgba(0,0,0,.45)}'+
  '.jv-med.n1{background:#7a5a0c;border-color:#f0c64a}.jv-med.n2{background:#7a3410;border-color:#ff8a4c}.jv-med.n3{background:#7a2030;border-color:#ff6b7a;animation:jvMedL 1s ease-in-out infinite}'+
  '@keyframes jvMedL{50%{transform:scale(1.05)}}'+
  '.jv-med a{color:inherit;text-decoration:none;display:flex;align-items:center;gap:6px;font-variant-numeric:tabular-nums}'+
  '.jv-med a small{font-weight:600;opacity:.85;font-size:12px}'+
  '.jv-med button{font:800 14px system-ui,sans-serif;border:none;border-radius:999px;padding:7px 11px;cursor:pointer;background:rgba(255,255,255,.18);color:#fff}'+
  '.jv-med button{background:#fff;color:#1c4d31}.jv-med button[hidden]{display:none}.jv-med.fijo{animation:none}'+
  '.jv-med[hidden]{display:none}'+
  '@media print{.jv-med{display:none!important}}';
document.head.appendChild(css);
var el = document.createElement('div'); el.className = 'jv-med'; el.hidden = true; el.setAttribute('role', 'group'); el.setAttribute('aria-label', 'Tiempo perdido');
el.innerHTML = '<a href="#" title="Abrir el medidor en grande"><span>⏳</span><b></b><small></small></a><button type="button" title="Ya estamos abajo, en la pista">✅ ¡Bajamos!</button>';
var g = null, nivelVisto = {};
function pintar(){
  var cx = contexto();
  if(!cx){ el.hidden = true; return; }
  g = grupoActual(cx); if(!g){ el.hidden = true; return; }
  var t = J.tiempoClase(g);

  var n = t.estado==='corre' ? (t.fraccion>=.75 ? 2 : t.fraccion>=.5 ? 1 : 0) : t.estado==='teoria' ? 3 : 0;
  el.hidden = false;
  el.className = 'jv-med'+(t.estado==='corre' && n ? ' n'+n : t.estado==='teoria' ? ' n3 fijo' : '');
  var b = el.querySelector('b'), sm = el.querySelector('small'), bt = el.querySelector('button');
  if(t.estado==='sinclase'){ b.textContent = 'Tiempo para bajar'; sm.textContent = 'hoy no hay EF con '+g; }
  else if(t.estado==='antes'){ b.textContent = g+' · empieza a las '+hhmm(t.inicio); sm.textContent = t.limite+' min para bajar'; }
  else if(t.estado==='corre'){ b.textContent = g+' · '+mmss(t.quedan); sm.textContent = 'para bajar'; }
  else if(t.estado==='bajada'){ b.textContent = g+' · bajó a las '+hhmm(t.bajada); sm.textContent = '✅ a tiempo'; }
  else { b.textContent = g+' · 📚 hoy teoría'; sm.textContent = 'no se bajó a tiempo'; }
  bt.hidden = t.estado!=='corre';
  el.querySelector('a').href = base+'ef/tiempo.html?grupo='+encodeURIComponent(g).replace('%C2%BA', 'o');
  /* avisos al cruzar la mitad, tres cuartos y el límite (solo los que se ven pasar en esta página) */
  var k = g+'|'+t.fecha, nv = t.estado==='teoria' ? 3 : n;
  if(nivelVisto[k]==null || (t.estado!=='corre' && t.estado!=='teoria')) nivelVisto[k] = nv;
  else if(nv>nivelVisto[k]){ nivelVisto[k] = nv; try{ if(window.JAVI_EFECTOS) JAVI_EFECTOS.tocar(nv>=3 ? 'triste' : 'gong'); }catch(err){} }
}
el.querySelector('button').addEventListener('click', function(){
  if(!g) return;
  J.bajamos(g); try{ localStorage.setItem('tiempo-grupo', g); if(window.JAVI_EFECTOS) JAVI_EFECTOS.tocar('fanfarria'); }catch(err){}
  pintar();
});

function montar(){ document.body.appendChild(el); pintar(); setInterval(pintar, 1000); window.addEventListener('hashchange', pintar); }
J.listo(function(){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', montar); else montar(); });
window.JAVI_MEDIDOR = { pintar:pintar };
})();
