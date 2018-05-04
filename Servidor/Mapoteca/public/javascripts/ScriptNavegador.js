
var map;
var coleccionLocales;
var bounds;

var AlmacenamientoLocales=new Map();

var markers=[];

function inicializar(){
    localStorage.setItem("Estilo",1);
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

function cambiarEstilo(){
    var estiloActual=localStorage.getItem("Estilo");
    var estiloSiguiente=Math.floor(1/estiloActual+1);
    $("#hojaEstilo").attr("href","stylesheets/Estilo"+estiloSiguiente+".css");
    localStorage.setItem("Estilo",estiloSiguiente);
    cambiarEstiloMapa(estiloSiguiente);
}

function cambiarEstiloMapa(estilo){
  $.get("http://localhost:8080/stylesheets/EstiloMapa"+estilo+".json",function(data){
    map.setOptions(data);
  });
}

function myMap() {
    var mapProp= {
      center:new google.maps.LatLng(-38.7167,-62.2833),
      zoom:13,
      mapTypeControl:false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    bounds=new google.maps.LatLngBounds();
    $.get("http://localhost:8080/stylesheets/EstiloMapa1.json",function(data){
      map.setOptions(data);
    });
}

function cargarMarcador(){
  $.get("http://localhost:8080/searchLocals",function(data){
    locales=JSON.parse(data);
    coleccionLocales=locales;
    console.log(locales);
    for(var i=0;i<locales.length;i++){
      AlmacenamientoLocales.set(locales[i].nombre,locales[i]);
      var marker=new google.maps.Marker({
        position:{"lat":locales[i]["ubicacion"][0],"lng":locales[i]["ubicacion"][1]},
        title:locales[i]["nombre"],
        icon:'/images/'+locales[i]["tipo"]+'.png',
        map:map
      });
      markers.push(marker);
      bounds.extend(new google.maps.LatLng(marker.position.lat(),marker.position.lng()));
      (function (marker,i) {
                google.maps.event.addListener(marker, "click", function (i) {
                    map.panTo(marker.position);
                    setearInformacionLocal(AlmacenamientoLocales.get(marker.title));
                });
            })(marker, data);
    }
    map.fitBounds(bounds);
    map.panToBounds(bounds);
  });
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

function filtrar(event){
  $("#filtros").html(event.innerHTML);
  if (event.innerHTML=="Todos"){
    agregarTodosLosMarcadores();
    return
  }
  var objetoLocal;
  for (var i = 0; i < markers.length; i++) {
    objetoLocal=AlmacenamientoLocales.get(markers[i].title);
    if (objetoLocal.tipo!=event.innerHTML){
      markers[i].setMap(null);
    }
    else{
      markers[i].setMap(map);
    }
  }
}

function agregarTodosLosMarcadores(){
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
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
