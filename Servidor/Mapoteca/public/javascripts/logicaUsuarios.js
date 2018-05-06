var sesionIniciada=false;

function inicializar(){
    localStorage.setItem("Estilo",1);
}

function onSignIn(googleUser) {
  if (!sesionIniciada){
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    document.getElementById("botonPuntuar").disabled = false;
    sesionIniciada=true;
  }
  else {
    signOut();
  }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    document.getElementById("botonPuntuar").disabled = true;
    sesionIniciada=false;
}
