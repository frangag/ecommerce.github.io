let infoArray = [];
let USER25801 = CART_INFO_URL + "25801" + EXT_TYPE;
let container = document.getElementById("container");
let amount = 0;

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(USER25801).then(function (resultObj) {
    if (resultObj.status === "ok") {
      infoArray = resultObj.data;
      console.log(infoArray);
      showInfo();
    }
  });
});

function showInfo() {
  let htmlContentToAppend = "";
  let array = infoArray;
  let ARTICULOS = array.articles[0];
  if (amount === 0) {
    amount = ARTICULOS.count;
  }
  htmlContentToAppend = `
  <td><img width="100rem" src="${ARTICULOS.image}"></td>
<td><div>${ARTICULOS.name}</div></td>
<td><div>${ARTICULOS.currency} ${ARTICULOS.unitCost}</div></td>
<td><div>
  <input type="number" id="cantidad" value="${amount}" min="1">
</div></td>
<td><div id="subtotal">${ARTICULOS.currency} ${
    ARTICULOS.unitCost * amount
  }</div></td>`;
  container.innerHTML = htmlContentToAppend;
}

document.addEventListener("input", () => {
  if (document.getElementById("cantidad").value != 0) {
    amount = document.getElementById("cantidad").value;
  } else {
    amount = infoArray.articles[0].count;
  }
  console.log(amount);
  showInfo();
});

showUserNameAndDropdownMenu();
