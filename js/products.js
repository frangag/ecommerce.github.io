let API = `${PRODUCTS_URL}${localStorage.getItem("catID")}${EXT_TYPE}`; /*Se traen los productos de la categoría seleccionada por el usuario*/
const ORDER_ASC_BY_COST = "^$"; 
const ORDER_DESC_BY_COST = "v$"; /* Inicializo las constantes y variables necesarias para el filter y los sorts */
const ORDER_BY_REL = "Rel.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;

/* Mostrar nombre de la categoría */
function showCategoryName() {
  document.getElementById("catName").innerHTML += ` ${productsArray.catName}`;
}

/* Función que recibe dos parámetros: una constante y un array; ordenará el array según la constante (que se toma del botón que clickea el usuario)*/
function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_REL) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }
  return result;
}

/* Esta funcion ejecuta sortProducts() para el criterio y array determinados y devuelve showProductsList()*/
function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(
    currentSortCriteria,
    currentProductsArray
  );

  showProductsList();
} 

/* Esta función modifica el contenido de list con los datos ordenados y/o filtrados */
function showProductsList() {
  let currentProductsArray = productsArray.products;
  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];
    if (
      (minCost == undefined ||
        (minCost != undefined && parseInt(product.cost) >= minCost)) &&
      (maxCost == undefined ||
        (maxCost != undefined && parseInt(product.cost) <= maxCost))
    ) {
      htmlContentToAppend += `
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
    document.getElementById("list").innerHTML = htmlContentToAppend;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(API).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data;
      products = productsArray.products;
      showCategoryName();
      sortAndShowProducts(ORDER_BY_REL, productsArray.products); /* Por defecto se muestran ordenados por relevancia */
    }
  });
  /*  */
  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_COST); /* Costo ascendente */
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_COST); /* Costo descendente */
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_REL); /* Sort por relevancia */
  });

  /* LIMPIADOR DE FILTROS */
  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCostMin").value = "";
      document.getElementById("rangeFilterCostMax").value = "";

      minCost = undefined;
      maxCost = undefined;

      showProductsList();
    });

  /* FILTRO POR PRECIO*/
  document
    .getElementById("rangeFilterCost")
    .addEventListener("click", function () {
      minCost = document.getElementById("rangeFilterCostMin").value;
      maxCost = document.getElementById("rangeFilterCostMax").value;

      if (minCost != undefined && minCost != "" && parseInt(minCost) >= 0) {
        minCost = parseInt(minCost); 
      } else {
        minCost = undefined;
      }

      if (maxCost != undefined && maxCost != "" && parseInt(maxCost) >= 0) {
        maxCost = parseInt(maxCost);
      } else {
        maxCost = undefined;
      }
      showProductsList();
    });
});
