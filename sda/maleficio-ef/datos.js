/* Javificación · SA «El Maleficio de la Discordia» (EF, 3º y 4º, competencia específica 3)
   Contenido común: lo usan las páginas de la SA (evaluación, imprimibles, pizarra) y el generador del Word.
   Criterios y saberes copiados de la Orden de 30 de mayo de 2023 (págs. 81 y 87). */
(function(){
var M = {
  id: 'maleficio-ef',
  titulo: 'El Maleficio de la Discordia',
  sub: 'Juegos cooperativos para aprender a convivir · Educación Física · 3º y 4º',
  clases: ['3ºA','3ºB','4ºA','4ºB'],
  duracion: '8 sesiones de 45 minutos',

  /* ---------- concreción curricular ---------- */
  compEsp: 'Desarrollar procesos de autorregulación e interacción en el marco de la práctica motriz, con actitud empática e inclusiva, haciendo uso de habilidades sociales y actitudes de cooperación, respeto, inclusión, trabajo en equipo y deportividad, con independencia de las diferencias etnoculturales, sociales, de género y de habilidad de los participantes, para contribuir a la convivencia social y al compromiso ético en los diferentes espacios en los que se participa.',
  descriptores: ['CCL1','CCL5','CPSAA1','CPSAA3','CPSAA5','CC2','CC3'],
  crit: {
    '3.1': { corto:'Emociones y esfuerzo', ic:'💛',
      a:'Mostrar una disposición positiva hacia el juego, controlando las emociones negativas en contextos lúdicos de práctica motriz.',
      b:'Mostrar una disposición positiva hacia la práctica física y hacia el esfuerzo, controlando la impulsividad y las emociones negativas que surjan en contextos de actividad motriz.',
      saberes:['EFI.2.D.1','EFI.2.D.2'] },
    '3.2': { corto:'Normas y juego limpio', ic:'📜',
      a:'Respetar las normas consensuadas en clase, así como las reglas de juego, actuando con deportividad y juego limpio desde el diálogo y el debate, expresando y escuchando propuestas y pensamientos de manera activa.',
      b:'Respetar las normas consensuadas en clase, así como las reglas de juego, y actuar desde los parámetros de la deportividad y el juego limpio, valorando la aportación de los participantes.',
      saberes:['EFI.2.D.2'] },
    '3.3': { corto:'Cooperar, incluir y resolver conflictos', ic:'🤝',
      a:'Identificar en prácticas motrices variadas habilidades sociales de acogida, inclusión, ayuda y cooperación, proponiendo soluciones a conflictos individuales y colectivos de forma dialógica y justa, y mostrando un compromiso activo frente a los estereotipos, las actuaciones discriminatorias y cualquier tipo de violencia.',
      b:'Desarrollar habilidades sociales de acogida, inclusión, ayuda y cooperación al participar en prácticas motrices variadas, resolviendo los conflictos individuales y colectivos de forma dialógica y justa, y mostrando un compromiso activo frente a los estereotipos, las actuaciones discriminatorias y cualquier tipo de violencia.',
      saberes:['EFI.2.A.2','EFI.2.D.2','EFI.2.D.3','EFI.2.D.4'] }
  },
  /* texto literal de la Orden (pág. 81). EFI.2.D.4 repite «efectos negativos» en la Orden: se copia tal cual. */
  saberes: {
    'EFI.2.A.2': 'Salud social: la actividad física como hábito y alternativa saludable frente a formas de ocio nocivas. Límites para evitar una competitividad desmedida. Aceptación de distintas tipologías corporales, para practicar, en igualdad, diversidad de actividades físico-deportivas.',
    'EFI.2.D.1': 'Gestión emocional: reconocimiento de emociones propias, pensamientos y sentimientos a partir de experiencias motrices.',
    'EFI.2.D.2': 'Habilidades sociales: escucha activa y estrategias de negociación para la resolución de conflictos en contextos motrices.',
    'EFI.2.D.3': 'Concepto de deportividad, aceptación de las normas del juego, respeto al adversario, a los compañeros, a los árbitros, espectadores y profesores.',
    'EFI.2.D.4': 'Conductas contrarias a la convivencia, discriminatorias o sexistas, en situaciones motrices (discriminación por cuestiones de competencia motriz, etnia, género u otras): efectos negativos y estrategias de identificación y efectos negativos.'
  },
  bloques: { A:'A. Vida activa y saludable', D:'D. Autorregulación emocional e interacción social en situaciones motrices' },

  /* ---------- evaluación ---------- */
  niveles: [
    { n:'Insuficiente', r:'1-4', notas:[1,2,3,4], col:'#c0392b' },
    { n:'Suficiente / Bien', r:'5-6', notas:[5,6], col:'#d68910' },
    { n:'Notable', r:'7-8', notas:[7,8], col:'#2e86c1' },
    { n:'Sobresaliente', r:'9-10', notas:[9,10], col:'#1e8449' }
  ],
  /* descriptores observables: [Insuficiente, Suficiente/Bien, Notable, Sobresaliente] */
  rubrica: {
    '3.1': {
      a: [
        'Se niega a jugar o abandona el juego a menudo. Cuando falla o pierde reacciona con enfado (grita, tira el material, llora mucho rato) y necesita que el maestro intervenga.',
        'Participa casi siempre, aunque a veces protesta o se desanima. Cuando se enfada, se calma si el maestro o un compañero se lo recuerda.',
        'Participa con ganas en todos los juegos. Si algo sale mal se enfada poco y se calma solo/a con alguna estrategia (respirar, apartarse un momento).',
        'Juega con entusiasmo y anima a los demás. Acepta fallos y derrotas con calma y buen humor y sabe decir lo que siente («me he frustrado, pero…»).'
      ],
      b: [
        'Se rinde enseguida o no se esfuerza. Actúa por impulso (empuja, se adelanta, interrumpe) y sus enfados paran el juego.',
        'Se esfuerza en los retos que le gustan. Controla sus impulsos cuando se le recuerda; a veces se enfada, pero se recupera.',
        'Se esfuerza en todos los retos aunque sean difíciles. Espera su turno, piensa antes de actuar y gestiona sus enfados sin ayuda.',
        'Persevera y anima al grupo cuando el reto se complica. Controla la impulsividad incluso en momentos de tensión y ayuda a calmarse a otros.'
      ]
    },
    '3.2': {
      a: [
        'Incumple a menudo las normas del Pacto y las reglas del juego (trampas, no respeta límites ni turnos). No escucha las propuestas del grupo.',
        'Cumple la mayoría de normas y reglas, a veces con recordatorio. Escucha cuando se le pide, pero propone poco.',
        'Cumple normas y reglas sin recordatorios. Da alguna propuesta en el debate del grupo y escucha las de los demás.',
        'Cumple y ayuda a cumplir las normas con respeto. Propone ideas para mejorar el juego, escucha de verdad y acepta lo que decide el grupo aunque no sea su idea.'
      ],
      b: [
        'Incumple normas y reglas. No acepta las decisiones del árbitro, del maestro o del grupo y menosprecia lo que aportan otros («tú no sabes»).',
        'Cumple casi siempre y acepta las decisiones, aunque protesta. Reconoce lo que aportan solo algunos compañeros.',
        'Cumple sin recordatorios y acepta las decisiones sin protestar. Reconoce el trabajo de los demás (felicita, da las gracias).',
        'Juega limpio siempre, incluso reconociendo sus propias faltas. Valora lo que aporta cada participante, también los menos hábiles y los rivales, y lo dice.'
      ]
    },
    '3.3': {
      a: [
        'Deja fuera o ignora a compañeros (no les pasa, no les da la mano) o se burla. Ante un conflicto grita, culpa o pega. No sabe explicar qué es ayudar o incluir.',
        'Coopera con sus amigos de siempre. Reconoce cuándo alguien ayuda o se queda fuera si se le pregunta. Resuelve conflictos con el Semáforo de Hermione si le ayuda el maestro.',
        'Coopera con cualquier compañero. Reconoce por sí mismo/a quién ayuda e incluye. Propone soluciones con el semáforo (paro, hablo, acuerdo) sin ayuda.',
        'Acoge e incluye a quien se queda fuera. Propone soluciones justas para todos y ayuda a resolver conflictos de otros. Rechaza en voz alta burlas, estereotipos («eso es de chicas») o violencia.'
      ],
      b: [
        'Excluye, se burla o usa violencia verbal o física. No resuelve los conflictos hablando.',
        'Ayuda y coopera cuando se le pide. Resuelve conflictos hablando, con la mediación del maestro.',
        'Ayuda, incluye y coopera con todos por iniciativa propia. Resuelve sus conflictos hablando, de forma autónoma y justa.',
        'Es un referente: integra a quien se queda fuera, media en conflictos de otros con soluciones justas y frena en el momento estereotipos y discriminaciones.'
      ]
    }
  },
  /* autoevaluación (sesión 8): dos frases por criterio, 4 caritas */
  diana: [
    { c:'3.1', t:'He jugado con ganas aunque el reto fuera difícil.' },
    { c:'3.1', t:'Cuando me he enfadado o he perdido, me he calmado.' },
    { c:'3.2', t:'He cumplido el Código de Merlín y las reglas de los juegos.' },
    { c:'3.2', t:'He escuchado las ideas de mis compañeros y he dado las mías.' },
    { c:'3.3', t:'He ayudado a un compañero que lo necesitaba y no he dejado a nadie fuera.' },
    { c:'3.3', t:'Cuando ha habido un problema, lo he solucionado hablando (Semáforo de Hermione).' }
  ],
  caras: [
    { v:1, ic:'😟', t:'Todavía no', col:'#e74c3c' },
    { v:2, ic:'🙂', t:'A veces', col:'#f39c12' },
    { v:3, ic:'😊', t:'Casi siempre', col:'#3498db' },
    { v:4, ic:'🤩', t:'Siempre', col:'#27ae60' }
  ],
  pesos: { hetero:70, auto:30 },
  sesionesObs: [5,6,7],

  /* ---------- tarjetas de conflicto (sesión 4, el Wizengamot) ---------- */
  conflictos: [
    'Nunca me pasan la quaffle: siempre se la pasan entre los mismos.',
    'Alguien ha hecho trampa para ganar y dice que no.',
    'Cuando fallo, dos compañeros se ríen de mí.',
    '«Tú no juegas, que eres muy lento/a».',
    '«Eso es un juego de chicos» / «Eso es de chicas».',
    'Dos compañeros quieren ser capitanes a la vez y discuten.',
    'Me han empujado en la fila y yo he empujado también.',
    'Mi equipo pierde y uno culpa a otro: «¡Por tu culpa!».',
    'El árbitro (el maestro) pita algo y un jugador protesta gritando.',
    'Un compañero nuevo se queda solo en todos los grupos.',
    'Alguien coge el balón y no lo suelta en todo el juego.',
    'Hemos acordado una norma y un grupo la cambia sin preguntar.'
  ],
  roles: [
    { ic:'📜', n:'Prefecto/a de normas', d:'Recuerda las normas del Código y el Semáforo de Hermione cuando hay un problema.' },
    { ic:'⏳', n:'Guardián/a del tiempo', d:'Controla el tiempo del reto y avisa al grupo.' },
    { ic:'✨', n:'Animador/a', d:'Da ánimos y celebra cada avance. Se asegura de que nadie se quede fuera.' },
    { ic:'🦉', n:'Portavoz', d:'Cuenta al resto de la clase lo que ha hecho y sentido el grupo.' }
  ],
  semaforo: [
    { col:'#e74c3c', ic:'🔴', t:'PARO', d:'Paro el juego y respiro tres veces como un dragón: tomo aire por la nariz y lo suelto despacio por la boca.' },
    { col:'#f1c40f', ic:'🟡', t:'HABLO Y ESCUCHO', d:'«Yo me he sentido… cuando… Me gustaría que…». El otro escucha sin interrumpir y repite lo que ha entendido. Después, al revés.' },
    { col:'#2ecc71', ic:'🟢', t:'ACUERDO', d:'Buscamos una solución justa para los dos, la decimos en voz alta y la probamos. Si no funciona, volvemos al amarillo.' }
  ],

  /* ---------- secuenciación ---------- */
  fases: ['Motivación','Activación','Exploración','Estructuración','Aplicación','Conclusión'],
  sesiones: [
    { n:1, fase:'Motivación', ic:'🗝️', tit:'El Maleficio de la Discordia', eval:'No se califica. Observación inicial (diario del maestro).',
      obj:['Despertar el interés por el reto y presentar la narrativa.','Vivenciar que los retos solo se superan cooperando.','Conocer la mecánica del «Petrificus Totalus».'],
      acts:[
        { t:'La carta de Dumbledore', min:5, org:'Gran grupo, sentados', mat:'Carta (pizarra o papel), cofre de verdad con candado de 3 dígitos',
          d:'En el centro de la pista hay un cofre cerrado con un candado de tres dígitos. Peeves ha robado la llave del cuarto del material de EF y la ha encerrado ahí. Se lee la carta de Dumbledore: el cofre solo se abre si la clase descubre un hechizo de tres palabras escondido en las pruebas. Se explica el maleficio: ante un insulto, una burla o alguien excluido, el maestro dice «¡Petrificus Totalus!» y toda la clase se congela 30 segundos.' },
        { t:'Prueba 1 · Cruzar el Lago Negro', min:8, org:'Gran grupo', mat:'Aros (menos aros que alumnos)',
          d:'Los aros son rocas en el Lago Negro. Hay menos rocas que alumnos, así que la clase tiene que compartirlas y pasarlas hacia delante para cruzar de orilla a orilla sin tocar el agua. Superada la prueba, la clase consigue la palabra JUNTOS.' },
        { t:'Prueba 2 · Wingardium Leviosa', min:8, org:'Grupos de 5-6', mat:'Un globo por grupo',
          d:'Cada grupo mantiene su globo en el aire. Todos deben tocarlo y tienen que llegar a 25 toques sin que caiga. Palabra: HACEMOS.' },
        { t:'Prueba 3 · El Lazo del Diablo', min:8, org:'Grupos de 6-8', mat:'—',
          d:'Nudo humano: el grupo se coge de las manos cruzadas y tiene que desenredarse sin soltarse. Palabra: MAGIA.' },
        { t:'Prueba 4 · El Pergamino de Dumbledore', min:8, org:'Parejas lazarillo', mat:'Pañuelos para tapar los ojos, trozos de pergamino',
          d:'En parejas, uno con los ojos tapados y el otro le guía con la voz. Recogen los trozos de pergamino repartidos por la pista. Juntos forman la regla: «cuenta las letras de cada palabra». JUNTOS (6), HACEMOS (7), MAGIA (5): código 675.' },
        { t:'Se abre el cofre', min:8, org:'Gran grupo', mat:'Llave, diploma «Orden de Merlín al Trabajo en Equipo», segunda carta',
          d:'La clase abre el candado con el 675 y encuentra la llave y el diploma. Debajo hay una segunda carta: «El maleficio no se ha roto: solo duerme. Volverá cada vez que haya discordia. Demostrad sesión a sesión que sabéis convivir». Se presenta el Medidor del Maleficio. Asamblea breve: ¿qué nos ha ayudado a conseguirlo?' }
      ] },
    { n:2, fase:'Activación', ic:'🔮', tit:'El Espejo de Oesed', eval:'No se califica. Diagnóstico: termómetro emocional y asamblea.',
      obj:['Recordar lo que ya saben sobre convivir en el juego y detectar los conflictos de la clase.','Reconocer cómo se sienten en EF cuando hay conflictos.','Consensuar las primeras normas (Pacto de Hogwarts).'],
      acts:[
        { t:'Asamblea del Espejo', min:8, org:'Gran grupo en círculo', mat:'Conos verde, amarillo y rojo',
          d:'«El Espejo de Oesed enseña lo que más deseamos: ¿cómo sería nuestra clase de EF perfecta?». Lluvia de ideas sobre los conflictos que tenemos (qué pasa, cómo me siento). Termómetro emocional: cada uno se coloca junto al cono que indica cómo se siente cuando hay conflictos (verde bien, amarillo regular, rojo mal).' },
        { t:'La Red de Aragog', min:10, org:'Gran grupo', mat:'Petos para la primera araña',
          d:'Pilla-pilla en cadena: los pillados se dan la mano con la araña y forman la red. Solo los extremos de la red pueden pillar, así que la red tiene que ponerse de acuerdo para moverse.' },
        { t:'Los Sombreros Seleccionadores', min:10, org:'Agrupamientos cambiantes', mat:'Música',
          d:'Se desplazan con la música. Al pararla, el maestro dice una consigna: «grupos de 4», «grupos de 3 con al menos un chico y una chica», «grupos con alguien que nació en tu mismo trimestre». Regla mágica: nadie se queda fuera. Si alguien se queda solo, el grupo más cercano lo acoge y gana un punto para la casa.' },
        { t:'El Pacto de Hogwarts', min:12, org:'Grupos de 5-6', mat:'Pergaminos y lápices',
          d:'Cada grupo escribe 3 normas en un pergamino: una para respetar las reglas del juego, otra para tratarnos bien y otra para cuando hay un problema. Se ponen en común y se votan con el pulgar. Las más votadas forman el Pacto de Hogwarts, borrador del futuro Código de Merlín.' },
        { t:'Clases de 90 minutos: el juego de la clase', min:40, org:'Gran grupo · equipos mixtos que hace el maestro', mat:'El que pida el juego elegido',
          d:'Solo en las clases de 90 minutos (4ºA y 4ºB). La clase propone tres juegos que ya conoce y vota a mano alzada. Antes de jugar, en 3 minutos, ponen en práctica el Pacto de Hogwarts recién escrito: acuerdan cómo jugarlo para que nadie se quede fuera (equipos mixtos, todos tocan, nadie eliminado mucho rato). Se juega con el «Petrificus Totalus» activo. Al acabar: ¿hemos cumplido el Pacto? ¿Qué norma le añadiríamos?' },
        { t:'Medidor del Maleficio', min:5, org:'Gran grupo', mat:'Medidor (pizarra)',
          d:'¿Cuántas veces se ha congelado la clase hoy? Con 2 o menos se enciende una casilla del Medidor.' }
      ] },
    { n:3, fase:'Exploración', ic:'🧪', tit:'Las Clases de Hogwarts', eval:'No se califica. Reflexión al final de cada estación.',
      obj:['Experimentar distintos juegos cooperativos por estaciones.','Descubrir qué estrategias ayudan al grupo (escuchar, turnarse, animar).','Reconocer las emociones que aparecen al cooperar.'],
      acts:[
        { t:'Herbología', min:9, org:'Estación · grupo de 5-6 heterogéneo', mat:'Pelotas («mandrágoras»), aros («macetas»)',
          d:'Por parejas, llevar las mandrágoras a la maceta sin usar las manos: espalda con espalda, frente con frente o hombro con hombro. El reto es plantar todas las del grupo.' },
        { t:'Pociones', min:9, org:'Estación · mismo grupo', mat:'Paracaídas, pelotas («ingredientes»)',
          d:'Mantener los ingredientes dentro del caldero (el paracaídas) mientras se añaden más. Reto extra: que una pelota dé una vuelta completa al borde sin caer.' },
        { t:'Quidditch sin oposición', min:9, org:'Estación · mismo grupo', mat:'Balón («quaffle»), aro o canasta',
          d:'Pasarse la quaffle sin correr con ella. Solo se puede lanzar al aro cuando todos la han tocado. Cada tanto vale si el lanzador es alguien que aún no ha lanzado.' },
        { t:'Criaturas mágicas · El Hipogrifo', min:9, org:'Estación · mismo grupo', mat:'Conos para marcar la zona',
          d:'Todo el grupo cruza la zona (unos 10 m) unido y tocándose, apoyando en el suelo solo un número limitado de pies y manos que dice la tarjeta (por ejemplo, tantos pies como alumnos menos dos).' },
        { t:'Asamblea de las Clases', min:9, org:'Gran grupo', mat:'Medidor del Maleficio',
          d:'Al acabar cada estación, 30 segundos de pregunta: ¿cómo nos hemos sentido?, ¿qué hemos hecho para conseguirlo? En la asamblea final, cada portavoz cuenta una estrategia que haya funcionado. Medidor del Maleficio.' }
      ] },
    { n:4, fase:'Estructuración', ic:'⚖️', tit:'El Tribunal del Wizengamot', eval:'No se califica. Comprobación oral de la rutina del semáforo.',
      obj:['Aprender una rutina para resolver conflictos hablando: el Semáforo de Hermione.','Conocer y practicar los roles de equipo.','Distinguir conductas que ayudan y que dañan la convivencia, incluidas las discriminatorias.'],
      acts:[
        { t:'Varitas al aire', min:5, org:'Parejas', mat:'Picas («varitas»)',
          d:'Calentamiento: cada pareja sostiene una pica de pie entre los dos; a la señal, cambian de sitio sin que caiga ninguna varita.' },
        { t:'El Semáforo de Hermione y los roles', min:8, org:'Gran grupo', mat:'Pizarra (semáforo) y tarjetas de roles',
          d:'Se proyecta el semáforo: rojo, paro y respiro; amarillo, hablo con «yo me he sentido… cuando… me gustaría…» y escucho; verde, acuerdo justo. Se presentan los roles de equipo: Prefecto/a de normas, Guardián/a del tiempo, Animador/a y Portavoz.' },
        { t:'El Wizengamot', min:15, org:'Grupos de 5-6 y gran grupo', mat:'Tarjetas de conflicto',
          d:'Cada grupo saca una tarjeta de conflicto («nunca me pasan», «ha hecho trampa», «eso es de chicos»…) y la representa en un minuto. El resto de la clase es el Wizengamot: propone soluciones siguiendo el semáforo y vota la más justa.' },
        { t:'El Rescate de Ron', min:12, org:'Gran grupo', mat:'Petos para los perseguidores',
          d:'Pilla-pilla de liberación: quien es pillado queda congelado en el lago. Se libera cuando dos compañeros le dan la mano y dicen «¡Finite Incantatem!». A mitad se para el juego: si ha surgido algún conflicto, se resuelve con el semáforo.' },
        { t:'Cierre', min:5, org:'Gran grupo', mat:'Medidor del Maleficio',
          d:'¿Qué rol os ha gustado más? ¿Alguien ha usado el semáforo? Medidor del Maleficio.' }
      ] },
    { n:5, fase:'Aplicación', ic:'🐉', tit:'Torneo de los Tres Magos I · Los Dragones', eval:'Heteroevaluación (rúbrica): primer tercio de la clase.',
      obj:['Aplicar la cooperación, los roles y el semáforo en retos físicos.','Superar los retos con toda la clase contra el maleficio, no entre casas.','Gestionar la frustración cuando el reto se resiste.'],
      acts:[
        { t:'El Sombrero elige', min:2, org:'Gran grupo', mat:'Pizarra (evaluación)',
          d:'El Sombrero Seleccionador saca al azar el tercio de la clase que el maestro observará hoy. Los alumnos no saben quiénes son.' },
        { t:'El Expreso de Hogwarts', min:5, org:'Grupos de 5-6 con roles', mat:'—',
          d:'Calentamiento: trenes que se desplazan cogidos por los hombros. El conductor cambia a la señal: el último pasa delante.' },
        { t:'El Huevo de Oro', min:15, org:'Grupos de 5-6 con roles', mat:'Balón gigante o fitball, conos, bancos',
          d:'Cada grupo lleva el huevo por un circuito sin usar las manos, con todos los miembros en contacto con él. Se suman los tiempos de todos los grupos: si el total baja del objetivo que marca Dumbledore, la clase gana la prueba.' },
        { t:'El Puente del Dragón', min:15, org:'Grupos de 5-6 sobre un banco sueco', mat:'Bancos suecos, colchonetas',
          d:'Subidos al banco, se ordenan por fecha de cumpleaños sin bajarse. Si alguien toca el suelo, el grupo vuelve a empezar. Segunda ronda: sin hablar, solo con gestos.' },
        { t:'Cierre', min:8, org:'Gran grupo', mat:'Medidor del Maleficio',
          d:'Cada portavoz cuenta cómo se ha resuelto algún problema. Medidor del Maleficio.' }
      ] },
    { n:6, fase:'Aplicación', ic:'🧜', tit:'Torneo de los Tres Magos II · El Lago de las Sirenas', eval:'Heteroevaluación (rúbrica): segundo tercio de la clase.',
      obj:['Aplicar la deportividad en juegos de colaboración-oposición.','Respetar normas consensuadas que hacen el juego inclusivo.','Reconocer y valorar el juego limpio propio y del rival.'],
      acts:[
        { t:'El Sombrero elige', min:2, org:'Gran grupo', mat:'Pizarra (evaluación)', d:'Se sortea el segundo tercio entre quienes aún no han sido observados.' },
        { t:'El Rescate de Ron', min:5, org:'Gran grupo', mat:'Petos', d:'Calentamiento con el juego ya conocido de la sesión 4.' },
        { t:'Quidditch inclusivo', min:20, org:'Dos equipos mixtos', mat:'Balón, dos aros o porterías, petos',
          d:'Juego de colaboración-oposición con normas consensuadas: todos tocan la quaffle antes de lanzar, no se quita el balón de las manos, el tanto vale si lanza alguien que aún no ha marcado y los roles se rotan. Al final, saludo de magos entre los dos equipos.' },
        { t:'El Rescate del Lago', min:12, org:'Gran grupo · 2-3 sirenas que rotan', mat:'Conos para el lago y la orilla',
          d:'Los rehenes esperan en el fondo del lago. Los rescatadores cruzan y vuelven trayendo a un rehén de la mano entre dos. Las sirenas tocan a quien cruza y quien es tocado vuelve a la orilla. La clase gana si rescata a todos antes de que acabe el tiempo.' },
        { t:'Momento de Deportividad', min:6, org:'Gran grupo', mat:'Medidor del Maleficio',
          d:'La clase elige el gesto de juego limpio del día y explica por qué. Medidor del Maleficio.' }
      ] },
    { n:7, fase:'Aplicación', ic:'🌀', tit:'Torneo de los Tres Magos III · El Laberinto', eval:'Heteroevaluación (rúbrica): último tercio de la clase.',
      obj:['Crear y enseñar un juego cooperativo con normas consensuadas.','Guiar y confiar en un compañero.','Redactar el Código de Merlín (producto final).'],
      acts:[
        { t:'El Sombrero elige', min:2, org:'Gran grupo', mat:'Pizarra (evaluación)', d:'Sale el último tercio: quienes aún no han sido observados.' },
        { t:'Creadores de hechizos', min:20, org:'Grupos de 5-6', mat:'Material variado (aros, picas, pelotas, conos), tarjeta de diseño',
          d:'Cada grupo diseña en 8 minutos un juego cooperativo con la tarjeta de diseño: nombre mágico, objetivo, 3 reglas y cómo participan todos. Después lo enseña a otro grupo, que lo juega, y viceversa.' },
        { t:'El Laberinto', min:10, org:'Parejas lazarillo', mat:'Conos, pañuelos, la Copa al final',
          d:'Uno con los ojos tapados y el otro le guía con la voz por un laberinto de conos hasta la Copa. Después cambian.' },
        { t:'El Código de Merlín', min:8, org:'Gran grupo', mat:'Pizarra (Código de Merlín)',
          d:'Se revisa el Pacto de Hogwarts con lo aprendido y se redacta el Código de Merlín definitivo: 10 normas para convivir en EF.' },
        { t:'Cierre', min:5, org:'Gran grupo', mat:'Medidor del Maleficio', d:'Medidor del Maleficio: ¿cuántas casillas llevamos?' }
      ] },
    { n:8, fase:'Conclusión', ic:'🏰', tit:'El Gran Comedor', eval:'Autoevaluación (Diana del Pensadero). La clase evalúa al maestro.',
      obj:['Reflexionar sobre lo aprendido y valorar el propio progreso.','Firmar el compromiso del Código de Merlín.','Celebrar el reto conseguido.'],
      acts:[
        { t:'El juego favorito', min:12, org:'Según el juego', mat:'El del juego elegido',
          d:'La clase vota su juego cooperativo favorito de la situación y lo juega.' },
        { t:'La Diana del Pensadero', min:10, org:'Individual', mat:'Tablets o diana en papel',
          d:'Autoevaluación: seis frases en primera persona, dos por criterio, con cuatro caritas (todavía no, a veces, casi siempre, siempre).' },
        { t:'La firma del Código de Merlín', min:6, org:'Gran grupo', mat:'Código de Merlín impreso en grande',
          d:'Ceremonia: cada alumno firma el Código, que se cuelga en el gimnasio.' },
        { t:'¿Se rompe el maleficio?', min:8, org:'Gran grupo', mat:'Medidor del Maleficio, diplomas «Orden de Merlín, Primera Clase»',
          d:'Recuento final del Medidor. Con 6 o más casillas encendidas, el maleficio se rompe y la clase recibe la Orden de Merlín, Primera Clase. Si no, queda debilitado y la clase sigue vigilando.' },
        { t:'La clase evalúa al maestro', min:4, org:'Gran grupo', mat:'—',
          d:'Pulgares arriba, en medio o abajo: ¿te han gustado los juegos?, ¿te has sentido incluido/a?, ¿te ha servido el semáforo? ¿Qué cambiarías?' },
        { t:'Vuelta a la calma', min:5, org:'Gran grupo, tumbados', mat:'Música tranquila',
          d:'Relajación guiada «El vuelo del fénix».' }
      ] }
  ],

  /* ---------- evaluación de la práctica docente ---------- */
  docente: [
    'La narrativa y el reto han motivado a todo el alumnado.',
    'Los juegos han sido adecuados a la edad y al nivel motor del grupo.',
    'El tiempo de cada actividad ha sido suficiente.',
    'Los agrupamientos han sido heterogéneos y han favorecido la inclusión.',
    'He aplicado las medidas DUA y de atención a la diversidad previstas.',
    'El «Petrificus Totalus» y el Medidor han ayudado a reducir los conflictos.',
    'El alumnado ha usado el Semáforo de Hermione de forma autónoma.',
    'Los instrumentos de evaluación han sido útiles y fáciles de aplicar.',
    'He dado información al alumnado sobre su progreso durante la situación.',
    'Las conclusiones me sirven para mejorar la próxima situación de aprendizaje.'
  ]
};
if(typeof module!=='undefined' && module.exports) module.exports = M; else window.MALEFICIO = M;
})();
