module.exports=(products)=>{
    cheapestItem=0 // pradine kaina
    for(let i=0;i<products.length;i++){ //nuo vieno iki pabaigos
        if(products[i].price<products[cheapestItem].price){ // jei yra didesnis uz pradine arba jau priskirta reiksme
            cheapestItem=i //nauja didziausia reiksme
        }
    }
    return products[cheapestItem]
}