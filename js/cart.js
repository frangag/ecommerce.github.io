let infoArray = [];
let USER25801 = CART_INFO_URL + "25801" + EXT_TYPE;
let container = document.getElementById("container");
let amount = 0;
let inputCalle = document.querySelector("#inputCalle");
let inputNumero = document.querySelector("#inputNumero");
let inputEsquina = document.querySelector("#inputEsquina");
let cardInputExp = document.querySelector("#cardInputExp");
let cardInputCVV = document.querySelector("#cardInputCVV");
let cardInputNumber = document.querySelector("#cardInputNumber");
let BankAccountNumber = document.querySelector("#BankAccountNumber");
let costoDeEnvioSpan = document.querySelector("#costoDeEnvioSpan");
let subtotalCostos = document.querySelector("#subtotalCostos");
let totalCostos = document.querySelector("#totalCostos");
let formaDePagoSpan = document.querySelector("#formaDePagoSpan");
let formaDePagoBtn = document.querySelector("#formaDePagoBtn");
let modal = document.querySelector("#modal");
let radioFormaDePago = document.getElementsByName("formaDePago");
let botonFinalizar = document.querySelector("#botonFinalizar");
let radioTipoDeEnvio = document.getElementsByName("tipoDeEnvio");
let costoDeEnvioPorcentaje = 1.05;
let costoDeEnvio = 0;
let subtotalValue = 0;
let totalValue = 0;

function validar(input) {
  if (input.value === "") {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
}

function validarFormaDePago() {
  for (var i = 0, length = radioFormaDePago.length; i < length; i++) {
    let validateFormaDePago = radioFormaDePago[0].checked
      ? true
      : radioFormaDePago[1].checked
      ? true
      : false;
    if (
      validateFormaDePago &&
      (!(BankAccountNumber.value === "") ||
        (!(cardInputCVV.value === "") &&
          !(cardInputExp.value === "") &&
          !(cardInputNumber.value === "")))
    ) {
      formaDePagoBtn.classList.add("is-valid");
      formaDePagoBtn.classList.remove("is-invalid");
    } else {
      formaDePagoBtn.classList.add("is-invalid");
      formaDePagoBtn.classList.remove("is-valid");
    }
  }
}

function checkTipoDeEnvio() {
  for (var i = 0, length = radioTipoDeEnvio.length; i < length; i++) {
    costoDeEnvioPorcentaje = radioTipoDeEnvio[2].checked
      ? "1.05"
      : radioTipoDeEnvio[1].checked
      ? "1.07"
      : "1.15";
  }
}

function UpdateCostos() {
  totalValue = Math.round(costoDeEnvioPorcentaje * subtotalValue);
  costoDeEnvio = totalValue - subtotalValue;
  costoDeEnvioSpan.innerHTML = `USD ${costoDeEnvio}`;
  totalCostos.innerHTML = `USD ${totalValue}`;
  subtotalCostos.innerHTML = `USD ${subtotalValue}`;
}

function showInfo() {
  let htmlContentToAppend = "";
  let array = infoArray;
  let ARTICULOS = array.articles[0];
  if (amount === 0) {
    amount = ARTICULOS.count;
  }
  subtotalValue = ARTICULOS.unitCost * amount;
  htmlContentToAppend = `
  <td><img width="100rem" src="${ARTICULOS.image}"></td>
<td><div class="productNameCart" onclick="setProdID(${ARTICULOS.id})">${
    ARTICULOS.name
  }</div></td>
<td><div>${ARTICULOS.currency} ${ARTICULOS.unitCost}</div></td>
<td><div>
  <input type="number" id="cantidad" value="${amount}" min="1">
</div></td>
<td><div class="fw-bold" id="subtotal">${ARTICULOS.currency} ${
    ARTICULOS.unitCost * amount
  }</div></td>`;
  container.innerHTML = htmlContentToAppend;
}

tipoDeEnvio.addEventListener("input", () => {
  checkTipoDeEnvio();
  UpdateCostos();
});

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(USER25801).then(function (resultObj) {
    if (resultObj.status === "ok") {
      infoArray = resultObj.data;
      showInfo();
      UpdateCostos();
    }
  });
});

document.getElementsByTagName("table")[0].addEventListener("input", () => {
  if (document.getElementById("cantidad").value >= 1) {
    amount = document.getElementById("cantidad").value;
  } else {
    amount = infoArray.articles[0].count;
  }
  showInfo();
  UpdateCostos();
});
//Estuve un rato tratando de que al modificarse la cantidad de unidades a comprar
//se mantenga el foco en el input para no tener que hacer click de nuevo
//pero no pude hacer funcionar nada

modal.addEventListener("input", () => {
  for (var i = 0, length = radioFormaDePago.length; i < length; i++) {
    if (radioFormaDePago[1].checked) {
      cardInputNumber.value = "";
      cardInputCVV.value = "";
      cardInputExp.value = "";
      cardInputNumber.setAttribute("disabled", "");
      cardInputCVV.setAttribute("disabled", "");
      cardInputExp.setAttribute("disabled", "");
      BankAccountNumber.removeAttribute("disabled", "");
      formaDePagoSpan.innerHTML = "Transferencia bancaria";
    } else {
      BankAccountNumber.value = "";
      BankAccountNumber.setAttribute("disabled", "");
      cardInputNumber.removeAttribute("disabled", "");
      cardInputCVV.removeAttribute("disabled", "");
      cardInputExp.removeAttribute("disabled", "");
      formaDePagoSpan.innerHTML = "Tarjeta de crédito";
    }
  }
});

function showSuccessfulAlert() {
  if (
    inputCalle.classList.contains("is-valid") &&
    inputNumero.classList.contains("is-valid") &&
    inputEsquina.classList.contains("is-valid") &&
    formaDePagoBtn.classList.contains("is-valid")
  )
    document.querySelector(
      "#succesfulContainer"
    ).innerHTML = `<div class="alert alert-success alert-dismissible fade show sticky-top">
        ¡Has comprado con éxito!
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
}

botonFinalizar.addEventListener("click", () => {
  validar(inputCalle);
  validar(inputNumero);
  validar(inputEsquina);
  validarFormaDePago();
  showSuccessfulAlert();
});

showUserNameAndDropdownMenu();
