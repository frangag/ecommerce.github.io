let API_INFO = `${PRODUCT_INFO_URL}${localStorage.getItem(
  "prodID"
)}${EXT_TYPE}`;
let API_COMMENTS = `${PRODUCT_INFO_COMMENTS_URL}${localStorage.getItem(
  "prodID"
)}${EXT_TYPE}`;
let infoArray = [];
let USERNAME = localStorage.getItem("userName");

document.getElementById("userName").innerHTML =
  USERNAME; /* Se modifica el texto del elemento de id "userName" con el valor ingresado por el usuario */

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(API_INFO).then(function (resultObj) {
    if (resultObj.status === "ok") {
      infoArray = resultObj.data;
      console.log(API_INFO);
      console.log(infoArray);
      console.log(API_COMMENTS);
      showInfo();
      showUserNameAndDropdownMenu();
    } /* Se consulta la API que contiene la información del producto */
  });

  getJSONData(API_COMMENTS).then(function (resultObj) {
    if (resultObj.status === "ok") {
      commentsArray = resultObj.data;
      console.log(commentsArray);
      showComments();
    } /* Se consulta la API que contiene los comentarios */
  });
});

function showRelatedProducts() {
  let htmlContentToAppend = "";
  let relatedProducts = infoArray.relatedProducts;
  console.log(relatedProducts);
  for (let i = 0; i < relatedProducts.length; i++) {
    htmlContentToAppend += `
    <div onclick="setProdID(${relatedProducts[i].id})" class="list-group-item list-group-item-action cursor-active">
    <div class="card" style="width: 18rem;">
  <img src="${relatedProducts[i].image}" class="card-img-top" alt="${relatedProducts[i].name}">
  <div class="card-body">
    <h5 class="card-title">${relatedProducts[i].name}</h5>
  </div>`
  }
  document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

function showInfo() {
  let htmlContentToAppend = "";
  let htmlImages = "";
  let imagesArray = infoArray.images;
  htmlContentToAppend = `
      <div>
      <h2>${infoArray.name}</h2>
      </div>
      <div>
        <h4 class="mb-1">Precio</h4>
        <p>${infoArray.currency} ${infoArray.cost}</p>
        <h4 class="mb-1">Descripción</h4>
        <p>${infoArray.description}</p>
        <h4 class="mb-1">Categoría</h4>
        <p>${infoArray.category}</p>
        <h4 class="mb-1">Cantidad de vendidos</h4>
        <p>${infoArray.soldCount}</p>
        <h4 class="mb-1">Imágenes ilustrativas</h4>
      </div>
      `; /* Se muestra la información del producto */
  htmlImages += `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${imagesArray[0]}" class="images-carousel" class="d-block w-75" alt="${infoArray.name[0]}">
    </div>`;
  for (let i = 1; i < imagesArray.length; i++) {
    const IMAGE = imagesArray[i];
    htmlImages += `<div class="carousel-item">
      <img src="${IMAGE}" class="images-carousel" class="d-block w-10" alt="${infoArray.name}">
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
  </div>`;
    /* <img src="${IMAGE}" class="img-products"></img>; */
  } /* Se muestran las imágenes asociadas al producto */
  document.getElementById("container").innerHTML = htmlContentToAppend;
  document.getElementById("images").innerHTML = htmlImages;
  showRelatedProducts();
}

function showComments() {
  let htmlContentToAppend = "";
  for (let i = 0; i < commentsArray.length; i++) {
    const comment = commentsArray[i];
    let star1 = '<span class="fa fa-star checked"></span>';
    let star2 =
      comment.score >= 2
        ? '<span class="fa fa-star checked"></span>'
        : '<span class="fa fa-star"></span>';
    let star3 =
      comment.score >= 3
        ? '<span class="fa fa-star checked"></span>'
        : '<span class="fa fa-star"></span>';
    let star4 =
      comment.score >= 4
        ? '<span class="fa fa-star checked"></span>'
        : '<span class="fa fa-star"></span>';
    let star5 =
      comment.score >= 5
        ? '<span class="fa fa-star checked"></span>'
        : '<span class="fa fa-star"></span>';
    /* Se evalúa si mostrar la estrella con la clase checked o no */

    htmlContentToAppend += `
    <div>
    <b>${comment.user}</b> - ${comment.dateTime} -  
    ${star1}
    ${star2}
    ${star3}
    ${star4}
    ${star5}
    <br>
    ${comment.description}
    </div>
    `; /* Se muestra la información del comentario */
  }

  document.getElementById("comments").innerHTML = htmlContentToAppend;
}

/* DESAFIATE */
submitBtn.addEventListener("click", function () {
  let newComment =
    document.getElementById(
      "newComment"
    ).value; /* Se toma el texto ingresado por el usuario */
  let newScore =
    document.getElementById(
      "newScore"
    ).value; /* Se toma la puntuación ingresada por el usuario */
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let newCommentDate =
    date +
    " " +
    time; /* Se toma la fecha y hora de publicación del comentario */

  let star1 = '<span class="fa fa-star checked"></span>';
  let star2 =
    newScore >= 2
      ? '<span class="fa fa-star checked"></span>'
      : '<span class="fa fa-star"></span>';
  let star3 =
    newScore >= 3
      ? '<span class="fa fa-star checked"></span>'
      : '<span class="fa fa-star"></span>';
  let star4 =
    newScore >= 4
      ? '<span class="fa fa-star checked"></span>'
      : '<span class="fa fa-star"></span>';
  let star5 =
    newScore >= 5
      ? '<span class="fa fa-star checked"></span>'
      : '<span class="fa fa-star"></span>';
  /* Se añade el nuevo comentario */
  document.getElementById("comments").innerHTML += `<div>
    <b>${USERNAME}</b> - ${newCommentDate} - 
    ${star1}
      ${star2}
      ${star3}
      ${star4}
      ${star5}
      <br>
      ${newComment}
    </div>
  `;
});
