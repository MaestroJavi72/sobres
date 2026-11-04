/* Fichas para familias del Tema 3 (más difíciles que las del Tema 2, petición de Javi del 4/11/2026).
   Uso: node fichas.js → sda/tema3-lengua-4a/ficha-agudas.html, ficha-tilde.html, ficha-nombres.html
   Las palabras de acentuación salen de las comprobadas por generar.js (sílabas, tónica, tipo y regla); si alguna
   no está o no cumple lo que se pide, se para sin escribir nada. */
const fs = require('fs'), path = require('path');
const { W, ERR, SIN_TILDE, TILDES, sep, razon } = require('./generar.js');
if(ERR.length){ console.error('❌ ' + ERR.join('\n')); process.exit(1); }
const E = [], P = w => { const x = W.get(w); if(!x) E.push('sin comprobar: ' + w); return x || { w, sil:[w], t:0, tipo:'?', tilde:false, fin:'?' }; };
const OUT = path.join(__dirname, '../../sda/tema3-lengua-4a');
const sigla = x => ({ aguda:'A', llana:'L', esdrújula:'E' })[x.tipo];
const silT = x => x.sil.map((s, i) => i === x.t ? '<span class="ton resp">' + s + '</span>' : s).join('-');
const conTildeTonica = x => { const s = x.sil.map(SIN_TILDE), M = { a:'á', e:'é', o:'ó', i:'í', u:'ú' }; let j = s[x.t].search(/[aeo]/); if(j < 0) j = s[x.t].search(/[iu]/); s[x.t] = s[x.t].slice(0, j) + M[s[x.t][j]] + s[x.t].slice(j + 1); return s.join(''); };

function pagina(o){ o.ficha = o.ficha.split('¦'); return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Ficha para familias · ${o.titulo}</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&family=EB+Garamond:wght@500;600;700&family=Andika:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../comun/ficha.css">
<style>
/* generado con herramientas/banco-tema3/fichas.js: no editar a mano */
.r5{display:grid;grid-template-columns:repeat(5,1fr);gap:2mm}
.r4{display:grid;grid-template-columns:repeat(4,1fr);gap:2mm}
.r3{display:grid;grid-template-columns:repeat(3,1fr);gap:2mm}
.r2{display:grid;grid-template-columns:repeat(2,1fr);gap:2mm}
.hueco.alto{min-height:17mm}
.ficha .lin{height:9mm}
.ej > .lin{border-bottom:1.5px dotted var(--linea)}
.ficha .r3 .hueco,.ficha .r2 .hueco{min-height:18mm}
.ton{text-decoration:underline;text-decoration-thickness:2px;font-weight:700}
.tabla td.alta{height:26mm}
.intruso{font-family:'Andika',sans-serif;font-size:12pt;display:flex;gap:4mm;align-items:center;border-bottom:1px dotted var(--linea);padding:1mm 0}
.intruso span{flex:1}
.oracion{font-size:13pt;line-height:1.55}
.ej p.mini,.aviso{font-size:10.5pt}
.sol .oracion .marca{outline-width:1.5px}
.sol .oracion{line-height:1.9}
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
  <header class="cabecera"><span class="buho" aria-hidden="true">🦉</span><div><h1>${o.titulo}</h1><div class="sub">Lengua · Tema 3 · La enfermería de Hogwarts · Ficha de ampliación</div></div><span class="esp"></span><div class="sello">CEIP Arias Montano<br>4ºA</div></header>
  <div class="datos"><span>Nombre:</span><span class="corto">Fecha:</span></div>
  <div class="nota">${o.nota}</div>
  ${o.ficha[0]}
  <footer class="pie"><span>Javificación · Ficha para familias</span><span>Sigue por detrás ➜</span></footer>
</section>
<section class="hoja ficha">
  <header class="cabecera"><span class="buho" aria-hidden="true">🦉</span><div><h1>${o.titulo}</h1><div class="sub">Segunda cara</div></div><span class="esp"></span><div class="sello">CEIP Arias Montano<br>4ºA</div></header>
  ${o.ficha[1]}
  <footer class="pie"><span>Javificación · Ficha para familias</span><span>Soluciones: pídeselas a tu maestro 🦉</span></footer>
</section>
<section class="hoja sol">
  <header class="cabecera"><span class="buho" aria-hidden="true">🔑</span><div><h1>Soluciones · ${o.corto}</h1><div class="sub">Ficha para familias · Lengua · Tema 3</div></div><span class="esp"></span><div class="sello">Para el maestro</div></header>
  ${o.sol}
  <footer class="pie"><span>Javificación · Soluciones</span><span>${o.crit}</span></footer>
</section>
<script src="../comun/ficha.js"></script>
<script src="../comun/barra.js"></script>
</body>
</html>
`; }
const ej = (n, t, h) => `<div class="ej"><h2><span class="num">${n}</span>${t}</h2>${h}</div>`;
const lin = k => '<div class="lin"></div>'.repeat(k);
const RECUERDA = `<div class="recuerda"><div class="caja"><p>La <b>sílaba tónica</b> es la que suena más fuerte. Según dónde esté, la palabra es:</p>
<table><tr><td>Aguda</td><td>la última: co-ra-<b>ZÓN</b>, na-<b>RIZ</b></td></tr><tr><td>Llana</td><td>la penúltima: <b>ÁR</b>-bol, <b>BO</b>-ca</td></tr><tr><td>Esdrújula</td><td>la antepenúltima: <b>MÚ</b>-si-ca</td></tr></table></div>
<div class="caja"><p><b>¿Lleva tilde?</b></p><table><tr><td>Agudas</td><td>sí, si acaban en vocal, -n o -s</td></tr><tr><td>Llanas</td><td>sí, si NO acaban en vocal, -n o -s</td></tr><tr><td>Esdrújulas</td><td>siempre</td></tr></table></div></div>`;

/* ================= FICHA 1 · Agudas, llanas y esdrújulas ================= */
{
  const e2 = ['respiración', 'glándula', 'pulmones', 'nariz', 'murciélago', 'examen', 'césped', 'cuaderno', 'hipogrifo', 'oxígeno'].map(P);
  const e3 = ['sofá', 'reloj', 'ciudad', 'caracol', 'árbol', 'joven', 'origen', 'lápiz', 'carácter', 'cámara', 'pócima', 'esófago'].map(P);
  const e4 = [['camión', 'jardín', 'menú', 'árbol'], ['lápiz', 'examen', 'fácil', 'rápido'], ['música', 'sábado', 'plátano', 'azúcar'], ['nariz', 'reloj', 'cristal', 'origen'], ['mochila', 'ventana', 'escoba', 'papel']]
    .map(f => { const xs = f.map(P), tipos = xs.map(x => x.tipo), intr = xs.filter(x => tipos.filter(t => t === x.tipo).length === 1);
      if(intr.length !== 1) E.push('fila sin un solo intruso: ' + f.join(', ')); return { xs, intr:intr[0], resto:xs.find(x => x !== intr[0]) }; });
  const e6 = [['papel', 'aguda acabada en -l'], ['lápiz', 'llana acabada en -z'], ['murciélago', 'esdrújula de 4 sílabas'], ['examen', 'llana acabada en -n (sin tilde)']].map(([w, d]) => [P(w), d]);
  e6.forEach(([x, d]) => { if(!d.startsWith(x.tipo)) E.push('reto mal: ' + x.w); });
  const ficha = ej(1, 'Recuerda', RECUERDA) +
    ej(2, 'Separa en sílabas, rodea la tónica y escribe A (aguda), L (llana) o E (esdrújula).', `<div class="r5">${e2.map(x => `<div class="hueco"><div class="arriba"><span class="pal">${x.w}</span><span class="n">A · L · E</span></div><span class="lin"></span></div>`).join('')}</div>`) +
    ej(3, 'Clasifica en la tabla. ¡Ojo: no todas llevan tilde!', `<p class="oracion">${e3.map(x => x.w).join(' · ')}</p><table class="tabla"><tr><th>Agudas</th><th>Llanas</th><th>Esdrújulas</th></tr><tr><td class="alta"></td><td class="alta"></td><td class="alta"></td></tr></table>`) +
    '¦' + ej(4, 'El intruso: en cada fila hay una palabra de otro tipo. Rodéala y escribe qué tipo es cada grupo.', e4.map(f => `<div class="intruso"><span>${f.xs.map(x => x.w).join(' · ')}</span><span class="lin" style="border-bottom:1.5px dotted var(--linea);height:6mm"></span></div>`).join('')) +
    ej(5, 'El cuerpo por dentro: escribe una palabra del cuerpo de cada tipo y sepárala en sílabas.', `<div class="r3">${['Aguda', 'Llana', 'Esdrújula'].map(t => `<div class="hueco"><span class="n">${t}</span><span class="lin"></span></div>`).join('')}</div>`) +
    `<div class="ej reto"><h2><span class="num">6</span>Reto: busca una palabra que sea…</h2><p class="mini">${e6.map(([, d], i) => (i + 1) + ') ' + d).join(' &nbsp; ')}</p>${lin(1)}</div>`;
  const sol = ej(2, 'Sílabas (tónica subrayada) y tipo', `<div class="r5">${e2.map(x => `<div class="hueco"><span class="pal">${x.w}</span><span>${silT(x)} · <b class="resp">${sigla(x)}</b></span></div>`).join('')}</div>`) +
    ej(3, 'Tabla', `<table class="tabla"><tr><th>Agudas</th><th>Llanas</th><th>Esdrújulas</th></tr><tr>${['aguda', 'llana', 'esdrújula'].map(t => `<td class="resp">${e3.filter(x => x.tipo === t).map(x => x.w).join(', ')}</td>`).join('')}</tr></table><p class="aviso">Sin tilde y bien escritas: reloj, ciudad, caracol (agudas que no acaban en vocal, -n ni -s) y joven, origen (llanas acabadas en -n).</p>`) +
    ej(4, 'Intrusos', e4.map(f => `<p>${f.xs.map(x => x === f.intr ? '<span class="marca">' + x.w + '</span>' : x.w).join(' · ')} → las demás son <b>${f.resto.tipo}s</b>; el intruso es <b class="resp">${f.intr.tipo}</b>.</p>`).join('')) +
    ej(5, 'El cuerpo (respuesta libre)', `<p>Ejemplos: agudas <span class="resp">pulmón, nariz, corazón</span> · llanas <span class="resp">boca, pierna, cabeza</span> · esdrújulas <span class="resp">músculo, esófago, párpado</span>.</p>`) +
    ej(6, 'Reto (ejemplos)', `<p>${e6.map(([x, d]) => d + ': <span class="resp">' + x.w + '</span> (' + sep(x) + ')').join(' · ')}.</p>`);
  fs.writeFileSync(path.join(OUT, 'ficha-agudas.html'), pagina({ partir:true, titulo:'Agudas, llanas y esdrújulas', corto:'Agudas, llanas y esdrújulas', crit:'LCL.2.9.1', ficha, sol,
    nota:'Estimadas familias: estos días estamos aprendiendo a clasificar las palabras según su sílaba tónica. Esta ficha es un poco más difícil que las del tema anterior. Un truco de clase: «llamad» a la palabra desde lejos para oír qué sílaba se alarga, y después contad desde el final. Gracias por vuestra colaboración. Javi, tutor de 4ºA.' }));
}

/* ================= FICHA 2 · Las reglas de la tilde ================= */
{
  const e2 = ['camión', 'nariz', 'árbol', 'examen', 'música', 'ciudad', 'césped', 'joven', 'azúcar', 'origen', 'pájaro', 'ratón'].map(P);
  const e3 = ['corazón', 'fácil', 'plátano', 'reloj', 'mochila', 'feliz'].map(P);
  const TXT = 'Esta mañana, en el jardín del castillo, el capitán nos ha dado una lección de música. Después hemos merendado un plátano con azúcar. Mi lechuza es joven y un poco débil, pero vuela muy rápido. Por la noche, junto a la lámpara, he escrito un examen de gramática con mi lápiz nuevo.';
  const quitar = ['jardín', 'capitán', 'música', 'plátano', 'débil'], poner = ['lechuza', 'joven', 'examen'];
  const tk = TXT.toLowerCase().match(/[a-záéíóúüñ]+/g);
  tk.filter(w => TILDES.test(w)).forEach(w => { if(!W.has(w)) E.push('texto: ' + w + ' sin comprobar'); });
  quitar.concat(poner).forEach(w => { if(!tk.includes(w)) E.push('texto: no aparece ' + w); P(w); });
  const errado = TXT.replace(/[A-Za-záéíóúüñ]+/g, w => quitar.includes(w.toLowerCase()) ? SIN_TILDE(w) : poner.includes(w.toLowerCase()) ? conTildeTonica(P(w.toLowerCase())) : w);
  const marcado = TXT.replace(/[A-Za-záéíóúüñ]+/g, w => quitar.includes(w.toLowerCase()) || poner.includes(w.toLowerCase()) ? '<span class="marca">' + w + '</span>' : w);
  const ex = P('exámenes'), jo = P('jóvenes'), exa = P('examen'), jov = P('joven');
  const ficha = ej(1, 'Recuerda', RECUERDA) +
    ej(2, 'Cópialas poniendo la tilde SOLO a las que la necesitan.', `<div class="r4">${e2.map(x => `<div class="hueco"><span class="pal">${SIN_TILDE(x.w)}</span><span class="lin"></span></div>`).join('')}</div>`) +
    ej(3, 'Explica por qué lleva o no lleva tilde (tipo + en qué acaba).', `<div class="r2">${e3.map(x => `<div class="hueco"><span class="pal">${x.w}</span><span class="lin"></span></div>`).join('')}</div>`) +
    '¦' + ej(4, 'Detective de tildes: en este texto hay 8 errores (5 tildes que faltan y 3 que sobran). Rodéalos y escríbelos bien.', `<p class="oracion">${errado}</p>${lin(4)}`) +
    ej(5, 'Escribe una oración con una aguda con tilde, una llana acabada en -n y una esdrújula. Subraya las tres.', lin(3)) +
    `<div class="ej reto"><h2><span class="num">6</span>Reto: «examen» no lleva tilde, pero «exámenes» sí. «Joven» no, pero «jóvenes» sí. ¿Por qué?</h2>${lin(2)}</div>`;
  const sol = ej(2, 'Con tilde solo las que la necesitan', `<div class="r4">${e2.map(x => `<div class="hueco"><span class="pal ${x.tilde ? 'resp' : ''}">${x.w}</span><span class="aviso">${x.tilde ? 'lleva tilde' : 'sin tilde'}</span></div>`).join('')}</div>`) +
    ej(3, '¿Por qué?', e3.map(x => `<p><b class="resp">${x.w}</b> (${sep(x)}): ${razon(x)}${x.tipo === 'esdrújula' ? '' : x.tilde ? ' → lleva tilde' : ' → no lleva tilde'}.</p>`).join('')) +
    ej(4, 'El texto corregido (los 8 errores, marcados)', `<p class="oracion">${marcado}</p><p class="aviso">Faltaban: ${quitar.join(', ')}. Sobraban en: ${poner.join(', ')} (${poner.map(w => razon(P(w)).toLowerCase()).join('; ')}).</p>`) +
    ej(5, 'Oración (respuesta libre)', '<p>Ejemplo: «El <span class="resp">capitán</span> <span class="resp">joven</span> preparó una <span class="resp">pócima</span>».</p>') +
    ej(6, 'Reto', `<p>${sep(exa)}: ${razon(exa).toLowerCase()} → sin tilde. Al hacer el plural se añade una sílaba: ${sep(ex)} → ahora es ${ex.tipo} y las esdrújulas llevan tilde siempre. Igual con ${sep(jov)} → ${sep(jo)}.</p>`);
  if(ex.tipo !== 'esdrújula' || jo.tipo !== 'esdrújula' || exa.tilde || jov.tilde) E.push('reto 6 mal');
  fs.writeFileSync(path.join(OUT, 'ficha-tilde.html'), pagina({ partir:true, titulo:'Las reglas de la tilde', corto:'Las reglas de la tilde', crit:'LCL.2.9.1 · LCL.2.9.2', ficha, sol,
    nota:'Estimadas familias: estamos aprendiendo cuándo se pone la tilde. Primero se busca la sílaba tónica y después se mira en qué letra acaba la palabra. Esta ficha es de ampliación, un poco más difícil que las del tema anterior: no pasa nada si alguna cuesta. Gracias por vuestra colaboración. Javi, tutor de 4ºA.' }));
}

/* ================= FICHA 3 · Clases de nombres ================= */
{
  const CONC = ['bolígrafo', 'pulmón', 'lechuza', 'reloj', 'escoba', 'cepillo'], ABS = ['amistad', 'calma', 'miedo', 'sinceridad', 'alegría', 'paciencia'];
  const mezcla = ['amistad', 'bolígrafo', 'calma', 'pulmón', 'miedo', 'lechuza', 'sinceridad', 'reloj', 'alegría', 'escoba', 'paciencia', 'cepillo'];
  const COL = [['músico', 'orquesta'], ['abeja', 'enjambre'], ['oveja', 'rebaño'], ['pino', 'pinar'], ['isla', 'archipiélago'], ['estrella', 'constelación']];
  const INV = [['bandada', 'ave o pájaro'], ['biblioteca', 'libro'], ['piara', 'cerdo'], ['hayedo', 'haya'], ['plumaje', 'pluma'], ['alumnado', 'alumno']];
  const CI = [['arena', 'I'], ['manzana', 'C'], ['agua', 'I'], ['lápiz', 'C'], ['harina', 'I'], ['caldero', 'C'], ['aire', 'I'], ['varita', 'C']];
  const TXT = 'El verano pasado, la familia de Marta viajó a la India. En Nueva Delhi vieron una bandada de aves enormes y, junto al río Ganges, sintieron una calma que no olvidarán. Desde el avión, Marta vio el Himalaya y sintió una alegría inmensa.';
  const ficha = ej(1, 'Recuerda', `<div class="recuerda"><div class="caja"><table><tr><td>Propios</td><td>nombran uno en concreto; mayúscula: Ganges, Marta</td></tr><tr><td>Concretos</td><td>se ven y se tocan: reloj, escoba</td></tr><tr><td>Abstractos</td><td>ideas y sentimientos: calma, amistad</td></tr></table></div>
<div class="caja"><table><tr><td>Contables</td><td>se cuentan: tres manzanas</td></tr><tr><td>Incontables</td><td>«un poco de»: agua, arena</td></tr><tr><td>Colectivos</td><td>en singular nombran un grupo: rebaño</td></tr></table></div></div>`) +
    ej(2, 'Clasifica en concretos y abstractos.', `<p class="oracion">${mezcla.join(' · ')}</p><table class="tabla"><tr><th>Concretos</th><th>Abstractos</th></tr><tr><td class="alta" style="height:16mm"></td><td class="alta" style="height:16mm"></td></tr></table>`) +
    ej(3, 'Escribe el nombre colectivo… y al revés, el individual.', `<div class="r3">${COL.map(([a]) => `<div class="hueco"><span class="pal">muchos/as ${a}s →</span><span class="lin"></span></div>`).join('')}${INV.map(([a]) => `<div class="hueco"><span class="pal">${a}: un/una</span><span class="lin"></span></div>`).join('')}</div>`) +
    '¦' + ej(4, '¿Contable (C) o incontable (I)? Pista: ¿puedes decir «tres…»?', `<div class="r4">${CI.map(([a]) => `<div class="hueco"><div class="arriba"><span class="pal">${a}</span><span class="n">C · I</span></div></div>`).join('')}</div>`) +
    ej(5, 'Lee y busca: 4 nombres propios, 1 colectivo y 2 abstractos.', `<p class="oracion">${TXT}</p>${lin(4)}`) +
    `<div class="ej reto"><h2><span class="num">6</span>Reto: escribe una oración con un nombre propio, uno colectivo y uno abstracto.</h2>${lin(1)}</div>`;
  const sol = ej(2, 'Concretos y abstractos', `<table class="tabla"><tr><th>Concretos</th><th>Abstractos</th></tr><tr><td class="resp">${CONC.join(', ')}</td><td class="resp">${ABS.join(', ')}</td></tr></table>`) +
    ej(3, 'Colectivos e individuales', `<p>${COL.map(([a, b]) => a + ' → <span class="resp">' + b + '</span>').join(' · ')}</p><p>${INV.map(([a, b]) => a + ' → <span class="resp">' + b + '</span>').join(' · ')}</p>`) +
    ej(4, 'Contables e incontables', `<p>${CI.map(([a, b]) => a + ' <b class="resp">' + b + '</b>').join(' · ')}</p>`) +
    ej(5, 'En el texto', `<p>Propios: <span class="resp">Marta, India, Nueva Delhi, Ganges, Himalaya</span> (cualquiera 4) · colectivo: <span class="resp">bandada</span> (también <span class="resp">familia</span>) · abstractos: <span class="resp">calma, alegría</span>.</p>`) +
    ej(6, 'Reto (respuesta libre)', '<p>Ejemplo: «El <span class="resp">rebaño</span> de <span class="resp">Pedro</span> cruzó el río con mucha <span class="resp">calma</span>».</p>');
  fs.writeFileSync(path.join(OUT, 'ficha-nombres.html'), pagina({ partir:true, titulo:'Clases de nombres', corto:'Clases de nombres', crit:'LCL.2.9.1', ficha, sol,
    nota:'Estimadas familias: estamos estudiando las clases de nombres: propios y comunes, concretos y abstractos, contables e incontables, individuales y colectivos. Esta ficha es de ampliación, más difícil que las del tema anterior. Un truco: si se puede ver y tocar, es concreto; si es una idea o un sentimiento, es abstracto. Gracias por vuestra colaboración. Javi, tutor de 4ºA.' }));
}
if(E.length){ console.error('❌ ' + E.join('\n')); process.exit(1); }
console.log('✅ 3 fichas: ficha-agudas.html, ficha-tilde.html, ficha-nombres.html');
