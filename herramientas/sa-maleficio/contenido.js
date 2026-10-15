/* Contenido de la SA «El Maleficio de la Discordia» como bloques; lo pintan gen-md.js y gen-docx.js */
const M = require(__dirname+'/../../sda/maleficio-ef/datos.js');
const CR = ['3.1','3.2','3.3'];
const B = [];
const h1 = t => B.push({ h1:t }), h2 = t => B.push({ h2:t }), h3 = t => B.push({ h3:t });
const p = t => B.push({ p:t }), ul = l => B.push({ ul:l }), tab = (head, rows, w, opt) => B.push(Object.assign({ table:{ head, rows, w } }, opt||{}));
const cita = t => B.push({ cita:t });

h1('Situación de aprendizaje · El Maleficio de la Discordia');
B.push({ fecha:'Octubre de 2026 · Javi · CEIP Arias Montano' });
h2('Datos generales');
tab(['Campo','Detalle'], [
  ['Título','El Maleficio de la Discordia'],
  ['Área y cursos','Educación Física · 3º y 4º de Educación Primaria (2º ciclo) · 3ºA, 3ºB, 4ºA y 4ºB'],
  ['Duración','8 sesiones de 45 minutos'],
  ['Competencia específica','EF 3 (autorregulación, interacción, cooperación, deportividad e inclusión)'],
  ['Producto final','Superar el Torneo de los Tres Magos cooperativo y firmar el «Código de Merlín», un decálogo de convivencia para el gimnasio'],
  ['Evaluación','Rúbrica de observación del maestro (sesiones 5-7, por tercios) y Diana del Pensadero de autoevaluación (sesión 8)'],
  ['Normativa','Orden de 30 de mayo de 2023 (currículo de Educación Primaria en Andalucía), Anexo II (Educación Física) y Anexo IV (situaciones de aprendizaje)']
], [28,72]);

/* 1 */
h2('1. Localización de un centro de interés');
p('Todas mis clases están ambientadas en el mundo de Harry Potter: casas, puntos, el «compi del día» y cartas. El alumnado vive esa historia en cada sesión, así que es el contexto natural para un reto.');
p('El centro de interés nace de un problema real de nuestras clases de EF: hay muchos conflictos. Discutimos por las reglas, hay burlas cuando alguien falla, se deja fuera a los menos hábiles y hay enfados al perder. En lugar de tratarlo solo con normas, lo convertimos en un reto mágico: **Peeves ha lanzado el Maleficio de la Discordia sobre el gimnasio**. Ha robado la llave del cuarto del material y el maleficio vuelve cada vez que hay un insulto, una burla o alguien excluido. Solo una clase capaz de convivir puede romperlo.');

/* 2 */
h2('2. Justificación de la propuesta');
p('La propuesta responde a una necesidad del grupo y se apoya en los Objetivos de la etapa y en los principios generales y pedagógicos, como pide el Anexo IV de la Orden de 30 de mayo de 2023.');
h3('Objetivos de la etapa');
p('Contribuye especialmente a estos objetivos de la Educación Primaria (artículo 17 de la Ley Orgánica 2/2006, de Educación):');
ul([
  '**a)** Conocer y apreciar los valores y las normas de convivencia y aprender a obrar de acuerdo con ellas de forma empática.',
  '**b)** Desarrollar hábitos de trabajo individual y de equipo, de esfuerzo y de responsabilidad.',
  '**c)** Adquirir habilidades para la prevención y para la resolución pacífica de conflictos y la no violencia.',
  '**d)** Conocer, comprender y respetar las diferencias entre las personas, la igualdad de derechos y oportunidades de hombres y mujeres y la no discriminación.',
  '**k)** Conocer y valorar su propio cuerpo y el de los otros, respetar las diferencias y utilizar la educación física y el deporte como medios para favorecer el desarrollo personal y social.',
  '**m)** Desarrollar sus capacidades emocionales y afectivas en sus relaciones con las demás personas, así como una actitud contraria a la violencia, a los prejuicios y a los estereotipos sexistas.'
]);
h3('Principios generales y pedagógicos');
ul([
  '**Situaciones de aprendizaje con reto** (Anexo IV): el alumnado resuelve un problema «de manera creativa y cooperativa». La Orden pide además que asuma responsabilidades individuales y trabaje en equipo, aprendiendo a resolver los conflictos que surjan. Ese es justo el contenido de esta situación.',
  '**Aprendizaje significativo y funcional:** se parte de los conflictos reales de la clase y de lo que ya saben sobre convivir (sesión 2), y lo aprendido sirve en el recreo y fuera del colegio.',
  '**Atención a la diversidad y Diseño Universal para el Aprendizaje** (artículo 26 de la Orden): múltiples formas de implicación, representación y acción y expresión, y grupos heterogéneos.',
  '**Educación emocional, en valores e igualdad** (principios pedagógicos del artículo 6 del Decreto 101/2023, al que remite la Orden): gestión de emociones, rechazo de estereotipos y de cualquier discriminación.',
  '**Evaluación formativa con participación del alumnado** (artículo 10 de la Orden): observación continuada con rúbrica y autoevaluación.'
]);
p('Además, la competencia específica 3 propone en su descripción (Orden, pág. 77) que el alumnado aprenda a «dialogar, debatir, contrastar ideas y ponerse de acuerdo para resolver situaciones». Los juegos cooperativos son el contexto ideal: sin cooperación no hay éxito y los conflictos aparecen en un entorno seguro, donde se pueden aprender a resolver.');

/* 3 */
h2('3. Producto final o reto');
p('**Reto: romper el Maleficio de la Discordia.** Para ello la clase debe:');
ul([
  '**Encender el Medidor del Maleficio:** 8 casillas, una por sesión. Una sesión enciende su casilla si la clase solo se ha congelado («¡Petrificus Totalus!») 2 veces o menos. Con 6 o más casillas en la sesión 8, el maleficio se rompe.',
  '**Superar el Torneo de los Tres Magos cooperativo** (sesiones 5, 6 y 7): toda la clase contra el maleficio, nunca casa contra casa.',
  '**Escribir y firmar el Código de Merlín:** un decálogo de convivencia en EF que nace del Pacto de Hogwarts de la sesión 2, se redacta en la sesión 7, se firma en la 8 y se cuelga en el gimnasio.'
]);
p('El sistema de puntos de la clase sigue igual y se integra en la historia: cada alumno da un punto por sesión a un compañero, pero en esta situación debe darlo por algo cooperativo (ayudar, incluir, animar, resolver con el semáforo). El «compi del día» (+2) pasa a llamarse **Mago o Bruja de la Concordia**. Estos puntos no cuentan para la calificación.');

/* 4 */
h2('4. Concreción curricular');
h3('Competencia específica y descriptores');
tab(['Competencia específica 3 de Educación Física','Descriptores del Perfil de salida'], [[M.compEsp, M.descriptores.join(', ')]], [75,25]);
h3('Criterios de evaluación y saberes básicos');
p('Texto literal de la Orden de 30 de mayo de 2023 (pág. 87). En 3º se evalúan los criterios «a» y en 4º los criterios «b».');
tab(['Criterio','3º de Primaria','4º de Primaria','Saberes básicos'],
  CR.map(c => [c, c+'.a. '+M.crit[c].a, c+'.b. '+M.crit[c].b, M.crit[c].saberes.join(', ')]), [9,36,36,19]);
h3('Saberes básicos (2º ciclo de Educación Física)');
p('Enunciado completo de la Orden (pág. 81), bloques ' + M.bloques.A + ' y ' + M.bloques.D + '.');
tab(['Código','Saber básico'], Object.keys(M.saberes).map(k => [k, M.saberes[k]]), [18,82]);
p('*Nota:* el enunciado de EFI.2.D.4 repite «efectos negativos» en la propia Orden; se copia tal cual.');
h3('Contribución a los descriptores');
tab(['Descriptor','Cómo se trabaja en esta situación'], [
  ['CCL1','Expresar emociones y propuestas en las asambleas y con el Semáforo de Hermione.'],
  ['CCL5','Comunicarse de forma respetuosa y no discriminatoria; rechazar insultos y burlas.'],
  ['CPSAA1','Reconocer y regular las propias emociones ante el fallo y la derrota.'],
  ['CPSAA3','Mostrar empatía, asumir roles en el equipo y cooperar.'],
  ['CPSAA5','Planificar estrategias en grupo y valorar el propio progreso (autoevaluación).'],
  ['CC2','Consensuar normas (Pacto de Hogwarts y Código de Merlín) y resolver conflictos hablando.'],
  ['CC3','Rechazar estereotipos de género y de habilidad y cualquier forma de violencia.']
], [18,82]);

/* 5 */
h2('5. Secuenciación didáctica');
p('Ocho sesiones de 45 minutos organizadas en seis fases. Las fases de Motivación a Estructuración no se califican; solo se evalúa en Aplicación (heteroevaluación) y Conclusión (autoevaluación). En todas las sesiones siguen vivos el «¡Petrificus Totalus!» y el Medidor del Maleficio.');
tab(['Fase','Sesión','Título','Evaluación'], M.sesiones.map(s => [s.fase, String(s.n), s.tit, s.eval]), [17,9,40,34]);
M.sesiones.forEach(s => {
  h3('Sesión '+s.n+' · '+s.fase+' · '+s.tit);
  B.push({ sesion:s });
});

/* 6 */
h2('6. Principios y pautas DUA aplicados');
tab(['Principio DUA','Pautas aplicadas en la situación'], [
  ['**Múltiples formas de implicación** (el porqué del aprendizaje)', 'Narrativa de Harry Potter y reto colectivo (no casa contra casa) para captar el interés. Medidor del Maleficio como meta visible y alcanzable. Roles de equipo que dan responsabilidad a todos. Retos con niveles (más o menos toques, menos apoyos, con o sin hablar). Rutina del semáforo y respiración del dragón para la autorregulación. Asamblea al final de cada sesión.'],
  ['**Múltiples formas de representación** (el qué)', 'Consignas orales, demostración del maestro y apoyo visual en la pizarra: carta de Dumbledore, semáforo con colores e iconos, tarjetas de roles y de conflicto. Normas escritas en el Pacto y el Código y leídas en voz alta. Palabras clave (JUNTOS, HACEMOS, MAGIA) que resumen la idea de la sesión.'],
  ['**Múltiples formas de acción y expresión** (el cómo)', 'Formas de participar variadas: guía, guiado, cronometrador, portavoz, árbitro. Expresión oral, gestual (prueba sin hablar), escrita (pergaminos) o con caritas en la autoevaluación. Tablets o papel para la diana. Tarjeta de diseño para planificar el juego propio (sesión 7).']
], [28,72]);

/* 7 */
h2('7. Medidas de atención a la diversidad');
h3('Medidas generales');
ul([
  '**Grupos heterogéneos** hechos por el maestro (artículo 27.4.g de la Orden: metodologías basadas en el trabajo colaborativo en grupos heterogéneos), cambiando de grupo cada sesión.',
  '**Retos graduados:** cada juego tiene una versión más fácil y otra más difícil (globo más grande o más pequeño, más o menos toques, más o menos apoyos).',
  '**Anticipación:** al empezar, la agenda de la sesión en la pizarra (qué vamos a hacer y en qué orden).',
  '**Rincón de la calma** («la Sala de los Menesteres»): un sitio para respirar unos minutos si alguien se desborda, sin que sea un castigo.',
  '**Pareja tutora** para el alumnado que lo necesite (nuevo en el centro, con poco dominio del idioma o con más dificultad motriz).'
]);
h3('Medidas específicas (según el alumnado de cada clase)');
tab(['Alumnado','Medidas'], [
  ['Dificultades motrices','Adaptar distancias, tiempos y material (globos y pelotas más lentos, aros más grandes). Rol de guía en el lazarillo.'],
  ['TDAH o impulsividad','Consignas cortas, de una en una. Roles activos (Guardián/a del tiempo). Ubicación cerca del maestro. Refuerzo inmediato de las conductas positivas.'],
  ['TEA','Anticipar la congelación del «Petrificus Totalus» (puede impresionar) y los cambios de grupo. Apoyo visual con pictogramas del semáforo. Rol estable dentro del grupo.'],
  ['Altas capacidades','Diseñar variantes de los juegos, ejercer de mediador/a con el semáforo y crear el juego más complejo en la sesión 7.'],
  ['Desconocimiento del idioma','Pareja tutora, demostraciones y tarjetas con iconos.'],
  ['Lesión o exención temporal','Roles de árbitro, cronometrador u observador. Participa en las asambleas y en la autoevaluación.']
], [25,75]);
p('Las medidas para el alumnado con necesidades específicas de apoyo educativo seguirán lo indicado en su informe y en las orientaciones del equipo de orientación educativa.');

/* 8 */
h2('8. Evaluación del proceso de aprendizaje');
p('Referente: los criterios 3.1, 3.2 y 3.3 (los «a» en 3º y los «b» en 4º). La evaluación es continua y formativa, preferentemente por **observación** (artículo 10.1 de la Orden), y combina la **heteroevaluación** del maestro con la **autoevaluación** del alumnado (artículo 10.4).');
tab(['Fase','Instrumento','Quién evalúa','Criterios','Peso en la nota'], [
  ['Motivación a Estructuración (sesiones 1-4)','Observación sin calificar (diario del maestro, asambleas)','Maestro','—','No califica'],
  ['Aplicación (sesiones 5-7)','Rúbrica de observación con 4 niveles y hoja de registro','Maestro (heteroevaluación)','3.1, 3.2 y 3.3', M.pesos.hetero+' %'],
  ['Conclusión (sesión 8)','Diana del Pensadero (6 frases con caritas)','Alumnado (autoevaluación)','3.1, 3.2 y 3.3', M.pesos.auto+' %']
], [22,28,18,14,18]);
h3('Heteroevaluación por tercios (sesiones 5, 6 y 7)');
ul([
  'Al empezar cada sesión, el Sombrero Seleccionador saca al azar un tercio de la clase entre quienes aún no han sido observados. En la sesión 7 sale el resto, así que en tres sesiones se observa a todo el alumnado.',
  'El alumnado no sabe a quién se observa, lo que evita que actúe para el maestro.',
  'Para cada alumno observado se elige el nivel de la rúbrica en cada criterio y, dentro del nivel, la nota: Insuficiente 1-4, Suficiente/Bien 5-6, Notable 7-8, Sobresaliente 9-10.',
  'Si un alumno falta el día que le toca, pasa al tercio siguiente. Si falta también en la sesión 7, se le observa en la sesión 8 durante el juego favorito.'
]);
h3('Autoevaluación (sesión 8)');
p('Seis frases en primera persona, dos por criterio, con cuatro caritas: 😟 Todavía no = 1 · 🙂 A veces = 2 · 😊 Casi siempre = 3 · 🤩 Siempre = 4.');
p('**Conversión a nota:** nota de autoevaluación del criterio = media de sus dos frases × 2,5. Por ejemplo, 🙂 y 😊 → (2 + 3) / 2 × 2,5 = **6,25**. Las notas posibles van de 2,5 a 10.');
h3('Nota de cada criterio para Séneca');
p('**Nota del criterio = '+M.pesos.hetero+' % heteroevaluación + '+M.pesos.auto+' % autoevaluación**, redondeada a un decimal.');
p('Ejemplo: en 3.2 el maestro pone 7 y la autoevaluación da 8,75 → 0,7 × 7 + 0,3 × 8,75 = 4,9 + 2,63 = **7,5** (Notable).');
ul([
  'En el cuaderno de Séneca, crea dos actividades evaluables vinculadas a los criterios 3.1, 3.2 y 3.3: «Rúbrica de observación» (peso '+M.pesos.hetero+') y «Diana de autoevaluación» (peso '+M.pesos.auto+'). Si prefieres meter una sola nota, usa la nota final de cada criterio que calcula la Javificación (Evaluación → Notas para Séneca, exportable a Excel).',
  'Los tres criterios tienen el mismo valor para la competencia específica 3 (artículo 10.5 de la Orden).',
  'Calificación cualitativa (artículo 12.6): Insuficiente 1-4, Suficiente 5, Bien 6, Notable 7-8, Sobresaliente 9-10.'
]);
p('Los instrumentos listos para imprimir están en el **Anexo**: rúbricas de 3º y de 4º, hoja de registro, Diana del Pensadero y hoja de notas para Séneca.');

/* 9 */
h2('9. Evaluación del proceso de enseñanza');
p('Como pide el artículo 10.7 de la Orden, al terminar la situación el maestro evalúa su propia práctica con tres fuentes:');
ul([
  '**Cuestionario de autoevaluación docente** (Anexo), con 10 indicadores valorados de 1 a 4 y propuestas de mejora.',
  '**Opinión del alumnado** en la sesión 8: pulgares arriba, en medio o abajo, y la pregunta «¿qué cambiarías?».',
  '**Indicadores de resultados:** número de congelaciones por sesión (Medidor del Maleficio), casillas encendidas, porcentaje de alumnado con 5 o más en cada criterio y diferencias entre la heteroevaluación y la autoevaluación.'
]);
p('Las conclusiones se anotan en la programación para mejorar la siguiente situación de aprendizaje y se comparten en el equipo de ciclo.');

/* recursos de la Javificación (solo en la web y el Word, como guía) */
h2('Recursos en la Javificación');
tab(['Recurso','Para qué'], [
  ['🗝️ Breakout de la sesión 1','Carta de Dumbledore, las cuatro pruebas, las palabras y la pista para abrir el cofre de verdad (el candado es físico).'],
  ['⚡ Medidor del Maleficio','Botón «¡Petrificus Totalus!» con cuenta atrás de 30 segundos, congelaciones de la sesión y las 8 casillas.'],
  ['🚦 Semáforo de Hermione','La rutina para resolver conflictos, los roles de equipo y las tarjetas de conflicto del Wizengamot.'],
  ['📜 Código de Merlín','Escribir el Pacto de Hogwarts y el Código final de cada clase, verlo en grande e imprimirlo para firmarlo.'],
  ['🎩 Evaluación','Sombrero de los tercios, rúbrica en la pizarra o la tablet, Diana del Pensadero en las tablets y notas para Séneca.'],
  ['🖨️ Anexo imprimible','Rúbricas de 3º y 4º, hoja de registro, diana, notas para Séneca, cuestionario docente y diplomas.']
], [30,70]);

module.exports = { B, M, CR };
