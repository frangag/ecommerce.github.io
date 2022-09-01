let categoryID = localStorage.getItem("catID");
let API = `https://japceibal.github.io/emercado-api/cats_products/${categoryID}.json`; /*Ahora la API traerá los productos de la categoría seleccionada por el usuario*/
let productsArray = [];
let products = [];
let LIST = document.getElementById("list");

function showCatName() {
  document.getElementById("catName").innerHTML += ` ${productsArray.catName}`;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(API).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data;
      products = productsArray.products;
      console.log(catName);
      showProductsList();
      showCatName();
    }
  });
});

LIST.innerHTML = "";
function showProductsList() {
    for (let product of products) {
      LIST.innerHTML += `
                <div class="list-group-item list-group-item-action cursor-active">
                 <div class="row">
                   <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <h4>${product.name} - ${product.currency} ${product.cost}<h4>
                        <small class="text-muted">${product.soldCount} unidades vendidas</small>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `;
    }
}
