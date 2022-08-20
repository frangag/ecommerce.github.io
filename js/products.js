let API = "https://japceibal.github.io/emercado-api/cats_products/101.json"


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(API).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data
            let htmlContentToAppend = "";
            for(let i = 0; i < productsArray.length; i++){
                let products = productsArray[i];
                    htmlContentToAppend += `
                    <div (${products.id})">
                        <div>
                            <div>
                                <img src="${products.image}" alt="${products.description}">
                                <div>${products.currency} ${products.cost}</div>
                            </div>

                            <div>
                                <div>
                                    <h4>${products.name}</h4>
                                    <small>${products.soldCount}</small>
                                </div>
                                <p">${products.description}</p>
                            </div>
                        </div>
                    </div>   
                    `
                    }
                    document.getElementById("list").innerHTML += htmlContentToAppend;
                     
        }
});
})
/* async function loadData(){
    let response = await fetch(API);
    let json = await response.json();
    console.log(json.products);
    }

loadData(); */
