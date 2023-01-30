



const {cartModel, orderModel, cartItemModel}= require('../models');
 const Cart  = new cartModel()



module.exports = class cartService {
  findCartitem (cartItem, cartItemNo) {
    return cartItem.cartItemNo === cartItemNo
  }
  
  
    async create(userID){
      try {
        const userCart =  new cartModel({userID:userID})
      
       const response = await  userCart.createCart()
       return response
      } catch (err) {
        throw new Error(err.message, err.stack)
      }
    }

async loadCartByUserID (userID){
  try {
    const userCart = await Cart.loadByUserID(userID)
     if(userCart){
      return userCart
     }
    
  } catch (err) {
    throw new Error(err.message, err.stack)
  }
}
async AddItemsToCart  (product, quantity,userID)  {
 try{
  const userCart  =  await Cart.loadByUserID(userID)
  console.log(userCart)
console.log(product)
  const response = await Cart.addItem({ cartid:userCart.Cart.cartID,qty:quantity,productid:product.productid});
  console.log(product.productid)
  return response

 }catch (err){
  throw new Error(err.message, err.stack )
 }


   }




DeleteItemsFromCart(){
   const item = cartItems.find(this.findCartitem(cartItem,cartItemNo))
    cartItems.splice(cartItems.IndexOf(item),1)
    return cartItems

   }

   UpdateQuantity(cartItem,changeInQuant ) {
    const currQuantity = cartItem.quantity
    const newQuantity = currQuantity - changeInQuant
    cartItem.quantity = newQuantity
    cartItem.findSubTotal(cartItem.quantity)
   return cartItem
   }
   
   
 async checkout(userID, paymentInfo, deliveryType)  {
  try{
    const stripe = require('stripe')('sk_test_51KJmHTAjEYOrlpJbcRtNktEFaSBqHxaUsaAcPgjDQojexeyRbcGbKnqGwLIFhD0C7PP6EVUivLLYRdJMC216kzvI00hK4IjFwh')

    //Load
    

    const cart = await Cart.loadByUserID(userID)
   console.log(cart)

    const cartItems =  cart.cartItems
    

    const subtotal = cartItems.reduce((total, item) =>{
      return total += item.subTotal
    }, 0);


    const Order = new orderModel({ subtotal:subtotal
      ,ff: profileID, deliveryTypeID:deliveryType })
     Order.addItems(cartItems)
     await Order.create()
     await Order.createDelivery()
     
    
    
console.log(paymentInfo)
    const charge = await stripe.charges.create({
      amount:800, 
      currency: 'usd',
      source: 'tok_visa', 
      description: 'Codecademy Charge'
    });

    await Order.update({orderStatus:'APPROVED'})
console.log(charge)
    return Order,charge
 } catch(err){
 throw new Error(err.message, err.stack)
 }
 }

}