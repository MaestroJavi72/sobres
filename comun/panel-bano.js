/* Javificación · 🚦 PANTALLA DIVIDIDA (pedido por Javi, 26/10/2026)
   Dos botones redondos abajo a la izquierda en todas las páginas: 🚦 abre a la derecha el farol del baño
   (bano/?solo&panel) y 🏰 los puntos de Hogwarts de 4ºA (hogwarts/?solo&panel#hogwarts: grupos y alumnos);
   arriba del panel, pestañas para pasar de uno a otro. La página (una ficha, un juego, la sesión…) se queda
   a la izquierda. Si se cambia de página, sigue abierto (localStorage «javi-panel-bano» = bano | hogwarts).
   Lo cargan comun/javi.js y sda/comun/barra.js (las fichas).
   No sale en el baño ni en Hogwarts, ni con ?solo / ?alumno (tablets), ni dentro de marcos, ni al imprimir. */
(function(){
'use strict';
if(window.JAVI_PANEL_BANO || window.self!==window.top || /[?&](solo|alumno)\b/.test(location.search) || /\/(bano|hogwarts)\//.test(location.pathname)) return;
var yo = document.currentScript && document.currentScript.src || '';
var BASE = yo.replace(/comun\/panel-bano\.js.*$/, '');
if(!BASE) return;
var K = 'javi-panel-bano', KA = 'javi-panel-bano-ancho';
function leer(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
function guardar(k, v){ try{ if(v==null) localStorage.removeItem(k); else localStorage.setItem(k, v); }catch(e){} }
var ANCHOS = [340, 420, 520], ancho = +leer(KA) || 420;
var VISTAS = {
  bano:     { ic:'🚦', t:'Baño', url:'bano/?solo&panel', grande:'bano/' },
  hogwarts: { ic:'🏰', t:'Puntos', url:'hogwarts/?solo&panel#hogwarts', grande:'hogwarts/?profe#hogwarts' }
};
function vista(){ var v = leer(K); if(v==='1') v = 'bano'; return VISTAS[v] ? v : null; }   /* «1» = versión anterior (solo baño) */

var css = document.createElement('style');
css.textContent =
  'html.jv-dividida body{margin-right:var(--jv-panel)!important}'+
  'html.jv-dividida .jv-pill{right:calc(var(--jv-panel) + 10px)!important}'+
  '.jv-pb-boton{position:fixed;z-index:9995;left:10px;width:48px;height:48px;border-radius:50%;border:2px solid #c9a34a;background:#1f1830;color:#fff;font-size:22px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.45)}'+
  '.jv-pb-boton[aria-pressed="true"]{background:radial-gradient(circle at 35% 30%,#3fbf63,#1c4d31)}'+
  '.jv-pb{position:fixed;z-index:9994;top:0;right:0;bottom:0;width:var(--jv-panel);display:flex;flex-direction:column;background:#0e1a1d;border-left:3px solid #c9a34a;box-shadow:-8px 0 24px rgba(0,0,0,.45)}'+
  '.jv-pb[hidden],.jv-pb iframe[hidden]{display:none}'+
  '.jv-pb .bar{display:flex;align-items:center;gap:5px;padding:6px 8px;background:#1f1830;color:#f6e3a1;font:800 14px system-ui,sans-serif}'+
  '.jv-pb .bar .esp{flex:1}'+
  '.jv-pb .bar button{font:700 13px system-ui,sans-serif;border:1px solid #6b5a8a;border-radius:8px;background:rgba(255,255,255,.08);color:#f6e3a1;padding:5px 9px;cursor:pointer}'+
  '.jv-pb .bar button[data-v]{font-size:14px;padding:6px 10px}'+
  '.jv-pb .bar button[data-v][aria-pressed="true"]{background:#c9a34a;color:#2b1c05;border-color:#c9a34a}'+
  '.jv-pb iframe{flex:1;width:100%;border:0;background:#0e1a1d}'+
  '@media (max-width:700px){ html.jv-dividida body{margin-right:0!important} .jv-pb{width:100%} }'+
  '@media print{ .jv-pb,.jv-pb-boton{display:none!important} html.jv-dividida body{margin-right:0!important} }';
document.head.appendChild(css);

/* botones redondos: 🚦 encima del 🎵 y 🏰 encima del 🚦 */
var botones = {};
Object.keys(VISTAS).forEach(function(v, i){
  var b = document.createElement('button'); b.type = 'button'; b.className = 'jv-pb-boton'; b.textContent = VISTAS[v].ic;
  b.style.bottom = (66 + i*56)+'px';
  b.addEventListener('click', function(){ guardar(K, vista()===v ? null : v); pintar(); });
  botones[v] = b;
});
var panel = document.createElement('div'); panel.className = 'jv-pb'; panel.hidden = true;
panel.innerHTML = '<div class="bar">'+Object.keys(VISTAS).map(function(v){ return '<button type="button" data-v="'+v+'">'+VISTAS[v].ic+' '+VISTAS[v].t+'</button>'; }).join('')+
  '<span class="esp"></span><button type="button" data-a="ancho" title="Cambiar el ancho">⇔</button><button type="button" data-a="abrir" title="Abrir en grande">⛶</button><button type="button" data-a="cerrar" title="Cerrar">✕</button></div>';
var marcos = {};

function pintar(){
  var v = vista();
  document.documentElement.style.setProperty('--jv-panel', ancho+'px');
  document.documentElement.classList.toggle('jv-dividida', !!v);
  panel.hidden = !v;
  Object.keys(VISTAS).forEach(function(k){
    var on = v===k, b = botones[k];
    b.setAttribute('aria-pressed', String(on));
    b.title = on ? 'Cerrar' : (k==='bano' ? 'Pantalla dividida con el baño' : 'Pantalla dividida con los puntos de Hogwarts (4ºA)');
    b.setAttribute('aria-label', b.title);
    var t = panel.querySelector('[data-v="'+k+'"]'); t.setAttribute('aria-pressed', String(on));
    if(on && !marcos[k]){ var f = document.createElement('iframe'); f.title = VISTAS[k].t; f.src = BASE+VISTAS[k].url; panel.appendChild(f); marcos[k] = f; }
    if(marcos[k]) marcos[k].hidden = !on;
  });
}
panel.addEventListener('click', function(e){
  var b = e.target.closest('button'); if(!b) return;
  if(b.dataset.v){ guardar(K, b.dataset.v); pintar(); return; }
  if(b.dataset.a==='cerrar'){ guardar(K, null); pintar(); }
  if(b.dataset.a==='ancho'){ ancho = ANCHOS[(ANCHOS.indexOf(ancho) + 1) % ANCHOS.length] || 420; guardar(KA, String(ancho)); pintar(); }
  if(b.dataset.a==='abrir' && vista()) location.href = BASE+VISTAS[vista()].grande;
});
/* si se abre o se cierra en otra pestaña */
window.addEventListener('storage', function(e){ if(e.key===K) pintar(); });
function montar(){ Object.keys(botones).forEach(function(k){ document.body.appendChild(botones[k]); }); document.body.appendChild(panel); pintar(); }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', montar); else montar();
window.JAVI_PANEL_BANO = { pintar:pintar };
})();
