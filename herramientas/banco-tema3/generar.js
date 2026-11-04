/* Genera data/copa/tema3-evaluacion.txt (Tema 3 de Lengua, 4º, «Inspirar y espirar») con el MISMO formato que el banco del Tema 2.
   Uso: node generar.js   (si alguna palabra no pasa la comprobación, se para y no escribe nada)
   Bloque A (80 %): acentuación en 6 niveles (el nivel va en el tema: «Acentuación 1 · …» … «Acentuación 6 · …»).
   Bloque B (20 %): lectura, clases de nombres, cortesía y personajes de la narración (resto.txt).
   Comprobación: separación silábica con un separador automático, sílaba tónica (por la tilde o por la regla), tipo de palabra,
   tilde según la regla, sin hiatos, sin monosílabos y sin -y final; cada pregunta se vuelve a comprobar al escribirla. */
const fs = require('fs'), path = require('path');
const P = require('./palabras.js');

/* ---------- separador silábico ---------- */
const VOC = 'aeiouáéíóúü', FUERTE = 'aeoáéóíú';           /* í y ú con tilde rompen el diptongo (hiato): no las queremos */
const esV = c => VOC.includes(c);
const SIN_TILDE = s => s.normalize('NFD').replace(/[̀́]/g, '').normalize('NFC');
const TILDES = /[áéíóú]/;
const INSEP = ['pl','pr','bl','br','cl','cr','dr','fl','fr','gl','gr','tr'];
function unidades(w){
  const u = [];
  for(let i = 0; i < w.length; i++){
    const c = w[i], n = w[i+1], n2 = w[i+2];
    if((c === 'q' || c === 'g') && n === 'u' && 'eéií'.includes(n2 || '#')){ u.push({ v:false, s:c+'u' }); i++; continue; }
    if((c === 'c' && n === 'h') || (c === 'l' && n === 'l') || (c === 'r' && n === 'r')){ u.push({ v:false, s:c+n }); i++; continue; }
    u.push({ v:esV(c), s:c });
  }
  return u;
}
function silabear(w){
  const u = unidades(w), nucleos = [];             /* nucleos: [ini, fin] en u */
  for(let i = 0; i < u.length; i++){
    if(!u[i].v) continue;
    const ult = nucleos[nucleos.length-1];
    if(ult && ult[1] === i-1 && !(FUERTE.includes(u[i-1].s) && FUERTE.includes(u[i].s))) ult[1] = i;
    else nucleos.push([i, i]);
  }
  if(!nucleos.length) return [w];
  const cortes = [];                               /* índice en u donde empieza cada sílaba (menos la primera) */
  for(let k = 1; k < nucleos.length; k++){
    const a = nucleos[k-1][1] + 1, b = nucleos[k][0], cs = u.slice(a, b).map(x => x.s), n = cs.length;
    let corte;
    if(n <= 1) corte = a;
    else if(n === 2) corte = INSEP.includes(cs[0] + cs[1]) ? a : a + 1;
    else if(n === 3) corte = INSEP.includes(cs[1] + cs[2]) ? a + 1 : a + 2;
    else corte = a + 2;
    cortes.push(corte);
  }
  const sil = []; let ini = 0;
  cortes.concat([u.length]).forEach(c => { sil.push(u.slice(ini, c).map(x => x.s).join('')); ini = c; });
  return sil;
}
const final = w => { const c = SIN_TILDE(w).slice(-1); return 'aeiou'.includes(c) ? 'vocal' : c === 'n' ? 'n' : c === 's' ? 's' : 'otra'; };
const TIPOS = ['aguda', 'llana', 'esdrújula'];
const lleva = (tipo, fin) => tipo === 'esdrújula' ? true : tipo === 'aguda' ? fin !== 'otra' : fin === 'otra';

/* ---------- comprobación de cada palabra ---------- */
const ERR = [], W = new Map();
/* antes, el propio separador contra casos difíciles conocidos */
Object.entries({ 'instante':'ins-tan-te', 'obstruir':'obs-truir', 'perro':'pe-rro', 'chocolate':'cho-co-la-te', 'queso':'que-so', 'guitarra':'gui-ta-rra', 'agua':'a-gua',
   'cigüeña':'ci-güe-ña', 'examen':'e-xa-men', 'ahora':'a-ho-ra', 'poeta':'po-e-ta', 'cuidado':'cui-da-do', 'transporte':'trans-por-te',
   'hablar':'ha-blar', 'abrazo':'a-bra-zo', 'construir':'cons-truir', 'aire':'ai-re', 'peine':'pei-ne', 'ciudad':'ciu-dad', 'izquierda':'iz-quier-da' })
  .forEach(([w, s]) => { if(silabear(w).join('-') !== s) ERR.push('separador: ' + w + ' → ' + silabear(w).join('-') + ' (debería ser ' + s + ')'); });
const SOLO_TEXTO = new Set(['explicó', 'preparé', 'guardé', 'guardó']);   /* sin la tilde también existen (explico, prepare…): solo en textos */
function alta(anot, grupo){
  const sil = anot.split('-'), t = sil.findIndex(s => s[0] === '^'), limpio = sil.map(s => s.replace('^', '')), w = limpio.join('');
  const e = m => ERR.push(anot + ': ' + m);
  if(t < 0 || sil.filter(s => s[0] === '^').length !== 1) return e('marca la sílaba tónica con un solo ^');
  if(limpio.length < 2) e('monosílabo');
  if(/y$/.test(w)) e('acaba en -y');
  const auto = silabear(w);
  if(auto.join('-') !== limpio.join('-')) e('separación «' + limpio.join('-') + '» y el separador dice «' + auto.join('-') + '»');
  /* hiatos: vocal al final de una sílaba y vocal al principio de la siguiente, o í/ú junto a otra vocal */
  for(let i = 0; i < limpio.length - 1; i++) if(esV(limpio[i].slice(-1)) && esV(limpio[i+1].replace(/^h/, '')[0])) e('hiato');
  if(/[íú][aeiouáéó]|[aeiouáéó][íú]/.test(w.replace(/([qg])u(?=[eéií])/g, '$1'))) e('hiato con í/ú');   /* la u de que/qui/gue/gui no suena */
  const conTilde = TILDES.test(w), fin = final(w);
  const tDer = conTilde ? limpio.findIndex(s => TILDES.test(s)) : (fin === 'otra' ? limpio.length - 1 : limpio.length - 2);
  if(tDer !== t) e('la sílaba tónica marcada (' + limpio[t] + ') no coincide con la que dice la ortografía (' + limpio[tDer] + ')');
  const pos = limpio.length - 1 - t, tipo = pos === 0 ? 'aguda' : pos === 1 ? 'llana' : pos === 2 ? 'esdrújula' : 'sobresdrújula';
  if(tipo === 'sobresdrújula') e('sobresdrújula');
  if(lleva(tipo, fin) !== conTilde) e('la tilde no cumple la regla (' + tipo + ', acaba en ' + fin + ')');
  if(W.has(w)) e('repetida');
  W.set(w, { w, sil:limpio, t, tipo, tilde:conTilde, fin, grupo, diptongo:limpio.some(s => (s.match(/[aeiouáéíóúü]/g) || []).length > 1), soloTexto:SOLO_TEXTO.has(w) });
}
Object.keys(P).forEach(g => P[g].forEach(a => alta(a, g)));
/* palabras que salen en los textos (también comprobadas) */
['iz-^quier-da','de-^re-cha','es-^pa-cio','^par-te','pe-^que-ño','^la-do','ac-ti-vi-^dad','^fuer-te','pro-fun-da-^men-te','ins-^tan-tes','sen-^tir','a-di-cio-^nal',
 '^má-gi-ca','a-^brió','po-^cio-nes','ex-^tra-ño','guar-^dó','be-^ber','lu-^gar','es-ti-^rar','par-^ti-do','^fres-co','pe-^que-ña','^ma-go','^cla-se','pro-fe-^sor','^to-dos','e-^xá-me-nes','^jó-ve-nes']
  .forEach(a => alta(a, 'texto'));
/* palabras EXTRA (solo para las interactivas): escritas por tipo; la separación y la tónica las calcula el separador y tienen que dar
   el MISMO tipo que la lista en la que están (dos fuentes que se comprueban entre sí). Las repetidas se saltan. */
{ const X = require('./palabras-extra.js'), esperado = { aguda:'aguda', agudaSin:'aguda', llana:'llana', llanaCon:'llana', esdrujula:'esdrújula' };
  Object.keys(X).forEach(l => X[l].forEach(w => {
    if(W.has(w)) return;
    const sil = silabear(w), conT = TILDES.test(w), t = conT ? sil.findIndex(x => TILDES.test(x)) : (final(w) === 'otra' ? sil.length - 1 : sil.length - 2);
    const pos = sil.length - 1 - t, tipo = pos === 0 ? 'aguda' : pos === 1 ? 'llana' : pos === 2 ? 'esdrújula' : '?';
    if(tipo !== esperado[l]) return ERR.push('extra «' + w + '»: el separador dice ' + sil.join('-') + ' (' + tipo + ') y está en la lista de ' + esperado[l]);
    if((l === 'agudaSin' && conT) || (l === 'aguda' && !conT) || (l === 'llana' && conT) || (l === 'llanaCon' && !conT)) return ERR.push('extra «' + w + '»: tilde que no toca a su lista');
    alta(sil.map((x, i) => (i === t ? '^' : '') + x).join('-'), 'extra');
  })); }

/* ---------- utilidades ---------- */
let semilla = 20261104;
const rnd = () => { semilla |= 0; semilla = semilla + 0x6D2B79F5 | 0; let t = Math.imul(semilla ^ semilla >>> 15, 1 | semilla); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const mezcla = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const toma = (a, n) => { const m = mezcla(a); if(m.length < n) throw new Error('faltan palabras: hay ' + m.length + ', hacen falta ' + n); return m.slice(0, n); };
const sep = x => x.sil.join('-');
const sepT = x => x.sil.map((s, i) => i === x.t ? SIN_TILDE(s).toUpperCase() : SIN_TILDE(s)).join('-');   /* ca-MION (sin tildes, la tónica en mayúsculas) */
const posTxt = { aguda:'la última', llana:'la penúltima', esdrújula:'la antepenúltima' };
const finTxt = x => x.fin === 'vocal' ? 'en vocal' : x.fin === 'otra' ? 'en -' + SIN_TILDE(x.w).slice(-1) : 'en -' + x.fin;
function razon(x){
  if(x.tipo === 'esdrújula') return 'Es esdrújula: las esdrújulas llevan tilde siempre';
  if(x.tipo === 'aguda') return x.tilde ? 'Es aguda y acaba ' + finTxt(x) : 'Es aguda, pero no acaba en vocal, -n ni -s';
  return x.tilde ? 'Es llana y no acaba en vocal, -n ni -s' : 'Es llana y acaba ' + finTxt(x);
}
const expRegla = x => sep(x) + ': tónica «' + x.sil[x.t] + '», ' + posTxt[x.tipo] + ' sílaba → ' + x.tipo + '. ' + razon(x) + (x.tipo === 'esdrújula' ? '.' : x.tilde ? ' → lleva tilde.' : ' → no lleva tilde.');
const pool = f => [...W.values()].filter(x => x.grupo !== 'texto' && x.grupo !== 'extra' && f(x));   /* el banco no cambia con las extra */
/* cartas.js usa las mismas palabras comprobadas: si lo carga otro script, aquí se para (no genera el banco) */
module.exports = { W, ERR, SIN_TILDE, TILDES, sep, razon };
if(require.main !== module) return;

/* ---------- preguntas ---------- */
const Q = [];
const TOP = ['', 'Acentuación 1 · Sílabas y sílaba tónica', 'Acentuación 2 · Agudas, llanas y esdrújulas', 'Acentuación 3 · ¿Lleva tilde?',
  'Acentuación 4 · Pon la tilde', 'Acentuación 5 · ¿Por qué lleva tilde?', 'Acentuación 6 · Repaso con textos'];
function op(n, p, ok, malas, o){ o = o || {};
  const ops = mezcla([{ t:ok, ok:true }].concat(malas.map(t => ({ t, ok:false }))));
  if(new Set(ops.map(x => x.t)).size !== ops.length) throw new Error('opciones repetidas: ' + p);
  Q.push(Object.assign({ n, topic:TOP[n], tipo:'opcion', p, ops, crit:'9.1' }, o)); }

/* NIVEL 1 · separar en sílabas y sílaba tónica (sin diptongos, 3 o más sílabas) */
const n1 = pool(x => !x.diptongo && !x.soloTexto && x.sil.length >= 3 && new Set(x.sil).size === x.sil.length);
/* la tónica se pregunta con palabras SIN tilde (con tilde se ve la respuesta) */
const n1t = toma(n1.filter(x => !x.tilde), 10), n1a = toma(n1.filter(x => !n1t.includes(x)), 10).concat(n1t);
n1a.slice(0, 10).forEach(x => {
  const malas = new Set();
  for(let i = 0; i < x.sil.length - 1; i++){
    const a = x.sil.slice(), b = a.slice();
    if(a[i].length > 1){ a[i+1] = a[i].slice(-1) + a[i+1]; a[i] = a[i].slice(0, -1); }
    if(b[i+1].length > 1){ b[i] = b[i] + b[i+1][0]; b[i+1] = b[i+1].slice(1); }
    [a, b].forEach(v => { if(v.every(s => /[aeiouáéíóú]/.test(s))) malas.add(v.join('-')); });
  }
  for(let i = 0; i < x.sil.length - 1; i++){ const c = x.sil.slice(); c.splice(i, 2, c[i] + c[i+1]); malas.add(c.join('-')); }   /* dos sílabas juntas */
  malas.delete(sep(x));
  op(1, '¿Cómo se separa en sílabas la palabra «' + x.w + '»?', sep(x), mezcla([...malas]).slice(0, 3), { dif:1, exp:sep(x) + ': ' + x.sil.length + ' sílabas.' });
});
n1a.slice(10).forEach(x => op(1, '¿Cuál es la sílaba tónica de «' + x.w + '»? (la que suena más fuerte)', x.sil[x.t], x.sil.filter((s, i) => i !== x.t).slice(0, 3),
  { dif:1, exp:sep(x) + ': la sílaba tónica es «' + x.sil[x.t] + '».' }));

/* NIVEL 2 · clasificar (primero con tilde, luego sin tilde, luego «¿cuál es…?») */
const ok2 = x => !x.soloTexto;
toma(pool(x => ok2(x) && x.tilde), 12).forEach(x => op(2, 'La palabra «' + x.w + '» es…', x.tipo, TIPOS.filter(t => t !== x.tipo), { dif:1, exp:sep(x) + ': la sílaba tónica es ' + posTxt[x.tipo] + ' → ' + x.tipo + '.' }));
toma(pool(x => ok2(x) && !x.tilde), 10).forEach(x => op(2, 'La palabra «' + x.w + '» (no lleva tilde) es…', x.tipo, TIPOS.filter(t => t !== x.tipo), { dif:2, exp:sep(x) + ': la sílaba tónica es «' + x.sil[x.t] + '», ' + posTxt[x.tipo] + ' → ' + x.tipo + '.' }));
['esdrújula', 'aguda', 'llana', 'esdrújula', 'aguda', 'llana', 'aguda', 'llana'].forEach(t => {
  const bien = toma(pool(x => ok2(x) && x.tipo === t), 1)[0], malas = toma(pool(x => ok2(x) && x.tipo !== t), 3);
  op(2, '¿Cuál de estas palabras es ' + t + '?', bien.w, malas.map(x => x.w), { dif:2, exp:sep(bien) + ' es ' + t + '. ' + malas.map(x => x.w + ': ' + x.tipo).join(' · ') + '.' });
});

/* NIVEL 3 · ¿lleva tilde? (se da la sílaba tónica en mayúsculas y la palabra sin tilde) */
const n3s = toma(pool(x => !x.soloTexto && x.tilde), 15), n3n = toma(pool(x => !x.soloTexto && !x.tilde), 15);
mezcla(n3s.concat(n3n)).forEach(x => op(3, 'Lee en voz alta: «' + sepT(x) + '» (la sílaba tónica va en MAYÚSCULAS). ¿Lleva tilde?',
  x.tilde ? 'Sí: se escribe «' + x.w + '»' : 'No: se escribe «' + x.w + '»', [x.tilde ? 'No: se escribe «' + SIN_TILDE(x.w) + '»' : 'Sí: se escribe «' + conTildeEn(x, x.t) + '»'],
  { dif:2, exp:expRegla(x) }));
/* la palabra con tilde en la sílaba i: en la vocal abierta (a, e, o) y, si no hay, en la i o la u */
function conTildeEn(x, i){ const s = x.sil.map(SIN_TILDE), M = { a:'á', e:'é', o:'ó', i:'í', u:'ú' };
  let j = s[i].search(/[aeo]/); if(j < 0) j = s[i].search(/[iu]/); s[i] = s[i].slice(0, j) + M[s[i][j]] + s[i].slice(j + 1); return s.join(''); }
const variantes = x => { const v = new Set([SIN_TILDE(x.w)]); x.sil.forEach((s, i) => v.add(conTildeEn(x, i))); v.delete(x.w); return [...v].filter(m => !W.has(m)); };

/* NIVEL 4 · poner la tilde / bien o mal escrita (criterio 9.2: revisar lo escrito) */
toma(pool(x => !x.soloTexto && x.tilde), 10).forEach(x => Q.push({ n:4, topic:TOP[4], tipo:'completar', p:'Escribe bien esta palabra, con la tilde que le falta: «' + SIN_TILDE(x.w) + '»', r:x.w, dif:2, crit:'9.2', exp:expRegla(x) }));
toma(pool(x => !x.soloTexto && x.sil.length >= 3), 8).forEach(x => op(4, '¿Cuál está bien escrita?', x.w, toma(variantes(x), 3), { dif:2, crit:'9.2', exp:expRegla(x) }));
for(let k = 0; k < 7; k++){
  const mal = toma(pool(x => !x.soloTexto), 1)[0], buenas = toma(pool(x => !x.soloTexto && x !== mal), 3), errada = x => x.tilde ? SIN_TILDE(x.w) : conTildeEn(x, x.t);
  op(4, '¿Qué palabra está MAL escrita?', errada(mal), buenas.map(x => x.w), { dif:2, crit:'9.2', exp:'Se escribe «' + mal.w + '». ' + expRegla(mal) });
}

/* NIVEL 5 · ¿por qué? */
const RAZ_SI = ['Es aguda y acaba en vocal', 'Es aguda y acaba en -n', 'Es aguda y acaba en -s', 'Es llana y no acaba en vocal, -n ni -s', 'Es esdrújula: las esdrújulas llevan tilde siempre'];
const RAZ_NO = ['Es aguda, pero no acaba en vocal, -n ni -s', 'Es llana y acaba en vocal', 'Es llana y acaba en -n', 'Es llana y acaba en -s', 'Es esdrújula y por eso no lleva tilde'];
toma(pool(x => !x.soloTexto && x.tilde), 13).forEach(x => { const r = razon(x); if(!RAZ_SI.includes(r)) throw new Error('razón rara: ' + r);
  op(5, '¿Por qué lleva tilde «' + x.w + '»?', r, toma(RAZ_SI.filter(y => y !== r), 3), { dif:3, exp:expRegla(x) }); });
toma(pool(x => !x.soloTexto && !x.tilde), 12).forEach(x => { const r = razon(x); if(!RAZ_NO.includes(r)) throw new Error('razón rara: ' + r);
  op(5, '¿Por qué NO lleva tilde «' + x.w + '»?', r, toma(RAZ_NO.filter(y => y !== r), 3), { dif:3, exp:expRegla(x) }); });

/* NIVEL 6 · textos */
const TEXTOS = [
  { id:'ej18', t:'Los pulmones son unos órganos que están en el tórax. El pulmón de la parte izquierda del cuerpo es un poco más pequeño que el de la derecha, pues este espacio adicional en el lado izquierdo da cabida al corazón. Es fácil sentir nuestros pulmones en acción si inspiramos y espiramos profundamente, pues se hinchan y se deshinchan. Además, si corremos o hacemos una actividad física fuerte nuestra respiración puede acelerarse por unos instantes.' },
  { id:'hp', t:'Un joven mago guardó su varita mágica y abrió el libro de pociones. En el caldero, la poción echaba un humo verde muy extraño. El profesor explicó un hechizo fácil, pero el mago estaba nervioso y lo hizo al revés. Al final, una lechuza voló sobre el castillo y todos aplaudieron: ¡la clase fue fantástica!' },
  { id:'cuerpo', t:'Cuando jugamos al fútbol, el corazón late deprisa y respiramos con rapidez. El oxígeno entra por la nariz y llega hasta los pulmones. Después del partido, es útil beber agua, estirar cada músculo y relajar el cuerpo en un lugar fresco.' },
  { id:'cole', t:'El miércoles preparé la mochila: guardé el lápiz, el estuche y el cuaderno de gramática. También metí una lámpara pequeña para leer en el jardín. Tengo muchas ganas de que llegue el sábado.' }
];
const tokens = t => t.toLowerCase().match(/[a-záéíóúüñ]+/g);
TEXTOS.forEach(T => {
  const tk = tokens(T.t), conT = tk.filter(w => TILDES.test(w));
  conT.forEach(w => { if(!W.has(w) && !(T.id === 'ej18' && w === 'más')) ERR.push('texto ' + T.id + ': «' + w + '» lleva tilde y no está comprobada'); });
  const enL = [...new Set(tk)].filter(w => W.has(w) && W.get(w).grupo !== 'extra').map(w => W.get(w)), n = conT.length;
  /* a) cuántas tildes */
  op(6, '¿Cuántas palabras con tilde hay en el texto?', String(n), [n - 2, n - 1, n + 1].filter(v => v > 0).map(String), { dif:3, texto:T.t, exp:'Llevan tilde: ' + conT.join(', ') + ' (' + n + ').' });
  /* b) tipo de dos palabras del texto */
  toma(enL.filter(x => x.w !== 'más'), 2).forEach(x => op(6, 'En el texto aparece «' + x.w + '». Esta palabra es…', x.tipo, TIPOS.filter(t => t !== x.tipo), { dif:3, texto:T.t, exp:sep(x) + ': ' + x.tipo + '.' }));
  /* c) ¿cuál es esdrújula? (o aguda si no hay esdrújulas suficientes) */
  const tipoC = enL.some(x => x.tipo === 'esdrújula') ? 'esdrújula' : 'aguda', bien = toma(enL.filter(x => x.tipo === tipoC), 1)[0];
  op(6, '¿Cuál de estas palabras del texto es ' + tipoC + '?', bien.w, toma(enL.filter(x => x.tipo !== tipoC), 3).map(x => x.w), { dif:3, texto:T.t, exp:sep(bien) + ' es ' + tipoC + '.' });
  /* d) texto sin tildes: ¿cuál debe llevarla? */
  const sinT = T.t.replace(/[a-záéíóúüñ]+/gi, w => W.has(w.toLowerCase()) && !W.get(w.toLowerCase()).soloTexto && W.get(w.toLowerCase()).tilde ? SIN_TILDE(w) : w);
  const falta = toma(enL.filter(x => x.tilde && !x.soloTexto), 1)[0], sinTildeOk = toma(enL.filter(x => !x.tilde), 3);
  op(6, 'En este texto se han borrado algunas tildes. ¿Cuál de estas palabras DEBE llevar tilde?', SIN_TILDE(falta.w), sinTildeOk.map(x => x.w), { dif:3, crit:'9.2', texto:sinT, exp:'Se escribe «' + falta.w + '». ' + expRegla(falta) });
  /* e) ¿por qué lleva tilde? (solo en el texto del libro y en el de Hogwarts, para llegar a 22) */
  if(T.id === 'ej18' || T.id === 'hp'){ const x = toma(enL.filter(y => y.tilde && !y.soloTexto), 1)[0], r = razon(x);
    op(6, 'En el texto, ¿por qué lleva tilde «' + x.w + '»?', r, toma(RAZ_SI.filter(y => y !== r), 3), { dif:3, texto:T.t, exp:expRegla(x) }); }
});

/* ---------- comprobación final de cada pregunta de acentuación ---------- */
Q.forEach(q => {
  const ok = q.ops ? q.ops.filter(o => o.ok) : [];
  if(q.ops && ok.length !== 1) ERR.push('una sola buena: ' + q.p);
  /* «¿Cuál está bien escrita?» y «¿Cuál es aguda/llana/esdrújula?»: las demás opciones NO pueden ser también buenas */
  if(/bien escrita/.test(q.p)) q.ops.filter(o => !o.ok).forEach(o => { if(W.has(o.t)) ERR.push('opción mala que es una palabra buena: ' + o.t); });
  const m = q.p.match(/^¿Cuál de estas palabras(?: del texto)? es (aguda|llana|esdrújula)\?/);
  if(m) q.ops.forEach(o => { const x = W.get(o.t); if(!x) ERR.push('sin comprobar: ' + o.t); else if((x.tipo === m[1]) !== o.ok) ERR.push('mal clasificada: ' + o.t); });
  if(/MAL escrita/.test(q.p)) q.ops.forEach(o => { if(o.ok === W.has(o.t)) ERR.push('mal escrita mal hecha: ' + o.t); });
  if(q.tipo === 'completar' && !W.has(q.r)) ERR.push('respuesta sin comprobar: ' + q.r);
});
if(ERR.length){ console.error('❌ ' + ERR.length + ' errores:\n' + ERR.join('\n')); process.exit(1); }

/* ---------- escribir ---------- */
let out = '', tema = '';
Q.sort((a, b) => a.n - b.n).forEach(q => {
  if(q.topic !== tema){ out += (out ? '\n' : '') + '# Tema 3 | ' + q.topic + '\n\n'; tema = q.topic; }
  out += 'TIPO: ' + q.tipo + '\n' + (q.texto ? 'TEXTO: ' + q.texto + '\n' : '') + 'P: ' + q.p + '\n';
  if(q.ops) q.ops.forEach(o => out += (o.ok ? '* ' : '- ') + o.t + '\n'); else out += 'R: ' + q.r + '\n';
  out += 'DIF: ' + q.dif + '\nCRIT: ' + q.crit + '\nEXP: ' + q.exp + '\n\n';
});
const resto = fs.readFileSync(path.join(__dirname, 'resto.txt'), 'utf8');
fs.writeFileSync(path.join(__dirname, '../../data/copa/tema3-evaluacion.txt'), out + resto.trim() + '\n');
const porN = {}; Q.forEach(q => porN[q.n] = (porN[q.n] || 0) + 1);
console.log('✅ ' + W.size + ' palabras comprobadas · acentuación: ' + Q.length + ' preguntas', porN);
