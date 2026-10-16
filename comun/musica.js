/* Javificación · 🎵 música relajante para cuando la clase trabaja (todas las páginas con comun/javi.js)
   Se genera en el navegador (Web Audio): sin archivos ni canciones con derechos.
   Estilos: Calma (acordes suaves y campanitas), Piano (notas sueltas) y Lluvia (lluvia con un fondo suave),
   y vídeos de YouTube que pega Javi (lista en el aparato; el primero, el de Hogwarts que pidió).
   Se recuerda en el aparato (localStorage «javi-musica»): si estaba sonando, al cambiar de página
   sigue en cuanto se toca la pantalla (el navegador no deja sonar sin un toque). */
(function(){
'use strict';
if(window.JAVI_MUSICA || /[?&](solo|alumno)\b/.test(location.search)) return;   /* en las tablets de los alumnos, no */
var K = 'javi-musica';
function leer(){ try{ return JSON.parse(localStorage.getItem(K)) || {}; }catch(e){ return {}; } }
function guardar(){ try{ localStorage.setItem(K, JSON.stringify({ on:on, estilo:estilo, vol:vol })); }catch(e){} }
var st = leer(), on = !!st.on, estilo = st.estilo || 'calma', vol = st.vol==null ? 0.35 : st.vol;
var ESTILOS = { calma:'🌙 Calma', piano:'🎹 Piano', lluvia:'🌧️ Lluvia' };

/* ---------- motor de sonido ---------- */
var ctx = null, master = null, eco = null, seco = null, lluvia = null, timer = 0, sig = 0, acorde = 0, compas = 0;
var ACORDES = [[48,55,64,71],[45,52,60,67],[41,48,57,64],[43,50,59,62]];   /* Cmaj7 · Am7 · Fmaj7 · G6 (MIDI) */
var PENTA = [60,62,64,67,69,72,74,76,79,81];
function hz(m){ return 440*Math.pow(2, (m-69)/12); }
function crear(){
  ctx = new (window.AudioContext||window.webkitAudioContext)();
  master = ctx.createGain(); master.gain.value = 0;
  var comp = ctx.createDynamicsCompressor(); master.connect(comp); comp.connect(ctx.destination);
  /* reverberación hecha con ruido que se apaga poco a poco */
  var n = ctx.sampleRate*3.5, ir = ctx.createBuffer(2, n, ctx.sampleRate);
  for(var c=0;c<2;c++){ var d = ir.getChannelData(c); for(var i=0;i<n;i++) d[i] = (Math.random()*2-1)*Math.pow(1-i/n, 2.6); }
  eco = ctx.createConvolver(); eco.buffer = ir; var ge = ctx.createGain(); ge.gain.value = 0.55; eco.connect(ge); ge.connect(master);
  seco = ctx.createGain(); seco.gain.value = 0.6; seco.connect(master);
}
function salida(g){ g.connect(seco); g.connect(eco); }
function nota(m, t, dur, tipo, v, ataque){
  var o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
  o.type = tipo || 'sine'; o.frequency.value = hz(m); o2.type = 'sine'; o2.frequency.value = hz(m)*2.001;
  var g2 = ctx.createGain(); g2.gain.value = 0.18; o2.connect(g2); g2.connect(g);
  f.type = 'lowpass'; f.frequency.value = 2200; o.connect(g); g.connect(f); salida(f);
  var a = ataque || 0.015;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t+a); g.gain.exponentialRampToValueAtTime(0.0001, t+dur);
  o.start(t); o2.start(t); o.stop(t+dur+0.1); o2.stop(t+dur+0.1);
}
function pad(ms, t, dur, v){
  ms.forEach(function(m){
    [-4, 4].forEach(function(det){
      var o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
      o.type = 'triangle'; o.frequency.value = hz(m); o.detune.value = det;
      f.type = 'lowpass'; f.frequency.value = 900;
      o.connect(f); f.connect(g); salida(g);
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t+2.5); g.gain.setValueAtTime(v, t+dur-3); g.gain.linearRampToValueAtTime(0.0001, t+dur);
      o.start(t); o.stop(t+dur+0.1);
    });
  });
}
function ruidoLluvia(){
  var n = ctx.sampleRate*4, b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0), ult = 0;
  for(var i=0;i<n;i++){ var w = Math.random()*2-1; ult = (ult + 0.02*w)/1.02; d[i] = ult*3.2 + w*0.08; }   /* ruido marrón + un poco de blanco (gotas) */
  var s = ctx.createBufferSource(); s.buffer = b; s.loop = true;
  var f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1400;
  var g = ctx.createGain(); g.gain.value = 0.0001; s.connect(f); f.connect(g); g.connect(master); s.start();
  g.gain.linearRampToValueAtTime(0.9, ctx.currentTime+3);
  return { s:s, g:g };
}
function programar(){
  var t = ctx.currentTime;
  while(sig < t + 1.2){
    if(estilo==='calma'){
      if(compas % 4 === 0) pad(ACORDES[acorde % 4], sig, 8.5, 0.028);
      if(Math.random() < 0.55) nota(PENTA[Math.floor(Math.random()*PENTA.length)]+12, sig + Math.random()*0.6, 3.5, 'sine', 0.05);
      if(compas % 4 === 3) acorde++;
      compas++; sig += 2;
    } else if(estilo==='piano'){
      var r = Math.random();
      if(r < 0.8) nota(PENTA[Math.floor(Math.random()*7)], sig, 2.6, 'triangle', 0.07);
      if(r < 0.25) nota(PENTA[Math.floor(Math.random()*7)]+(Math.random()<.5 ? 0 : 12), sig+0.02, 2.6, 'triangle', 0.05);
      if(compas % 8 === 0) nota(ACORDES[acorde % 4][0]-12, sig, 6, 'sine', 0.06, 0.3);
      if(compas % 8 === 7) acorde++;
      compas++; sig += 0.9 + Math.random()*0.7;
    } else {
      if(compas % 6 === 0) pad(ACORDES[acorde++ % 4].slice(0,3), sig, 12.5, 0.016);
      compas++; sig += 2;
    }
  }
}
function arrancarGen(){
  if(!ctx) crear();
  if(ctx.state==='suspended') ctx.resume();
  pararGen(true);
  sig = ctx.currentTime + 0.1; compas = 0;
  if(estilo==='lluvia') lluvia = ruidoLluvia();
  programar(); timer = setInterval(programar, 300);
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.setTargetAtTime(vol, ctx.currentTime, 0.8);
}
function pararGen(rapido){
  clearInterval(timer); timer = 0;
  if(!ctx) return;
  if(lluvia){ var l = lluvia; l.g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.3); setTimeout(function(){ try{ l.s.stop(); }catch(e){} }, 1500); lluvia = null; }
  if(!rapido){ master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setTargetAtTime(0, ctx.currentTime, 0.5); }
}

/* ---------- vídeos de YouTube (lista en el aparato: «javi-musica-videos») ----------
   Se ven en un reproductor pequeño junto al botón (YouTube no deja ocultarlo).
   Al cambiar de página sigue por donde iba (se guarda el segundo cada 5 s). */
var KV = 'javi-musica-videos', KT = 'javi-musica-seg';
var VIDEOS_INICIO = [{ id:'slxPFAJN9UM', t:'Harry Potter · Música ambiente de Hogwarts' }];
function videos(){ try{ var l = JSON.parse(localStorage.getItem(KV)); return Array.isArray(l) ? l : VIDEOS_INICIO.slice(); }catch(e){ return VIDEOS_INICIO.slice(); } }
function guardarVideos(l){ try{ localStorage.setItem(KV, JSON.stringify(l)); }catch(e){} }
function idDe(url){
  var m = String(url).trim().match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/) || String(url).trim().match(/^([A-Za-z0-9_-]{11})$/);
  return m ? m[1] : null;
}
var yt = null, ytListo = null, ytId = null, ytGuardar = 0, mini = null;
function cargarYT(){
  if(ytListo) return ytListo;
  ytListo = new Promise(function(ok){
    if(window.YT && YT.Player) return ok();
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function(){ if(prev) try{ prev(); }catch(e){} ok(); };
    var sc = document.createElement('script'); sc.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(sc);
  });
  return ytListo;
}
function segGuardado(id){ try{ var x = JSON.parse(localStorage.getItem(KT)) || {}; return x.id===id ? x.s||0 : 0; }catch(e){ return 0; } }
function arrancarYT(id){
  pararGen();
  if(yt && ytId===id){ yt.setVolume(Math.round(vol*100)); yt.playVideo(); mini.hidden = false; return; }
  pararYT(true);
  ytId = id; mini.hidden = false;
  var div = document.createElement('div'); mini.querySelector('.cuadro').innerHTML = ''; mini.querySelector('.cuadro').appendChild(div);
  cargarYT().then(function(){
    if(ytId!==id) return;
    yt = new YT.Player(div, { width:200, height:113, videoId:id,
      playerVars:{ autoplay:1, start:Math.floor(segGuardado(id)), loop:1, playlist:id, rel:0, modestbranding:1, playsinline:1 },
      events:{ onReady:function(e){ e.target.setVolume(Math.round(vol*100)); e.target.playVideo(); } } });
    clearInterval(ytGuardar);
    ytGuardar = setInterval(function(){ try{ if(yt && yt.getCurrentTime) localStorage.setItem(KT, JSON.stringify({ id:ytId, s:yt.getCurrentTime() })); }catch(e){} }, 5000);
  });
}
function pararYT(quitar){
  clearInterval(ytGuardar);
  if(yt){ try{ if(quitar) yt.destroy(); else yt.pauseVideo(); }catch(e){} }
  if(quitar){ yt = null; ytId = null; }
  if(mini) mini.hidden = true;
}
function esYT(){ return /^yt:/.test(estilo); }
function arrancar(){ if(esYT()) arrancarYT(estilo.slice(3)); else { pararYT(true); arrancarGen(); } }
function parar(){ pararGen(); pararYT(false); }

/* ---------- botón y panel ---------- */
var css = document.createElement('style');
css.textContent =
  '.jv-mus{position:fixed;z-index:9996;left:10px;bottom:10px;font:700 14px/1.2 system-ui,sans-serif}'+
  '.jv-mus>button{width:48px;height:48px;border-radius:50%;border:2px solid #c9a34a;background:#1f1830;color:#f6e3a1;font-size:22px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.45)}'+
  '.jv-mus.on>button{background:radial-gradient(circle at 35% 30%,#6c5ce7,#2d2463);animation:jvMus 2.4s ease-in-out infinite}'+
  '.jv-mus.espera>button{animation:jvMusE 1s ease-in-out infinite}'+
  '@keyframes jvMus{50%{box-shadow:0 0 0 8px rgba(108,92,231,.25),0 4px 14px rgba(0,0,0,.45)}}'+
  '@keyframes jvMusE{50%{transform:scale(1.12)}}'+
  '.jv-mus .panel{position:absolute;left:0;bottom:58px;width:270px;max-height:calc(100vh - 90px);overflow:auto;background:#1f1830;color:#f6e3a1;border:2px solid #c9a34a;border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:8px;box-shadow:0 10px 30px rgba(0,0,0,.5)}'+
  '.jv-mus .panel[hidden],.jv-mus .mini[hidden]{display:none}'+
  '.jv-mus .panel b{font-size:15px}'+
  '.jv-mus .panel h4{font-size:13px;margin:4px 0 0;opacity:.85;font-weight:700}'+
  '.jv-mus .est{display:flex;flex-direction:column;gap:5px}'+
  '.jv-mus .est .fila{display:flex;gap:4px}'+
  '.jv-mus .est button,.jv-mus .acc{font:700 14px system-ui,sans-serif;padding:8px 10px;border-radius:10px;border:1px solid #6b5a8a;background:rgba(255,255,255,.06);color:#f6e3a1;cursor:pointer;text-align:left}'+
  '.jv-mus .est .fila button:first-child{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
  '.jv-mus .est .fila .x{flex:none;text-align:center;padding:8px}'+
  '.jv-mus .est button[aria-pressed="true"]{background:#c9a34a;color:#2b1c05;border-color:#c9a34a}'+
  '.jv-mus .nuevo{display:flex;gap:4px}'+
  '.jv-mus .nuevo input{flex:1;min-width:0;font:13px system-ui,sans-serif;padding:7px;border-radius:8px;border:1px solid #6b5a8a;background:#120d1e;color:#f6e3a1}'+
  '.jv-mus .nuevo button{font:700 13px system-ui,sans-serif;padding:7px 9px;border-radius:8px;border:none;background:#c9a34a;color:#2b1c05;cursor:pointer}'+
  '.jv-mus input[type=range]{width:100%;accent-color:#c9a34a}'+
  '.jv-mus .aviso{font-weight:400;font-size:12px;opacity:.8}'+
  '.jv-mus .mini{position:fixed;background:#1f1830;border:2px solid #c9a34a;border-radius:10px;padding:3px;box-shadow:0 4px 14px rgba(0,0,0,.45)}'+
  '.jv-mus .mini .bar{display:flex;align-items:center;gap:4px;padding:0 2px 3px;color:#f6e3a1;font-size:12px}'+
  '.jv-mus .mini .bar span{flex:1}'+
  '.jv-mus .mini .bar button{font:700 12px system-ui,sans-serif;padding:3px 8px;border-radius:7px;border:1px solid #6b5a8a;background:rgba(255,255,255,.08);color:#f6e3a1;cursor:pointer}'+
  '.jv-mus .mini .cuadro{width:200px;height:113px;border-radius:7px;overflow:hidden;background:#000}'+
  '@media print{ .jv-mus{display:none!important} }';
document.head.appendChild(css);

var caja = document.createElement('div'); caja.className = 'jv-mus';
caja.innerHTML = '<div class="panel" hidden><b>🎵 Música para trabajar</b>'+
  '<h4>Hecha por la web</h4><div class="est">'+Object.keys(ESTILOS).map(function(k){ return '<button type="button" data-e="'+k+'">'+ESTILOS[k]+'</button>'; }).join('')+'</div>'+
  '<h4>📺 Tus vídeos de YouTube</h4><div class="est" data-lista></div>'+
  '<div class="nuevo"><input type="text" data-url placeholder="Pega un enlace de YouTube"><button type="button" data-a="anadir">➕</button></div>'+
  '<label>🔈 Volumen<input type="range" min="0" max="100" data-v></label>'+
  '<button type="button" class="acc" data-a="onoff"></button>'+
  '<span class="aviso">Sigue sonando al cambiar de página (toca la pantalla si se para).</span></div>'+
  '<div class="mini" hidden><div class="bar"><span>🎵 Música</span><button type="button" data-a="mover" title="Llevarlo a otra esquina">⇄ Mover</button></div><div class="cuadro"></div></div>'+
  '<button type="button" data-a="abrir" title="Música relajante" aria-label="Música relajante">🎵</button>';
mini = caja.querySelector('.mini');
/* el reproductor se puede llevar a cualquier esquina para que no tape (se recuerda en el aparato) */
var SITIOS = ['left:66px;bottom:10px','right:10px;bottom:62px','right:10px;top:10px','left:10px;top:10px'], KS = 'javi-musica-sitio';
function sitio(){ var n = 0; try{ n = +localStorage.getItem(KS) || 0; }catch(e){} return n % SITIOS.length; }
function ponerSitio(n){ mini.style.cssText = SITIOS[n]; try{ localStorage.setItem(KS, String(n)); }catch(e){} }
ponerSitio(sitio());
function pintarLista(){
  caja.querySelector('[data-lista]').innerHTML = videos().map(function(v){
    var k = 'yt:'+v.id, t = String(v.t||v.id).replace(/[<>&"]/g, '');
    return '<div class="fila"><button type="button" data-e="'+k+'" title="'+t+'">▶ '+t+'</button><button type="button" class="x" data-quita="'+v.id+'" title="Quitar de la lista">✕</button></div>';
  }).join('') || '<span class="aviso">Ninguno. Pega abajo un enlace.</span>';
}
function pintar(esperando){
  caja.classList.toggle('on', on && !esperando); caja.classList.toggle('espera', !!esperando);
  pintarLista();
  Array.prototype.forEach.call(caja.querySelectorAll('[data-e]'), function(b){ b.setAttribute('aria-pressed', on && b.dataset.e===estilo ? 'true' : 'false'); });
  caja.querySelector('[data-v]').value = Math.round(vol*100);
  caja.querySelector('[data-a="onoff"]').textContent = on ? '⏹ Parar la música' : '▶ Poner música';
  caja.querySelector('[data-a="abrir"]').title = esperando ? 'Toca para que siga la música' : 'Música relajante';
}
function anadir(){
  var inp = caja.querySelector('[data-url]'), id = idDe(inp.value);
  if(!id){ inp.value = ''; inp.placeholder = 'Ese enlace no es de YouTube'; return; }
  var l = videos(); if(l.some(function(v){ return v.id===id; })){ inp.value = ''; return; }
  var v = { id:id, t:'Vídeo de YouTube' }; l.push(v); guardarVideos(l); inp.value = '';
  estilo = 'yt:'+id; on = true; arrancar(); guardar(); pintar();
  fetch('https://www.youtube.com/oembed?format=json&url='+encodeURIComponent('https://www.youtube.com/watch?v='+id))
    .then(function(r){ return r.ok ? r.json() : null; }).then(function(j){
      if(!j || !j.title) return; var l2 = videos(); l2.forEach(function(x){ if(x.id===id) x.t = j.title; }); guardarVideos(l2); pintar();
    }).catch(function(){});
}
caja.addEventListener('click', function(e){
  var b = e.target.closest('button'); if(!b) return;
  if(b.dataset.e){ estilo = b.dataset.e; on = true; arrancar(); }
  else if(b.dataset.quita){
    var l = videos().filter(function(v){ return v.id!==b.dataset.quita; }); guardarVideos(l);
    if(estilo==='yt:'+b.dataset.quita){ pararYT(true); on = false; estilo = 'calma'; }
  }
  else if(b.dataset.a==='anadir'){ anadir(); return; }
  else if(b.dataset.a==='mover'){ ponerSitio((sitio()+1) % SITIOS.length); return; }
  else if(b.dataset.a==='abrir'){ var p = caja.querySelector('.panel'); p.hidden = !p.hidden; if(on && !timer && !yt) arrancar(); }
  else if(b.dataset.a==='onoff'){ on = !on; if(on) arrancar(); else parar(); }
  guardar(); pintar();
});
caja.querySelector('[data-url]').addEventListener('keydown', function(e){ if(e.key==='Enter') anadir(); });
caja.querySelector('[data-v]').addEventListener('input', function(e){
  vol = e.target.value/100; guardar();
  if(ctx && on && !esYT()) master.gain.setTargetAtTime(vol, ctx.currentTime, 0.1);
  if(yt && yt.setVolume) yt.setVolume(Math.round(vol*100));
});
document.addEventListener('click', function(e){ if(!caja.contains(e.target)) caja.querySelector('.panel').hidden = true; });
function montar(){
  document.body.appendChild(caja); pintar();
  if(!on) return;
  /* venía sonando de otra página: el navegador pide un toque antes de sonar */
  if(esYT()) cargarYT();
  pintar(true);
  var seguir = function(){ document.removeEventListener('pointerdown', seguir, true); document.removeEventListener('keydown', seguir, true); if(on){ arrancar(); pintar(); } };
  document.addEventListener('pointerdown', seguir, true); document.addEventListener('keydown', seguir, true);
}
window.JAVI_MUSICA = { arrancar:arrancar, parar:parar };
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
