const Express = require("express");
const { db } = require("../config");
const router = Express.Router();
const {productModel} = require('../models');
const {productService} = require('../services');

module.exports = (app) => {
    app.use('/store', router)

    router.post('/addproduct', async (req, res, next) => {
       const {product_no, product_name, product_description, product_vendor, price, total_quantity, quantity_bysize} = req.body
    
       await productService.createProduct({product_no, product_name, product_description, product_vendor, price, total_quantity, quantity_bysize}).then((result ) => {
        res.send(result)
        next()
        }).catch((err) => {
          next(new Error(err.message, err.stack))
       })
          
       })
    
    router.get('/products', async (req, res, next) => {
        await productService.getAllProducts().then((products) => {
            res.status(202).send(products)
            next()
        }).catch((err) => {
           next(new Error(err.message, err.stack))
        })


    })
    
    router.put('/products/:productno', async (req, res, next) => {
        const {productno} = req.params
        
        const field = Object.keys(req.body)
        const value = req.body[field]
        await productService.updateProduct(field[0], value, productno).then((result) => {
            res.status(202).send(result)
            next()
        }).catch((err)=>{
            next(new Error(err.message, err.stack))
        })
    })

    router.get('/products/:productno', async(req, res, next) =>{
        const {productno} = req.params

        await productService.getProductByID(productno).then((result)=>{
            res.status(200).send(result)
            next()
        }).catch((err) => {
            next(new Error(err.message, err.stack))
        })
    })

}