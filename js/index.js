/* gapi.load("auth2", function () {
  gapi.auth2.init();
}); */
// Acá estoy intentando implementar el login con Google
imageGoogle.addEventListener("click", () => {
    document.getElementById("imageGoogle").src = 'img/btn_google_signin_dark_pressed_web.png';
});
regBtn.addEventListener("click", () => {
  let inputs = document.getElementsByTagName("input");
  let allFields = true;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.length <= 0) {
      allFields = false;
    }
  }
  //este "for" revisa que ambos campos tengan contenido

  if (allFields === true) {
    let userName = document.getElementById("floatingInput");
    localStorage.setItem(
      "userName",
      userName.value
    ); /* se guarda el username en el localStorage */
    window.location.replace("main.html"); //acá cambié a una ruta relativa en lugar del link a Github Pages
    // "replace" no deja volver a la página anterior, para un login viene bien
    // "assign" hace algo parecido pero deja volver atrás
  } else {
    alert("Debe ingresar valores en ambos campos");
    // puse un alert por falta de tiempo,
    //quedaría más elegante un mensaje de error para cada campo :/
  }
});
