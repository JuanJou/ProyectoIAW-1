const templateComment=Twig.twig({
  href: "shared/renderComment.twig",async:false
});


function cargarImagenes(){
  var local=$("#NombreLocal").html();
  $("#slider").html('<div class="carousel-item active">    <img src="/images/'+local+'1.jpg" class="d-block w-100 images" alt="First slide">  </div>  <div class="carousel-item">    <img src="/images/'+local+'2.jpg" class="d-block w-100 images" alt="Second slide">  </div> <div class="carousel-item"><img src="/images/'+local+'3.jpg" class="d-block w-100 images" alt="Third slide"></div>');
  $("#slider2").html('<div class="carousel-item active">    <img src="/images/'+local+'1.jpg" class="d-block w-100 images" alt="First slide">  </div>  <div class="carousel-item">    <img src="/images/'+local+'2.jpg" class="d-block w-100 images" alt="Second slide">  </div> <div class="carousel-item"><img src="/images/'+local+'3.jpg" class="d-block w-100 images" alt="Third slide"></div>');
}

function cargarComentarios(){
    cargarImagenes();
    var localSeleccionado=$("#NombreLocal").html();
    $("#comments-list").empty();
    $.post('https://girabahiense.herokuapp.com/apiComment/get',{"local":localSeleccionado},function(data){
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
    $.post('https://girabahiense.herokuapp.com/apiComment/save',{"comment":textoComentario,"value":valoracion,"local":localSeleccionado},function(data){
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
