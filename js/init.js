let userName = localStorage.getItem("userName");
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

document.addEventListener("DOMContentLoaded",()=>{
if (userName === null){
  window.location.replace("index.html");  
}
}) //Si el userName es vacío se redirige al login

function validar(input) {
  if (input.value == "") {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
} //Esta función verifica que el input no esté vacío y le asigna la clase correspondiente

/* Función que setea el prodID en el localStorage y redirige a product-info.html */
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}

function showUserNameAndDropdownMenu() {
  // Al invocar esta función se muestra el menú desplegable del usuario, ahorrando la molestia de ponerlo manualmente en cada HTML
  document.getElementById("userName").innerHTML = `<div class="dropdown">
  <a class="nav-link" class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">${userName}</a>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>  
    <li><a class="dropdown-item" href="index.html" id="logOut">Cerrar Sesión</a></li>
  </ul>
</div>`;
  logOut.addEventListener("click", function () {
    localStorage.clear();
  }); // Al hacer click en "Cerrar Sesión", se elimina el userName del localStorage
}

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};
