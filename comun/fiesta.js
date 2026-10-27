/* Javificación · 🎃 DÍAS DE FIESTA (pedido por Javi, 27/10/2026: Halloween se celebra en el cole el viernes 30/10/2026)
   Solo esos días toda la web se decora: colores, telarañas en las esquinas, calabazas y fantasmas flotando
   por los bordes y murciélagos que cruzan de vez en cuando. No tapa nada (pointer-events:none) y no sale al imprimir.
   Para verlo antes: ?fiesta=halloween · para quitarlo ese día: ?sinfiesta. Lo carga comun/javi.js. */
(function(){
'use strict';
if(window.JAVI_FIESTA) return;
var FIESTAS = { '2026-10-30':'halloween' };   /* fecha (año-mes-día) → fiesta */
var d = new Date(), hoy = d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);
var q = location.search.match(/[?&]fiesta=([a-z]+)/);
if(/[?&]sinfiesta/.test(location.search)) return;
var fiesta = q ? q[1] : FIESTAS[hoy];
if(fiesta!=='halloween') return;
var tablet = /[?&](solo|alumno)\b/.test(location.search);   /* en las tablets y marcos, solo los colores */

var css = document.createElement('style');
css.textContent =
  /* colores (las páginas con comun/javi.css) */
  'html.fiesta-halloween{--acento:#ff8a1f;--acento-2:#ffb85c;--acento-tinta:#1d0b00;--titulo-color:#ff9a2e;--titulo-sombra:0 2px 16px rgba(255,122,26,.6);--panel-borde:#7a3fa0;--brillo:rgba(255,122,26,.45)}'+
  'html.fiesta-halloween body::before{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(ellipse at 50% 115%,rgba(255,110,0,.35),transparent 55%),radial-gradient(ellipse at 50% -15%,rgba(120,40,170,.45),transparent 60%)}'+
  /* telarañas y bichos */
  '.jv-hw{position:fixed;inset:0;z-index:9990;pointer-events:none;overflow:hidden}'+
  '.jv-hw .cartel{z-index:2}'+
  '.jv-hw .tela{position:absolute;top:0;width:clamp(90px,12vw,170px);height:clamp(90px,12vw,170px);opacity:.55}'+
  '.jv-hw .tela.i{left:0}.jv-hw .tela.d{right:0;transform:scaleX(-1)}'+
  '.jv-hw .flota{position:absolute;font-size:var(--t,34px);opacity:.55;filter:drop-shadow(0 4px 8px rgba(0,0,0,.5));animation:jvHwFlota var(--d,9s) ease-in-out infinite alternate;animation-delay:var(--r,0s)}'+
  '@keyframes jvHwFlota{0%{transform:translateY(0) rotate(-6deg)}100%{transform:translateY(-38px) rotate(6deg)}}'+
  '.jv-hw .arana{position:absolute;top:0;font-size:26px;animation:jvHwArana 7s ease-in-out infinite alternate}'+
  '.jv-hw .arana::before{content:"";position:absolute;left:50%;bottom:100%;width:1px;height:400px;background:rgba(220,220,220,.5)}'+
  '@keyframes jvHwArana{0%{transform:translateY(-10px)}100%{transform:translateY(90px)}}'+
  '.jv-hw .murci{position:absolute;font-size:30px;left:-60px;animation:jvHwVuela 7s linear forwards}'+
  '@keyframes jvHwVuela{0%{transform:translate(0,0) scaleX(-1)}25%{transform:translate(28vw,-40px) scaleX(-1)}50%{transform:translate(56vw,20px) scaleX(-1)}75%{transform:translate(84vw,-30px) scaleX(-1)}100%{transform:translate(110vw,0) scaleX(-1)}}'+
  '.jv-hw .cartel{position:absolute;top:64px;left:50%;transform:translateX(-50%);font:900 15px/1 system-ui,sans-serif;color:#1d0b00;background:linear-gradient(180deg,#ffb85c,#ff7a1a);border:2px solid #fff0d6;border-radius:999px;padding:6px 14px;box-shadow:0 4px 14px rgba(0,0,0,.45);animation:jvHwCartel 8s ease forwards}'+
  '@keyframes jvHwCartel{0%{transform:translate(-50%,-30px)}8%{transform:translate(-50%,0)}85%{opacity:1}100%{opacity:0;visibility:hidden}}'+
  '@media (prefers-reduced-motion:reduce){.jv-hw .flota,.jv-hw .arana{animation:none}.jv-hw .murci{display:none}}'+
  '@media print{.jv-hw{display:none!important} html.fiesta-halloween body::before{display:none}}';
document.head.appendChild(css);
document.documentElement.classList.add('fiesta-halloween');
if(tablet) return;

var TELA = '<svg viewBox="0 0 100 100" fill="none" stroke="#e8e0f0" stroke-width="1.1"><path d="M0 0 L100 100 M0 0 L100 45 M0 0 L45 100 M0 0 L100 12 M0 0 L12 100"/>'+
  '<path d="M18 0 Q14 9 0 14 M36 0 Q30 22 0 30 M56 0 Q48 34 0 50 M78 0 Q68 50 0 72 M100 0 Q88 70 0 100"/></svg>';
function montar(){
  var c = document.createElement('div'); c.className = 'jv-hw'; c.setAttribute('aria-hidden', 'true');
  var h = '<div class="tela i">'+TELA+'</div><div class="tela d">'+TELA+'</div><span class="arana" style="left:14%">🕷️</span>';
  /* calabazas, fantasmas y caramelos por los bordes (no en el centro, para no tapar) */
  var BICHOS = ['🎃','👻','🍬','🎃','👻','🦇','🍭','🎃'];
  BICHOS.forEach(function(b, i){
    var izq = i % 2===0, x = izq ? 1 + Math.random()*5 : 92 + Math.random()*5, y = 12 + (i/BICHOS.length)*76 + Math.random()*6;
    h += '<span class="flota" style="left:'+x.toFixed(1)+'%;top:'+y.toFixed(1)+'%;--t:'+(28 + Math.round(Math.random()*16))+'px;--d:'+(7 + Math.round(Math.random()*5))+'s;--r:-'+(Math.random()*6).toFixed(1)+'s">'+b+'</span>';
  });
  try{ if(!sessionStorage.getItem('jv-hw-cartel')){ h += '<span class="cartel">🎃 ¡Feliz Halloween! 👻</span>'; sessionStorage.setItem('jv-hw-cartel', '1'); } }catch(e){}
  c.innerHTML = h;
  document.body.appendChild(c);
  /* un murciélago cruza la pantalla de vez en cuando */
  function murcielago(){
    var m = document.createElement('span'); m.className = 'murci'; m.textContent = '🦇'; m.style.top = (8 + Math.random()*55)+'%';
    c.appendChild(m); setTimeout(function(){ m.remove(); }, 7500);
    setTimeout(murcielago, 18000 + Math.random()*22000);
  }
  setTimeout(murcielago, 4000);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', montar); else montar();
window.JAVI_FIESTA = { fiesta:fiesta };
})();
