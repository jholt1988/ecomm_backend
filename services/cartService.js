const db = require('../db');
const {cartModel}= require('../models');
const {cartItemModel} = require('../models');




module.exports = class cartService {
  findCartitem (cartItem, cartItemNo) {
    return cartItem.cartItemNo === cartItemNo
  }
  
  
    async create(profileID){
      try {
        const userCart =  new cartModel({profileID:profileID, ...userCart})
      
       const response = await  userCart.create()
       return response
      } catch (err) {
        throw new Error(err.message, err.stack)
      }
    }

async loadCartByProfileID (profileID){
  try {
    const userCart = await cartModel.loadByProfileID(profileID)
     if(userCart){
      return userCart
     }
    
  } catch (err) {
    throw new Error(err.message, err.stack)
  }
}
async AddItemsToCart  (product_no, quantity, profileID)  {
 try{
  const cart  =  new cartModel({profileID})
  const response = await cart.addItem(product_no, quantity, profileID);
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
   
   
 createNewOrder(cart)  {
    return cart.CreateOrder
 }


}