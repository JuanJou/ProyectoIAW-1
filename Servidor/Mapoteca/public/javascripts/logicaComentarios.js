
var coleccionLocales;
var bounds;

var AlmacenamientoLocales=new Map();




function cambiarEstilo(){
    var estiloActual=localStorage.getItem("Estilo");
    var estiloSiguiente=Math.floor(1/estiloActual+1);
    $("#hojaEstilo").attr("href","stylesheets/Estilo"+estiloSiguiente+".css");
    localStorage.setItem("Estilo",estiloSiguiente);
    cambiarEstiloMapa(estiloSiguiente);
}

function cargarImagenes(){
  var local=$("#NombreLocal").html();
  if (local!="Nombre"){
    $("#imagen1").attr('src',"/images/"+local+"1.jpg");
    $("#imagen2").attr('src',"/images/"+local+"2.jpg");
    $("#imagen3").attr('src',"/images/"+local+"3.jpg");
  }
}

function cargarComentarios(){

}

function guardarComentario(){
  var textoComentario=$("#comment").val();
  $("#comment").val("Ingrese un comentario...")
  var valoracion=obtenerValoracion();
  console.log(valoracion);
}

function obtenerValoracion(){
  var valoracion=0;
  for (var i = 1; i<6; i++) {
    if ($("#radio"+i).is(':checked')){
      valoracion=6-i;
      break;
    }
  }
  $("input:radio").prop("checked", false);
  return valoracion;
}
