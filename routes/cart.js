
const Express = require('express');
const router = Express.Router();
const {cartService} = require('../services');
const { fetchUserCart } = require('../services/cartService');
const cartServiceInsta = new cartService()

module.exports = (app) => {
   app.use('/cart', router)

   router.post('/mycart', async (req, res, next) => {
const userID = req.user.id
   try{
    const userCart = await cartServiceInsta.create(userID)
    if(!userCart){
      next('404-ERROR CART NOT CREATED')
    }
    res.status(202).send(userCart)
   }
    catch(err) {

        next(new Error(err.message, err.stack))
    }
  })
    
   

   router.post('/mycart/add/', async (req, res, next) => { 
   const userID = req.user.id
    const {quantity,product } = req.body 
   try{
    const response = await cartServiceInsta.AddItemsToCart(product, quantity, userID)
    res.status(200).send(response)
    next()
   } catch(err){
    next(new Error(err.message, err.stack))
   }
     
   })

   router.get('/mycart', async (req, res, next) => {
    const userID = req.user.id
    try{
      const response = await cartServiceInsta.loadCartByUserID(userID);
      if(!response){
        next('404-ERROR CART NOT LOADED')
      }
      res.status(202).send(response)
      next()
    }catch(err){
      next( new Error(err.message, err.stack))
    }
   })

   router.post('/mycart/checkout', async (req, res, next) => {
    const userID = req.user.id
    const {paymentInfo, deliveryType} = req.body
    try{
      const result = await cartServiceInsta.checkout(userID, paymentInfo, deliveryType)

      res.status(200).send(result)
      next()
    } catch(err){
      next(err.message, err.stack)
    }
   })
}