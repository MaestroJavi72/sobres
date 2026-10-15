/* genera data/sda/maleficio-ef.md (lo lee sda/?id=maleficio-ef) */
const fs = require('fs');
const { B } = require('./contenido.js');
const cel = t => String(t).replace(/\|/g, '/').replace(/\n/g, ' ');
let o = [];
B.forEach(b => {
  if(b.h1) o.push('# '+b.h1, '');
  if(b.fecha) o.push(b.fecha, '');
  if(b.h2) o.push('## '+b.h2, '');
  if(b.h3) o.push('### '+b.h3, '');
  if(b.p) o.push(b.p, '');
  if(b.cita) o.push('> '+b.cita, '');
  if(b.ul) o.push(...b.ul.map(x => '- '+x), '');
  if(b.table){
    o.push('| '+b.table.head.join(' | ')+' |', '| '+b.table.head.map(() => '---').join(' | ')+' |');
    b.table.rows.forEach(r => o.push('| '+r.map(cel).join(' | ')+' |'));
    o.push('');
  }
  if(b.sesion){
    const s = b.sesion;
    o.push('**Objetivos:** '+s.obj.join(' '), '');
    o.push('| Actividad | Explicación | Organización | Material | Tiempo |', '| --- | --- | --- | --- | --- |');
    s.acts.forEach(a => o.push('| **'+cel(a.t)+'** | '+cel(a.d)+' | '+cel(a.org)+' | '+cel(a.mat)+' | '+a.min+'\' |'));
    o.push('', '**Evaluación:** '+s.eval, '');
  }
});
fs.writeFileSync(__dirname+'/../../data/sda/maleficio-ef.md', o.join('\n'));
console.log('md ok', o.length, 'líneas');
