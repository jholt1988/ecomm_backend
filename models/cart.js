const order = require("./order")

class cart{
    constructor(profileID, cartItems){
        this.profileID=profileID
        this.cartItems=cartItems
        

    }
   get cartID(){
    return this.cartID
   }
    set cartID(profileID){
      return`${profileID}.`+ Date.now().toString()
       
    }
   
    get CartTotal(){
      return  this.cartItems.reduce((prevValue,cartItem) => {
            
        prevValue = prevValue + cartItem.subTotal
            total= prevValue
        }, 0)
    }

    addItem(item){
        this.cartItems.push(item)
        return this.totalItems = this.cartItems.length
    }

    deleteItem(item){
       const itemIndex = this.cartItems.findIndex(item);
       const removedItem = this.cartItems.splice(itemIndex);
       console.log(`Removed ${removedItem} from cart`)
       return this.totalItems = this.cartItems.length
    }

    createOrder(){
       const newOrder = new order({
        profileID:this.profileID,
        items: Array.from(this.cartItems),
        subTotal: this.CartTotal
       }) 


       return newOrder
    }

    }





module.exports={
cart
}