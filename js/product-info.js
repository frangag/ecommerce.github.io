let API_INFO = `${PRODUCT_INFO_URL}${localStorage.getItem(
  "prodID"
)}${EXT_TYPE}`;
let API_COMMENTS = `${PRODUCT_INFO_COMMENTS_URL}${localStorage.getItem(
  "prodID"
)}${EXT_TYPE}`;
let infoArray = [];

document.getElementById("userName").innerHTML =
  localStorage.getItem(
    "userName"
  ); /* Se modifica el texto del elemento de id "userName" con el valor ingresado por el usuario */

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(API_INFO).then(function (resultObj) {
    if (resultObj.status === "ok") {
      infoArray = resultObj.data;
      console.log(API_INFO);
      console.log(API_COMMENTS);
      showInfo();
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
  for (let i = 0; i < imagesArray.length; i++) {
    const IMAGE = imagesArray[i];
    htmlImages += `<img src="${IMAGE}" class="img-products"></img>`;
  } /* Se muestran las imágenes asociadas al producto */
  document.getElementById("container").innerHTML = htmlContentToAppend;
  document.getElementById("images").innerHTML = htmlImages;
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
    `;/* Se muestra la información del comentario */
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
    <b>unknown_user</b> - ${newCommentDate} - 
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
