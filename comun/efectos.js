/* Javificación · 🥁 EFECTOS DE SONIDO para los momentos de emoción (pedido por Javi, 22/10/2026)
   Todo generado en el navegador con Web Audio (sin archivos ni derechos): redoble de tambor, tambores épicos,
   fanfarria, suspense, aplausos, cuenta atrás, magia, gong y «ooooh» triste.
   Uso: JAVI_EFECTOS.tocar('redoble') · JAVI_EFECTOS.parar() · JAVI_EFECTOS.LISTA (para pintar botones).
   Lo carga comun/musica.js (sección «🥁 Efectos» del botón 🎵); cualquier página puede llamarlo. */
(function(){
'use strict';
if(window.JAVI_EFECTOS) return;
var c = null, sal = null, vol = 0.8;
function ctx(){
  if(!c){ c = new (window.AudioContext||window.webkitAudioContext)(); }
  if(c.state==='suspended') c.resume();
  if(!sal){ sal = c.createGain(); sal.gain.value = vol; var comp = c.createDynamicsCompressor(); sal.connect(comp); comp.connect(c.destination); }
  return c;
}
var ruidoBuf = null;
function ruido(){
  if(ruidoBuf) return ruidoBuf;
  var n = c.sampleRate*2; ruidoBuf = c.createBuffer(1, n, c.sampleRate);
  var d = ruidoBuf.getChannelData(0); for(var i=0;i<n;i++) d[i] = Math.random()*2-1;
  return ruidoBuf;
}
/* piezas sueltas */
function env(g, t, a, v, dur){ g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t+a); g.gain.exponentialRampToValueAtTime(0.0001, t+dur); }
function nota(f, t, dur, tipo, v, fFin, filtro){
  var o = c.createOscillator(), g = c.createGain(), dest = g;
  o.type = tipo||'sine'; o.frequency.setValueAtTime(f, t); if(fFin) o.frequency.exponentialRampToValueAtTime(fFin, t+dur);
  if(filtro){ var lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = filtro; o.connect(lp); lp.connect(g); } else o.connect(g);
  env(dest, t, 0.015, v, dur); g.connect(sal); o.start(t); o.stop(t+dur+0.05);
}
function golpeRuido(t, dur, v, tipo, f, q){
  var s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
  s.buffer = ruido(); fl.type = tipo||'bandpass'; fl.frequency.value = f||2000; fl.Q.value = q||0.8;
  s.connect(fl); fl.connect(g); g.connect(sal); env(g, t, 0.003, v, dur);
  s.start(t, Math.random()); s.stop(t+dur+0.05);
}
function caja_(t, v){ golpeRuido(t, 0.12, v, 'bandpass', 1800, 0.7); nota(190, t, 0.08, 'triangle', v*0.5); }
function bombo(t, v){ nota(150, t, 0.45, 'sine', v, 42); }
function tom(t, f, v){ nota(f, t, 0.5, 'sine', v, f*0.55); golpeRuido(t, 0.06, v*0.3, 'lowpass', 900); }
function platillo(t, v, dur){ golpeRuido(t, dur||2.2, v, 'highpass', 5500, 0.5); golpeRuido(t, (dur||2.2)*0.7, v*0.6, 'bandpass', 9000, 1); }
function trompeta(f, t, dur, v){ nota(f, t, dur, 'sawtooth', v, null, 2400); nota(f*1.003, t, dur, 'square', v*0.25, null, 1600); }

var EF = {
  redoble: { ic:'🥁', n:'Redoble', d:'Redoble de tambor y ¡plas!, para anunciar algo', f:function(t){
    var dur = 3.2, k = 0;
    for(var x=0; x<dur; x+=0.045){ caja_(t+x, 0.05+0.4*Math.pow(x/dur, 1.6)); k++; }
    bombo(t+dur+0.05, 0.9); platillo(t+dur+0.05, 0.45, 2.5); caja_(t+dur+0.05, 0.6);
    return dur+2.6;
  }},
  tambores: { ic:'⚔️', n:'Tambores', d:'Ritmo de tambores épico, para que entren en tensión', f:function(t){
    var pat = [[0,90,.8],[.3,90,.5],[.45,120,.6],[.6,90,.8],[.9,140,.6],[1.05,120,.5],[1.2,90,.9]], len = 1.6;
    for(var r=0; r<4; r++) pat.forEach(function(p){ tom(t+r*len+p[0], p[1], p[2]*(0.6+r*0.13)); if(r===3 && p[0]>=1.2){ bombo(t+r*len+p[0], 1); platillo(t+r*len+p[0], 0.35, 1.8); } });
    return 4*len+1.8;
  }},
  fanfarria: { ic:'🎺', n:'Fanfarria', d:'Para el ganador o la ganadora', f:function(t){
    var s = [[392,0,.14],[392,.16,.14],[392,.32,.14],[523,.48,.5],[392,1.0,.14],[523,1.16,.14],[659,1.32,.9]];
    s.forEach(function(x){ trompeta(x[0], t+x[1], x[2], 0.12); trompeta(x[0]*0.75, t+x[1], x[2], 0.06); });
    bombo(t+0.48, 0.6); bombo(t+1.32, 0.8); platillo(t+1.32, 0.3, 2);
    return 3.2;
  }},
  suspense: { ic:'😱', n:'Suspense', d:'Cuerdas que suben… ¿quién será?', f:function(t){
    var dur = 5;
    [55, 58.27, 82.4, 110].forEach(function(f, i){
      var o = c.createOscillator(), g = c.createGain(), lp = c.createBiquadFilter(), lfo = c.createOscillator(), lg = c.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(f*2, t); o.frequency.exponentialRampToValueAtTime(f*2*1.5, t+dur);
      lp.type = 'lowpass'; lp.frequency.setValueAtTime(500, t); lp.frequency.linearRampToValueAtTime(2200, t+dur);
      lfo.frequency.value = 7+i; lg.gain.value = 0.03; lfo.connect(lg); lg.connect(g.gain);
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.06, t+dur*0.9); g.gain.linearRampToValueAtTime(0.0001, t+dur);
      o.connect(lp); lp.connect(g); g.connect(sal); o.start(t); lfo.start(t); o.stop(t+dur+0.1); lfo.stop(t+dur+0.1);
    });
    for(var x=0; x<dur; x+=0.6) nota(70, t+x, 0.3, 'sine', 0.25+0.4*x/dur, 45);   /* latido */
    return dur+0.2;
  }},
  aplausos: { ic:'👏', n:'Aplausos', d:'Un buen aplauso para la clase', f:function(t){
    var dur = 3.5;
    for(var i=0; i<420; i++){ var x = Math.random()*dur, fuerza = x<0.4 ? x/0.4 : x>dur-0.8 ? (dur-x)/0.8 : 1; golpeRuido(t+x, 0.03+Math.random()*0.03, 0.08+0.18*fuerza*Math.random(), 'bandpass', 1200+Math.random()*2200, 1.2); }
    return dur+0.2;
  }},
  cuenta: { ic:'⏱️', n:'3, 2, 1…', d:'Cuenta atrás con pitidos y salida', f:function(t){
    [0,1,2].forEach(function(i){ nota(660, t+i, 0.18, 'square', 0.12); });
    nota(1320, t+3, 0.7, 'square', 0.14); bombo(t+3, 0.7);
    return 3.9;
  }},
  magia: { ic:'✨', n:'Magia', d:'Destellos que suben, para un hechizo', f:function(t){
    for(var i=0; i<16; i++){ var f = 880*Math.pow(2, i/7); nota(f, t+i*0.05, 0.5, 'sine', 0.07); nota(f*2, t+i*0.05+0.02, 0.3, 'triangle', 0.025); }
    nota(1760, t+0.9, 1.4, 'sine', 0.06); nota(2637, t+0.95, 1.2, 'sine', 0.04);
    return 2.4;
  }},
  gong: { ic:'🔔', n:'Gong', d:'Para pedir silencio o empezar', f:function(t){
    [[110,1],[164.8,.6],[220.5,.45],[293,.3],[392,.2],[521,.12]].forEach(function(p){
      var o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(p[0]*1.01, t); o.frequency.exponentialRampToValueAtTime(p[0], t+1);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18*p[1], t+0.02); g.gain.exponentialRampToValueAtTime(0.0001, t+4.5);
      o.connect(g); g.connect(sal); o.start(t); o.stop(t+4.6);
    });
    golpeRuido(t, 0.25, 0.25, 'lowpass', 700);
    return 4.6;
  }},
  triste: { ic:'😢', n:'Ooooh', d:'Trombón triste, cuando casi lo consiguen', f:function(t){
    [[311,0,.45],[294,.5,.45],[277,1,.45],[262,1.5,1.3]].forEach(function(x, i){
      var o = c.createOscillator(), g = c.createGain(), lp = c.createBiquadFilter(), lfo = c.createOscillator(), lg = c.createGain();
      o.type = 'sawtooth'; o.frequency.value = x[0]; lp.type = 'lowpass'; lp.frequency.value = 900;
      if(i===3){ lfo.frequency.value = 6; lg.gain.value = 6; lfo.connect(lg); lg.connect(o.frequency); lfo.start(t+x[1]); lfo.stop(t+x[1]+x[2]+0.1); }
      o.connect(lp); lp.connect(g); g.connect(sal); env(g, t+x[1], 0.05, 0.13, x[2]); o.start(t+x[1]); o.stop(t+x[1]+x[2]+0.1);
    });
    return 3;
  }}
};
var finT = 0, sonando = null;
function tocar(k){
  var e = EF[k]; if(!e) return 0;
  try{
    ctx(); parar(true);
    var dur = e.f(c.currentTime+0.05);
    sonando = k; clearTimeout(finT); finT = setTimeout(function(){ sonando = null; avisar(); }, dur*1000);
    avisar(); return dur;
  }catch(err){ return 0; }
}
/* cortar lo que esté sonando: se cambia la salida por una nueva */
function parar(silencioso){
  if(!c || !sal) return;
  var viejo = sal; viejo.gain.setTargetAtTime(0.0001, c.currentTime, 0.03); setTimeout(function(){ try{ viejo.disconnect(); }catch(e){} }, 300);
  sal = null; ctx();
  if(!silencioso){ sonando = null; clearTimeout(finT); avisar(); }
}
var oyentes = [];
function avisar(){ oyentes.forEach(function(f){ try{ f(sonando); }catch(e){} }); }
window.JAVI_EFECTOS = {
  tocar:tocar, parar:function(){ parar(false); }, sonando:function(){ return sonando; }, alCambiar:function(f){ oyentes.push(f); },
  volumen:function(v){ vol = v; if(sal) sal.gain.value = v; },
  LISTA: Object.keys(EF).map(function(k){ return { id:k, ic:EF[k].ic, n:EF[k].n, d:EF[k].d }; })
};
})();
