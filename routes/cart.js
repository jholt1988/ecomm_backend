const Express = require('express');
const router = Express.Router();
const {cartService} = require('../services');
const { fetchUserCart } = require('../services/cartService');

module.exports = (app) => {
   app.use('/cart', router)

   router.post('/:profileID', async (req, res, next) => {
    const {profileID} = req.params
   const cartItems = await cartService.createCartItem().then((result) => {
        return result
      }).catch((err) => {
        console.error(err.message, err.stack)
      })
    const userCart = await cartService.createCart(profileID, cartItems).then((result) => {
       
        res.status(200).send(result)
        next()
    }).catch((err) => {

        next(new Error(err.message, err.stack))
    })
    
    
   })

   router.put('/:profileID/add/', async (req, res, next) => { 
   const {profileID} = req.params
    const {quantity,productNo } = req.body 
    await cartService.AddItemsToCart(productNo, quantity).then((result)=>{
           res.status(200).send(result)
           next()
    }).catch((err) => {
        next(new Error(err.message, err.stack))
    })
     
   })
}