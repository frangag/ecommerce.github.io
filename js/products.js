let API = `${PRODUCTS_URL}${localStorage.getItem("catID")}${EXT_TYPE}`; /*Se traen los productos de la categoría seleccionada por el usuario*/
const ORDER_ASC_BY_COST = "^$";
const ORDER_DESC_BY_COST = "v$";
const ORDER_BY_REL = "Rel.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

/* Mostrar nombre de la categoría */
function showCategoryName() {
  document.getElementById("catName").innerHTML += ` ${productsArray.catName}`;
}

/* Función que recibe dos parámetros: una constante y un array; ordenará el array según la constante*/
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

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(
    currentSortCriteria,
    currentProductsArray
  );

  //Muestro los productos ordenados
  showProductsList();
}

function showProductsList() {
  let currentProductsArray = productsArray.products;
  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];
    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(product.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(product.cost) <= maxCount))
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
      sortAndShowProducts(ORDER_ASC_BY_COST, productsArray.products);
    }
  });
  /*  */
  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_COST);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_COST);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_REL);
  });

  /* LIMPIADOR DE FILTROS */
  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showProductsList();
    });

  /* FILTRO POR PRECIO*/
  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }
      showProductsList();
    });
});
