regBtn.addEventListener("click", () =>  {
    let inputs = document.getElementsByTagName("input");
    let allFields = true;
    
    for (let i=0; i<inputs.length;i++){
        if (inputs[i].value.length<=0){
            allFields = false;
        }
    };

    if(allFields === true) {
        window.location.replace("https://frangag.github.io/ecommerce.github.io/main.html")
    } else {
        alert("Debe ingresar valores en ambos campos")

};

}


)
