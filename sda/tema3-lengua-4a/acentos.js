/* Tema 3 · base común de las actividades de acentuación (window.AC).
   Las palabras vienen de palabras.js (generado y comprobado con herramientas/banco-tema3): sílabas, tónica, tipo y tilde. */
(function(){
'use strict';
var TODAS = window.PALABRAS3 || [], P = TODAS.filter(function(x){ return x.g !== 'texto'; });
var TIPOS = ['aguda', 'llana', 'esdrújula'];
var POS = { aguda:'la última', llana:'la penúltima', 'esdrújula':'la antepenúltima' };
var CUENTA = ['última', 'penúltima', 'antepenúltima'];
function esc(t){ var d = document.createElement('div'); d.textContent = t == null ? '' : t; return d.innerHTML; }
function sinT(w){ return String(w).normalize('NFD').replace(/[̀́]/g, '').normalize('NFC'); }
function finTxt(x){ return x.fin === 'vocal' ? 'en vocal' : x.fin === 'otra' ? 'en -' + sinT(x.w).slice(-1) : 'en -' + x.fin; }
function razon(x){
  if(x.tipo === 'esdrújula') return 'Es esdrújula: las esdrújulas llevan tilde siempre';
  if(x.tipo === 'aguda') return x.tilde ? 'Es aguda y acaba ' + finTxt(x) : 'Es aguda, pero no acaba en vocal, -n ni -s';
  return x.tilde ? 'Es llana y no acaba en vocal, -n ni -s' : 'Es llana y acaba ' + finTxt(x);
}
/* generador con semilla (mismas palabras para el mismo día) */
function semilla(t){ var h = 2166136261; for(var i = 0; i < t.length; i++) h = Math.imul(h ^ t.charCodeAt(i), 16777619);
  return function(){ h |= 0; h = h + 0x6D2B79F5 | 0; var r = Math.imul(h ^ h >>> 15, 1 | h); r = r + Math.imul(r ^ r >>> 7, 61 | r) ^ r; return ((r ^ r >>> 14) >>> 0) / 4294967296; }; }
function mezclar(a, rnd){ rnd = rnd || Math.random; a = a.slice(); for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
function de(tipo, filtro){ return P.filter(function(x){ return x.tipo === tipo && (!filtro || filtro(x)); }); }
/* ronda equilibrada: n palabras con los tres tipos */
function ronda(n, filtro, rnd){ var l = []; for(var i = 0; i < n; i++) l.push(TIPOS[i % 3]);
  var usadas = {}; return mezclar(l, rnd).map(function(t){ var c = mezclar(de(t, function(x){ return !usadas[x.w] && (!filtro || filtro(x)); }), rnd)[0]; if(c) usadas[c.w] = 1; return c; }).filter(Boolean); }
/* sílabas: o.sinTilde = enseñar sin tildes; o.mayus = la tónica en mayúsculas */
function silHTML(x, o){ o = o || {};
  return '<div class="ac-sils ' + (o.clase || '') + '">' + x.s.map(function(s, j){ var t = o.sinTilde ? sinT(s) : s; if(o.mayus && j === x.t) t = t.toUpperCase();
    return '<span class="ac-sil" data-j="' + j + '">' + esc(t) + '<small class="ac-et"></small></span>'; }).join('') + '</div>'; }
function tono(f, d, v){ if(window.ACT && ACT.SON) ACT.SON.tono(f, 0, d, 'triangle', v); }
/* animación: Lumos en la tónica y contar desde el final hasta llegar a ella */
function animarTipo(caja, x, fin){
  if(!caja) return; var sils = caja.querySelectorAll('.ac-sil'), n = sils.length, k = 0;
  Array.prototype.forEach.call(sils, function(s){ s.classList.remove('luz'); s.querySelector('.ac-et').className = 'ac-et'; });
  (function paso(){
    if(!caja.isConnected) return;   /* ya se ha pasado a otra palabra */
    var j = n - 1 - k; if(j < x.t || k > 2) { if(fin) fin(); return; }
    var et = sils[j].querySelector('.ac-et'); et.textContent = CUENTA[k]; et.classList.add('ve');
    if(j === x.t){ sils[j].classList.add('luz'); tono(880, 0.5, 0.15); setTimeout(function(){ if(fin && caja.isConnected) fin(); }, 700); return; }
    tono(520, 0.15, 0.06); k++; setTimeout(paso, 650);
  })();
}
/* la tilde «cae» en su sílaba (cuando la palabra se enseñaba sin tilde) */
function ponerTilde(caja, x){ if(!caja) return; var s = caja.querySelectorAll('.ac-sil')[x.t]; if(!s || !x.tilde) return;
  if(s.firstChild.nodeType === 3) s.firstChild.nodeValue = s.firstChild.nodeValue.toUpperCase() === s.firstChild.nodeValue ? x.s[x.t].toUpperCase() : x.s[x.t];   /* en I-4 (letras sueltas) la letra ya la pone la página */
  s.classList.remove('cae'); void s.offsetWidth; s.classList.add('cae'); if(window.ACT) ACT.SON.magia(); }
function tipoHTML(x){ return '<span class="ac-tipo ' + x.tipo + '">' + x.tipo.toUpperCase() + '</span>'; }
function tresCasas(on){ return '<div class="ac-tres">' + [['aguda', 'la última', 'ca-mión, na-riz'], ['llana', 'la penúltima', 'ár-bol, bo-ca'], ['esdrújula', 'la antepenúltima', 'mú-si-ca']]
  .map(function(c){ return '<div class="ac-casa ' + c[0] + (on === c[0] ? ' on' : '') + '"><b>' + c[0].toUpperCase() + '</b>tónica: ' + c[1] + '<br><small>' + c[2] + '</small></div>'; }).join('') + '</div>'; }
function voz(x){ if(window.ACT) ACT.voz(x.w); }
window.AC = { P:P, TODAS:TODAS, TIPOS:TIPOS, POS:POS, esc:esc, sinT:sinT, finTxt:finTxt, razon:razon, semilla:semilla, mezclar:mezclar, de:de, ronda:ronda,
  silHTML:silHTML, animarTipo:animarTipo, ponerTilde:ponerTilde, tipoHTML:tipoHTML, tresCasas:tresCasas, voz:voz };
})();
