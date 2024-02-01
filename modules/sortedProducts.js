module.exports=(products,sequence)=>{
    if(sequence=='asc'){ //nuo maziausio iki didziausio
        products.sort((first,last)=>first.price-last.price);
    }else if(sequence=='des'){ //nuo didziausio iki maziausio
        products.sort((first,last)=>last.price-first.price)
    }else{
        products.sort(()=>Math.random()-0.5) //jei iveda beleka random ismeto
    }
}