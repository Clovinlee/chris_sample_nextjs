export function sum(a,b){
    return a+b;
}

export function getAverageStock(products){

    if (!products || products.length === 0) {
        return 0; // return 0 if there are no products
    }

    let totalStock = 0;

    for (let i = 0; i < products.length; i++) {
        totalStock += products[i].stock;
    }

    return totalStock / products.length;
}