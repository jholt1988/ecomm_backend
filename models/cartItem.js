const { product } = require("./product");

class cartItem extends product{
    constructor(cartItemNo, quantity){
        super()
        this.cartItemNo= cartItemNo
        this.productID = this.productID
        this.quantity= quantity
    }

 get quantity(){
    return this.quantity
 }
 set quantity(num){
    return num 
 }
 findSubTotal(price){
  this.subTotal =  this.quantity * price
 }


}


module.exports={
    cartItem:cartItem
}