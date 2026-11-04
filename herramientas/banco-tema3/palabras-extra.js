/* Palabras EXTRA para las interactivas del Tema 3 (Javi, 4/11/2026: «que no se repitan, que haya infinidad de palabras»).
   Escritas por tipo: generar.js las separa en sílabas, calcula la tónica (por la tilde o por la regla) y comprueba que el tipo
   coincide con la lista en la que están; si no, se para. Sin hiatos, sin monosílabos, sin nombres propios ni extranjerismos.
   Fuera las que sin tilde (o con otra tilde) son otra palabra real: bebé/bebe, dominó/domino, médico/medico, número/numero,
   sábana/sabana, máquina/maquina, último/ultimo, título/titulo, práctica/practica, fábrica/fabrica…
   Estas palabras NO entran en el banco de La Copa (grupo «extra»): solo en las interactivas. */
module.exports = {
  aguda: [
    /* con tilde */
    'sofá', 'café', 'menú', 'rubí', 'sillón', 'balcón', 'cajón', 'jamón', 'melón', 'tiburón', 'ladrón', 'montón', 'colchón', 'buzón', 'balón',
    'melocotón', 'cartón', 'tapón', 'pantalón', 'bastón', 'escalón', 'vagón', 'chapuzón', 'empujón', 'pisotón', 'estación', 'ilusión', 'emoción',
    'misión', 'visión', 'televisión', 'invitación', 'imaginación', 'alimentación', 'digestión', 'circulación', 'nutrición', 'inspiración',
    'espiración', 'excursión', 'natación', 'función', 'oración', 'canción', 'corazón', 'maletín', 'delfín', 'cojín', 'calcetín', 'botiquín',
    'festín', 'violín', 'colibrí', 'jabalí', 'esquí', 'maniquí', 'ñandú', 'champú', 'bambú', 'iglú', 'canapé', 'chimpancé', 'puré',
    'autobús', 'compás', 'ciempiés', 'interés', 'ciprés', 'través', 'jamás', 'detrás', 'quizás', 'anís', 'aquí', 'allá', 'maní',
    'imán', 'refrán', 'volcán', 'tulipán', 'faisán', 'gavilán', 'andén', 'almacén', 'algodón', 'razón', 'opinión', 'camión',
    'avión', 'botón', 'limón', 'salón', 'ratón', 'jabón', 'dragón', 'lección', 'atención', 'explicación', 'sartén', 'también', 'además',
    'después', 'atrás', 'jardín', 'patín', 'huracán', 'capitán', 'cinturón', 'algún', 'pulmón', 'respiración', 'acción', 'poción',
    'corrección', 'excavación', 'medición', 'redacción', 'audición'
  ],
  agudaSin: [
    'pared', 'reloj', 'nariz', 'azul', 'salud', 'verdad', 'ciudad', 'amistad', 'caracol', 'arroz', 'animal', 'hospital', 'feliz', 'tambor',
    'collar', 'metal', 'mantel', 'jugar', 'papel', 'color', 'pintor', 'escolar', 'dolor', 'calor', 'sabor', 'olor', 'motor', 'tractor',
    'ascensor', 'ordenador', 'profesor', 'director', 'doctor', 'pastor', 'actor', 'nadador', 'jugador', 'ganador', 'cazador', 'comedor',
    'mirador', 'girasol', 'farol', 'pincel', 'cartel', 'hotel', 'nivel', 'pastel', 'cascabel', 'carrusel', 'capaz', 'disfraz', 'avestruz',
    'perdiz', 'codorniz', 'lombriz', 'tapiz', 'actriz', 'cicatriz', 'barniz', 'cantar', 'saltar', 'correr', 'comer', 'vivir', 'dormir',
    'escribir', 'soñar', 'volar', 'nadar', 'mirar', 'pensar', 'respirar', 'inspirar', 'espirar', 'aprender', 'estudiar', 'bondad', 'libertad',
    'edad', 'mitad', 'humedad', 'felicidad', 'curiosidad', 'oscuridad', 'claridad', 'tempestad', 'juventud', 'actitud', 'virtud', 'meditar',
    'nasal', 'relajar', 'pulmonar', 'rapidez', 'cristal', 'tenedor'
  ],
  llana: [
    /* sin tilde */
    'boca', 'casa', 'mesa', 'libro', 'cuaderno', 'ventana', 'mochila', 'pizarra', 'escoba', 'varita', 'lechuza', 'caldero', 'castillo', 'hechizo',
    'cabeza', 'garganta', 'espalda', 'pierna', 'brazo', 'mano', 'dedo', 'rodilla', 'tobillo', 'codo', 'hombro', 'cuello', 'pecho', 'barriga',
    'ombligo', 'oreja', 'ceja', 'frente', 'mejilla', 'labio', 'lengua', 'diente', 'muela', 'pulmones', 'olfato', 'sentido', 'sonido', 'aliento',
    'examen', 'joven', 'origen', 'imagen', 'volumen', 'resumen', 'margen', 'orden', 'polen', 'abdomen', 'lunes', 'martes', 'jueves', 'viernes',
    'virus', 'caries', 'paraguas', 'tijeras', 'gafas', 'zapatos', 'camiseta', 'pantalones', 'calcetines', 'bufanda', 'abrigo', 'guante', 'gorro',
    'pelota', 'partido', 'equipo', 'carrera', 'deporte', 'medalla', 'montaña', 'playa', 'bosque', 'lago', 'isla', 'desierto', 'selva', 'pradera',
    'nube', 'lluvia', 'nieve', 'tormenta', 'viento', 'planeta', 'estrella', 'luna', 'cometa', 'galaxia', 'nave', 'fuego', 'agua',
    'tierra', 'hierba', 'flores', 'hoja', 'rama', 'tronco', 'perro', 'gato', 'caballo', 'conejo', 'ardilla', 'tortuga', 'serpiente', 'ballena',
    'pulpo', 'cangrejo', 'mariposa', 'abeja', 'hormiga', 'araña', 'mosca', 'mosquito', 'lagarto', 'cocodrilo', 'jirafa', 'elefante', 'tigre',
    'lobo', 'zorro', 'oveja', 'cabra', 'vaca', 'cerdo', 'gallina', 'pato', 'paloma', 'cuervo', 'loro', 'pingüino', 'leche', 'queso', 'huevo',
    'fruta', 'manzana', 'pera', 'naranja', 'uva', 'fresa', 'cereza', 'patata', 'lechuga', 'pepino', 'cebolla', 'pasta', 'sopa', 'galleta',
    'magdalena', 'chocolate', 'caramelo', 'bocadillo', 'merienda', 'desayuno', 'comida', 'cena', 'mago', 'bruja', 'capa', 'sombrero',
    'pergamino', 'pluma', 'tinta', 'mazmorra', 'torre', 'escalera', 'retrato', 'fantasma', 'gigante', 'duende', 'unicornio', 'centauro',
    'sirena', 'conjuro', 'ingrediente', 'sapo', 'mapa', 'biblioteca', 'lapicero', 'sacapuntas', 'goma', 'regla', 'pegamento', 'carpeta',
    'estuche', 'alumno', 'alumna', 'compañero', 'clase', 'pupitre', 'silla', 'tiza', 'cuento', 'palabra', 'frase', 'letra', 'suma',
    'resta', 'deberes', 'libreta', 'agenda', 'horario', 'patio', 'gimnasio', 'rayo'
  ],
  llanaCon: [
    'árbol', 'césped', 'lápiz', 'tórax', 'fácil', 'difícil', 'débil', 'útil', 'inútil', 'frágil', 'ágil', 'hábil', 'móvil', 'fútbol', 'béisbol',
    'azúcar', 'ámbar', 'cárcel', 'mármol', 'túnel', 'fénix', 'cáliz', 'carácter', 'líder', 'dólar', 'néctar', 'nácar', 'huésped', 'ángel',
    'cóndor', 'fósil', 'dócil', 'fértil', 'estéril', 'portátil', 'automóvil', 'inmóvil', 'cráter', 'cómic', 'almíbar', 'trébol'
  ],
  esdrujula: [
    'mágico', 'música', 'sábado', 'plátano', 'pájaro', 'lámpara', 'cámara', 'rápido', 'brújula', 'gramática', 'sílaba', 'esdrújula', 'fantástico',
    'oxígeno', 'esófago', 'glándula', 'órgano', 'física', 'atmósfera', 'húmedo', 'pócima', 'murciélago', 'cáscara', 'víbora', 'símbolo',
    'óvalo', 'ángulo', 'tímido', 'párpado', 'lágrima', 'músculo', 'célula', 'estómago', 'plástico', 'cántaro', 'miércoles', 'árboles',
    'águila', 'teléfono', 'matemáticas', 'pirámide', 'bolígrafo', 'helicóptero', 'hipopótamo', 'búfalo', 'mamífero', 'cúpula', 'cerámica',
    'espátula', 'química', 'fábula', 'pétalo', 'sótano', 'tórtola', 'tómbola', 'eléctrico', 'simpático', 'lógico', 'básico', 'clásico', 'cómico',
    'único', 'rápida', 'sílabas', 'pájaros', 'frágiles', 'jóvenes', 'exámenes', 'imágenes', 'orígenes', 'volúmenes', 'lápices', 'móviles',
    'débiles', 'útiles', 'fósiles', 'ángeles', 'túneles', 'cárceles', 'líderes', 'dólares', 'vértebra', 'clavícula', 'mecánico', 'pelícano',
    'relámpago', 'época', 'cómoda', 'sólido', 'ácido', 'tóxico', 'pálido', 'cálido', 'mágica', 'fantástica', 'magnífico', 'gótico', 'pícaro',
    'científico', 'pacífico', 'gráfico'
  ]
};
