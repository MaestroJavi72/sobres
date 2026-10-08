/* Javificación · barra común de las actividades de una SA (sda/<id>/iNN-*.html)
   ‹ anterior · sesión, fecha y si puntúa · siguiente ›  y  «Todos los juegos».
   Lee data/sda/indice.json; no necesita nada más. */
(function(){
var m = location.pathname.match(/\/sda\/([^\/]+)\/([^\/]+\.html)$/);
if(!m) return;
var ID = m[1], ARCHIVO = m[2], PROFE = /[?&]profe/.test(location.search) ? '?profe' : '';
var ICONOS = { 'I-1':'📖','I-2':'👏','I-3':'🔀','I-4':'🗂️','I-5':'🏭','I-6':'⚙️','I-7':'🔍','I-8':'🎡','I-9':'🃏','I-10':'🔮','I-11':'⚖️','I-12':'💡','I-13':'🎙️','I-14':'📚','I-15':'🎲','I-16':'⚔️' };
var DIAS = ['dom','lun','mar','mié','jue','vie','sáb'], MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

var css = document.createElement('style');
css.textContent =
  '.barraAct{display:flex;gap:8px;flex-wrap:wrap;align-items:stretch;margin:0 0 14px}'+
  '.barraAct a,.barraAct span.info{display:flex;align-items:center;gap:8px;border-radius:12px;padding:8px 14px;font-family:var(--f-sub,Cinzel,serif);font-weight:700;font-size:15px;line-height:1.2;text-decoration:none}'+
  '.barraAct a{background:rgba(10,31,34,.85);color:#e8cf8a;border:2px solid #2f5a54}'+
  '.barraAct a:hover{border-color:#e8c872}'+
  '.barraAct a.todos{background:linear-gradient(180deg,#f3d27a,#c9972e);color:#2b1c05;border-color:#fff1b8}'+
  '.barraAct span.info{flex:1;min-width:200px;justify-content:center;text-align:center;background:rgba(0,0,0,.25);color:#d9cfae;border:2px dashed rgba(232,200,114,.35);font-weight:600}'+
  '.barraAct .etq{font-size:11px;padding:3px 7px;border-radius:999px;background:#f3d27a;color:#3a2a16;white-space:nowrap}'+
  '.barraAct .ic{font-size:20px}'+
  '.barraAct .vacio{visibility:hidden}'+
  '@media (max-width:620px){ .barraAct span.info{order:-1;flex-basis:100%} .barraAct a{flex:1;justify-content:center} }'+
  '@media print{ .barraAct{display:none!important} }';
document.head.appendChild(css);

function esc(t){ var d = document.createElement('div'); d.textContent = t==null ? '' : t; return d.innerHTML; }
fetch('../../data/sda/indice.json', { cache:'no-store' }).then(function(r){ return r.json(); }).then(function(j){
  var s = (j.sdas||[]).filter(function(x){ return x.id===ID; })[0]; if(!s || !s.enlaces) return;
  /* nombre, sesión y etiqueta de cada actividad, sacados de «interactivas» */
  var info = {};
  (s.sesiones||[]).forEach(function(se, i){
    (se.interactivas||'').split(/,\s*(?=I-)/).forEach(function(x){
      var k = x.trim().match(/^(I-\d+)\s+(.*?)\s*(?:\(([^)]*)\))?$/);
      if(k && !info[k[1]]) info[k[1]] = { nombre:k[2], etq:k[3]||'', n:i+1, fecha:se.fecha };
    });
  });
  var cods = Object.keys(s.enlaces).sort(function(a,b){ return +a.slice(2) - +b.slice(2); });
  var yo = cods.filter(function(c){ return s.enlaces[c].split('/').pop()===ARCHIVO; })[0]; if(!yo) return;
  var i = cods.indexOf(yo), ant = cods[i-1], sig = cods[i+1], d = info[yo] || {};
  function enl(c, flecha){
    if(!c) return '<a class="vacio" aria-hidden="true">·</a>';
    var n = (info[c]||{}).nombre || c, u = s.enlaces[c].split('/').pop()+PROFE;
    return '<a href="'+u+'" title="'+esc(c+' · '+n)+'">'+(flecha==='‹' ? '‹ <span class="ic">'+(ICONOS[c]||'🎮')+'</span>'+esc(n) : esc(n)+' <span class="ic">'+(ICONOS[c]||'🎮')+'</span> ›')+'</a>';
  }
  var f = d.fecha ? d.fecha.split('-') : null, dia = f ? DIAS[new Date(+f[0], +f[1]-1, +f[2], 12).getDay()]+' '+(+f[2])+' '+MESES[+f[1]-1] : '';
  var etq = /^puntúa$/i.test(d.etq) ? '<span class="etq">⭐ puntúa</span>' : /ampliaci/i.test(d.etq) ? '<span class="etq">➕ ampliación</span>' : '';
  var nav = document.createElement('nav'); nav.className = 'barraAct'; nav.setAttribute('aria-label', 'Actividades del tema');
  nav.innerHTML = enl(ant, '‹')+
    '<span class="info">'+esc(yo)+' de '+cods.length+(d.n ? ' · Sesión '+d.n+(dia ? ', '+dia : '') : '')+' '+etq+'</span>'+
    enl(sig, '›')+
    '<a class="todos" href="../?id='+encodeURIComponent(ID)+(PROFE ? '&profe' : '')+'#juegos">🎮 Todos los juegos</a>';
  var cab = document.querySelector('header.cab');
  if(cab) cab.parentNode.insertBefore(nav, cab.nextSibling);
}).catch(function(){});
})();
