/* ============================================================
   JAVIFICACIÓN · pieza común para todos los módulos
   ------------------------------------------------------------
   - DATOS: dónde se guarda todo. Hoy: Formulario de Google (escribir)
     + Hoja publicada como CSV (leer). Si algún día se cambia de sistema
     (Firebase…), solo hay que cambiar este archivo.
   - ALUMNOS: lista base en data/alumnos.json + cambios del panel del profe
     (altas, bajas, nombre, aspecto), que se guardan en la Hoja.
   - TEMAS: Harry Potter / Vengadores / Pokémon, según el trimestre o
     elegido en el panel del profe.
   - MODO PRUEBA: en el ordenador (localhost) o con ?prueba en la dirección
     no se envía nada a la Hoja.
   Uso en un módulo:  <script src="../comun/javi.js"></script>
                      JAVI.listo(function(){ ... });
   ============================================================ */
(function(){
'use strict';

var REGISTRO = {
  formAction: 'https://docs.google.com/forms/d/e/1FAIpQLSd_kTfsYHYK8F3jv0WmYJpsMfw1rYLVOrZiIHzH6Mb-4JuAaw/formResponse',
  entradas: { alumno:'entry.1643177071', accion:'entry.1324105340', cartaId:'entry.2081350872', tipo:'entry.1036866207', carta:'entry.704758731' },
  csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTfXYmi9evsMT7EtFrDVG3xALHoudOA2v299Yhgm4vEffLMs5KtcLnBO-jckirvRU7ogMaHCOZe_PNQ/pub?gid=326777813&single=true&output=csv'
};

/* Palabras de cada mundo (para que los módulos hablen el idioma del tema).
   moneda/moneda1: plural/singular · simbolo: lo que lleva la moneda dibujada
   boveda: el tesoro de la clase · lugar: «¡FIESTA EN …!» */
var TEMAS = {
  hp:         { n:'Harry Potter', mundo:'Mundo mágico',       trimestre:1, icono:'🔮',
                moneda:'galeones', moneda1:'galeón',  simbolo:'G', boveda:'Bóveda de Gringotts',        lugar:'Gringotts' },
  vengadores: { n:'Vengadores',   mundo:'Mundo de héroes',    trimestre:2, icono:'🛡️',
                moneda:'créditos', moneda1:'crédito', simbolo:'★', boveda:'Cámara acorazada del Cuartel', lugar:'el Cuartel' },
  pokemon:    { n:'Pokémon',      mundo:'Mundo de criaturas', trimestre:3, icono:'⚡',
                moneda:'monedas',  moneda1:'moneda',  simbolo:'⚡', boveda:'Hucha del Gimnasio',          lugar:'el Gimnasio' }
};

/* ---------- dónde está la web (para encontrar data/ y los módulos) ---------- */
var yo = document.currentScript && document.currentScript.src || '';
var BASE = yo ? yo.replace(/comun\/javi\.js.*$/, '') : '../';

var PRUEBA = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:' || /[?&]prueba/.test(location.search);
var ES_PROFE = /[?&]profe/.test(location.search);

/* ---------- utilidades ---------- */
function normal(n){ return String(n||'').trim().toLowerCase(); }
function pad(n){ return n<10 ? '0'+n : ''+n; }
function clave(d){ return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function rnd(){ try{ var a = new Uint32Array(1); crypto.getRandomValues(a); return a[0]/4294967296; }catch(e){ return Math.random(); } }
function idMov(){ return '#g'+Date.now().toString(36)+Math.floor(rnd()*1e8).toString(36); }
function leerLocal(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
function guardarLocal(k, v){ try{ localStorage.setItem(k, v); }catch(e){} }
function fechaFila(t){
  var m = String(t||'').match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if(m) return m[3]+'-'+pad(+m[2])+'-'+pad(+m[1]);
  m = String(t||'').match(/(\d{4})-(\d{2})-(\d{2})/);
  return m ? m[0] : '';
}
function leerCSV(texto){
  var filas=[], fila=[], cur='', q=false, i, c;
  for(i=0;i<texto.length;i++){
    c=texto[i];
    if(q){ if(c==='"'){ if(texto[i+1]==='"'){ cur+='"'; i++; } else q=false; } else cur+=c; }
    else if(c==='"'){ q=true; }
    else if(c===','){ fila.push(cur); cur=''; }
    else if(c==='\n'||c==='\r'){ if(c==='\r'&&texto[i+1]==='\n') i++; fila.push(cur); cur=''; filas.push(fila); fila=[]; }
    else cur+=c;
  }
  if(cur!==''||fila.length){ fila.push(cur); filas.push(fila); }
  return filas;
}

/* ============================================================
   DATOS
   Cada fila: { alumno, accion, cartaId, tipo, carta, dia, id, nuevo }
   ============================================================ */
var CLAVE_PEND = PRUEBA ? 'javi-prueba-pendientes' : 'javi-pendientes';
var pendientes = [];
try{ pendientes = JSON.parse(leerLocal(CLAVE_PEND)||'[]') || []; }catch(e){ pendientes = []; }
function guardarPend(){ guardarLocal(CLAVE_PEND, JSON.stringify(pendientes)); }

var filasCSV = [], horaCSV = null, promesaCSV = null;

function leerHoja(){
  promesaCSV = fetch(REGISTRO.csvUrl+'&t='+Date.now(), { cache:'no-store' })
    .then(function(r){ if(!r.ok) throw new Error('Hoja '+r.status); return r.text(); })
    .then(function(t){
      filasCSV = leerCSV(t).slice(1); horaCSV = new Date();
      var vistos = {};
      filasCSV.forEach(function(f){ var m = String(f[5]||'').match(/#g[a-z0-9]+/); if(m) vistos[m[0]] = 1; });
      var ahora = Date.now();
      pendientes = pendientes.filter(function(p){ return !vistos[p.id] && (ahora-p.t) < 48*3600*1000; });
      guardarPend();
      return filasCSV;
    });
  return promesaCSV;
}

function filas(){
  var out = [], vistos = {};
  filasCSV.forEach(function(f){
    var m = String(f[5]||'').match(/#g[a-z0-9]+/), id = m ? m[0] : '';
    if(id) vistos[id] = 1;
    out.push({ alumno:f[1]||'', accion:f[2]||'', cartaId:String(f[3]||'').trim(), tipo:f[4]||'', carta:String(f[5]||''), dia:fechaFila(f[0]), marca:f[0]||'', id:id });
  });
  pendientes.forEach(function(p){
    if(vistos[p.id]) return;
    out.push({ alumno:p.alumno, accion:p.accion, cartaId:String(p.cartaId), tipo:p.tipo||'', carta:p.id+(p.carta?' · '+p.carta:''), dia:clave(new Date(p.t)), marca:'', id:p.id, nuevo:true });
  });
  return out;
}

/* escribir una fila: { alumno, accion, cartaId, tipo, carta } → devuelve el id (#g…) */
function escribir(d){
  var p = { id:idMov(), alumno:d.alumno, accion:d.accion, cartaId:d.cartaId==null ? '' : String(d.cartaId), tipo:d.tipo||'', carta:d.carta||'', t:Date.now() };
  pendientes.push(p); guardarPend();
  if(!PRUEBA){
    var e = REGISTRO.entradas, body = new URLSearchParams();
    body.set(e.alumno, p.alumno); body.set(e.accion, p.accion); body.set(e.cartaId, p.cartaId); body.set(e.tipo, p.tipo);
    body.set(e.carta, p.id+(p.carta ? ' · '+p.carta : ''));
    fetch(REGISTRO.formAction, { method:'POST', mode:'no-cors', body:body }).catch(function(){});
  }
  return p.id;
}

/* ============================================================
   ALUMNOS
   Los cambios del panel se guardan como filas
     Alumno «ALUMNOS · 4ºA», Acción «Alumnos», CartaId = alta | baja | vuelve | nombre | aspecto,
     Tipo = nombre del alumno, Carta = #id · {datos en JSON}
   ============================================================ */
var BASE_ALUMNOS = null;
var ASPECTO = ['chica','pelo','colorPelo','piel','gafas','mecha','ropa'];

function cargarBase(){
  return fetch(BASE+'data/alumnos.json', { cache:'no-store' })
    .then(function(r){ if(!r.ok) throw new Error('alumnos.json '+r.status); return r.json(); })
    .then(function(j){ BASE_ALUMNOS = j.grupos || {}; return BASE_ALUMNOS; });
}
function jsonDe(carta){
  var i = String(carta||'').indexOf('{'); if(i<0) return {};
  try{ return JSON.parse(String(carta).slice(i)); }catch(e){ return {}; }
}
function grupoCompleto(g){
  if(!BASE_ALUMNOS || !BASE_ALUMNOS[g]) return null;
  var base = BASE_ALUMNOS[g], lista = base.alumnos.map(function(a){ var o = {}; for(var k in a) o[k] = a[k]; o.activo = true; return o; });
  var alias = {}, k = normal('ALUMNOS · '+g);
  function busca(n){ var x = normal(n); for(var i=0;i<lista.length;i++) if(normal(lista[i].n)===x) return lista[i]; return null; }
  filas().forEach(function(f){
    if(normal(f.alumno)!==k || normal(f.accion)!=='alumnos') return;
    var op = normal(f.cartaId), d = jsonDe(f.carta), a = busca(f.tipo), i;
    if(op==='alta'){
      if(a){ a.activo = true; }
      else { var nu = { n:String(d.n||f.tipo).trim(), activo:true }; ASPECTO.forEach(function(c){ if(d[c]!=null) nu[c] = d[c]; }); if(nu.n) lista.push(nu); }
    } else if(op==='baja' && a){ a.activo = false; }
    else if(op==='vuelve' && a){ a.activo = true; }
    else if(op==='nombre' && a && d.a && !busca(d.a)){
      var viejo = a.n; a.n = String(d.a).trim();
      for(i in alias) if(normal(alias[i])===normal(viejo)) alias[i] = a.n;
      alias[normal(viejo)] = a.n;
    } else if(op==='aspecto' && a){ ASPECTO.forEach(function(c){ if(c in d){ if(d[c]===null || d[c]==='') delete a[c]; else a[c] = d[c]; } }); }
  });
  return { grupo:g, sistema:base.sistema, tema:base.tema||null, asignaturas:base.asignaturas||[], tutoria:!!base.tutoria, todos:lista, alias:alias };
}
/* lo que necesitan los módulos: nombres activos, chicas, aspecto y nombres antiguos */
function grupo(g){
  var c = grupoCompleto(g); if(!c) return null;
  var act = c.todos.filter(function(a){ return a.activo; });
  var pers = {};
  act.forEach(function(a){ var o = {}, hay = false; ['pelo','colorPelo','piel','gafas','mecha','ropa'].forEach(function(k){ if(a[k]!=null){ o[k] = a[k]; hay = true; } }); if(hay) pers[a.n] = o; });
  return {
    grupo:g, sistema:c.sistema, tema:c.tema, asignaturas:c.asignaturas, tutoria:c.tutoria,
    nombres: act.map(function(a){ return a.n; }),
    chicas: act.filter(function(a){ return a.chica; }).map(function(a){ return a.n; }),
    personajes: pers, alias: c.alias, todos: c.todos
  };
}
function grupos(){ return BASE_ALUMNOS ? Object.keys(BASE_ALUMNOS) : []; }
function cambiarAlumno(g, op, nombre, datos){
  return escribir({ alumno:'ALUMNOS · '+g, accion:'Alumnos', cartaId:op, tipo:nombre, carta: datos ? JSON.stringify(datos) : '' });
}

/* ============================================================
   AJUSTES (por ahora: el tema). Fila «AJUSTES», acción «Ajuste».
   ============================================================ */
function ajuste(nombre){
  var v = null;
  filas().forEach(function(f){ if(normal(f.alumno)==='ajustes' && normal(f.accion)==='ajuste' && normal(f.cartaId)===normal(nombre)) v = f.tipo; });
  return v;
}
function guardarAjuste(nombre, valor){ return escribir({ alumno:'AJUSTES', accion:'Ajuste', cartaId:nombre, tipo:valor }); }

function temaAuto(d){
  var m = (d||new Date()).getMonth();   /* 0 = enero */
  if(m>=8) return 'hp';                 /* septiembre – diciembre */
  if(m<=2) return 'vengadores';         /* enero – marzo */
  return 'pokemon';                     /* abril – junio */
}
function temaActual(){
  var q = (location.search.match(/[?&]tema=([a-z]+)/)||[])[1];
  if(q && TEMAS[q]) return q;
  var a = ajuste('tema');
  if(a && TEMAS[a]) return a;
  return temaAuto();
}
/* tema de una clase: el suyo fijo (4ºA = Harry Potter) o el del multiverso del trimestre */
function temaDe(g){
  var b = BASE_ALUMNOS && BASE_ALUMNOS[g];
  return b && b.tema && TEMAS[b.tema] ? b.tema : temaActual();
}
function aplicarTema(){
  var t = temaActual();
  document.documentElement.setAttribute('data-tema', t);
  guardarLocal('javi-tema', t);
  return t;
}
/* pinta ya el último tema conocido, para que no parpadee */
(function(){ var t = leerLocal('javi-tema'); if(t && TEMAS[t]) document.documentElement.setAttribute('data-tema', t); })();

/* ============================================================
   UTILIDADES PARA LA PIZARRA
   ============================================================ */
function enMarco(){ try{ return window.self !== window.top; }catch(e){ return true; } }
function pantallaCompleta(){
  if(document.fullscreenElement){ document.exitFullscreen(); return; }
  var el = document.documentElement;
  if(el.requestFullscreen && document.fullscreenEnabled){ el.requestFullscreen().catch(function(){ window.open(location.href, '_blank'); }); }
  else window.open(location.href, '_blank');
}
/* exportar a CSV que abre bien en Excel (con BOM y punto y coma) */
function exportarCSV(nombre, filasTabla){
  var txt = '﻿'+filasTabla.map(function(f){
    return f.map(function(c){ var s = c==null ? '' : String(c); return /[";\n]/.test(s) ? '"'+s.replace(/"/g,'""')+'"' : s; }).join(';');
  }).join('\r\n');
  var a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([txt], { type:'text/csv;charset=utf-8' }));
  a.download = nombre.replace(/\.csv$/i,'')+'.csv';
  document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
/* botón flotante para volver a la portada (los módulos que lo quieran) */
function botonInicio(opc){
  opc = opc || {};
  if(/[?&]solo/.test(location.search)) return;   /* ?solo = sin botón (para incrustar un módulo suelto) */
  var a = document.createElement('a');
  a.href = BASE + (ES_PROFE ? '?profe' : '');
  a.textContent = '⌂';
  a.title = 'Volver a Javificación'; a.setAttribute('aria-label', 'Volver a Javificación');
  a.style.cssText = 'position:fixed;z-index:9999;'+(opc.abajo ? 'bottom:10px;' : 'top:10px;')+(opc.derecha ? 'right:10px;' : 'left:10px;')+
    'width:40px;height:40px;border-radius:50%;display:grid;place-items:center;text-decoration:none;font-size:22px;line-height:1;'+
    'background:rgba(10,18,30,.75);color:#f6e3a1;border:2px solid rgba(232,200,114,.6);box-shadow:0 2px 8px rgba(0,0,0,.4);font-family:sans-serif';
  document.body.appendChild(a);
}
function avisoPrueba(){
  if(!PRUEBA) return;
  var d = document.createElement('div');
  d.textContent = 'MODO PRUEBA · no se guarda nada en la Hoja';
  d.style.cssText = 'position:fixed;z-index:9998;left:50%;bottom:0;transform:translateX(-50%);background:#7a2a22;color:#fff;font:600 12px/1 sans-serif;padding:5px 10px;border-radius:8px 8px 0 0;pointer-events:none';
  document.body.appendChild(d);
}

/* ============================================================
   ARRANQUE: JAVI.listo(fn) espera a la lista de alumnos y a la Hoja
   (como mucho 4 s; si la Hoja tarda, arranca con lo que haya).
   ============================================================ */
var esperando = [], preparado = false;
function terminar(){
  if(preparado) return; preparado = true;
  aplicarTema();
  esperando.splice(0).forEach(function(fn){ try{ fn(); }catch(e){ console.error(e); } });
}
var pBase = cargarBase().catch(function(e){ console.warn('Javificación: sin data/alumnos.json', e); });
var pHoja = leerHoja().catch(function(e){ console.warn('Javificación: sin Hoja', e); });
Promise.all([pBase, Promise.race([pHoja, new Promise(function(r){ setTimeout(r, 4000); })])]).then(terminar);
function listo(fn){
  var run = function(){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', fn); else fn(); };
  if(preparado) run(); else esperando.push(run);
}

window.JAVI = {
  BASE:BASE, PRUEBA:PRUEBA, ES_PROFE:ES_PROFE, REGISTRO:REGISTRO, TEMAS:TEMAS,
  listo:listo, leerHoja:leerHoja, filas:filas, escribir:escribir, horaHoja:function(){ return horaCSV; },
  grupo:grupo, grupos:grupos, grupoCompleto:grupoCompleto, cambiarAlumno:cambiarAlumno,
  ajuste:ajuste, guardarAjuste:guardarAjuste, temaActual:temaActual, temaAuto:temaAuto, temaDe:temaDe, aplicarTema:aplicarTema,
  pantallaCompleta:pantallaCompleta, enMarco:enMarco, exportarCSV:exportarCSV, botonInicio:botonInicio, avisoPrueba:avisoPrueba,
  util:{ normal:normal, pad:pad, clave:clave, rnd:rnd, idMov:idMov, fechaFila:fechaFila, leerCSV:leerCSV }
};
})();
