var map;
var markers=[];

var coleccionLocales;
var bounds;

var AlmacenamientoLocales=new Map();


function myMap() {
    var mapProp= {
      center:new google.maps.LatLng(-38.7167,-62.2833),
      zoom:13,
      mapTypeControl:false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    bounds=new google.maps.LatLngBounds();
    $.get("https://girabahiense.herokuapp.com/stylesheets/EstiloMapa1.json",function(data){
      map.setOptions(data);
    });
}

function cargarMarcador(){
  $.get("https://girabahiense.herokuapp.com/searchLocals",function(data){
    locales=JSON.parse(data);
    coleccionLocales=locales;
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
                  $.post('https://girabahiense.herokuapp.com/userState/updateLocal',{"local":marker.title},function(data){
                    console.log(data);
                  });
                    map.panTo(marker.position);
                    setearInformacionLocal(AlmacenamientoLocales.get(marker.title));
                });
            })(marker, data);
    }
    cargarBusqueda();
    map.fitBounds(bounds);
    map.panToBounds(bounds);
  });
}

function cambiarEstiloMapa(estilo){
  $.get("https://girabahiense.herokuapp.com/stylesheets/EstiloMapa"+estilo+".json",function(data){
    map.setOptions(data);
  });
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
