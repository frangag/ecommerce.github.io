let API = "https://japceibal.github.io/emercado-api/cats_products/101.json"

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            
        }
});
})
/* async function loadData(){
    let response = await fetch(API);
    let json = await response.json();
    console.log(json.products);
    }

loadData(); */
