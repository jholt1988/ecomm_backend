const Express = require('express');
const router = Express.Router();
const {cartService} = require('../services');
const { fetchUserCart } = require('../services/cartService');
const cartServiceInsta = new cartService()

module.exports = (app) => {
   app.use('/cart', router)

   router.post('/:profileID', async (req, res, next) => {
    const {profileID} = req.params
   try{
    const userCart = await cartServiceInsta.create(profileID)
    if(!userCart){
      next('404-ERROR CART NOT CREATED')
    }
    res.status(202).send(userCart)
   }
    catch(err) {

        next(new Error(err.message, err.stack))
    }
  })
    
   

   router.put('/:profileID/add/', async (req, res, next) => { 
   const {profileID} = req.params
    const {quantity,product_no } = req.body 
   try{
    const response = await cartServiceInsta.AddItemsToCart(product_no, quantity, profileID)
    res.status(200).send(response)
    next()
   } catch(err){
    next(new Error(err.message, err.stack))
   }
     
   })

   router.get('/:profileID', async (req, res, next) => {
    const {profileID} = req.params
    try{
      const response = await cartServiceInsta.loadCartByProfileID(profileID);
      if(!response){
        next('404-ERROR CART NOT LOADED')
      }
      res.status(202).send(response)
      next()
    }catch(err){
      next( new Error(err.message, err.stack))
    }
   })
}