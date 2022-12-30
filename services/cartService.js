const db = require('../db');
const {cartModel} = require('../models');
const {cartItemModel} = require('../models')


module.exports = {
  findCartitem:(cartItem, cartItemNo) =>{
    return cartItem.cartItemNo === cartItemNo
  },
  createCartItem: async() => {
    const text = "CREATE TYPE cartItem AS( cartItemNo int,quantity int,itemTotal int, product_no varchar)";

       const response = await db.query(text).then((result) =>{
        return result.rows
       }).catch((err) =>{
        console.error(err.message, err.stack)
       })

    return response

  },
    createCart: async (profileID, cartItems) => {
     
      const text = "CREATE TEMP  TABLE  userCart (cartID varchar PRIMARY KEY, cartItems cartItem[],  profileID UUID, subTotal float, cartTotal int )";

        const userCart = new cartModel(profileID, cartItems);
      
     const response = await   db.query(text).then((result) => {
          return result
        }).catch((err) => {
          
          console.error(err.message, err.stack);
        })
    

 return{ userCart, response}
    },

AddItemsToCart: async (item, quantity) => {
const newItem = new cartItemModel(quantity, item)
db.query('UPDATE userCart SET cartItems')
newCartItem.findSubTotal
cartItems.push(newCartItem, ...cartItems)

return cartItems
},

DeleteItemsFromCart: ((cartItems)=>(cartItem, cartItemNo) => {
   const item = cartItems.find(this.findCartitem(cartItem,cartItemNo))
    cartItems.splice(cartItems.IndexOf(item),1)
    return cartItems

   }),

   UpdateQuantity:(cartItem,changeInQuant ) => {
    const currQuantity = cartItem.quantity
    const newQuantity = currQuantity - changeInQuant
    cartItem.quantity = newQuantity
    cartItem.findSubTotal(cartItem.quantity)
   return cartItem
   },
   
   
 createNewOrder:(cart) => {
    return cart.CreateOrder
 },

fetchUserCart:(profileID) => {
    


}
}