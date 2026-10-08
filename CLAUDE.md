# Javificación — web de clase de Javi (CEIP Arias Montano)

Javi es maestro de Educación Física y de Lengua (tutor de 4ºA) y ambienta sus clases con temática de Harry Potter.
Esta web reúne sus herramientas de gamificación. Se publica con **GitHub Pages** en
`https://maestrojavi72.github.io/sobres/` y se inserta en su **Google Sites**. Todo está en español y está pensado para niños de 8 a 10 años y para usarse en la pizarra digital.

Cada módulo es una carpeta con su `index.html` autocontenido (CSS y JS dentro), sin build ni dependencias, que carga la pieza común `comun/javi.js`. Para cambiar algo: editar el HTML, probarlo en el navegador y subirlo a `main`. GitHub Pages lo publica en 1–2 minutos.

## Estructura

| Ruta | Para qué | Quién la usa |
|---|---|---|
| `index.html` | **Portada** con tres puertas: **Tutoría** (4ºA, siempre Harry Potter), **Educación Física** (3ºA, 3ºB, 4ºB, con el multiverso del trimestre) y **Planificación** (solo con `?profe`). Secciones con `#tutoria`, `#ef`, `#planificacion`. Los módulos se abren con `ambito=tutoria|ef` y solo muestran esas clases (`JAVI.gruposVisibles`). Todas las páginas tienen «← Volver» (`data-volver`, `JAVI.volver`): pantalla anterior o, si no la hay, su sección. | Google Sites (una sola incrustación por URL) |
| `hogwarts/` | **4ºA** (su tutoría): El Mercader, Sobres, Mis cartas y, con `?profe`, la pestaña **Hogwarts**. Pestaña directa con `#sobres`, `#mis`, `#hogwarts`. | 4ºA; Javi con `?profe` |
| `ef/` | **EF** 3ºA, 3ºB, 4ºB: Coevaluación, La clase, Mercader de EF. La pestaña Bóveda lleva a `boveda/`. | Javi en la pizarra de EF |
| `boveda/` | **Bóveda de la clase** (las 4 clases): autoevaluación, monedas al cofre y fiesta con 9–10, recompensas, movimientos y ajustes. | Pizarra |
| `sesion/` | **Sesión y Ruleta** (todas las clases): plan de la sesión por fases (se guarda en la Hoja, acción `Plan`, alumno `PLAN · 3ºA`, CartaId = `fecha · asignatura`, JSON; 4ºA elige EF o Lengua) y fases **Ruleta de preguntas** a pantalla completa. Abrir con `?grupo=4oA`. | Javi en la pizarra |
| `planificacion/` | **Planificación semanal**: cuadrícula de la semana según `data/horario.json` (cada sesión abre `sesion/` con grupo, fecha y asignatura), **situaciones de aprendizaje** (acción `SdA`, alumno `SDA · 4ºA`; título, unidad del libro, reto, producto, evaluación, criterios de `data/criterios.json` y sesiones repartidas solas en el horario) y **días sin clase** (ajuste `festivos`). | Javi |
| `sorteos/` | **Responsables y capitanes** (estilo del «Plan de la semana · Pichi»). Responsable del día (1 por clase y día; NO da puntos) y 2 capitanes de pichi, **solo en EF** (aviso si el horario no tiene EF ese día). Sin repetición por rondas: histórico inicial de `data/historial.json` (nota de Javi hasta el 7/10/2026, sin fechas) + sorteos en la Hoja (acciones `Responsable` / `Capitán`, alumno `SORTEO · 3ºA`, CartaId = fecha o «sin fecha», Tipo = nombre; deshacer = `anula #id`). El responsable de hoy no puede ser capitán ese día. Ausentes conservan su turno. Exportar/importar JSON (importar solo añade lo que falta). | Javi en la pizarra |
| `sda/` | **Página de una situación de aprendizaje** escrita por Javi en Markdown: `sda/?id=tema2-lengua-4a` lee `data/sda/<id>.md` (se publica sin el apartado «Encargo para Claude Code») y la muestra como pergamino: portada, índice, la temporalización como tarjetas de sesión (con «Planificar esta sesión»), códigos `LCL.2.x.y` que al tocarlos muestran el texto oficial (de `data/criterios.json`) e impresión limpia. | Javi |
| `sda/<id>/iNN-*.html` | **Interactivas de una SA** (una página por actividad, para pizarra y Google Sites). Se enlazan desde la SA con `enlaces` en `data/sda/indice.json` (p. ej. `"I-1": "tema2-lengua-4a/i01-glosario.html"`). Tema 2 de Lengua: hechas las 16 (I-1…I-16), con la base común `sda/comun/actividad.js` (`window.ACT`: silabeo `silabas()`, `tonica()`, `plural()`, sonidos, voz y pantalla final) y `actividad.css`. I-16 Duelo puede dar +1 galeón a los ganadores (`JAVI.darPuntos`). Detalle de las primeras: **I-4 Clasificador de sílabas** (arrastrar con el dedo o tocar palabra y caldero; 16 palabras con 3 de cada tipo, puntos a la primera, tiempo, repetir), **I-5 Fábrica de palabras** (sílabas desordenadas con pista; contra reloj 90 s con récord en el navegador o sin reloj), **I-3 Variables o invariables** (14 oraciones etiquetadas por clase de palabra, rondas de 8, nota y estrellas, repetir), **I-2 Palmadas silábicas** (separador de sílabas propio `silabas()`, probado con 80 palabras; calderos mono/bi/tri/poli) y **I-1 Glosario mágico** (tarjetas que se dan la vuelta, voz, palabra al azar, el profe añade palabras o escribe la frase del texto: acción `Glosario`, alumno `GLOSARIO · tema2-lengua-4a`, CartaId = palabra normalizada, JSON; hoja del alumno imprimible). Definiciones y ejemplos escritos para 4º (NO son del libro). | Pizarra |
| `sda/<id>/ficha-*.html` | **Fichas imprimibles A4** (ficha + hoja de soluciones aparte; botones imprimir ficha / soluciones / las dos; cada hoja cabe en un A4). Comparten `sda/comun/ficha.css` y `ficha.js`. Hechas en el Tema 2: fichas para familias de sílabas, nombre (género y número), sinónimos y antónimos, tónica y átona; además `dados-imprimibles.html`, `hoja-cuento.html` y `rubricas.html`. Se enlazan con `recursos` en `data/sda/indice.json` (cabecera de la SA y tarjeta de su sesión). | Javi |
| `data/sda/indice.json` | Situaciones escritas por Javi con sus sesiones (fechas fijas), criterios y producto: la planificación las muestra junto a las de la Hoja (si se edita una en la web, manda la versión de la Hoja). Para añadir otra: copiar el `.md` a `data/sda/` y generar su entrada con el mismo formato. | — |
| `profe/` | **Panel del profe**: alumnos (altas, bajas, nombre, aspecto), tema del trimestre y enlaces para Google Sites. | Javi |
| `comun/javi.js` | **Capa común**: leer/escribir la Hoja, alumnos (`data/alumnos.json` + cambios del panel), ajustes, temas, modo prueba, pantalla completa, exportar CSV. Para cambiar de almacenamiento, solo se toca este archivo. | — |
| `comun/javi.css` | Temas `hp`, `vengadores`, `pokemon` (variables CSS) para la portada, el panel y los módulos nuevos. | — |
| `data/horario.json` | Horario de Javi (EF en las 4 clases, Lengua en 4ºA). Si cambia, solo se toca este archivo. | — |
| `data/criterios.json` | Criterios del 2º ciclo (LCL, EF, MAT; textos de 3º y 4º y saberes), generados desde los `.md` de la Orden de 30/05/2023. | — |
| `data/alumnos.json` | Lista base de alumnos por grupo (`sistema`: hogwarts o ef; chica y aspecto del personaje; `antes`: nombres anteriores, p. ej. 3ºB «Valería» antes «Valeria»). | — |
| `data/historial.json` | Histórico inicial de responsables y capitanes (sin fechas). | — |
| `ef.html` | Redirige a `ef/` (dirección antigua). | — |

Recursos: `img/cartas-hp/` (cartas de Harry Potter, diseñadas por Javi en Canva), `img/cartas-ef/` (cartas de EF), `recursos/` (banner y fondo «Javificación», hoja de cartas de EF) y `herramientas/cartas_ef.html` (generador SVG de las cartas de EF).

**Modo prueba:** en `localhost` o con `?prueba` no se envía nada al Formulario (`JAVI.PRUEBA`; la Bóveda tiene su propia comprobación). Para probar en local, servidor estático en la carpeta: `npx http-server -c-1`.

## Dónde se guardan los datos

No hay servidor. Las dos páginas **escriben** en un Formulario de Google (POST `no-cors` a `formResponse`) y **leen** la Hoja de respuestas publicada como CSV. Las URL y los `entry.*` están en `CONFIG.registro` (index) y `EF.registro` (ef). Columnas de la Hoja:

`Marca temporal, Alumno, Accion, CartaId, Tipo, Carta`

| Accion | Significado | CartaId | Tipo | Carta |
|---|---|---|---|---|
| `Galeones` | puntos ganados o quitados (con signo) | cantidad | motivo | `#gXXXX` (id del movimiento) + detalle |
| `Compra` | galeones gastados (resta saldo, **no** nivel) | cantidad | motivo | `#gXXXX` + detalle |
| `Registro` | carta conseguida | nº de carta (EF: `EF7`) | tipo/rareza | nombre |
| `Uso` | carta usada | nº de carta | … | … |
| `Premio` | carta gratis (tarea, examen, campeón) | 0 | motivo | detalle |
| `Boveda` | galeones de la clase (con signo) | cantidad | motivo | `#gXXXX` + detalle |
| `Alumnos` | cambio de alumnos (Alumno `ALUMNOS · 4ºA`) | alta / baja / vuelve / nombre / aspecto | nombre | `#gXXXX` · JSON |
| `Ajuste` | ajuste general (Alumno `AJUSTES`) | nombre del ajuste (`tema`) | valor | `#gXXXX` |

- En 4ºA el campo Alumno es el nombre tal cual. En EF va como `3ºA · Nombre`, y la Bóveda como `3ºA · BÓVEDA`, para que no se mezclen.
- La Hoja publicada tarda unos minutos en actualizarse. Por eso cada movimiento se guarda también en `localStorage` como «pendiente» (`gringotts-pendientes`, `ef-pendientes`) hasta que aparece en el CSV con su `#gXXXX`.
- Para anular algo nunca se borra: se escribe el movimiento contrario. En EF, el detalle lleva `anula #gXXXX`.

## Reglas del juego (decididas con Javi; respétalas)

**Comunes**
- **Temas:** 4ºA vive **siempre en Harry Potter** (`"tema": "hp"` en `data/alumnos.json`). El multiverso por trimestre (Harry Potter → Vengadores → Pokémon) es solo para las clases de EF (3ºA, 3ºB, 4ºB). En los módulos, usa `JAVI.temaDe(grupo)`.
- **Acumulados** = todo lo ganado; marcan el **nivel** y nunca bajan al comprar. **Saldo** = acumulados − compras.
- Con acumulados negativos el personaje está **en un huevo** (nivel 0). Gastar no puede mandar a nadie al huevo.
- Personajes: chicos y chicas magos dibujados en SVG (`personajeSVG`). Crecen con el nivel y ganan complementos (bufanda, varita, sombrero e insignia, capa, libro, aura). El aspecto de cada alumno de 4ºA (pelo, peinado, piel, gafas, mecha) está en `G.personajes`. Los niveles tienen forma masculina y femenina según `chicas`.
- Las cartas de Harry Potter son de Javi; las de EF son originales. No usar personajes, logotipos ni escudos con derechos.

**4ºA · Hogwarts (`index.html`)**
- ClassDojo se ha dejado de usar. Los puntos de partida están en `G.inicio` y lo gastado antes en `G.gastadoInicial` (desde `G.desde`).
- Comportamientos en `G.motivos`, por categoría para los informes: `clase` (Trabajo de clase, Lengua), `actitud` (Actitudinal, EF y Lengua) y `ef`. La **Tarea** abre un selector de valor (+1…+5 / −1…−5).
- 13 niveles (`G.niveles`, de 0 a 200 acumulados).
- El Mercader cobra en galeones, aplica las ofertas del día y no deja comprar sin saldo. Existe la «carta de premio» gratis (solo con `?profe`).
- **Campeones del mes:** puntos netos del mes, sin contar compras ni premios. 1º +3 y un pack sorpresa, 2º +3, 3º +2. Empate: gana quien tiene menos negativos; si persiste, todos.
- Herramientas: al azar (sin repetir), temporizador y cronómetro con vueltas.

**EF · 3ºA, 3ºB, 4ºB (`ef.html`)**
- **Coevaluación:** cada alumno da **1 ficha** por sesión a un compañero, con un motivo: **+1 (sumar) o −1 (quitar)** (`EF.motivosCoev` y `EF.motivosCoevNeg`). Máximo 3 positivas y 3 negativas recibidas al día; las cartas ×2/×3 no multiplican las negativas. El Compi del día lo elige quien tenga más fichas netas (positivas − negativas). No puede dársela a sí mismo ni **al mismo compañero que la sesión anterior**. Nadie recibe más de 3 al día. El profe puede anular.
- **Compi del día (+2):** al cerrar la sesión, quien más fichas ha recibido elige al compañero (si hay empate, sorteo).
- Puntos del profe en el perfil (`EF.motivosProfe`).
- **Mercader de EF:** 13 cartas individuales (`EF.cartas`) con precios difíciles (comunes 5–6, especiales 8–9, legendarias 14–22) y existencias por grupo y trimestre (`EF.existencias`). Efectos automáticos: Aurum Quintus +5; Duplex y Triplex ×2 y ×3 en los puntos de ese día.
- Puntos de partida en `EF.inicio` (3ºB empieza en 0).
- **Bóveda (colectivo, las 4 clases, `boveda/`):** la clase puntúa de 1 a 10 los ítems de Javi (llegada y fila, calentamiento y explicación, normas del juego, ausencia de peleas, recogida y fila). El ítem «Subida del recreo» se añade solo en **3ºA los miércoles** y **3ºB los lunes y jueves** (casilla para cambiarlo a mano). La **media redondeada** son los galeones que gana la clase. **Una sola autoevaluación por clase y día.** Con 9 o 10, «fiesta» (confeti, fuegos, fanfarria). Las recompensas y sus precios están en `CONF.recompensas` de `boveda/`; `CONF.inicial` guarda los galeones que ya tenía cada clase (también con «Ajustar»).
- **Niveles y personajes por mundo (HECHO en `ef/`: `EF.nombresNivel`, `ESTILO` en `personajeSVG`, criatura original en `criatura()`; galería de revisión con `?galeria` en local; solo EF, mismos umbrales 0,3,6,10,15,21,28,36,45,55,66,78,90):**
  - Vengadores: Civil curioso/a · Recluta · Cadete del Cuartel · Aprendiz de héroe/heroína · Agente en prácticas · Agente de campo · Guardián/Guardiana del barrio · Protector/a de la ciudad · Héroe/Heroína con capa · Capitán/Capitana de escuadrón · Defensor/a de la Tierra · Héroe/Heroína galáctico/a · Leyenda del multiverso. Personaje con traje de héroe; complementos: antifaz, muñequeras, capa, escudo redondo con estrella, insignia, aura. Negativo: dentro de una cápsula de energía.
  - Pokémon: Novato/a del pueblo · Aprendiz de entrenador/a · Entrenador/a con mochila · Rastreador/a de hierba alta · Entrenador/a de ruta · Coleccionista de medallas · Retador/a de gimnasio · Experto/a en criaturas · Líder de gimnasio · Aspirante a la Liga · Finalista de la Liga · Campeón/Campeona de la Liga · Maestro/a legendario/a. Ropa de entrenador; complementos: gorra (azul con estrella, diseño propio), mochila, cinturón de medallas, chaqueta de la Liga y una criatura compañera ORIGINAL que crece. Negativo: huevo.
  - Palabras aprobadas: Vengadores = créditos, «Cámara acorazada del Cuartel», «el Cuartel»; Pokémon = monedas, «Hucha del Gimnasio», «el Gimnasio».
- **Semáforo (rojo/ámbar/verde)** = evaluación de contenidos (herramientas de sesión de EF), no la autoevaluación de clase.
- **Ruleta de preguntas** (`sesion/`): sorteo sin repetir hasta completar la clase (sin los que faltan), acierto = +puntos de la fase (1 por defecto) con motivo «Acierto» vía `JAVI.darPuntos` (4ºA → galeones de Hogwarts; EF → «3ºA · Nombre», aplica cartas ×2/×3 del día). El fallo no resta. Como máximo **un rebote** a otro compañero. «Deshacer» escribe el movimiento contrario («Anulado: …», que no cuenta como negativo para los campeones del mes). Exporta a CSV.

## Cómo trabajar aquí

- Cambia las cosas en los bloques de configuración (`CONFIG`, `G`, `EF`, `BOV`) antes de tocar la lógica.
- Prueba en el navegador: con Playwright se pueden simular el CSV y el Formulario interceptando `**/spreadsheets/**` y `**/forms/**`. Revisa la vista en pantalla grande y en móvil (390 px).
- No subas cambios que afecten a lo que ven los alumnos sin que Javi los haya revisado: `index.html` está insertada en su Google Sites.
- Habla con Javi en español, de forma sencilla y sin tecnicismos.
