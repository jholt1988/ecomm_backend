const Express = require("express");
const { db } = require("../config");
const router = Express.Router();
const {productModel} = require('../models');
const {productService} = require('../services');
const productServiceInst = new productService()
module.exports = (app) => {
    app.use('/store', router)

    router.post('/addproduct', async (req, res, next) => {
        try{
     const response =   await productServiceInst.createProduct(req.body)
        res.send(response)
        next()
        }
        catch(err) {
          next(new Error(err.message, err.stack))
       }
          
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
        const {field, value}= req.body
        const info = {field, value, productno}
        console.log(info)
        try {
            const product = await productServiceInst.updateProduct(info)
            if(product === 1){
            res.send(`${productno} ${field} was updated to ${value}`)
            next()
            }
            next()
        } catch (err) {
            throw new Error(err.message, err.stack)
        }
        
        await productService.updateProduct
})
    router.get('/products/:productno', async(req, res, next) =>{
        const {productno} = req.params
        try{
       const response = await productServiceInst.getByID(productno)
       if(response){
        res.status(202).send(response)
        next()
       }
     next()
        }
        catch(err){
            next(new Error(err.message, err.stack))
        }
    })

}