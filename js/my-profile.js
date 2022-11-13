let firstName = document.getElementById("firstName");
let secondName = document.getElementById("secondName");
let firstLastName = document.getElementById("firstLastName");
let secondLastName = document.getElementById("secondLastName");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
  
document.addEventListener("DOMContentLoaded", ()=>{
email.value = userName;
if (localStorage.getItem("firstName")){
    firstName.value = localStorage.getItem("firstName")
}
if (localStorage.getItem("secondName")){
    secondName.value = localStorage.getItem("secondName")
}
if(localStorage.getItem("firstLastName")){
    firstLastName.value = localStorage.getItem("firstLastName")
}
if(localStorage.getItem("secondLastName")){
    secondLastName.value = localStorage.getItem("secondLastName")
}
if(localStorage.getItem("phone")){
    phone.value = localStorage.getItem("phone")
}
})

btnSubmit.addEventListener("click", ()=>{
    validar(firstName);
    validar(firstLastName);
    validar(email);
     if(firstName.classList.contains("is-valid") && 
    firstLastName.classList.contains("is-valid") && 
    email.classList.contains("is-valid")){
        localStorage.setItem("firstName",firstName.value)
        localStorage.setItem("secondName",secondName.value)
        localStorage.setItem("firstLastName",firstLastName.value)
        localStorage.setItem("secondLastName",secondLastName.value)
        localStorage.setItem("email",email.value)
        localStorage.setItem("phone",phone.value)
    } 

})



showUserNameAndDropdownMenu();