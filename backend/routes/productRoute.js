import express from 'express';

import Product from '../models/productModel';
import { getToken, isAdmin, isAuth } from '../util';

const router = express.Router();

router.get('/:id', async (req,res)=>{
    const product_id = req.params.id;
    const product = await Product.findById(product_id);
    if (product)
        res.send(product);
    
    else 
        res.status(404).send({msg:'Item does not exist'});
    

});
router.put("/:id",isAuth, isAdmin,async(req,res)=>{
    const id = req.params.id;
    const product = await Product.findById(id);
     
    if (product){
        product.name=req.body.name;
        product.brand=req.body.brand;
        product.image=req.body.image;
        product.price=req.body.price;
        product.category=req.body.category;
        product.countInStock=req.body.countInStock;
        product.description=req.body.description;
        const newProduct = await product.save();
        if (newProduct){
            res.status(201).send({msg:'Product successfully updated', product:newProduct});
        } else {
            res.status(401).send({msg:'Error in updating product'});
        }
    } else {
        res.status(401).send({msg:'Product with does not exist'});
    }

});

router.delete("/:id",isAuth, isAdmin,async(req,res)=>{
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product){
        await product.remove();
        res.status(200).send({msg:'Product deleted'});
    }
    else{
        res.status(400).send({msg:'Error in deletion'});
    }
    
});

router.get("/", async (req,res) => {
    const products = await Product.find({});
    return res.send(products);
});

router.post("/", isAuth, isAdmin, async(req,res)=>{

    const product = new Product ({
        name:req.body.name,
        brand:req.body.brand,
        image:req.body.image,
        price:req.body.price,
        category:req.body.category,
        countInStock:req.body.countInStock,
        description:req.body.description      
    });
    const newProduct = await product.save()
    if (newProduct){
        return res.status(201).send({message:'New product created', data:newProduct}); }
    
    return res.status(501).send({msg:'Error in creating product'});
   

});

export default router;