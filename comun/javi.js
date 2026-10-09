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

/* MODO PRUEBA fijo: en el ordenador (localhost) o con ?prueba */
var PRUEBA_FIJA = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:' || /[?&]prueba/.test(location.search);
/* CÓDIGO PARA ACTUAR: todo se ve, pero solo se guarda en la Hoja con el código.
   Al escribirlo, sirve 30 minutos en este aparato (todas las páginas); luego se vuelve a pedir.
   Sin código, la página funciona como DEMOSTRACIÓN: se puede tocar todo, pero no se guarda nada. */
var LLAVE = 'javi-llave', DURACION_LLAVE = 30*60*1000;
function llave(){ var t = +(leerLocal(LLAVE)||0); return t && Date.now()-t >= 0 && Date.now()-t < DURACION_LLAVE ? t : 0; }
var PRUEBA = PRUEBA_FIJA || !llave();
/* ?candado en el ordenador: enseña el candado para probarlo, sin enviar nada nunca */
var PROBAR_CANDADO = PRUEBA_FIJA && /[?&]candado/.test(location.search);
var DEMO = PROBAR_CANDADO ? !llave() : (!PRUEBA_FIJA && PRUEBA);
var ES_PROFE = true;   /* todo se ve para todos; para guardar hace falta el código */

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
  lista.forEach(function(a){ (a.antes||[]).forEach(function(v){ alias[normal(v)] = a.n; }); delete a.antes; });   /* nombres anteriores (data/alumnos.json) */
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
/* ÁMBITO: los módulos abiertos desde una sección de la portada solo muestran sus clases
   ?ambito=tutoria → 4ºA (la tutoría) · ?ambito=ef → 3ºA, 3ºB y 4ºB */
var AMBITO = (location.search.match(/[?&]ambito=(tutoria|ef)\b/)||[])[1] || null;
function gruposVisibles(){
  var gs = grupos();
  if(AMBITO==='tutoria') return gs.filter(function(g){ return BASE_ALUMNOS[g].tutoria; });
  if(AMBITO==='ef') return gs.filter(function(g){ return BASE_ALUMNOS[g].sistema==='ef'; });
  return gs;
}
function conAmbito(url){ if(!AMBITO) return url; var p = url.split('#'); return p[0]+(p[0].indexOf('?')>=0 ? '&' : '?')+'ambito='+AMBITO+(p[1] ? '#'+p[1] : ''); }
/* VOLVER: a la pantalla anterior; si no la hay (entrada directa o desde Google Sites), a la sección de la portada */
function destinoVolver(){ return BASE+(ES_PROFE ? '?profe' : '')+(AMBITO==='ef' ? '#ef' : AMBITO==='tutoria' ? '#tutoria' : ''); }
function volver(destino){
  try{
    if(document.referrer && new URL(document.referrer).origin===location.origin && history.length>1){ history.back(); return; }
  }catch(e){}
  location.href = destino || destinoVolver();
}
/* cualquier enlace con data-volver se comporta como «← Volver» */
document.addEventListener('click', function(e){
  var a = e.target.closest && e.target.closest('[data-volver]'); if(!a) return;
  e.preventDefault(); volver(a.getAttribute('data-volver') || a.getAttribute('href'));
});
function cambiarAlumno(g, op, nombre, datos){
  return escribir({ alumno:'ALUMNOS · '+g, accion:'Alumnos', cartaId:op, tipo:nombre, carta: datos ? JSON.stringify(datos) : '' });
}

/* ============================================================
   PUNTOS DE ALUMNOS (para la Ruleta, el Duelo de tablas…)
   Escribe con el mismo formato que la página de cada clase:
     4ºA (hogwarts): Alumno «Nombre»,      Acción «Galeones», CartaId = puntos
     EF:             Alumno «3ºA · Nombre», Acción «Galeones», CartaId = puntos
   y lo deja también en los «pendientes» de esa página para que se vea al momento.
   En EF aplica las cartas Duplex (×2) y Triplex (×3) usadas ese día.
   ============================================================ */
var PEND_APP = { hogwarts:'gringotts-pendientes', ef:'ef-pendientes' };
var CARTAS_MULT_EF = { '10':2, '11':3 };   /* nº de carta de EF → multiplicador */
function sistemaDe(g){ var b = BASE_ALUMNOS && BASE_ALUMNOS[g]; return b && b.sistema || 'ef'; }
function claveAlumno(g, nombre){ return sistemaDe(g)==='hogwarts' ? nombre : g+' · '+nombre; }
function multiplicadorEF(g, nombre){
  if(sistemaDe(g)!=='ef') return 1;
  var k = normal(g+' · '+nombre), hoy = clave(new Date()), m = 1;
  filas().forEach(function(f){
    if(normal(f.alumno)!==k || f.dia!==hoy || normal(f.accion).indexOf('uso')!==0) return;
    var x = CARTAS_MULT_EF[String(f.cartaId).replace(/\D/g,'')]; if(x) m = Math.max(m, x);
  });
  return m;
}
function darPuntos(g, nombre, n, motivo, detalle){
  var sis = sistemaDe(g), mult = sis==='ef' && n>0 ? multiplicadorEF(g, nombre) : 1;
  var p = { id:idMov(), alumno:claveAlumno(g, nombre), accion:'Galeones', n:n*mult, motivo:(motivo||'')+(mult>1 ? ' (×'+mult+')' : ''), extra:detalle||'', cartaId:'', t:Date.now() };
  var key = (PRUEBA ? 'prueba-' : '')+PEND_APP[sis], lista = [];
  try{ lista = JSON.parse(leerLocal(key)||'[]') || []; }catch(e){ lista = []; }
  lista.push(p); guardarLocal(key, JSON.stringify(lista));
  if(!PRUEBA){
    var e = REGISTRO.entradas, body = new URLSearchParams();
    body.set(e.alumno, p.alumno); body.set(e.accion, p.accion); body.set(e.cartaId, String(p.n)); body.set(e.tipo, p.motivo);
    body.set(e.carta, p.id+(p.extra ? ' · '+p.extra : ''));
    fetch(REGISTRO.formAction, { method:'POST', mode:'no-cors', body:body }).catch(function(){});
  } else console.info('[modo prueba] no se envía', p);
  return { id:p.id, n:p.n, mult:mult };
}
/* deshacer: el movimiento contrario (nunca se borra nada) */
function quitarPuntos(g, nombre, mov, motivo){
  return darPuntos(g, nombre, -mov.n, 'Anulado: '+(motivo||''), 'anula '+mov.id);
}

/* ============================================================
   HORARIO, PLANES DE SESIÓN Y SITUACIONES DE APRENDIZAJE
   - data/horario.json: sesiones de la semana (día, hora, grupo, asignatura)
   - Plan de una sesión: Alumno «PLAN · 4ºA», Acción «Plan», CartaId «2026-10-08 · LCL», JSON
   - SdA: Alumno «SDA · 4ºA», Acción «SdA», CartaId = id, Tipo = título, JSON (la última versión manda)
   - Días sin clase: ajuste «festivos» (fechas separadas por comas)
   ============================================================ */
var HORARIO = null;
function cargarHorario(){
  return fetch(BASE+'data/horario.json', { cache:'no-store' })
    .then(function(r){ if(!r.ok) throw new Error('horario.json '+r.status); return r.json(); })
    .then(function(j){ HORARIO = j; return j; });
}
function horario(){ return HORARIO; }
function diaSemana(f){ var p = f.split('-'); return new Date(+p[0], +p[1]-1, +p[2], 12).getDay(); }
function sesionesDelDia(f){ var d = diaSemana(f); return HORARIO ? HORARIO.sesiones.filter(function(s){ return s.dia===d; }) : []; }
function festivos(){ return String(ajuste('festivos')||'').split(/[,\s]+/).filter(function(x){ return /^\d{4}-\d{2}-\d{2}$/.test(x); }); }
function sumarDias(f, n){ var p = f.split('-'), d = new Date(+p[0], +p[1]-1, +p[2]+n, 12); return clave(d); }
function lunesDe(f){ var d = diaSemana(f); return sumarDias(f, d===0 ? -6 : 1-d); }

function jsonDeFila(f){ var i = f.carta.indexOf('{'); if(i<0) return null; try{ return JSON.parse(f.carta.slice(i)); }catch(e){ return null; } }
function claveSesion(fecha, asig){ return fecha+' · '+(asig||'EF'); }
function planDe(g, fecha, asig){
  var k = normal('PLAN · '+g), c = claveSesion(fecha, asig), res = null;
  filas().forEach(function(f){ if(normal(f.alumno)===k && normal(f.accion)==='plan' && f.cartaId===c){ var j = jsonDeFila(f); if(j) res = j; } });
  return res;
}
function guardarPlan(g, fecha, asig, plan){
  return escribir({ alumno:'PLAN · '+g, accion:'Plan', cartaId:claveSesion(fecha, asig), tipo:plan.titulo||'Sesión', carta:JSON.stringify(plan) });
}
function fechasConPlan(g, asig){
  var k = normal('PLAN · '+g), fs = {};
  filas().forEach(function(f){ if(normal(f.alumno)===k && normal(f.accion)==='plan'){ var p = f.cartaId.split(' · '); if((p[1]||'EF')===(asig||'EF')) fs[p[0]] = 1; } });
  return Object.keys(fs).sort();
}
/* SdA escritas por Javi como documento (data/sda/indice.json): se ven en la planificación y tienen su página */
var SDA_FIJAS = [];
function cargarSdaFijas(){
  return fetch(BASE+'data/sda/indice.json', { cache:'no-store' }).then(function(r){ return r.ok ? r.json() : { sdas:[] }; })
    .then(function(j){ SDA_FIJAS = (j.sdas||[]).map(function(x){ x.pagina = BASE+'sda/?id='+encodeURIComponent(x.id); return x; }); });
}
function sdas(){
  var por = {};
  SDA_FIJAS.forEach(function(x){ por[x.id] = JSON.parse(JSON.stringify(x)); });
  filas().forEach(function(f){
    if(normal(f.accion)!=='sda' || normal(f.alumno).indexOf('sda · ')!==0) return;
    var j = jsonDeFila(f); if(j && j.id){ if(por[j.id] && por[j.id].pagina && !j.pagina) j.pagina = por[j.id].pagina; por[j.id] = j; }   /* la versión editada en la web manda */
  });
  return Object.keys(por).map(function(k){ return por[k]; }).filter(function(s){ return !s.borrada; })
    .sort(function(a,b){ return (a.inicio||'').localeCompare(b.inicio||''); });
}
function guardarSda(s){ return escribir({ alumno:'SDA · '+s.grupo, accion:'SdA', cartaId:s.id, tipo:s.titulo||'', carta:JSON.stringify(s) }); }
/* reparte las sesiones de una SdA en los huecos del horario de su grupo y asignatura, desde su fecha de inicio */
function repartirSda(s){
  var fes = festivos(), f = s.inicio, i = 0, vueltas = 0;
  while(i < s.sesiones.length && vueltas < 400){
    if(fes.indexOf(f)<0){
      sesionesDelDia(f).forEach(function(h){ if(i < s.sesiones.length && h.grupo===s.grupo && h.asig===s.asig){ s.sesiones[i].fecha = f; s.sesiones[i].ini = h.ini; i++; } });
    }
    f = sumarDias(f, 1); vueltas++;
  }
  return s;
}
function sdaDeSesion(g, fecha, asig){
  var r = null;
  sdas().forEach(function(s){
    if(s.grupo!==g || s.asig!==(asig||'EF')) return;
    (s.sesiones||[]).forEach(function(x, i){ if(x.fecha===fecha) r = { sda:s, i:i, sesion:x }; });
  });
  return r;
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
  a.textContent = '⌂ Inicio';
  a.title = 'Volver a Javificación'; a.setAttribute('aria-label', 'Volver a Javificación');
  a.style.cssText = 'position:fixed;z-index:9999;'+(opc.abajo ? 'bottom:10px;' : 'top:10px;')+(opc.derecha ? 'right:10px;' : 'left:10px;')+
    'padding:9px 16px;border-radius:999px;display:inline-flex;align-items:center;text-decoration:none;font:700 16px/1 sans-serif;'+
    'background:linear-gradient(180deg,#f3d27a,#c9972e);color:#2b1c05;border:2px solid #fff1b8;box-shadow:0 3px 10px rgba(0,0,0,.45)';
  document.body.appendChild(a);
}
function avisoPrueba(){
  if(!PRUEBA_FIJA) return;   /* la demostración tiene su propio aviso (el candado) */
  var d = document.createElement('div');
  d.textContent = 'MODO PRUEBA · no se guarda nada en la Hoja';
  d.style.cssText = 'position:fixed;z-index:9998;left:50%;bottom:0;transform:translateX(-50%);background:#7a2a22;color:#fff;font:600 12px/1 sans-serif;padding:5px 10px;border-radius:8px 8px 0 0;pointer-events:none';
  document.body.appendChild(d);
}

/* ============================================================
   CÓDIGO PARA ACTUAR
   - El código se guarda en la Hoja como huella (SHA-256), nunca tal cual: ajuste «codigo».
   - Mientras no haya código creado, «Entrar» abre sin pedirlo (para poder crearlo en el Panel del profe).
   - Ojo: es un candado para la clase, no una caja fuerte (la web es pública).
   ============================================================ */
function huella(txt){
  var datos = new TextEncoder().encode('javificacion:'+String(txt).trim());
  return crypto.subtle.digest('SHA-256', datos).then(function(b){
    return Array.prototype.map.call(new Uint8Array(b), function(x){ return ('0'+x.toString(16)).slice(-2); }).join('');
  });
}
function codigoGuardado(){ return ajuste('codigo') || leerLocal('javi-codigo') || ''; }
function hayCodigo(){ return !!codigoGuardado(); }
function limpiarDemo(){
  ['javi-prueba-pendientes','boveda-prueba-pendientes','prueba-gringotts-pendientes','prueba-ef-pendientes'].forEach(function(k){ try{ localStorage.removeItem(k); }catch(e){} });
}
function abrirLlave(){ guardarLocal(LLAVE, String(Date.now())); limpiarDemo(); }
function bloquear(){ try{ localStorage.removeItem(LLAVE); }catch(e){} location.reload(); }

var CSS_LLAVE =
  '.jv-pill{position:fixed;z-index:9997;right:10px;bottom:10px;display:flex;align-items:center;gap:6px;font:700 13px/1.2 system-ui,sans-serif;'+
    'padding:7px 8px 7px 12px;border-radius:999px;box-shadow:0 4px 14px rgba(0,0,0,.45);max-width:calc(100vw - 20px)}'+
  '.jv-pill.demo{background:#3a2a16;color:#f6e3a1;border:2px solid #c9a34a}'+
  '.jv-pill.real{background:#1c4d31;color:#d9f5e1;border:2px solid #6fd39a}'+
  '.jv-pill button{font:800 13px/1 system-ui,sans-serif;border:none;border-radius:999px;padding:6px 10px;cursor:pointer}'+
  '.jv-pill.demo button{background:linear-gradient(180deg,#f3d27a,#c9972e);color:#2b1c05}'+
  '.jv-pill.real button{background:rgba(255,255,255,.15);color:#fff}'+
  '.jv-velo{position:fixed;inset:0;z-index:9999;background:rgba(5,10,16,.78);display:grid;place-items:center;padding:16px}'+
  '.jv-caja{width:min(100%,380px);background:linear-gradient(180deg,#f6ead0,#ead7a8);color:#3a2a16;border:3px solid #b8934f;border-radius:20px;padding:20px;text-align:center;font:16px/1.4 Georgia,serif;box-shadow:0 20px 50px rgba(0,0,0,.6)}'+
  '.jv-caja h2{font:800 22px/1.2 Cinzel,Georgia,serif;color:#7a2030;margin:0 0 8px}'+
  '.jv-caja p{margin:0 0 12px}'+
  '.jv-caja input{width:100%;font:700 26px/1 system-ui,sans-serif;text-align:center;letter-spacing:.3em;padding:10px;border-radius:12px;border:2px solid #b8934f;background:#fffaf0;color:#3a2a16;margin-bottom:10px}'+
  '.jv-caja .err{color:#a3392f;font-weight:700;min-height:1.4em;margin-bottom:6px}'+
  '.jv-caja .bts{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}'+
  '.jv-caja button{font:800 16px/1 system-ui,sans-serif;padding:11px 16px;border-radius:12px;cursor:pointer;border:2px solid #8a6a1f}'+
  '.jv-caja .si{background:linear-gradient(180deg,#f3d27a,#c9972e);color:#2b1c05}'+
  '.jv-caja .no{background:transparent;color:#3a2a16;border-color:#b8934f}'+
  '.jv-caja.mal{animation:jvTiembla .3s}'+
  '@keyframes jvTiembla{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}'+
  '@media print{.jv-pill,.jv-velo{display:none!important}}';
var modalAbierto = false;
/* pide el código. o = { titulo, texto, alAcertar, alCancelar, textoCancelar } */
function pedirCodigo(o){
  o = o || {};
  if(!preparado){ listo(function(){ pedirCodigo(o); }); return; }   /* espera a la Hoja para saber si hay código */
  if(modalAbierto) return; modalAbierto = true;
  var hay = hayCodigo(), velo = document.createElement('div'); velo.className = 'jv-velo';
  velo.innerHTML = '<div class="jv-caja" role="dialog" aria-modal="true" aria-labelledby="jvT"><h2 id="jvT"></h2><p></p>'+
    (hay ? '<input type="password" inputmode="numeric" autocomplete="off" aria-label="Código"><div class="err" role="alert"></div>' : '')+
    '<div class="bts"><button type="button" class="no"></button><button type="button" class="si"></button></div></div>';
  var caja = velo.querySelector('.jv-caja'), inp = velo.querySelector('input'), err = velo.querySelector('.err');
  velo.querySelector('h2').textContent = o.titulo || '🔐 Código para guardar';
  velo.querySelector('p').textContent = hay ? (o.texto || 'Sin el código puedes mirar y probar todo, pero no se guarda nada. Con el código se guarda durante 30 minutos.')
    : 'Todavía no has creado el código. Entra y créalo en el Panel del profe → 🔐 Código.';
  velo.querySelector('.si').textContent = hay ? '🔓 Entrar' : '🔓 Entrar y crearlo';
  velo.querySelector('.no').textContent = o.textoCancelar || 'Solo mirar';
  function cerrar(){ velo.remove(); modalAbierto = false; }
  function probar(){
    if(!hay){ abrirLlave(); cerrar(); (o.alAcertar || function(){ location.reload(); })(); return; }
    var v = inp.value.trim(); if(!v){ inp.focus(); return; }
    huella(v).then(function(h){
      if(h===codigoGuardado()){ abrirLlave(); cerrar(); (o.alAcertar || function(){ location.reload(); })(); }
      else { err.textContent = 'Código incorrecto'; inp.value = ''; caja.classList.remove('mal'); void caja.offsetWidth; caja.classList.add('mal'); inp.focus(); }
    }).catch(function(){ err.textContent = 'Este navegador no puede comprobar el código.'; });
  }
  velo.querySelector('.si').addEventListener('click', probar);
  velo.querySelector('.no').addEventListener('click', function(){ cerrar(); if(o.alCancelar) o.alCancelar(); });
  if(inp) inp.addEventListener('keydown', function(e){ if(e.key==='Enter') probar(); });
  document.body.appendChild(velo);
  if(inp) setTimeout(function(){ inp.focus(); }, 50);
}
/* crea o cambia el código (desde el Panel del profe). Solo con la llave abierta o si aún no hay código. */
function fijarCodigo(nuevo){
  if(hayCodigo() && DEMO) return Promise.reject(new Error('Primero entra con el código actual.'));
  return huella(nuevo).then(function(h){
    var p = { id:idMov(), alumno:'AJUSTES', accion:'Ajuste', cartaId:'codigo', tipo:h, carta:'', t:Date.now() };
    pendientes.push(p); guardarPend(); guardarLocal('javi-codigo', h);
    if(!PRUEBA_FIJA){
      var e = REGISTRO.entradas, body = new URLSearchParams();
      body.set(e.alumno, p.alumno); body.set(e.accion, p.accion); body.set(e.cartaId, p.cartaId); body.set(e.tipo, p.tipo); body.set(e.carta, p.id);
      fetch(REGISTRO.formAction, { method:'POST', mode:'no-cors', body:body }).catch(function(){});
    }
    return h;
  });
}
/* ============================================================
   CÓDIGO DE CLASE (privacidad): para VER a los alumnos de una clase hay que escribir
   su código sencillo: el curso y la letra (4ºA → «4A», 3ºB → «3B»).
   Vale en esa pestaña del navegador hasta que se cierra (sessionStorage).
   Con la llave de guardar abierta, todas las clases están abiertas.
   Uso: JAVI.protegerClase(grupo, { alAbrir:fn, cambiar:fn(otroGrupo), otras:[grupos que ofrecer] })
   ============================================================ */
function codigoClase(g){ return String(g).replace(/[º°ª\s]/g,'').toUpperCase(); }
function claseAbierta(g){
  if(PRUEBA_FIJA && !PROBAR_CANDADO) return true;
  if(llave()) return true;
  try{ return sessionStorage.getItem('javi-clase|'+codigoClase(g))==='1'; }catch(e){ return false; }
}
var veloClase = null;
var CSS_CLASE =
  'body.jv-cerrado > *:not(.jv-velo):not(.jv-pill):not(.jv-veloClase):not(script):not(style){filter:blur(18px);pointer-events:none;user-select:none}'+
  '.jv-veloClase{position:fixed;inset:0;z-index:9990;display:grid;place-items:center;padding:16px;background:rgba(5,10,16,.35)}'+
  '.jv-veloClase .jv-caja .clases{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-top:12px}'+
  '.jv-veloClase .jv-caja .clases button{font:700 14px/1 system-ui,sans-serif;padding:8px 12px;border-radius:10px;border:2px solid #b8934f;background:#fffaf0;color:#3a2a16;cursor:pointer}';
function protegerClase(g, o){
  o = o || {};
  if(veloClase){ veloClase.remove(); veloClase = null; }
  if(claseAbierta(g)){ document.body.classList.remove('jv-cerrado'); if(o.alAbrir) o.alAbrir(); return true; }
  if(!document.getElementById('jvCssClase')){ var c = document.createElement('style'); c.id = 'jvCssClase'; c.textContent = CSS_LLAVE+CSS_CLASE; document.head.appendChild(c); }
  document.body.classList.add('jv-cerrado');
  var otras = o.cambiar ? (o.otras || gruposVisibles()).filter(function(x){ return x!==g; }) : [];
  veloClase = document.createElement('div'); veloClase.className = 'jv-veloClase';
  veloClase.innerHTML = '<div class="jv-caja" role="dialog" aria-modal="true" aria-labelledby="jvCT"><h2 id="jvCT"></h2>'+
    '<p>Para ver a los alumnos, escribe el código de la clase.</p>'+
    '<input type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="6" aria-label="Código de la clase"><div class="err" role="alert"></div>'+
    '<div class="bts"><button type="button" class="no">← Volver</button><button type="button" class="si">🔓 Entrar</button></div>'+
    (otras.length ? '<div class="clases">'+otras.map(function(x){ return '<button type="button" data-g="'+x+'">'+x+'</button>'; }).join('')+'</div>' : '')+'</div>';
  veloClase.querySelector('h2').textContent = '🔒 '+g;
  var inp = veloClase.querySelector('input'), err = veloClase.querySelector('.err'), caja = veloClase.querySelector('.jv-caja');
  function probar(){
    if(codigoClase(inp.value)===codigoClase(g)){
      try{ sessionStorage.setItem('javi-clase|'+codigoClase(g), '1'); }catch(e){}
      veloClase.remove(); veloClase = null; document.body.classList.remove('jv-cerrado');
      if(o.alAbrir) o.alAbrir();
    } else { err.textContent = 'Ese no es el código de '+g+'.'; inp.value = ''; caja.classList.remove('mal'); void caja.offsetWidth; caja.classList.add('mal'); inp.focus(); }
  }
  veloClase.querySelector('.si').addEventListener('click', probar);
  veloClase.querySelector('.no').addEventListener('click', function(){ volver(); });
  inp.addEventListener('keydown', function(e){ if(e.key==='Enter') probar(); });
  Array.prototype.forEach.call(veloClase.querySelectorAll('[data-g]'), function(b){ b.addEventListener('click', function(){ o.cambiar(b.dataset.g); }); });
  document.body.appendChild(veloClase);
  setTimeout(function(){ inp.focus(); }, 50);
  return false;
}

/* el candado de la esquina y el aviso cada 30 minutos */
function pintarLlave(){
  if((PRUEBA_FIJA && !PROBAR_CANDADO) || /[?&]solo/.test(location.search)) return;
  var css = document.createElement('style'); css.textContent = CSS_LLAVE; document.head.appendChild(css);
  var pill = document.createElement('div'); pill.className = 'jv-pill '+(DEMO ? 'demo' : 'real');
  document.body.appendChild(pill);
  function pintar(){
    if(DEMO){ pill.innerHTML = '<span>👀 Demostración: no se guarda nada</span><button type="button">🔓 Código</button>'; return; }
    var resta = Math.max(0, Math.ceil((llave() + DURACION_LLAVE - Date.now())/60000));
    pill.innerHTML = '<span>🔓 Guardando · '+resta+' min</span><button type="button" title="Cerrar el candado">🔒</button>';
  }
  pill.addEventListener('click', function(e){
    if(!e.target.closest('button')) return;
    if(DEMO) pedirCodigo(); else bloquear();
  });
  pintar();
  if(!DEMO) setInterval(function(){
    pintar();
    if(!llave() && !modalAbierto) pedirCodigo({
      titulo:'⏰ Han pasado 30 minutos', texto:'Escribe el código para seguir guardando. Si no, la página pasa a modo demostración.',
      textoCancelar:'Pasar a demostración', alAcertar:function(){ pintar(); }, alCancelar:function(){ location.reload(); }
    });
  }, 15000);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', pintarLlave); else pintarLlave();

/* ============================================================
   ARRANQUE: JAVI.listo(fn) espera a la lista de alumnos y a la Hoja
   (como mucho 4 s; si la Hoja tarda, arranca con lo que haya).
   ============================================================ */
var esperando = [], preparado = false;
function terminar(){
  if(preparado) return; preparado = true;
  aplicarTema();
  var cod = ajuste('codigo'); if(cod) guardarLocal('javi-codigo', cod);   /* para comprobar el código aunque la Hoja tarde */
  esperando.splice(0).forEach(function(fn){ try{ fn(); }catch(e){ console.error(e); } });
}
var pBase = cargarBase().catch(function(e){ console.warn('Javificación: sin data/alumnos.json', e); });
var pHoja = leerHoja().catch(function(e){ console.warn('Javificación: sin Hoja', e); });
var pHorario = cargarHorario().catch(function(e){ console.warn('Javificación: sin horario', e); });
var pSda = cargarSdaFijas().catch(function(){});
Promise.all([pBase, pHorario, pSda, Promise.race([pHoja, new Promise(function(r){ setTimeout(r, 4000); })])]).then(terminar);
function listo(fn){
  var run = function(){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', fn); else fn(); };
  if(preparado) run(); else esperando.push(run);
}

window.JAVI = {
  BASE:BASE, PRUEBA:PRUEBA, PRUEBA_FIJA:PRUEBA_FIJA, DEMO:DEMO, ES_PROFE:ES_PROFE, REGISTRO:REGISTRO, TEMAS:TEMAS,
  pedirCodigo:pedirCodigo, fijarCodigo:fijarCodigo, protegerClase:protegerClase, claseAbierta:claseAbierta, hayCodigo:hayCodigo, bloquear:bloquear, minutosLlave:function(){ var t = llave(); return t ? Math.ceil((t + DURACION_LLAVE - Date.now())/60000) : 0; },
  listo:listo, leerHoja:leerHoja, filas:filas, escribir:escribir, horaHoja:function(){ return horaCSV; },
  grupo:grupo, grupos:grupos, gruposVisibles:gruposVisibles, AMBITO:AMBITO, conAmbito:conAmbito, volver:volver, destinoVolver:destinoVolver, grupoCompleto:grupoCompleto, cambiarAlumno:cambiarAlumno,
  horario:horario, sesionesDelDia:sesionesDelDia, diaSemana:diaSemana, festivos:festivos, sumarDias:sumarDias, lunesDe:lunesDe,
  planDe:planDe, guardarPlan:guardarPlan, fechasConPlan:fechasConPlan, sdas:sdas, guardarSda:guardarSda, repartirSda:repartirSda, sdaDeSesion:sdaDeSesion,
  darPuntos:darPuntos, quitarPuntos:quitarPuntos, sistemaDe:sistemaDe, claveAlumno:claveAlumno,
  ajuste:ajuste, guardarAjuste:guardarAjuste, temaActual:temaActual, temaAuto:temaAuto, temaDe:temaDe, aplicarTema:aplicarTema,
  pantallaCompleta:pantallaCompleta, enMarco:enMarco, exportarCSV:exportarCSV, botonInicio:botonInicio, avisoPrueba:avisoPrueba,
  util:{ normal:normal, pad:pad, clave:clave, rnd:rnd, idMov:idMov, fechaFila:fechaFila, leerCSV:leerCSV }
};
})();
