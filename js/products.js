let currentCategoriesArray;
let currentID = localStorage.getItem('catID');
let catnamecontainer = document.getElementById('catname').innerHTML;
///const order_desc_by_price = "desc.";
//const order_asc_by_price = "asc.";
//const order_by_sold_count = "Rel.";
let minCount = undefined;
let maxCount = undefined;
//let currentSortCriteria = undefined;


function showProductsList(){

        
        let htmlContentToAppend = "";
        for( let i = 0; i < currentCategoriesArray.products.length; i++ ){
            let products = currentCategoriesArray.products[i];
            if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost} </h4> 
                            <small class="text-muted">${products.soldCount} vendidos.</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
            }
            document.getElementById('list-of-products').innerHTML = htmlContentToAppend;
        }

}

//nombre para cada category de products
function setCatIdName(){
    document.getElementById("catname").innerHTML = "Verás aqui todo los productos de la categoría" +" " + currentCategoriesArray.catName +"." 

}

function productInfoDisplay(){
    for (i = 0; document.getElementById('list-of-products').length
    window.location = "product.info.html"
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData('https://japceibal.github.io/emercado-api/cats_products/'+currentID+'.json').then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            setCatIdName();
            showProductsList();
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(order_asc_by_price);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(order_desc_by_price);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(order_by_sold_count);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });



});

