/* Cazafaltas · palabras de ortografía (Javi, 5/11/2026: «pon muchísimas palabras de ortografía»).
   [bien escrita, mal escrita, regla]. Escritas A MANO: la mal escrita NO puede ser otra palabra que exista
   (fuera vaca/baca, tubo/tuvo, hola/ola, hecho/echo, casa/caza, poyo/pollo, valla/vaya, rallar/rayar, cien/sien, sumo/zumo, pero/perro…).
   OJO: solo AÑADIR al final o quitar; el progreso de cada alumno se guarda por la palabra bien escrita. */
window.ORTO_REGLAS = {
  mp:'Antes de <b>p</b> y <b>b</b> se escribe <b>m</b>.', brbl:'Se escribe <b>b</b> en <b>br</b> y <b>bl</b>.', aba:'Los verbos que acaban en <b>-aba</b> se escriben con <b>b</b>.',
  nv:'Después de <b>n</b> se escribe <b>v</b>.', bir:'Los verbos que acaban en <b>-bir</b> se escriben con <b>b</b> (menos vivir, servir y hervir).', vivir:'Vivir, servir y hervir se escriben con <b>v</b>.',
  ble:'Las palabras que acaban en <b>-ble</b> se escriben con <b>b</b>.', bu:'Las palabras que empiezan por <b>bu-</b>, <b>bur-</b> y <b>bus-</b> se escriben con <b>b</b>.',
  ave:'Las palabras con <b>-avo</b>, <b>-ave</b>, <b>-eve</b>, <b>-evo</b>, <b>-ivo</b> se escriben con <b>v</b>.', b:'Esta palabra se escribe con <b>b</b>.', v:'Esta palabra se escribe con <b>v</b>.',
  h:'Esta palabra lleva <b>h</b>, aunque no suene.', hue:'Las palabras que empiezan por <b>hie-</b>, <b>hue-</b>, <b>hui-</b> y <b>hum-</b> llevan <b>h</b>.',
  gj:'Esta palabra se escribe con <b>g</b> (ge, gi suenan fuerte).', ger:'Los verbos que acaban en <b>-ger</b> y <b>-gir</b> se escriben con <b>g</b>.', jj:'Esta palabra se escribe con <b>j</b>.',
  aje:'Las palabras que acaban en <b>-aje</b> y <b>-jero</b> se escriben con <b>j</b>.', gue:'Para que la g suene suave delante de e, i: <b>gue</b>, <b>gui</b>.',
  dier:'Si la u suena en gue, gui, lleva diéresis: <b>güe</b>, <b>güi</b>.', qu:'El sonido k delante de e, i se escribe <b>qu</b>.',
  cz:'Delante de <b>e</b>, <b>i</b> se escribe <b>c</b>; delante de a, o, u, <b>z</b>.', plz:'Las palabras que acaban en <b>-z</b> hacen el plural en <b>-ces</b>.',
  cc:'Esta palabra lleva <b>cc</b> (como en acción: ac-ción).', x:'Esta palabra se escribe con <b>x</b>.', d:'Esta palabra acaba en <b>d</b>, aunque a veces no la pronunciemos.',
  rr:'Entre vocales, el sonido fuerte se escribe <b>rr</b>.', r:'Al principio de palabra y después de n, l, s se escribe una sola <b>r</b>.',
  ll:'Esta palabra se escribe con <b>ll</b>.', illo:'Las palabras que acaban en <b>-illo</b> e <b>-illa</b> se escriben con <b>ll</b>.', y:'Esta palabra se escribe con <b>y</b>.',
  yfin:'Al final de palabra, el sonido i se escribe <b>y</b> (rey, hoy, muy).'
};
window.ORTO_GRUPOS = { mp:'m antes de p/b', brbl:'b', aba:'b', nv:'v', bir:'b', vivir:'v', ble:'b', bu:'b', ave:'v', b:'b', v:'v', h:'h', hue:'h', gj:'g / j', ger:'g / j', jj:'g / j', aje:'g / j',
  gue:'gue, gui, güe', dier:'gue, gui, güe', qu:'qu', cz:'c / z', plz:'c / z', cc:'cc y x', x:'cc y x', d:'d final', rr:'r / rr', r:'r / rr', ll:'ll / y', illo:'ll / y', y:'ll / y', yfin:'ll / y' };
window.ORTO = [
  /* m antes de p y b */
  ['campo','canpo','mp'],['tambor','tanbor','mp'],['siempre','sienpre','mp'],['hombro','honbro','mp'],['cambio','canbio','mp'],['sombrero','sonbrero','mp'],['bombilla','bonbilla','mp'],
  ['empujar','enpujar','mp'],['lámpara','lánpara','mp'],['trompeta','tronpeta','mp'],['compañero','conpañero','mp'],['cumpleaños','cunpleaños','mp'],['embudo','enbudo','mp'],['timbre','tinbre','mp'],
  ['hambre','hanbre','mp'],['tiempo','tienpo','mp'],['ejemplo','ejenplo','mp'],['columpio','colunpio','mp'],['sombra','sonbra','mp'],['campeón','canpeón','mp'],['empezar','enpezar','mp'],
  ['importante','inportante','mp'],['ambulancia','anbulancia','mp'],['sombrilla','sonbrilla','mp'],['combinar','conbinar','mp'],['compra','conpra','mp'],['rompecabezas','ronpecabezas','mp'],
  ['limpio','linpio','mp'],['temprano','tenprano','mp'],['nombre','nonbre','mp'],['cumbre','cunbre','mp'],['tampoco','tanpoco','mp'],['bombero','bonbero','mp'],['campana','canpana','mp'],
  ['templo','tenplo','mp'],['simpático','sinpático','mp'],['empanada','enpanada','mp'],['comprar','conprar','mp'],['hamburguesa','hanburguesa','mp'],['imposible','inposible','mp'],
  /* b */
  ['brazo','vrazo','brbl'],['blanco','vlanco','brbl'],['libro','livro','brbl'],['hablar','havlar','brbl'],['cable','cavle','brbl'],['abrigo','avrigo','brbl'],['niebla','nievla','brbl'],
  ['broma','vroma','brbl'],['bruja','vruja','brbl'],['blando','vlando','brbl'],['tabla','tavla','brbl'],['abrir','avrir','brbl'],['brillo','vrillo','brbl'],['pueblo','puevlo','brbl'],
  ['sobre','sovre','brbl'],['cabra','cavra','brbl'],['palabra','palavra','brbl'],['octubre','octuvre','brbl'],['febrero','fevrero','brbl'],['brújula','vrújula','brbl'],['bloque','vloque','brbl'],
  ['cantaba','cantava','aba'],['jugaba','jugava','aba'],['saltaba','saltava','aba'],['estaba','estava','aba'],['miraba','mirava','aba'],['dibujaba','dibujava','aba'],['nadaba','nadava','aba'],
  ['soñaba','soñava','aba'],['bailaba','bailava','aba'],['pintaba','pintava','aba'],['hablaba','hablava','aba'],['llamaba','llamava','aba'],['lloraba','llorava','aba'],['cocinaba','cocinava','aba'],
  ['escuchaba','escuchava','aba'],['trabajaba','trabajava','aba'],['volaba','volava','aba'],['paseaba','paseava','aba'],['esperaba','esperava','aba'],
  ['escribir','escrivir','bir'],['recibir','recivir','bir'],['subir','suvir','bir'],['describir','descrivir','bir'],['vivir','bivir','vivir'],['servir','serbir','vivir'],['hervir','herbir','vivir'],
  ['amable','amavle','ble'],['posible','posivle','ble'],['terrible','terrivle','ble'],['noble','novle','ble'],['agradable','agradavle','ble'],['mueble','muevle','ble'],['responsable','responsavle','ble'],
  ['buscar','vuscar','bu'],['burbuja','vurbuja','bu'],['butaca','vutaca','bu'],['burla','vurla','bu'],['bufanda','vufanda','bu'],['burro','vurro','bu'],['búsqueda','vúsqueda','bu'],
  ['abuelo','avuelo','b'],['beber','bever','b'],['deber','dever','b'],['nube','nuve','b'],['bosque','vosque','b'],['barco','varco','b'],['bicicleta','vicicleta','b'],['jabón','javón','b'],
  ['árbol','árvol','b'],['bandera','vandera','b'],['bigote','vigote','b'],['bolígrafo','volígrafo','b'],['biblioteca','vivlioteca','b'],['autobús','autovús','b'],
  /* v */
  ['invierno','imbierno','nv'],['enviar','embiar','nv'],['invitar','imbitar','nv'],['invento','imbento','nv'],['invisible','imbisible','nv'],['envolver','embolver','nv'],['envase','embase','nv'],
  ['conversar','conbersar','nv'],['convertir','conbertir','nv'],['inventar','imbentar','nv'],
  ['octavo','octabo','ave'],['suave','suabe','ave'],['nueve','nuebe','ave'],['nuevo','nuebo','ave'],['nieve','niebe','ave'],['llevar','llebar','ave'],['breve','brebe','ave'],['activo','actibo','ave'],
  ['llave','llabe','ave'],['nave','nabe','ave'],['huevo','huebo','ave'],['lavar','labar','v'],['volar','bolar','v'],['vida','bida','v'],['vela','bela','v'],['ventana','bentana','v'],
  ['verde','berde','v'],['viento','biento','v'],['verano','berano','v'],['vestido','bestido','v'],['divertido','dibertido','v'],['avión','abión','v'],['volcán','bolcán','v'],['violín','biolín','v'],
  ['vecino','becino','v'],['viernes','biernes','v'],['vaso','baso','x'],
  /* h */
  ['hielo','ielo','hue'],['huevo','uevo','hue'],['hueso','ueso','hue'],['hierba','ierba','hue'],['huella','uella','hue'],['huerto','uerto','hue'],['hiena','iena','hue'],['hueco','ueco','hue'],
  ['huir','uir','hue'],['humo','umo','hue'],['humano','umano','hue'],['humedad','umedad','hue'],['huésped','uésped','hue'],['hierro','ierro','hue'],['huerta','uerta','hue'],
  ['hormiga','ormiga','h'],['helado','elado','h'],['hospital','ospital','h'],['hombre','ombre','h'],['hacer','acer','h'],['ahora','aora','h'],['búho','buo','h'],['zanahoria','zanaoria','h'],
  ['almohada','almoada','h'],['hilo','ilo','h'],['harina','arina','h'],['hermano','ermano','h'],['historia','istoria','h'],['hijo','ijo','h'],['hoja','oja','h'],['hamaca','amaca','h'],
  ['helicóptero','elicóptero','h'],['hipopótamo','ipopótamo','h'],['huracán','uracán','h'],['hacha','acha','h'],['horno','orno','h'],['herida','erida','h'],['hoyo','oyo','h'],['hongo','ongo','h'],
  ['deshacer','desacer','h'],['prohibido','proibido','h'],['higo','igo','h'],['hotel','otel','h'],['hábito','ábito','h'],['hoguera','oguera','h'],
  /* g y j */
  ['girasol','jirasol','gj'],['gigante','jigante','gj'],['gente','jente','gj'],['mágico','májico','gj'],['página','pájina','gj'],['general','jeneral','gj'],['gimnasia','jimnasia','gj'],
  ['imagen','imajen','gj'],['origen','orijen','gj'],['agente','ajente','gj'],['ángel','ánjel','gj'],['energía','enerjía','gj'],['magia','majia','gj'],['región','rejión','gj'],['vigilar','vijilar','gj'],
  ['gemelo','jemelo','gj'],['girar','jirar','gj'],['geografía','jeografía','gj'],['gesto','jesto','gj'],['gelatina','jelatina','gj'],
  ['coger','cojer','ger'],['recoger','recojer','ger'],['proteger','protejer','ger'],['elegir','elejir','ger'],['dirigir','dirijir','ger'],['corregir','correjir','ger'],['escoger','escojer','ger'],['sumergir','sumerjir','ger'],
  ['jirafa','girafa','jj'],['jefe','gefe','jj'],['mujer','muger','jj'],['tijeras','tigeras','jj'],['jinete','ginete','jj'],['ojera','ogera','jj'],['jersey','gersey','x'],['jefa','gefa','jj'],['ajedrez','agedrez','jj'],
  ['garaje','garage','aje'],['viaje','viage','aje'],['mensaje','mensage','aje'],['paisaje','paisage','aje'],['salvaje','salvage','aje'],['equipaje','equipage','aje'],['traje','trage','aje'],
  ['lenguaje','lenguage','aje'],['personaje','personage','aje'],['cajero','cagero','aje'],['extranjero','extrangero','aje'],['pasajero','pasagero','aje'],['consejero','consegero','aje'],
  /* gue, gui, güe */
  ['guerra','gerra','gue'],['guitarra','gitarra','gue'],['hoguera','hogera','gue'],['juguete','jugete','gue'],['guisante','gisante','gue'],['manguera','mangera','gue'],['águila','ágila','gue'],
  ['hormiguero','hormigero','gue'],['guiso','giso','gue'],['amiguito','amigito','gue'],['merengue','merenge','gue'],['guepardo','gepardo','gue'],
  ['pingüino','pinguino','dier'],['cigüeña','cigueña','dier'],['paragüero','paraguero','dier'],['vergüenza','verguenza','dier'],['antigüedad','antiguedad','dier'],['lingüista','linguista','dier'],
  /* qu */
  ['queso','keso','qu'],['quince','kince','qu'],['paquete','pakete','qu'],['mosquito','moskito','qu'],['esquina','eskina','qu'],['quiero','kiero','qu'],['pequeño','pekeño','qu'],['querer','kerer','qu'],
  ['orquesta','orkesta','qu'],['parque','parke','qu'],['bosque','boske','qu'],['máquina','mákina','qu'],['química','kímica','qu'],['etiqueta','etiketa','qu'],['mantequilla','mantekilla','qu'],
  /* c y z */
  ['cereza','sereza','cz'],['cielo','sielo','cz'],['cocina','cosina','cz'],['tiza','tisa','cz'],['cenar','senar','cz'],['zapato','sapato','cz'],['zorro','sorro','cz'],['cerilla','zerilla','cz'],
  ['pizarra','pisarra','cz'],['cerebro','serebro','cz'],['cocinero','cosinero','cz'],['cebolla','sebolla','cz'],['cerdo','serdo','cz'],['zapatilla','sapatilla','cz'],['zanahoria','sanahoria','cz'],
  ['corazón','corasón','cz'],['cabeza','cabesa','cz'],['pizza','x','x'],['tortuga','x','x'],['ciruela','siruela','cz'],['cocodrilo','x','x'],['azúcar','asúcar','cz'],['zumbido','sumbido','cz'],
  ['lápices','lápizes','plz'],['luces','luzes','plz'],['peces','pezes','plz'],['narices','narizes','plz'],['veces','vezes','plz'],['raíces','raízes','plz'],['disfraces','disfrazes','plz'],
  ['voces','vozes','plz'],['cruces','cruzes','plz'],['nueces','nuezes','plz'],['felices','felizes','plz'],['actrices','actrizes','plz'],
  /* cc y x */
  ['acción','ación','cc'],['lección','leción','cc'],['colección','coleción','cc'],['dirección','direción','cc'],['protección','proteción','cc'],['construcción','construción','cc'],['atracción','atración','cc'],
  ['examen','esamen','x'],['taxi','tasi','x'],['éxito','ésito','x'],['explicar','esplicar','x'],['extraño','estraño','x'],['excursión','escursión','x'],['texto','testo','x'],['exterior','esterior','x'],
  /* d final */
  ['ciudad','ciudá','d'],['salud','salú','d'],['verdad','verdá','d'],['mitad','mitá','d'],['libertad','libertá','d'],['amistad','amistá','d'],['edad','edá','d'],['bondad','bondá','d'],['humedad','humedá','d'],
  /* r y rr */
  ['guitarra','guitara','rr'],['tierra','tiera','rr'],['arriba','ariba','rr'],['torre','tore','rr'],['barro','baro','rr'],['ferrocarril','ferocaril','rr'],['carretera','caretera','rr'],['arroz','aroz','rr'],
  ['burro','buro','rr'],['correr','corer','rr'],['parrilla','parilla','rr'],['gorra','gora','rr'],['barril','baril','rr'],['cerrar','cerar','rr'],['barrer','barer','rr'],['terremoto','teremoto','rr'],
  ['derramar','deramar','rr'],['perrito','perito','x'],['zorro','zoro','rr'],['pizarra','pizara','rr'],
  ['ratón','rratón','r'],['rosa','rrosa','r'],['alrededor','alrrededor','r'],['sonrisa','sonrrisa','r'],['honrado','honrrado','r'],['regla','rregla','r'],['enredo','enrredo','r'],['rana','rrana','r'],
  ['rueda','rrueda','r'],['rojo','rrojo','r'],['radio','rradio','r'],['reloj','rreloj','r'],
  /* ll e y */
  ['lluvia','yuvia','ll'],['llave','yave','ll'],['caballo','cabayo','ll'],['gallina','gayina','ll'],['silla','siya','ll'],['calle','caye','ll'],['ardilla','ardiya','ll'],['estrella','estreya','ll'],
  ['pollito','poyito','ll'],['llegar','yegar','ll'],['lleno','yeno','ll'],['llorar','yorar','ll'],['llamar','yamar','ll'],['cebolla','ceboya','ll'],['botella','boteya','ll'],['toalla','toaya','ll'],
  ['anillo','aniyo','ll'],['muralla','muraya','ll'],['medalla','medaya','ll'],['galleta','gayeta','ll'],
  ['pasillo','pasiyo','illo'],['cuchillo','cuchiyo','illo'],['amarillo','amariyo','illo'],['tortilla','tortiya','illo'],['mejilla','mejiya','illo'],['semilla','semiya','illo'],['rodilla','rodiya','illo'],
  ['zapatilla','zapatiya','illo'],['bocadillo','bocadiyo','illo'],['castillo','castiyo','illo'],['ladrillo','ladriyo','illo'],['martillo','martiyo','illo'],
  ['yogur','llogur','y'],['playa','plalla','y'],['payaso','pallaso','y'],['ayer','aller','y'],['yema','llema','y'],['ayudar','alludar','y'],['desayuno','desalluno','y'],['yegua','llegua','y'],
  ['suyo','sullo','y'],['leyenda','llellenda','y'],['yeso','lleso','y'],['proyecto','prollecto','y'],['joya','jolla','y'],['raya','ralla','x'],
  ['rey','rei','yfin'],['muy','mui','yfin'],['buey','buei','yfin'],['convoy','x','x']
].filter(function(x){ return x[2] !== 'x' && x[1] !== 'x'; });
/* fuera al revisar («x»): vaso/baso (baso existe), jersey (préstamo), raya/ralla (ralla existe), perrito/perito (perito existe), y los que no tenían forma mal escrita */
