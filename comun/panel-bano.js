/* Javificación · 🚦 PANTALLA DIVIDIDA CON EL BAÑO (pedido por Javi, 26/10/2026)
   Botón «🚦» en todas las páginas: abre a la derecha el farol del baño (bano/?solo&panel) y la página
   (una ficha, un juego, la sesión…) se queda a la izquierda. Si se cambia de página, sigue abierto
   (localStorage «javi-panel-bano»). Lo cargan comun/javi.js y sda/comun/barra.js (las fichas).
   No sale en el propio baño, ni con ?solo / ?alumno (tablets), ni al imprimir. */
(function(){
'use strict';
if(window.JAVI_PANEL_BANO || window.self!==window.top || /[?&](solo|alumno)\b/.test(location.search) || /\/bano\//.test(location.pathname)) return;
var yo = document.currentScript && document.currentScript.src || '';
var BASE = yo.replace(/comun\/panel-bano\.js.*$/, '');
if(!BASE) return;
var K = 'javi-panel-bano', KA = 'javi-panel-bano-ancho';
function leer(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
function guardar(k, v){ try{ if(v==null) localStorage.removeItem(k); else localStorage.setItem(k, v); }catch(e){} }
var ANCHOS = [340, 420, 520], ancho = +leer(KA) || 420;

var css = document.createElement('style');
css.textContent =
  'html.jv-dividida body{margin-right:var(--jv-panel)!important}'+
  'html.jv-dividida .jv-pill{right:calc(var(--jv-panel) + 10px)!important}'+
  '.jv-pb-boton{position:fixed;z-index:9995;left:10px;bottom:66px;width:48px;height:48px;border-radius:50%;border:2px solid #c9a34a;background:#1f1830;color:#fff;font-size:22px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.45)}'+
  'html.jv-dividida .jv-pb-boton{background:radial-gradient(circle at 35% 30%,#3fbf63,#1c4d31)}'+
  '.jv-pb{position:fixed;z-index:9994;top:0;right:0;bottom:0;width:var(--jv-panel);display:flex;flex-direction:column;background:#0e1a1d;border-left:3px solid #c9a34a;box-shadow:-8px 0 24px rgba(0,0,0,.45)}'+
  '.jv-pb[hidden]{display:none}'+
  '.jv-pb .bar{display:flex;align-items:center;gap:6px;padding:6px 8px;background:#1f1830;color:#f6e3a1;font:800 15px system-ui,sans-serif}'+
  '.jv-pb .bar span{flex:1}'+
  '.jv-pb .bar button{font:700 13px system-ui,sans-serif;border:1px solid #6b5a8a;border-radius:8px;background:rgba(255,255,255,.08);color:#f6e3a1;padding:5px 9px;cursor:pointer}'+
  '.jv-pb iframe{flex:1;width:100%;border:0;background:#0e1a1d}'+
  '@media (max-width:700px){ html.jv-dividida body{margin-right:0!important} .jv-pb{width:100%} }'+
  '@media print{ .jv-pb,.jv-pb-boton{display:none!important} html.jv-dividida body{margin-right:0!important} }';
document.head.appendChild(css);

var boton = document.createElement('button');
boton.type = 'button'; boton.className = 'jv-pb-boton'; boton.textContent = '🚦';
var panel = document.createElement('div'); panel.className = 'jv-pb'; panel.hidden = true;
panel.innerHTML = '<div class="bar"><span>🚦 Baño · 4ºA</span><button type="button" data-a="ancho" title="Cambiar el ancho">⇔</button><button type="button" data-a="abrir" title="Abrir el baño en grande">⛶</button><button type="button" data-a="cerrar" title="Cerrar el baño">✕</button></div>';
var marco = null;

function pintar(){
  var on = leer(K)==='1';
  document.documentElement.style.setProperty('--jv-panel', ancho+'px');
  document.documentElement.classList.toggle('jv-dividida', on);
  panel.hidden = !on;
  boton.title = on ? 'Cerrar el baño' : 'Pantalla dividida con el baño';
  boton.setAttribute('aria-label', boton.title); boton.setAttribute('aria-pressed', String(on));
  if(on && !marco){ marco = document.createElement('iframe'); marco.title = 'El farol del baño'; marco.src = BASE+'bano/?solo&panel'; panel.appendChild(marco); }
}
boton.addEventListener('click', function(){ guardar(K, leer(K)==='1' ? null : '1'); pintar(); });
panel.addEventListener('click', function(e){
  var b = e.target.closest('[data-a]'); if(!b) return;
  if(b.dataset.a==='cerrar'){ guardar(K, null); pintar(); }
  if(b.dataset.a==='ancho'){ ancho = ANCHOS[(ANCHOS.indexOf(ancho) + 1) % ANCHOS.length] || 420; guardar(KA, String(ancho)); pintar(); }
  if(b.dataset.a==='abrir') location.href = BASE+'bano/';
});
/* si se abre o se cierra en otra pestaña */
window.addEventListener('storage', function(e){ if(e.key===K) pintar(); });
function montar(){ document.body.appendChild(boton); document.body.appendChild(panel); pintar(); }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', montar); else montar();
window.JAVI_PANEL_BANO = { pintar:pintar };
})();
