/* ============================================================
   Javificación · utilidades comunes de las actividades interactivas
   Uso: <script src="../../comun/javi.js"></script><script src="../comun/actividad.js"></script>
        ACT.iniciar('tema2-lengua-4a');
   ============================================================ */
(function(){
'use strict';
function $(id){ return document.getElementById(id); }
function esc(t){ var d = document.createElement('div'); d.textContent = t==null ? '' : t; return d.innerHTML; }
function rnd(){ return window.JAVI ? JAVI.util.rnd() : Math.random(); }
function mezclar(a){ a = a.slice(); for(var i=a.length-1;i>0;i--){ var j = Math.floor(rnd()*(i+1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
function azar(a){ return a[Math.floor(rnd()*a.length)]; }
function sinTildes(t){ return String(t).normalize('NFD').replace(/[̀-ͯ]/g,''); }

/* ---------- separador de sílabas del español (probado con más de 80 palabras) ---------- */
function silabas(palabra){
  var w = String(palabra).trim(), lw = w.toLowerCase();
  if(!lw) return [];
  var V = 'aeiouáéíóúü', FUERTE = 'aeoáéíóú';
  var GRUPOS = ['pr','br','tr','dr','cr','gr','fr','pl','bl','cl','gl','fl','kr','kl','tl'];
  var u = [], i = 0;
  while(i < lw.length){
    var dos = lw.substr(i, 2), c = lw[i];
    if(dos==='ch' || dos==='ll' || dos==='rr'){ u.push({ t:'C', s:w.substr(i,2) }); i += 2; continue; }
    if((dos==='qu' || dos==='gu') && 'eiéí'.indexOf(lw[i+2]||'')>=0){ u.push({ t:'C', s:w.substr(i,2) }); i += 2; continue; }
    var esV = V.indexOf(c)>=0;
    if(c==='y'){ var sig = lw[i+1]; esV = !sig || V.indexOf(sig)<0; }
    u.push({ t: esV ? 'V' : 'C', s:w[i], f: FUERTE.indexOf(c)>=0 });
    i++;
  }
  var g = [];
  u.forEach(function(x){
    var ult = g[g.length-1];
    if(x.t==='V' && ult && ult.t==='V'){ var prev = ult.u[ult.u.length-1]; if(prev.f && x.f){ g.push({ t:'V', u:[x] }); return; } ult.u.push(x); return; }
    if(ult && ult.t===x.t && x.t==='C'){ ult.u.push(x); return; }
    g.push({ t:x.t, u:[x] });
  });
  var sil = [], actual = '';
  for(var k=0;k<g.length;k++){
    var gr = g[k], txt = gr.u.map(function(x){ return x.s; }).join('');
    if(gr.t==='V'){ if(actual && k>0 && g[k-1].t==='V'){ sil.push(actual); actual = ''; } actual += txt; continue; }
    if(k===0){ actual = txt; continue; }
    if(k===g.length-1){ actual += txt; continue; }
    var cs = gr.u.map(function(x){ return x.s; }), n = cs.length, corte;
    var par = function(a, b){ return GRUPOS.indexOf((a+b).toLowerCase())>=0; };
    if(n===1) corte = 0; else if(n===2) corte = par(cs[0], cs[1]) ? 0 : 1; else if(n===3) corte = par(cs[1], cs[2]) ? 1 : 2; else corte = 2;
    actual += cs.slice(0, corte).join(''); sil.push(actual); actual = cs.slice(corte).join('');
  }
  if(actual) sil.push(actual);
  return sil;
}
/* sílaba tónica: la que lleva tilde; si no lleva, llana si acaba en vocal, n o s; aguda si no */
function tonica(palabra){
  var s = silabas(palabra), i;
  for(i=0;i<s.length;i++) if(/[áéíóú]/i.test(s[i])) return i;
  if(s.length===1) return 0;
  return /[aeiouns]$/i.test(sinTildes(palabra)) ? s.length-2 : s.length-1;
}
/* plural de un nombre (probado con 57 palabras): +s, +es, z → ces, y se quita la tilde en -ón, -án… */
function plural(p){
  var l = p.toLowerCase();
  if(/z$/.test(l)) return { f:p.slice(0,-1)+'ces', r:'z → c + es' };
  if(/[aeiouáéó]$/.test(l)) return { f:p+'s', r:'+ s' };
  if(/[áéíóú][ns]$/.test(l)) return { f:p.slice(0,-2)+sinTildes(p.slice(-2,-1))+p.slice(-1)+'es', r:'+ es', tilde:true };
  return { f:p+'es', r:'+ es' };
}

/* ---------- sonido (sintetizado, sin archivos) ---------- */
var CLAVE_SONIDO = 'act-sonido', sonido = true, actx = null;
try{ sonido = localStorage.getItem(CLAVE_SONIDO)!=='no'; }catch(e){}
function ctx(){ if(!sonido) return null; try{ if(!actx) actx = new (window.AudioContext||window.webkitAudioContext)(); if(actx.state==='suspended') actx.resume(); }catch(e){ return null; } return actx; }
function tono(f, t0, d, tipo, vol){ var c = ctx(); if(!c) return; var o = c.createOscillator(), g = c.createGain(), t = c.currentTime+(t0||0);
  o.type = tipo||'sine'; o.frequency.value = f; g.gain.setValueAtTime(vol||0.1, t); g.gain.exponentialRampToValueAtTime(0.0001, t+d); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+d+0.02); }
var SON = {
  tic: function(){ tono(880, 0, 0.05, 'triangle', 0.05); },
  acierto: function(){ [784,988,1318].forEach(function(f, i){ tono(f, i*0.08, 0.2, 'triangle', 0.1); }); },
  fallo: function(){ tono(330, 0, 0.2, 'sawtooth', 0.05); tono(262, 0.15, 0.3, 'sawtooth', 0.05); },
  fanfarria: function(){ [523,659,784,1046].forEach(function(f, i){ tono(f, i*0.1, 0.25, 'triangle', 0.1); }); },
  magia: function(){ [1046,1318,1568,2093].forEach(function(f, i){ tono(f, i*0.06, 0.3, 'sine', 0.07); }); },
  engranaje: function(){ for(var i=0;i<6;i++) tono(180+i*30, i*0.05, 0.06, 'square', 0.04); },
  tono: tono
};
function voz(t){ if(!window.speechSynthesis || !sonido) return; speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.lang = 'es-ES'; u.rate = 0.9;
  var v = speechSynthesis.getVoices().filter(function(x){ return /^es(-ES)?/i.test(x.lang); })[0]; if(v) u.voice = v; speechSynthesis.speak(u); }

/* ---------- pantalla final con estrellas ---------- */
function final(caja, o){
  var pct = o.total ? o.puntos/o.total : 0, est = o.estrellas!=null ? o.estrellas : (pct>=0.9 ? 3 : pct>=0.7 ? 2 : pct>=0.5 ? 1 : 0);
  var mens = o.mensajes || ['¡A repasar y a por otra ronda!','¡Bien! Vas entendiéndolo.','¡Muy bien, aprendiz de paleontólogo!','¡Extraordinario hallazgo! Eres un experto.'];
  caja.innerHTML = '<div class="final"><h2>'+(o.titulo||'🏁 ¡Terminado!')+'</h2>'+
    '<div class="estrellas" aria-label="'+est+' estrellas de 3">'+'★★★'.slice(0, est)+'<span style="opacity:.25">'+'★★★'.slice(0, 3-est)+'</span></div>'+
    '<div class="cifra">'+o.puntos+(o.total ? ' / '+o.total : '')+'</div>'+
    (o.detalle ? '<div class="detalle">'+o.detalle+'</div>' : '')+
    '<p class="mensaje bien">'+mens[est]+'</p>'+(o.extra||'')+
    '<div class="botones"><button class="gran" type="button" data-repetir>🔁 '+(o.textoRepetir||'Repetir')+'</button></div></div>';
  caja.querySelector('[data-repetir]').addEventListener('click', o.repetir);
  if(est>=2) SON.fanfarria();
}

/* ---------- arranque común: volver, sonido, pantalla completa, tema ---------- */
function iniciar(idSda){
  var bS = $('bSonido'), bP = $('bPantalla'), v = document.querySelector('.volver');
  function pintar(){ if(bS) bS.textContent = sonido ? '🔊' : '🔇'; }
  if(bS) bS.addEventListener('click', function(){ sonido = !sonido; try{ localStorage.setItem(CLAVE_SONIDO, sonido ? 'si' : 'no'); }catch(e){} if(!sonido && window.speechSynthesis) speechSynthesis.cancel(); pintar(); });
  pintar();
  if(bP && window.JAVI) bP.addEventListener('click', JAVI.pantallaCompleta);
  if(window.JAVI) JAVI.listo(function(){
    document.documentElement.setAttribute('data-tema', 'hp');
    if(v) v.setAttribute('data-volver', '../?id='+idSda+(JAVI.ES_PROFE ? '&profe' : ''));
    JAVI.avisoPrueba();
  });
}

window.ACT = { $:$, esc:esc, rnd:rnd, mezclar:mezclar, azar:azar, sinTildes:sinTildes, silabas:silabas, tonica:tonica, plural:plural,
  SON:SON, voz:voz, final:final, iniciar:iniciar, sonidoActivo:function(){ return sonido; } };
})();
