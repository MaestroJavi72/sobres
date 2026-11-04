/* Cartas de los pacientes (tarea final del Tema 3, «La enfermería de las palabras heridas»).
   Uso: node cartas.js  → sda/tema3-lengua-4a/cartas-pacientes.html
   Cada carta está escrita BIEN (con sus tildes); la ficha la enseña sin tildes. Se comprueba que:
   - toda palabra con tilde está en las palabras ya comprobadas de palabras.js (sílabas, tónica, tipo y regla),
   - hay exactamente 4 agudas, 4 llanas y 4 esdrújulas con tilde y ninguna otra palabra con tilde,
   - las «trampas» (palabras que NO llevan tilde) también están comprobadas. */
const fs = require('fs'), path = require('path');
const { W, ERR, SIN_TILDE, TILDES, sep, razon } = require('./generar.js');
if(ERR.length){ console.error('❌ palabras con errores:\n' + ERR.join('\n')); process.exit(1); }

const CARTAS = [
  { casa:'Gryffindor', e:'🦁', t:`Querida familia:
Os escribo desde el salón de la torre. Esta semana tenemos un examen de pociones y estoy preparando una pócima de color verde. No es fácil, pero también es muy divertido. Ayer vi una varita debajo de un árbol del jardín: ¡creo que es un objeto mágico! El sábado hay un concierto de música en el castillo y voy a ir con mi lechuza. Os mando un dibujo hecho con mi lápiz nuevo. Desde la ventana de mi cuarto veo el lago y el césped del patio. Os quiero con todo mi corazón.
Un abrazo muy fuerte.` },
  { casa:'Hufflepuff', e:'🦡', t:`Querida abuela:
Hoy he visto un dragón pequeño en el bosque. Estaba débil y cansado, y le hemos dado agua con azúcar. Después, el capitán del equipo nos ha enseñado a volar en escoba. Soy muy ágil y además soy rápido, por eso estoy muy feliz. Por la noche, un murciélago vuela cerca de la lámpara de mi cuarto y un pájaro duerme en la ventana. Mañana vamos a pasar por un túnel secreto que lleva a la ciudad. Te mando esta carta en un papel que huele a chocolate.
Un beso en la nariz.` },
  { casa:'Ravenclaw', e:'🦅', t:`Querido hermano:
En la biblioteca de la torre hay una escalera de mármol y un reloj enorme. Hoy la profesora, que es muy joven, nos ha dado una lección de gramática y hemos contado cada sílaba de un poema. Mi amiga es la líder de nuestro grupo y siempre lleva una brújula para no perderse. Esta noche cenamos sopa y pescado: el menú es delicioso. Mi lechuza es dócil, pero su jaula es frágil y se abre con un botón. Por la noche cantamos una canción fantástica junto al fuego. Te espero en las vacaciones.
Un abrazo.` },
  { casa:'Slytherin', e:'🐍', t:`Querida familia:
Esta mañana he desayunado café con leche y un plátano. En la sala de nuestra casa hay un sofá verde, un cáliz de plata con piedras de ámbar y un cuadro con el símbolo de la casa: una víbora. Un ratón pequeño se come la cáscara de mi naranja junto al jabón del baño. Mi profesor dice que tengo un carácter fuerte y que soy útil en el equipo. En el examen de hechizos he sacado un diez. Os echo de menos.
Muchos besos.` },
  { casa:'Orden del Fénix', enFicha:'la Orden', e:'🔥', t:`Querido primo:
Hoy he jugado un partido de fútbol con mi equipo. Soy hábil con la pelota, pero hay que poner mucha atención. Al terminar, el entrenador nos explica que el oxígeno entra por la nariz, llega al tórax cuando respiramos y que cada músculo necesita descanso. Desde el campo vemos pasar un fénix rojo: ¡parece un avión! Mi amiga lleva un anillo con un rubí y saca fotos con su cámara de plástico. Mañana vamos a ir en patín por el lago helado.
Un abrazo fuerte.` }
];

const tokens = t => t.toLowerCase().match(/[a-záéíóúüñ]+/g);
const E = [];
CARTAS.forEach(c => {
  const tk = tokens(c.t), con = [...new Set(tk.filter(w => TILDES.test(w)))];
  con.forEach(w => { if(!W.has(w)) E.push(c.casa + ': «' + w + '» lleva tilde y no está comprobada'); else if(W.get(w).soloTexto) E.push(c.casa + ': «' + w + '» sin tilde también existe'); });
  c.heridas = con.filter(w => W.has(w)).map(w => W.get(w));
  const n = t => c.heridas.filter(x => x.tipo === t).length;
  if(c.heridas.length !== 12 || n('aguda') !== 4 || n('llana') !== 4 || n('esdrújula') !== 4) E.push(c.casa + ': ' + c.heridas.length + ' heridas (' + n('aguda') + ' agudas, ' + n('llana') + ' llanas, ' + n('esdrújula') + ' esdrújulas)');
  if(tk.filter(w => TILDES.test(w)).length !== con.length) E.push(c.casa + ': hay palabras con tilde repetidas');
  c.trampas = [...new Set(tk)].filter(w => W.has(w) && !W.get(w).tilde).map(w => W.get(w));
  if(c.trampas.length < 2) E.push(c.casa + ': pocas trampas comprobadas (' + c.trampas.length + ')');
});
if(E.length){ console.error('❌ ' + E.join('\n')); process.exit(1); }

/* ---------- HTML ---------- */
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const parrafos = t => t.split('\n').map(l => '<p>' + l + '</p>').join('');
const sinTildes = t => parrafos(esc(SIN_TILDE(t)));
const curada = (c) => parrafos(esc(c.t).replace(/[A-Za-záéíóúüñÁÉÍÓÚ]+/g, w => TILDES.test(w.toLowerCase()) ? '<span class="marca">' + w + '</span>' : w));
const silT = x => x.sil.map((s, i) => i === x.t ? '<span class="ton">' + s + '</span>' : s).join('-');
const orden = x => ['aguda', 'llana', 'esdrújula'].indexOf(x.tipo);
const finTxt = x => x.fin === 'vocal' ? 'vocal' : x.fin === 'otra' ? '-' + SIN_TILDE(x.w).slice(-1) : '-' + x.fin;
const porNoLleva = x => x.tipo === 'aguda' ? 'Es aguda, pero acaba en ' + finTxt(x) + ' (no en vocal, -n ni -s)' : 'Es llana y acaba en ' + finTxt(x);

const ficha = (c, i) => `
<section class="hoja ficha">
  <header class="cabecera"><span class="buho" aria-hidden="true">🏥</span><div><h1>La enfermería de las palabras heridas</h1><div class="sub">Tarea final · Lengua · Tema 3 · Paciente ${i + 1}: carta de ${c.enFicha || c.casa}</div></div><span class="esp"></span><div class="sello">${c.e} ${c.enFicha || c.casa}<br>4ºA</div></header>
  <div class="datos"><span>Sanadores de la casa:</span><span class="corto">Fecha:</span></div>
  <div class="nota">¡Un hechizo ha borrado las tildes de esta carta! Hay <b>12 palabras heridas</b>: 4 agudas, 4 llanas y 4 esdrújulas. Cuidado: algunas palabras están bien sin tilde.</div>
  <div class="ej"><h2><span class="num">1</span>Lee la carta y rodea las 12 palabras heridas.</h2><div class="carta">${sinTildes(c.t)}</div></div>
  <div class="ej"><h2><span class="num">2</span>Historial clínico: cura cada palabra.</h2>
    <table class="tabla hist"><colgroup><col style="width:27%"><col style="width:25%"><col style="width:18%"><col style="width:30%"></colgroup>
    <tr><th>Palabra curada (con su tilde)</th><th>Sílabas (rodea la tónica)</th><th>Aguda, llana o esdrújula</th><th>Receta: ¿por qué lleva tilde?</th></tr>
    ${'<tr><td></td><td></td><td></td><td></td></tr>'.repeat(12)}</table></div>
  <div class="ej reto"><h2><span class="num">3</span>Las que engañan: elige 2 palabras de la carta que NO llevan tilde y explica por qué.</h2><div class="lin"></div><div class="lin"></div></div>
  <footer class="pie"><span>Javificación · Tarea final del Tema 3</span><span>LCL.2.9.1 · LCL.2.9.2</span></footer>
</section>`;

const sol = (c, i) => `
<section class="hoja sol">
  <header class="cabecera"><span class="buho" aria-hidden="true">🔑</span><div><h1>Soluciones · Paciente ${i + 1}</h1><div class="sub">La enfermería de las palabras heridas · carta de ${c.casa}</div></div><span class="esp"></span><div class="sello">Para el maestro</div></header>
  <div class="ej"><h2><span class="num">1</span>La carta curada (las 12 heridas, marcadas)</h2><div class="carta">${curada(c)}</div></div>
  <div class="ej"><h2><span class="num">2</span>Historial clínico</h2>
    <table class="tabla hist"><colgroup><col style="width:22%"><col style="width:24%"><col style="width:16%"><col style="width:38%"></colgroup>
    <tr><th>Palabra</th><th>Sílabas (tónica subrayada)</th><th>Tipo</th><th>Receta</th></tr>
    ${c.heridas.slice().sort((a, b) => orden(a) - orden(b)).map(x => `<tr><td class="resp">${x.w}</td><td>${silT(x)}</td><td>${x.tipo}</td><td>${razon(x)}</td></tr>`).join('')}</table></div>
  <div class="ej"><h2><span class="num">3</span>Las que engañan (cualquiera de estas vale)</h2>
    <p>${c.trampas.map(x => '<b>' + x.w + '</b> (' + sep(x) + '): ' + porNoLleva(x).charAt(0).toLowerCase() + porNoLleva(x).slice(1)).join(' · ')}.</p></div>
  <footer class="pie"><span>Javificación · Soluciones</span><span>Palabras y reglas comprobadas con herramientas/banco-tema3</span></footer>
</section>`;

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Cartas de los pacientes · Tarea final del Tema 3</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&family=EB+Garamond:wght@500;600;700&family=Andika:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../comun/ficha.css">
<style>
/* generado con herramientas/banco-tema3/cartas.js: no editar a mano */
.carta{font-family:'Andika',sans-serif;font-size:12pt;line-height:1.35;padding:2.5mm 4mm;border:1.5px solid var(--oro);border-radius:3mm;background:#fdf8ec;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.carta p{font-size:inherit;line-height:inherit}
.carta p+p{margin-top:1.5mm}
.hist td{height:7mm;vertical-align:middle}
.sol .hist td{height:auto;font-size:10.5pt;padding:1mm 1.5mm}
.sol .carta{font-size:11.5pt;line-height:1.85}
.sol .carta .marca{outline-width:1.5px}
.ton{text-decoration:underline;text-decoration-thickness:2px;font-weight:700}
.sol .ej p{font-size:10.5pt}
</style>
</head>
<body>
<nav class="barra">
  <a href="../?id=tema3-lengua-4a" id="bVolver">← Volver</a>
  <button class="prim" type="button" id="pFicha">🖨️ Imprimir las 5 cartas</button>
  <button type="button" id="pSol">🖨️ Imprimir las soluciones</button>
  <button type="button" id="pAmbas">🖨️ Todo</button>
</nav>
${CARTAS.map(ficha).join('')}
${CARTAS.map(sol).join('')}
<script src="../comun/ficha.js"></script>
<script src="../comun/barra.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, '../../sda/tema3-lengua-4a/cartas-pacientes.html'), html);
CARTAS.forEach(c => console.log('✅ ' + c.casa + ': ' + c.heridas.map(x => x.w).join(', ') + ' · trampas: ' + c.trampas.map(x => x.w).join(', ')));
