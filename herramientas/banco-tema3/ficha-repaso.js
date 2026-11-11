/* Ficha de repaso en casa del Tema 3: agudas, llanas, esdrújulas y reglas de la tilde (Javi, 11/11/2026:
   «hoy no ha habido clase por las inclemencias meteorológicas»; distinta de ficha-agudas y ficha-tilde, para enviar en PDF).
   Uso: node ficha-repaso.js → sda/tema3-lengua-4a/ficha-repaso-casa.html
   Las palabras salen de las comprobadas por generar.js; si alguna no está o no cumple, se para SIN escribir nada.
   Los plurales del ejercicio 5 no están en la lista: se comprueban aquí a mano (sílabas y tónica escritas). */
const fs = require('fs'), path = require('path');
const { W, ERR, SIN_TILDE, TILDES, sep, razon } = require('./generar.js');
if(ERR.length){ console.error('❌ ' + ERR.join('\n')); process.exit(1); }
const E = [], P = w => { const x = W.get(w); if(!x) E.push('sin comprobar: ' + w); return x || { w, sil:[w], t:0, tipo:'?', tilde:false, fin:'?' }; };
const OUT = path.join(__dirname, '../../sda/tema3-lengua-4a');
const sigla = x => ({ aguda:'A', llana:'L', esdrújula:'E' })[x.tipo];
const silT = x => x.sil.map((s, i) => i === x.t ? '<span class="ton resp">' + s + '</span>' : s).join('-');
const conTildeTonica = x => { const s = x.sil.map(SIN_TILDE), M = { a:'á', e:'é', o:'ó', i:'í', u:'ú' }; let j = s[x.t].search(/[aeo]/); if(j < 0) j = s[x.t].search(/[iu]/); s[x.t] = s[x.t].slice(0, j) + M[s[x.t][j]] + s[x.t].slice(j + 1); return s.join(''); };
const ej = (n, t, h) => `<div class="ej"><h2><span class="num">${n}</span>${t}</h2>${h}</div>`;
const lin = k => '<div class="lin"></div>'.repeat(k);
const acaba = x => /[aeiouáéíóúns]$/.test(x.w) ? 'sí' : 'no';

/* 2 · tipos */
const e2 = ['calcetín', 'paraguas', 'teléfono', 'bufanda', 'estómago', 'tortuga', 'pantalón', 'lámpara', 'relámpago', 'caramelo'].map(P);
/* 3 · el camino de la tilde */
const e3 = ['jabalí', 'mantel', 'sartén', 'útil', 'camiseta', 'volcán', 'rápido', 'reloj'].map(P);
/* 4 · detective */
const TXT = 'El sábado preparamos una merienda mágica en el jardín. Comimos melón, un plátano y un poco de limón. Después, debajo de un árbol, hice un dibujo de un dragón con mi lápiz azul en un papel. ¡Fue una tarde fantástica!';
const quitar = ['sábado', 'jardín', 'melón', 'plátano', 'árbol', 'dragón', 'fantástica'], poner = ['merienda', 'azul', 'papel'];
const tk = TXT.toLowerCase().match(/[a-záéíóúüñ]+/g);
tk.filter(w => TILDES.test(w)).forEach(w => { if(!W.has(w)) E.push('texto: ' + w + ' sin comprobar'); });
quitar.concat(poner).forEach(w => { if(!tk.includes(w)) E.push('texto: no aparece ' + w); P(w); });
poner.forEach(w => { if(P(w).tilde) E.push('poner: ' + w + ' ya lleva tilde'); });
quitar.forEach(w => { if(!P(w).tilde) E.push('quitar: ' + w + ' no lleva tilde'); });
const errado = TXT.replace(/[A-Za-záéíóúüñ]+/g, w => quitar.includes(w.toLowerCase()) ? SIN_TILDE(w) : poner.includes(w.toLowerCase()) ? conTildeTonica(P(w.toLowerCase())) : w);
const marcado = TXT.replace(/[A-Za-záéíóúüñ]+/g, w => quitar.includes(w.toLowerCase()) || poner.includes(w.toLowerCase()) ? '<span class="marca">' + w + '</span>' : w);
/* 5 · plurales (comprobados a mano) */
const PL = [
  { s:P('canción'), p:'canciones', sil:['can', 'cio', 'nes'], t:1, tipo:'llana', tilde:false, por:'llana acabada en -s: no lleva tilde (pierde la que tenía)' },
  { s:P('imagen'), p:'imágenes', sil:['i', 'má', 'ge', 'nes'], t:1, tipo:'esdrújula', tilde:true, por:'esdrújula: lleva tilde siempre (gana una tilde)' },
  { s:P('ratón'), p:'ratones', sil:['ra', 'to', 'nes'], t:1, tipo:'llana', tilde:false, por:'llana acabada en -s: no lleva tilde (pierde la que tenía)' },
  { s:P('árbol'), p:'árboles', sil:['ár', 'bo', 'les'], t:0, tipo:'esdrújula', tilde:true, por:'esdrújula: lleva tilde siempre (la conserva)' }
];
PL.forEach(x => { const n = x.sil.length - x.t, tipo = ['aguda', 'llana', 'esdrújula'][n - 1];
  if(x.sil.join('') !== x.p || tipo !== x.tipo || TILDES.test(x.p) !== x.tilde) E.push('plural mal: ' + x.p);
  if(x.tipo === 'llana' && !/[aeiouns]$/.test(x.p)) E.push('plural: ' + x.p); });
if(P('imágenes').tipo !== 'esdrújula') E.push('imágenes');
/* comprobaciones de lo que pide cada ejercicio */
if(e3.filter(x => x.tilde).length < 3 || e3.filter(x => !x.tilde).length < 3) E.push('ej. 3 sin mezcla de con y sin tilde');
['aguda', 'llana', 'esdrújula'].forEach(t => { if(!e2.some(x => x.tipo === t)) E.push('ej. 2 sin ' + t); });
if(E.length){ console.error('❌ ' + E.join('\n')); process.exit(1); }

const RECUERDA = `<div class="recuerda"><div class="caja"><p>La <b>sílaba tónica</b> es la que suena más fuerte. Cuenta desde el final:</p>
<table><tr><td>Aguda</td><td>la última: ca-<b>MIÓN</b>, re-<b>LOJ</b></td></tr><tr><td>Llana</td><td>la penúltima: <b>LÁ</b>-piz, ven-<b>TA</b>-na</td></tr><tr><td>Esdrújula</td><td>la antepenúltima: <b>SÁ</b>-ba-do</td></tr></table></div>
<div class="caja"><p><b>¿Lleva tilde?</b> Mira en qué letra acaba:</p><table><tr><td>Agudas</td><td>sí, si acaban en vocal, -n o -s</td></tr><tr><td>Llanas</td><td>sí, si NO acaban en vocal, -n o -s</td></tr><tr><td>Esdrújulas</td><td>siempre</td></tr></table></div></div>`;

const ficha = [
  ej(1, 'Recuerda', RECUERDA) +
  ej(2, 'Dila en voz alta, sepárala en sílabas, rodea la tónica y escribe A (aguda), L (llana) o E (esdrújula).', `<div class="r5">${e2.map(x => `<div class="hueco"><div class="arriba"><span class="pal">${x.w}</span><span class="n">A · L · E</span></div><span class="lin"></span></div>`).join('')}</div>`) +
  ej(3, 'El camino de la tilde: estas palabras están escritas SIN tilde. Sigue los pasos y escríbelas bien.', `<table class="tabla camino"><tr><th>Palabra</th><th>¿Aguda, llana o esdrújula?</th><th>¿Acaba en vocal, -n o -s?</th><th>¿Lleva tilde?</th><th>Escríbela bien</th></tr>${e3.map(x => `<tr><td class="pal">${SIN_TILDE(x.w)}</td><td></td><td></td><td>sí · no</td><td></td></tr>`).join('')}</table>`),
  ej(4, 'Detective de tildes: en este texto hay 10 errores. Faltan 7 tildes y sobran 3. Rodéalos y escribe las palabras bien.', `<p class="oracion">${errado}</p>${lin(4)}`) +
  ej(5, 'Plurales con sorpresa: escribe el plural. ¿Lleva tilde? Explica por qué.', `<div class="r2">${PL.map(x => `<div class="hueco"><span class="pal">un${x.s.w === 'canción' || x.s.w === 'imagen' ? 'a' : ''} ${x.s.w} → dos</span><span class="lin"></span><span class="lin"></span></div>`).join('')}</div>`) +
  `<div class="ej reto"><h2><span class="num">6</span>Reto en casa: busca por tu casa entre cinco y seis cosas de cada tipo y escríbelas con su tilde si la llevan. ¡No vale repetir las de esta ficha!</h2><table class="tabla"><tr><th>Agudas</th><th>Llanas</th><th>Esdrújulas</th></tr><tr><td class="alta"></td><td class="alta"></td><td class="alta"></td></tr></table></div>`
];
const sol = ej(2, 'Sílabas (tónica subrayada) y tipo', `<div class="r5">${e2.map(x => `<div class="hueco"><span class="pal">${x.w}</span><span>${silT(x)} · <b class="resp">${sigla(x)}</b></span></div>`).join('')}</div>`) +
  ej(3, 'El camino de la tilde', `<table class="tabla camino"><tr><th>Palabra</th><th>Tipo</th><th>¿Vocal, -n o -s?</th><th>¿Tilde?</th><th>Bien escrita</th></tr>${e3.map(x => `<tr><td>${sep(x)}</td><td>${x.tipo}</td><td>${acaba(x)}</td><td>${x.tilde ? 'sí' : 'no'}</td><td class="resp">${x.w}</td></tr>`).join('')}</table>`) +
  ej(4, 'El texto corregido (los 10 errores, marcados)', `<p class="oracion">${marcado}</p><p class="aviso">Faltaban: ${quitar.join(', ')}. Sobraban: ${poner.map(w => w + ' (' + razon(P(w)).toLowerCase().replace(/^es /, '') + ')').join(', ')}.</p>`) +
  ej(5, 'Plurales con sorpresa', PL.map(x => `<p>${x.s.w} → <b class="resp">${x.p}</b> (${x.sil.map((s, i) => i === x.t ? '<span class="ton">' + s + '</span>' : s).join('-')}): ${x.por}.</p>`).join('')) +
  ej(6, 'Reto en casa (respuesta libre)', '<p>Ejemplos: agudas <span class="resp">sofá, cojín, sartén, colchón</span> · llanas <span class="resp">mesa, ventana, lápiz, azúcar</span> · esdrújulas <span class="resp">lámpara, teléfono, bolígrafo, sábana</span>.</p>');

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Ficha para familias · Repaso en casa: las tildes</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&family=EB+Garamond:wght@500;600;700&family=Andika:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../comun/ficha.css">
<style>
/* generado con herramientas/banco-tema3/ficha-repaso.js: no editar a mano */
.r5{display:grid;grid-template-columns:repeat(5,1fr);gap:2mm}
.r2{display:grid;grid-template-columns:repeat(2,1fr);gap:2mm}
.ficha .lin{height:9mm}
.ej > .lin{border-bottom:1.5px dotted var(--linea)}
.ficha .r2 .hueco{min-height:22mm}
.ton{text-decoration:underline;text-decoration-thickness:2px;font-weight:700}
.tabla td.alta{height:24mm}
.reto .tabla td.alta{height:62mm;vertical-align:top;background:repeating-linear-gradient(transparent 0 9.5mm,#d9c79a 9.5mm 10mm)}
.camino td{height:9.5mm;font-size:11.5pt}
.camino td.pal{font-family:'Andika',sans-serif;font-size:13pt;font-weight:700}
.camino th{font-size:10pt}
.oracion{font-size:13.5pt;line-height:1.6}
.aviso{font-size:10.5pt}
.sol .oracion .marca{outline-width:1.5px}
.sol .oracion{line-height:1.9}
.sol .camino td{height:auto;padding:1mm 2mm;font-size:10.5pt}
@media print{.recuerda{grid-template-columns:1.1fr 1fr}}
</style>
</head>
<body>
<nav class="barra">
  <a href="../?id=tema3-lengua-4a" id="bVolver">← Volver</a>
  <button class="prim" type="button" id="pFicha">🖨️ Imprimir la ficha</button>
  <button type="button" id="pSol">🖨️ Imprimir las soluciones</button>
  <button type="button" id="pAmbas">🖨️ Las dos</button>
</nav>
<section class="hoja ficha">
  <header class="cabecera"><span class="buho" aria-hidden="true">🦉</span><div><h1>Repaso en casa: las tildes</h1><div class="sub">Lengua · Tema 3 · Agudas, llanas, esdrújulas y reglas de acentuación</div></div><span class="esp"></span><div class="sello">CEIP Arias Montano<br>4ºA</div></header>
  <div class="datos"><span>Nombre:</span><span class="corto">Fecha:</span></div>
  <div class="nota">Estimadas familias: hoy no hemos podido tener clase por el mal tiempo. Para no perder el ritmo, os envío esta ficha de repaso de lo que estamos trabajando: los tipos de palabras según su sílaba tónica y cuándo llevan tilde. Un truco: decid la palabra en voz alta, como si llamarais a alguien desde lejos, para oír qué sílaba suena más fuerte, y después contad desde el final. Gracias por vuestra colaboración. Javi, tutor de 4ºA.</div>
  ${ficha[0]}
  <footer class="pie"><span>Javificación · Ficha para familias</span><span>Sigue por detrás ➜</span></footer>
</section>
<section class="hoja ficha">
  <header class="cabecera"><span class="buho" aria-hidden="true">🦉</span><div><h1>Repaso en casa: las tildes</h1><div class="sub">Segunda cara</div></div><span class="esp"></span><div class="sello">CEIP Arias Montano<br>4ºA</div></header>
  ${ficha[1]}
  <footer class="pie"><span>Javificación · Ficha para familias</span><span>¡Buen trabajo! 🦉</span></footer>
</section>
<section class="hoja sol">
  <header class="cabecera"><span class="buho" aria-hidden="true">🔑</span><div><h1>Soluciones · Repaso en casa: las tildes</h1><div class="sub">Ficha para familias · Lengua · Tema 3</div></div><span class="esp"></span><div class="sello">Soluciones</div></header>
  ${sol}
  <footer class="pie"><span>Javificación · Soluciones</span><span>LCL.2.9.1 · LCL.2.9.2</span></footer>
</section>
<script src="../comun/ficha.js"></script>
<script src="../comun/barra.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(OUT, 'ficha-repaso-casa.html'), html);
console.log('✅ ficha-repaso-casa.html');
