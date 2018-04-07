var styles;

var map;

var AlmacenamientoLocales=new Map([]);

var estiloSiguiente=2;


function myMap() {
    var style;
    $.getJSON('https://uns-iaw-2018-com09.github.io/ProyectoIAW/EstiloMapa.json',function(data){
      style=data["Styles"];
      var mapProp= {
        center:new google.maps.LatLng(-38.7167,-62.2833),
        zoom:13,
        styles:style,
        mapTypeControl:false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    });
}

function cargaDeLocales(){
<<<<<<< Updated upstream
	$.getJSON('https://uns-iaw-2018-com09.github.io/ProyectoIAW/ModeloDeDatos.json',function(data){
    console.log("Hola");

  console.log("Perro");

  /*var marker=new google.maps.Marker({
        position:{"lat":-38.7040081,"lng":-62.2705528},
        title:"Bronx",
        map:map
      });*/

	$.getJSON('https://raw.githubusercontent.com/UNS-IAW-2018-Com09/ProyectoIAW/master/ModeloDeDatos.json',function(data){
    console.log(data.Locales.length);
    var locales=data.Locales;
    for (var i = 0; i < locales.length; i++) {
      AlmacenamientoLocales.set(locales[i]["Nombre_del_local"],locales[i]);
      var marker=new google.maps.Marker({
        position:locales[i]["Ubicacion"],
        title:locales[i]["Nombre_del_local"],
        icon:'https://uns-iaw-2018-com09.github.io/ProyectoIAW/Imagenes/Boliche2.png',
        map:map
      });
      (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    var localClickeado=AlmacenamientoLocales.get(marker.title);
                    $("#NombreLocal").html(localClickeado.Nombre_del_local);
                    $("#Tipo").html(localClickeado.Tipo);
                    $("#HoraOpen").html("Hora de apertura: "+(localClickeado.Horario)[1].Hora_Apertura);
                    $("#HoraClose").html("Hora de cierre: "+(localClickeado.Horario)[1].Hora_Cierre);
                    $("#Telefono").html(localClickeado.Telefono);
                });
            })(marker, data);
    }
  });
}

function makeIcon(tipo){

  var image={
    url:"https://uns-iaw-2018-com09.github.io/ProyectoIAW/Imagenes/"+tipo+".png",
    size:new google.maps.Size(36,48),
  };
  return image;
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


function cambiarEstilo(){
 $("#hojaEstilo").attr("href","Estilo"+estiloSiguiente+".css");
 estiloSiguiente=Math.floor(1/estiloSiguiente+1);
}