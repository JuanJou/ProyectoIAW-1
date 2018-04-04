

function myMap() {
      var mapProp= {
          center:new google.maps.LatLng(-38.7167,-62.2833),
          zoom:15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

function cargaDeLocales(){
	var datosObjetos=localStorage.getItem("ModeloDeDatos.json");

	var objeto=JSON.parse(datosObjetos);

	document.getElementById("NombreLocal").innerHTML=objeto[0].Nombre_del_local;
}