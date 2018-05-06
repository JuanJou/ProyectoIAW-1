function buscarLocal(){
  var localABuscar=$("#buscador").val();

  for (var i = 0; i < markers.length; i++) {
    if (localABuscar==markers[i].title){
      map.panTo(markers[i].position);
      break;
    }
  }
  setearInformacionLocal(AlmacenamientoLocales.get(localABuscar));

}

function setearInformacionLocal(local){
  fecha=new Date();
  $("#infoLocal").css("display","block");
  $("#NombreLocal").html(local.nombre);
  $("#Tipo").html(local.tipo);
  mostrarHorario(obtenerDiaSemana(fecha.getDay()));
  $("#Direccion").html(local.direccion);
  $("#Clasificacion").html("Clasificacion: "+local.valoracion);
  $("#Telefono").html(local.telefono);
}

function mostrarHorario(dia){
  $("#dropdown").html(dia);
  var localSel=$("#NombreLocal").html();
  if (localSel!="Nombre"){
    var objetoLocal=AlmacenamientoLocales.get(localSel);
    for (var i = 0; i < objetoLocal.horario.length; i++) {
      if (objetoLocal.horario[i].Dia==dia){
         $("#HoraOpen").html("Hora de apertura: "+objetoLocal.horario[i].horarioApertura);
         $("#HoraClose").html("Hora de cierre: "+objetoLocal.horario[i].horarioCierra);
         return;
      }
    }
    $("#HoraOpen").html("Hora de apertura: Cerrado");
    $("#HoraClose").html("Hora de apertura: Cerrado");
  }
}


function obtenerDiaSemana(numero){
  switch(numero){
    case 0:
      return "Domingo";
      break;
    case 1:
      return "Lunes";
      break;
    case 2:
      return "Martes";
      break;
    case 3:
      return "Miercoles";
      break;
    case 4:
      return "Jueves";
      break;
    case 5:
      return "Viernes";
      break;
    case 6:
      return "Sabado";
      break;
  }
}
