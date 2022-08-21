let API = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let productsArray = [];
let products =[];
let LIST = document.getElementById("list");
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(API).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data;
            products = productsArray.products;
            console.log(products);
            showProductsList()
       }}
)});

LIST.innerHTML = "";
function showProductsList(){
    let i=0;
        while (i<1){
                i++;
            for(let product of products){
                 LIST.innerHTML+=`
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
            `
        }}}

        console.log(LIST);

        