/* Palabras del banco de acentuación del Tema 3 (4º, «Inspirar y espirar").
   Cada palabra va separada en sílabas con «-» y la sílaba tónica marcada con «^».
   verificar.js comprueba CADA una: separación silábica (con un separador automático), sílaba tónica,
   tipo (aguda, llana, esdrújula) y que la tilde cumple la regla. Sin hiatos, sin monosílabos, sin -y final.
   lib: libro (ej. 17 y 18) · cuerpo · cole · hp (Harry Potter) · otras */
module.exports = {
  libro: [
    'na-^sal', 'o-^xí-ge-no', 'res-pi-ra-^ción', 'na-^riz', 'e-^só-fa-go', '^bo-ca', '^glán-du-la', 'pul-^mo-nes', 'ol-^fa-to', 'me-di-^tar',
    '^ór-ga-nos', 'es-^tán', '^tó-rax', 'pul-^món', 'co-ra-^zón', '^fá-cil', 'ac-^ción', 'a-de-^más', '^fí-si-ca',
    'at-^mós-fe-ra', '^hú-me-do', 'so-^fá', 'ca-^mión', 'a-^trás', '^ár-bol', '^cés-ped', '^lá-piz'
  ],
  cuerpo: [
    'ca-^be-za', 'gar-^gan-ta', '^cue-llo', '^pe-cho', 'es-^pal-da', '^bra-zo', '^pier-na', '^cuer-po', '^ma-no',
    'es-^tó-ma-go', '^mús-cu-lo', '^cé-lu-la', 'ins-pi-^rar', 'es-pi-^rar', 'res-pi-^rar', 're-la-^jar', 'sa-^lud', 'do-^lor', 'ca-^lor',
    'pul-mo-^nar', '^pár-pa-do', '^lá-gri-ma', 'a-ten-^ción', 'des-^pués', 'ra-pi-^dez', '^dé-bil', '^ú-til', '^á-gil', '^fút-bol'
  ],
  cole: [
    'mo-^chi-la', 'pi-^za-rra', 'ven-^ta-na', 'es-^tu-che', 'cua-^der-no', '^re-gla', '^li-bro', '^me-sa', 'e-^xa-men', 'o-^ri-gen',
    'lec-^ción', 'ex-pli-ca-^ción', 'can-^ción', 'pa-^pel', 'co-^lor', 'es-co-^lar', 'pin-^tor', 'ver-^dad', 'a-mis-^tad',
    'gra-^má-ti-ca', '^sí-la-ba', 'es-^drú-ju-la', '^mú-si-ca', '^sá-ba-do', '^miér-co-les', '^lám-pa-ra', '^brú-ju-la',
    '^mó-vil', 'a-^zú-car', '^plás-ti-co', 'jar-^dín', 'pre-pa-^ré', 'guar-^dé', 'me-^tí', 'tam-^bién', '^lu-nes'
  ],
  hp: [
    'va-^ri-ta', 'le-^chu-za', 'cal-^de-ro', 'po-^ción', '^má-gi-co', '^fé-nix', 'es-^co-ba', '^pó-ci-ma', 'mur-^cié-la-go', 'he-^chi-zo',
    'dra-^gón', 'cas-^ti-llo', 'fan-^tás-ti-ca', 'vo-^ló', 'ex-pli-^có', 're-^vés', 'ca-pi-^tán', '^cá-liz', 'cris-^tal',
    '^ma-gia', 'hi-po-^gri-fo'
  ],
  otras: [
    'ca-^fé', 'me-^nú', 'ru-^bí', 'sar-^tén', 'bal-^cón', 'a-^vión', 'ra-^tón', 'li-^món', 'sa-^lón', 'bo-^tón', 'ja-^bón', 'hu-ra-^cán', 'cin-tu-^rón', 'al-^gún', 'pa-^tín',
    'pa-^red', 're-^loj', 'a-^zul', 'can-^tar', 'ca-ra-^col', 'a-^rroz', 'a-ni-^mal', 'hos-pi-^tal', 'fe-^liz', 'tam-^bor', 'co-^llar', 'me-^tal', 'man-^tel', 'ju-^gar', 'ciu-^dad',
    '^ca-sa', '^ca-ma', '^jo-ven', 'so-^ni-do', '^cie-lo', 'va-ca-^cio-nes', '^mar-tes', 'ca-^mi-sa', 'za-^pa-tos', 'ca-^mi-no',
    '^ám-bar', '^lí-der', '^dó-lar', '^már-mol', '^frá-gil', '^há-bil', '^dó-cil', '^tú-nel', 'ca-^rác-ter', '^cán-ta-ro',
    '^mú-si-cos', '^pá-ja-ro', '^plá-ta-no', '^rá-pi-do', '^cá-ma-ra', '^cás-ca-ra', '^ví-bo-ra', '^ó-va-lo', '^án-gu-lo', '^tí-mi-do', '^sím-bo-lo'
  ]
};
