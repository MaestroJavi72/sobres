/* Javificación · fichas imprimibles: botones de imprimir (ficha / soluciones / las dos) y volver */
(function(){
function $(id){ return document.getElementById(id); }
function imprimir(clase){ document.body.className = clase; setTimeout(function(){ window.print(); setTimeout(function(){ document.body.className = ''; }, 500); }, 50); }
if($('pFicha')) $('pFicha').addEventListener('click', function(){ imprimir('solo-ficha'); });
if($('pSol')) $('pSol').addEventListener('click', function(){ imprimir('solo-sol'); });
if($('pAmbas')) $('pAmbas').addEventListener('click', function(){ imprimir(''); });
var v = $('bVolver');
if(v){
  v.addEventListener('click', function(e){ try{ if(document.referrer && new URL(document.referrer).origin===location.origin && history.length>1){ e.preventDefault(); history.back(); } }catch(err){} });
  if(/[?&]profe/.test(location.search)) v.href = v.getAttribute('href')+'&profe';
}
})();
