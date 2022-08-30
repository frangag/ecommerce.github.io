regBtn.addEventListener("click", () =>  {
    let inputs = document.getElementsByTagName("input");
    let allFields = true;

    for (let i=0; i<inputs.length;i++){
        if (inputs[i].value.length<=0){
            allFields = false;
        }
    };
    //este "for" revisa que ambos campos tengan contenido

    if(allFields === true) {
        let userName = document.getElementById("floatingInput");
        localStorage.setItem("userName", userName.value);
        window.location.replace("../main.html") //acá cambié a una ruta relativa
        // "replace" no deja volver a la página anterior, para un login viene bien
        // "assign" hace algo parecido pero deja volver atrás
    } else {
        alert("Debe ingresar valores en ambos campos")
        // puse un alert por falta de tiempo, 
        //quedaría más elegante un mensaje de error para cada campo :/

};

}


)
