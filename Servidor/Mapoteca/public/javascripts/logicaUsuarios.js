var sesionIniciada=false;

function inicializar(){

}


function iniciarSesion(){
  $("#botonPuntuar").attr("disabled",false);
}


function cambiarEstilo(){
    var estiloActual=localStorage.getItem("Estilo");
    var estiloSiguiente=Math.floor(1/estiloActual+1);
    $("#hojaEstilo").attr("href","stylesheets/Estilo"+estiloSiguiente+".css");
    localStorage.setItem("Estilo",estiloSiguiente);
    cambiarEstiloMapa(estiloSiguiente);
    $.post('https://girabahiense.herokuapp.com/userState/updateStyle',{"style":estiloSiguiente},function(data){
      console.log(data);
    });
}

function loadUser(){
  localStorage.setItem("Estilo",1);
  $.get("https://girabahiense.herokuapp.com/userState/getUserState",function(data){
    console.log(data);
    var estiloActual=data[0].estiloActual;
    console.log(estiloActual);
    $("#hojaEstilo").attr("href","stylesheets/Estilo"+estiloActual+".css");
    localStorage.setItem("Estilo",estiloActual);
    cambiarEstiloMapa(estiloActual);
    var local=data[0].localSeleccionado;
    if (local!='Nada'){
      for (var i = 0; i < markers.length; i++) {
        if (local==markers[i].title){
          map.panTo(markers[i].position);
          setearInformacionLocal(AlmacenamientoLocales.get(local));
          break;
        }
      }
    }
  });
}
