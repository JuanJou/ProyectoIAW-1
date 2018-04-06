var styles=[
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#263c3f"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6b9a76"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#38414e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#212a37"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9ca5b3"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#1f2835"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#f3d19c"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2f3948"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#515c6d"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      }
  ];

var map;

var AlmacenamientoLocales=new Map([]);


function myMap() {
    var style;
    $.getJSON('https://uns-iaw-2018-com09.github.io/ProyectoIAW/EstiloMapa.json',function(data){
      console.log(data["Styles"]);
      style=data["Styles"];
    });

    console.log(styles);
    var mapProp= {
        center:new google.maps.LatLng(-38.7167,-62.2833),
        zoom:13,
        styles:styles,
        mapTypeControl:false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

}

function cargaDeLocales(){
	$.getJSON('https://uns-iaw-2018-com09.github.io/ProyectoIAW/ModeloDeDatos.json',function(data){
    console.log("Hola");
    var locales=data.Locales;
    for (var i = 0; i < locales.length; i++) {
      AlmacenamientoLocales.set(locales[i]["Nombre_del_local"],locales[i]);
      var marker=new google.maps.Marker({
        position:locales[i]["Ubicacion"],
        title:locales[i]["Nombre_del_local"],
        map:map
      });
      marker.addListener('click',function(){
        map.setZoom(18);
        map.setCenter(marker.getPosition());
        var loc=AlmacenamientoLocales.get(marker.title);
        $("#NombreLocal").html(loc.Nombre_del_local);
        $("#Tipo").html(loc.Tipo);
        $("#Telefono").html(loc.Telefono);
        $("#HoraOpen").html("Horario de Apertura: "+loc.Horario_De_Apertura[1].Hora_Apertura);
        $("#HoraClose").html("Horario de Cierre: "+loc.Horario_De_Apertura[1].Hora_Cierre);

      })
    }
  });
}

function makeIcon(tipo){

  var image={
    url:"https://uns-iaw-2018-com09.github.io/ProyectoIAW/Imagenes/"+tipo+".png",
    size:new google.maps.Size(36,48),
  };
  return image;


  /*var httpReq=new XMLHttpRequest();
  var nombreImg="https://uns-iaw-2018-com09.github.io/ProyectoIAW/Imagenes/"+tipo+".png";

  httpReq.onreadystatechange=function(){
    if ((httpReq.readyState==4) && (httpReq.status==200)){
      return httpReq.response;
    }
  }

  httpReq.open("GET",nombreImg, true);
  httpReq.send(null);*/

}

function smoothZoom (map, max, cnt) {
    if (cnt >= max) {
        return;
    }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
} 