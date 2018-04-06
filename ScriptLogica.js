var map;

var AlmacenamientoLocales=new Map([]);


function myMap() {
    var styles=null;
    $.getJSON('https://uns-iaw-2018-com09.github.io/ProyectoIAW/EstiloMapa.json',function(data){
      styles=data["Styles"];
    });


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