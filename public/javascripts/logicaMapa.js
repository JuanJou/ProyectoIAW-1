var map;
var markers=[];

var coleccionLocales;
var bounds;

var AlmacenamientoLocales=new Map();

var location;

function myMap() {
    var mapProp= {
      center:new google.maps.LatLng(-38.7167,-62.2833),
      zoom:13,
      mapTypeControl:false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    bounds=new google.maps.LatLngBounds();
    $.get("/stylesheets/EstiloMapa1.json",function(data){
      map.setOptions(data);
    });

    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log("nuevo");
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            $.get("/userState/userLogged",function(data){
              console.log("estado");
              var gender="male";
              if (data.user!=undefined){
                gender=data.user.gender;
              }
              location = new google.maps.Marker({
                position:pos,
                title:"Ubicacion",
                icon:"/images/"+gender+".png",
                map: map});
              bounds.extend(new google.maps.LatLng(location.position.lat(),location.position.lng()));
            });

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
        cargarMarcador();
}

function cargarMarcador(){
  $.get("/searchLocals",function(data){
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
                  $.post('/userState/updateLocal',{"local":marker.title},function(data){
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
  $.get("/stylesheets/EstiloMapa"+estilo+".json",function(data){
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



function getPhotos(local){
  var service=new google.maps.places.PlacesService(map);
  var objLocal=AlmacenamientoLocales.get(local);
  var location=new google.maps.LatLng(objLocal.ubicacion[0],objLocal.ubicacion[1]);
  var local;
  request={
    location:location,
    radius:'10',
    name:local
  };
  console.log(request);
  service.nearbySearch(request,function(result,status){
    console.log(result);
    if (status == google.maps.places.PlacesServiceStatus.OK){
      service.getDetails({placeId:result[0].place_id},function(place,status){
        $("#slider2").empty();
        $("#slider").empty();
        if (place.photos!=undefined){
          place.photos.forEach(function(element,index){
            $("#slider2").append($(templatePhoto.render({url:element.getUrl({maxWidth:400,maxHeight:345}),number:index})));
            $("#slider").append($(templatePhoto.render({url:element.getUrl({maxWidth:400,maxHeight:345}),number:index})));
          });
        }
      });
    }
  });
}
