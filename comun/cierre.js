/* Javificación · 🔒 CIERRE FUERA DEL HORARIO DE CLASE (pedido por Javi, 30/10/2026: «desactivar la página a partir de las 14:00
   y que solo con una contraseña se pueda acceder; luego, los códigos de siempre»).
   Abierta de lunes a viernes de 8:00 a 14:00 (hora del aparato). Fuera de ese horario tapa toda la página hasta escribir
   la contraseña de cierre (se guarda solo su huella SHA-256 de 'javificacion-cierre:'+contraseña). Con la contraseña,
   ese aparato queda abierto hasta las 8:00 del día siguiente (localStorage javi-cierre-hasta). Después siguen pidiéndose
   el código para guardar y los códigos de clase como siempre. Es un freno, no seguridad real (la web es pública).
   Lo cargan comun/javi.js y sda/comun/barra.js. Probar en local: ?hora=15 (solo en localhost). */
(function(){
'use strict';
if(window.JAVI_CIERRE) return; window.JAVI_CIERRE = true;
var HUELLA = 'b6d20828f53b620957a828a2f87a6565def24bebaef3edb397c8864394b6b6db';
var ABRE = 8, CIERRA = 14;   /* horas */
var K = 'javi-cierre-hasta';
var local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);

function ahora(){
  var d = new Date(), m = local && location.search.match(/[?&]hora=(\d{1,2})/);
  if(m){ d.setHours(+m[1], 0, 0, 0); }
  return d;
}
function enHorario(){ var d = ahora(), dia = d.getDay(), h = d.getHours(); return dia>=1 && dia<=5 && h>=ABRE && h<CIERRA; }
function abiertoConClave(){ try{ return Date.now() < (+localStorage.getItem(K) || 0); }catch(e){ return false; } }
function proximaApertura(){ var d = new Date(); if(d.getHours() >= ABRE) d.setDate(d.getDate()+1); d.setHours(ABRE, 0, 0, 0); return d.getTime(); }
function hace(){ return !enHorario() && !abiertoConClave(); }

var capa = null;
function tapar(){
  if(capa) return;
  var css = document.createElement('style');
  css.textContent = '.jv-cierre{visibility:visible;position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:16px;background:radial-gradient(ellipse at 50% 30%,#1d2348,#07091a 70%);color:#f3e6c4;font:16px/1.4 system-ui,sans-serif}'+
    '.jv-cierre .caja{max-width:420px;width:100%;text-align:center;background:rgba(20,16,30,.85);border:2px solid #c9a34a;border-radius:18px;padding:26px 22px;box-shadow:0 20px 60px rgba(0,0,0,.6)}'+
    '.jv-cierre .ic{font-size:54px;line-height:1}'+
    '.jv-cierre h2{font:800 22px/1.2 Cinzel,Georgia,serif;color:#f3d27a;margin:10px 0 6px}'+
    '.jv-cierre p{margin:6px 0 14px;color:#d9ccaa}'+
    '.jv-cierre input{width:100%;box-sizing:border-box;font-size:20px;text-align:center;padding:10px;border-radius:12px;border:2px solid #c9a34a;background:#fffaf0;color:#2b2116}'+
    '.jv-cierre button{margin-top:12px;font:800 17px Cinzel,Georgia,serif;padding:10px 22px;border-radius:999px;border:0;background:linear-gradient(180deg,#f3d27a,#c9972e);color:#2b1c05;cursor:pointer}'+
    '.jv-cierre .err{min-height:1.3em;color:#ff8a8a;font-weight:700;margin-top:8px}'+
    'html.jv-cerrada,html.jv-cerrada body{overflow:hidden!important}'+
    '@media print{html.jv-cerrada body>*{display:none!important}}';
  document.head.appendChild(css);
  capa = document.createElement('div'); capa.className = 'jv-cierre'; capa.setAttribute('role', 'dialog'); capa.setAttribute('aria-modal', 'true');
  capa.innerHTML = '<form class="caja"><div class="ic">🔒</div><h2>Javificación está cerrada</h2>'+
    '<p>Solo se puede usar de lunes a viernes de '+ABRE+':00 a '+CIERRA+':00. Fuera de ese horario hace falta la contraseña.</p>'+
    '<input type="password" autocomplete="off" placeholder="Contraseña" aria-label="Contraseña">'+
    '<div class="err" aria-live="polite"></div><button type="submit">Entrar</button></form>';
  document.documentElement.classList.add('jv-cerrada');
  (document.body || document.documentElement).appendChild(capa);
  var inp = capa.querySelector('input'), err = capa.querySelector('.err');
  setTimeout(function(){ try{ inp.focus(); }catch(e){} }, 50);
  capa.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault();
    huella('javificacion-cierre:'+inp.value).then(function(h){
      if(h!==HUELLA){ err.textContent = 'Contraseña incorrecta'; inp.select(); return; }
      try{ localStorage.setItem(K, String(proximaApertura())); }catch(e2){}
      destapar();
    }).catch(function(){ err.textContent = 'Este navegador no puede comprobar la contraseña'; });
  });
}
function destapar(){ if(!capa) return; capa.remove(); capa = null; document.documentElement.classList.remove('jv-cerrada'); }
function huella(t){
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)).then(function(b){
    return Array.prototype.map.call(new Uint8Array(b), function(x){ return ('0'+x.toString(16)).slice(-2); }).join('');
  });
}
/* también si la página se queda abierta y dan las 14:00 */
function revisar(){ if(hace()) tapar(); else destapar(); }
if(hace()){ if(document.body) tapar(); else document.addEventListener('DOMContentLoaded', tapar); }
setInterval(revisar, 60000);
window.addEventListener('storage', function(e){ if(e.key===K) revisar(); });
})();
