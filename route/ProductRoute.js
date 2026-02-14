import express from "express";

const productRouter = express.Router();

let products = [
    { id: 1, name: "Laptop", price: 100 },
    { id: 2, name: "Smartphone", price: 200 },
    { id: 3, name: "Headphones", price: 300 },
];

productRouter.get('',(req,res)=>{
    res.send(products);
});

productRouter.post('',(req,res)=>{
    console.log(req.body);
    products.status(201).push(req.body);
    res.send(req.body);
});

productRouter.get('/:productId',(req,res)=>{
    const product = products.find((p)=>p.id == req.params.productId); 
    res.send(product);
});

productRouter.delete('/:productId',(req,res)=>{
    const product = products.find((p)=>p.id == req.params.productId); 
    if(!product){
        return res.status(404).send({error: "Product not found"});
    }
    products = products.filter(p => p.id != req.params.productId);
    res.send('<h3>Product with id '+req.params.productId+' is deleted<h3/>');
});

export default productRouter;