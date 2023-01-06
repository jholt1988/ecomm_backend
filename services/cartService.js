const db = require('../db');
const {cartModel}= require('../models');
const {cartItemModel} = require('../models');
const user = require('../routes/user');


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

async AddItemsToCart  (item, quantity)  {
const newItem = new cartItemModel(quantity, item)
db.query('UPDATE userCart SET cartItems')
newCartItem.findSubTotal
cartItems.push(newCartItem, ...cartItems)

return cartItems
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