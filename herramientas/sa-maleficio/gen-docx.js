/* Uso (desde esta carpeta): npm i docx@9.5.1 && node gen-md.js && node gen-docx.js */
/* genera el Word de la SA con anexo imprimible */
const fs = require('fs');
const D = require('docx');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, PageOrientation,
  ShadingType, BorderStyle, Footer, Header, PageNumber, HeadingLevel, VerticalAlign, TableLayoutType } = D;
const { B, M, CR } = require('./contenido.js');

const GRANATE = '7A2030', NOCHE = '0E2A28', ORO = 'C9A34A', ORO_C = 'F3D27A', CREMA = 'FBF4E2', LINEA = 'B8A27A';
const FUENTE = 'Calibri';

/* **negrita** y *cursiva* → TextRun */
function runs(t, base){
  base = base || {};
  const out = [], re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g; let i = 0, m;
  t = String(t);
  while((m = re.exec(t))){
    if(m.index > i) out.push(new TextRun(Object.assign({ text:t.slice(i, m.index), font:FUENTE }, base)));
    const s = m[0];
    if(s.startsWith('**')) out.push(new TextRun(Object.assign({ text:s.slice(2,-2), bold:true, font:FUENTE }, base)));
    else out.push(new TextRun(Object.assign({ text:s.slice(1,-1), italics:true, font:FUENTE }, base)));
    i = m.index + s.length;
  }
  if(i < t.length) out.push(new TextRun(Object.assign({ text:t.slice(i), font:FUENTE }, base)));
  return out;
}
const P = (t, o) => new Paragraph(Object.assign({ children:runs(t, (o||{}).r), spacing:{ after:100, line:276 } }, (o||{}).p || {}));
const borde = { style:BorderStyle.SINGLE, size:4, color:LINEA };
const bordes = { top:borde, bottom:borde, left:borde, right:borde };

function celda(t, o){
  o = o || {};
  const paras = (Array.isArray(t) ? t : [t]).map(x => x instanceof Paragraph ? x :
    new Paragraph({ children:runs(x, Object.assign({ size:o.size || 19 }, o.head ? { bold:true, color:ORO_C } : {}, o.r || {})), alignment:o.align, spacing:{ after:40 } }));
  return new TableCell({ children:paras, borders:bordes, width:o.w ? { size:o.w, type:WidthType.PERCENTAGE } : undefined,
    shading:o.head ? { type:ShadingType.CLEAR, color:'auto', fill:NOCHE } : o.fill ? { type:ShadingType.CLEAR, color:'auto', fill:o.fill } : undefined,
    margins:{ top:60, bottom:60, left:90, right:90 }, verticalAlign:o.va || VerticalAlign.TOP, columnSpan:o.span, rowSpan:o.rspan });
}
function tabla(head, rows, w, o){
  o = o || {};
  const tr = [];
  if(head) tr.push(new TableRow({ tableHeader:true, children:head.map((h, i) => celda(h, { head:true, w:w && w[i], size:o.size })) }));
  rows.forEach((r, k) => tr.push(new TableRow({ height:o.alto ? { value:o.alto, rule:o.exacto ? D.HeightRule.EXACT : D.HeightRule.ATLEAST } : undefined,
    children:r.map((c, i) => celda(c, { w:w && w[i], size:o.size, fill:(o.cebra && k%2) ? CREMA : (o.primeraCol && i===0 ? 'F3EAD5' : undefined), align:o.centrar && i>0 ? AlignmentType.CENTER : undefined })) })));
  return new Table({ rows:tr, width:{ size:100, type:WidthType.PERCENTAGE }, layout:TableLayoutType.FIXED });
}
const H = (t, n) => new Paragraph({ heading:n===1 ? HeadingLevel.HEADING_1 : n===2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3, children:[new TextRun({ text:t, font:'Cambria' })], spacing:{ before:n===1 ? 0 : 260, after:120 }, keepNext:true });
const esp = () => new Paragraph({ children:[], spacing:{ after:80 } });

/* ---------- cuerpo ---------- */
const cuerpo = [];
B.forEach(b => {
  if(b.h1){
    cuerpo.push(new Paragraph({ alignment:AlignmentType.CENTER, spacing:{ after:60 }, children:[new TextRun({ text:'⚡ SITUACIÓN DE APRENDIZAJE ⚡', font:'Cambria', size:22, color:ORO, bold:true })] }));
    cuerpo.push(new Paragraph({ alignment:AlignmentType.CENTER, spacing:{ after:60 }, children:[new TextRun({ text:'El Maleficio de la Discordia', font:'Cambria', size:52, bold:true, color:GRANATE })] }));
    cuerpo.push(new Paragraph({ alignment:AlignmentType.CENTER, spacing:{ after:60 }, children:[new TextRun({ text:M.sub, font:FUENTE, size:24, italics:true, color:'5A3D12' })] }));
  }
  if(b.fecha) cuerpo.push(new Paragraph({ alignment:AlignmentType.CENTER, spacing:{ after:240 }, children:[new TextRun({ text:b.fecha, font:FUENTE, size:20, color:'6B5732' })] }));
  if(b.h2) cuerpo.push(H(b.h2, 1));
  if(b.h3) cuerpo.push(H(b.h3, 2));
  if(b.p) cuerpo.push(P(b.p));
  if(b.ul) b.ul.forEach(x => cuerpo.push(new Paragraph({ children:runs(x), bullet:{ level:0 }, spacing:{ after:60, line:264 } })));
  if(b.table){ cuerpo.push(tabla(b.table.head, b.table.rows, b.table.w, { cebra:true, primeraCol:true })); cuerpo.push(esp()); }
  if(b.sesion){
    const s = b.sesion, filas = [];
    filas.push(new TableRow({ children:[celda('**Objetivos**', { fill:'F3EAD5', w:18 }), celda(s.obj.map(x => '• '+x), { span:4, w:82 })] }));
    filas.push(new TableRow({ tableHeader:true, children:['Actividad y explicación','','Organización','Material','Tiempo'].map((h, i) => i===1 ? null : celda(h, { head:true, span:i===0 ? 2 : undefined })).filter(Boolean) }));
    s.acts.forEach((a, k) => filas.push(new TableRow({ cantSplit:true, children:[
      celda(['**'+a.t+'**', a.d], { span:2, w:52, fill:k%2 ? CREMA : undefined }),
      celda(a.org, { w:17, fill:k%2 ? CREMA : undefined }), celda(a.mat, { w:21, fill:k%2 ? CREMA : undefined }),
      celda(a.min+'\'', { w:10, align:AlignmentType.CENTER, fill:k%2 ? CREMA : undefined })] })));
    filas.push(new TableRow({ children:[celda('**Evaluación**', { fill:'F3EAD5' }), celda(s.eval, { span:4 })] }));
    cuerpo.push(new Table({ rows:filas, width:{ size:100, type:WidthType.PERCENTAGE }, layout:TableLayoutType.FIXED, columnWidths:[1700, 3200, 1600, 2000, 900] }));
    cuerpo.push(esp());
  }
});

/* ---------- anexo ---------- */
function titAnexo(t, sub){
  return [new Paragraph({ children:[new TextRun({ text:t, font:'Cambria', size:34, bold:true, color:GRANATE })], spacing:{ after:40 } }),
    new Paragraph({ children:[new TextRun({ text:sub, font:FUENTE, size:20, italics:true, color:'6B5732' })], spacing:{ after:140 },
      border:{ bottom:{ style:BorderStyle.SINGLE, size:12, color:GRANATE, space:4 } } })];
}
const datosCab = (extra) => new Paragraph({ spacing:{ after:140 }, children:runs('Clase: ________   Fecha: __________'+(extra||''), { size:21 }) });

function rubrica(curso){
  const l = curso==='3' ? 'a' : 'b';
  const head = ['Criterio'].concat(M.niveles.map(n => n.n+' ('+n.r+')'));
  const rows = CR.map(c => [['**'+c+'.'+l+'** '+M.crit[c].corto, M.crit[c][l]]].concat(M.rubrica[c][l]));
  return [].concat(
    titAnexo('Anexo I'+(curso==='3' ? '' : 'I')+' · Rúbrica de observación · '+curso+'º de Primaria', 'Heteroevaluación del maestro · Fase de Aplicación (sesiones 5, 6 y 7) · Competencia específica 3 de EF'),
    [tabla(head, rows, [22,19.5,19.5,19.5,19.5], { size:17 }), esp(),
     P('**Cómo se usa:** en cada criterio, elige el nivel que mejor describe lo que has visto y, dentro del nivel, la nota (Insuficiente 1-4 · Suficiente 5 · Bien 6 · Notable 7-8 · Sobresaliente 9-10). Anótala en la hoja de registro.', { r:{ size:19 } })]);
}
const sec = (children, apaisado) => ({ properties:{ page:{ size:apaisado ? { orientation:PageOrientation.LANDSCAPE } : {}, margin:{ top:900, bottom:900, left:900, right:900 } } },
  headers:{ default:new Header({ children:[new Paragraph({ alignment:AlignmentType.RIGHT, children:[new TextRun({ text:'El Maleficio de la Discordia · EF 3º y 4º · CEIP Arias Montano', font:FUENTE, size:16, color:'8A7A5A' })] })] }) },
  footers:{ default:new Footer({ children:[new Paragraph({ alignment:AlignmentType.CENTER, children:[new TextRun({ children:['Página ', PageNumber.CURRENT], font:FUENTE, size:16, color:'8A7A5A' })] })] }) },
  children });

const registro = [].concat(
  titAnexo('Anexo III · Hoja de registro de la observación', 'Rodea la sesión en la que le toca (5, 6 o 7: un tercio al azar cada día; si falta, pasa al siguiente o a la 8) y anota la nota de 1 a 10 de cada criterio'),
  [datosCab('   Curso:  3º  /  4º'),
   tabla(['Nº','Alumno/a','Sesión','3.1 Emociones y esfuerzo','3.2 Normas y juego limpio','3.3 Cooperar e incluir','Observaciones'],
     Array.from({ length:23 }, (x, i) => [String(i+1), '', '5 · 6 · 7', '', '', '', '']), [5,22,10,11,11,11,30], { size:16, alto:290, exacto:true, centrar:true })]);

const caras = M.caras.map(c => c.ic+' '+c.t);
const diana = [].concat(
  titAnexo('Anexo IV · La Diana del Pensadero', 'Autoevaluación del alumnado · Fase de Conclusión (sesión 8)'),
  [new Paragraph({ spacing:{ after:140 }, children:runs('Nombre: ______________________________   Clase: ______   Fecha: __________', { size:22 }) }),
   P('**Piensa en las sesiones del Maleficio de la Discordia.** Lee cada frase y rodea la carita que más se parece a lo que has hecho.', { r:{ size:24 } }),
   tabla(['Frase','😟 Todavía no','🙂 A veces','😊 Casi siempre','🤩 Siempre'],
     M.diana.map((d, i) => [(i+1)+'. '+d.t, '😟', '🙂', '😊', '🤩']), [44,14,14,14,14], { size:26, alto:900, centrar:true }),
   esp(),
   P('Lo que más me ha costado: ____________________________________________________________', { r:{ size:22 } }),
   P('Lo que mejor he hecho: _______________________________________________________________', { r:{ size:22 } }),
   esp(),
   P('**Para el maestro:** frases 1-2 → criterio 3.1 · frases 3-4 → 3.2 · frases 5-6 → 3.3. Cada carita vale 😟 1 · 🙂 2 · 😊 3 · 🤩 4. Nota del criterio = media de sus dos frases × 2,5 (de 2,5 a 10).', { r:{ size:18, color:'6B5732' } })]);

const seneca = [].concat(
  titAnexo('Anexo V · Notas para Séneca', 'Nota de cada criterio = '+M.pesos.hetero+' % heteroevaluación (H) + '+M.pesos.auto+' % autoevaluación (A)'),
  [datosCab('   Curso:  3º  /  4º'),
   tabla(['Alumno/a','3.1 H','3.1 A','3.1 Nota','3.2 H','3.2 A','3.2 Nota','3.3 H','3.3 A','3.3 Nota','CE3'],
     Array.from({ length:23 }, () => Array(11).fill('')), [19,7.5,7.5,8,7.5,7.5,8,7.5,7.5,8,12], { size:16, alto:290, exacto:true }),
   P('Ejemplo: H = 7 y A = 8,75 → 0,7 × 7 + 0,3 × 8,75 = 7,5. CE3 = media de los tres criterios (todos valen lo mismo, art. 10.5 de la Orden). La web lo calcula sola en Evaluación → Notas para Séneca.', { r:{ size:17, italics:true } })]);

const docente = [].concat(
  titAnexo('Anexo VI · Evaluación de la práctica docente', 'Cuestionario del maestro al terminar la situación · 1 = nada · 2 = poco · 3 = bastante · 4 = mucho'),
  [tabla(['Indicador','1','2','3','4'], M.docente.map(t => [t,'','','','']), [72,7,7,7,7], { size:20, alto:400, centrar:true }), esp(),
   tabla(['Opinión del alumnado (sesión 8)','👍','👌','👎'], [['¿Te han gustado los juegos?','','',''],['¿Te has sentido incluido/a?','','',''],['¿Te ha servido el Semáforo de Hermione?','','','']], [70,10,10,10], { size:20, alto:420, centrar:true }), esp(),
   tabla(['Indicadores de resultados','Dato'], [['Casillas encendidas en el Medidor del Maleficio (de 8)',''],['Media de congelaciones por sesión',''],['% de alumnado con 5 o más en 3.1 / 3.2 / 3.3',''],['Criterio con más diferencia entre H y A','']], [75,25], { size:20, alto:420 }), esp(),
   P('**Propuestas de mejora:**', { r:{ size:21 } }),
   ...Array.from({ length:3 }, () => new Paragraph({ children:[], spacing:{ after:280 }, border:{ bottom:{ style:BorderStyle.DOTTED, size:6, color:LINEA, space:1 } } }))]);

const doc = new Document({
  creator:'Javi · Javificación', title:'SA El Maleficio de la Discordia', description:'Situación de aprendizaje de EF, 3º y 4º',
  styles:{
    default:{ document:{ run:{ font:FUENTE, size:21 } } },
    paragraphStyles:[
      { id:'Heading1', name:'Heading 1', basedOn:'Normal', next:'Normal', run:{ size:32, bold:true, color:GRANATE, font:'Cambria' }, paragraph:{ spacing:{ before:320, after:120 }, border:{ bottom:{ style:BorderStyle.SINGLE, size:8, color:ORO, space:4 } } } },
      { id:'Heading2', name:'Heading 2', basedOn:'Normal', next:'Normal', run:{ size:25, bold:true, color:'5A3D12', font:'Cambria' } }
    ]
  },
  numbering:{ config:[] },
  sections:[
    sec(cuerpo),
    sec(rubrica('3'), true),
    sec(rubrica('4'), true),
    sec(registro, true),
    sec(diana),
    sec(seneca, true),
    sec(docente)
  ]
});
Packer.toBuffer(doc).then(buf => {
  const out = __dirname+'/../../sda/maleficio-ef/SA-El-Maleficio-de-la-Discordia.docx';
  fs.writeFileSync(out, buf); console.log('docx ok', buf.length);
});
