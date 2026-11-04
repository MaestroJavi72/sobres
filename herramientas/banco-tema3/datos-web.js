/* Escribe sda/tema3-lengua-4a/palabras.js con las palabras comprobadas por generar.js, para las actividades interactivas.
   Uso: node datos-web.js */
const fs = require('fs'), path = require('path');
const { W, ERR } = require('./generar.js');
if(ERR.length){ console.error('❌ ' + ERR.join('\n')); process.exit(1); }
const L = [...W.values()].filter(x => !x.soloTexto).map(x => ({ w:x.w, s:x.sil, t:x.t, tipo:x.tipo, tilde:x.tilde, fin:x.fin, g:x.grupo }));
fs.writeFileSync(path.join(__dirname, '../../sda/tema3-lengua-4a/palabras.js'),
  '/* Generado con herramientas/banco-tema3/datos-web.js: palabras COMPROBADAS (sílabas, tónica, tipo y tilde). No editar a mano. */\n' +
  'window.PALABRAS3 = ' + JSON.stringify(L) + ';\n');
console.log('✅ ' + L.length + ' palabras');
