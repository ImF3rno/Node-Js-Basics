// ========================================================================================
// importai, kad galetume naudoti node js
const fs= require('fs'); // norint skaityti is failo
const http=require('http'); // requist ir resond gaudymas
const url=require('url'); // url ir yra url nieko naujo
// moduliu importavimas
const findCheapestProduct=require('./modules/findCheapestProduct') // suranda pigiausia pagal uzklausa
const sortedProducts=require('./modules/sortedProducts') // didejimo arba mazejimo pagal kaina
// ========================================================================================

// ========================================================================================
// duomenu nusiskaitymas is products.json
let products=fs.readFileSync(`${__dirname}/products/products.json`,'utf-8');
products=JSON.parse(products)
console.log(products)
// ========================================================================================

// ========================================================================================
// serveris
const hostname='localhost';
const port='8888';

// pacio serverio kurimas
const server=http.createServer((req,res)=>{
    const {query,pathname}=url.parse(req.url, true);
    console.log('path',pathname);
    console.log('querry',query)
    switch(pathname){
//*************************************************************************************************************** 
        case '/': // home page localhost:8888
            res.writeHead(200,{
                'Content-type':'text/html', // jei viskas gerai i console>>network
            })
            res.end("<h1>Hello</h1>");
            break;
//*************************************************************************************************************** 
        case '/api/products': // localhost:8888/api/products
            res.writeHead(200,{
                'Content-type':'application/json',
            })
            res.end(products);
            break;
//*************************************************************************************************************** 
        case `/api/product`: //localhost:8888/api/product?id={nuo 1 iki 10 ivedamas id}
            if(products.id==query.id)
                {
                    res.writeHead(200,{
                        'Content-type':'application/json',
                    })
                }
            res.end(JSON.stringify(products[query.id]));
            break;
//***************************************************************************************************************
        case '/api/products/cheapest': //localhost:8888/api/products/cheapest
            res.writeHead(200, {
                'Content-Type': 'application/json',
            })
            res.end(JSON.stringify({ cheapest: findCheapestProduct(products) }))
            break;
//***************************************************************************************************************
        case '/api/products/sorted': //localhost:8888/api/products/sorted?sequence=asc des arba random
            res.writeHead(200, {
                'Content-Type': 'application/json',
            });
            sortedProducts(products,query['sequence']);
            res.end(JSON.stringify(products));
            break;
//*************************************************************************************************************** 
        default: // home page localhost:8888/(kazkoks puslapis kurio dar neesam sukure)
            res.writeHead(404,{
                'Content-type':'text/html',
                'my-header':'I like Node' // jei viskas negerai i console>>network
            })
            res.end("<h1>Page not found</h1>");

    }
})

// serverio paleidimas
server.listen(port,hostname,()=>{
    console.log(`Server is listening on port ${port}`) // pasitikrinimas ar veikia serveris
})
// ========================================================================================

// ========================================================================================
// skaito faila ir isveda per funkcija i console, bet nenaudojant kintamojo ir be readFileAsync, o tiesiog readFile

// fs.readFile(`${__dirname}/./txt/input.txt`,'utf-8',(err,data)=>{
//     console.log(data)
// toliau viskas vyksta cia, nes tai yra funkcija ir galima gaudyti errorus toliau
// });

// ========================================================================================

// ========================================================================================
// isveda visus zodzius kuriu ilgis didenis nei 8 simboliai is naujos eilutes

// let textFromFile=fs.readFileAsync(`${__dirname}/./txt/input.txt`,'utf-8')
// textFromFile=textFromFile.split(' ');
// for(let word of textFromFile){
//     if(word.length>8){
//         fs.appendFileSync(`${__dirname}/./txt/validatedWords.txt`,word+'\n')
//     }
// }

// ========================================================================================

// ========================================================================================

// console.log(__dirname) //tikslus kelias iki failo
// console.log(textFromFile) // skaitomas failas ir isvedama i console su node (failo pavadinimas(index.js))

// ========================================================================================