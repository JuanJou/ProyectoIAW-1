const templateComment=Twig.twig({
  href: "shared/renderComment.twig",async:false
});
const templatePhoto=Twig.twig({
  href: "shared/carouselItem.twig",async:false
});


function cargarImagenes(){
  var local=$("#NombreLocal").html();
  var fotos=getPhotos(local);
}

function cargarComentarios(){
    cargarImagenes();
    var localSeleccionado=$("#NombreLocal").html();
    $("#comments-list").empty();
    $.get('/apiComment/get'+localSeleccionado,function(data){
      for(var i=0;i<data.length;i++){
        if (data[i].comment!=''){
          $("#comments-list").append($(templateComment.render({"user":data[i].nombre,"comment":data[i].comment,"id":data[i].usuario})));
        }
      }
    });
}

function guardarComentario(){
  var textoComentario=$("#comment").val();
  var localSeleccionado=$("#NombreLocal").html();
  var valoracion=obtenerValoracion();
  if ((textoComentario!='') || (valoracion!=0)){
    $.post('/apiComment/save',{"comment":textoComentario,"value":valoracion,"local":localSeleccionado},function(data){
        if (data=="No loggeado"){
          alert("Debe estar loggeado para hacer un comentario");
        }
    });
  }

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
