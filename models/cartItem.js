const  product  = require("./product");

module.exports = class cartItemModel extends product{
    constructor( {} = data){
        super()

        this.product_no =data.product_no
        this.quantity= data.quantity
        this.subTotal = this.findSubTotal(this.price)
    }

  async createItem(){
    try{
    const product = await this.getProductByID(this.productID)
     if(product){
     this.price = product.price
     return product
     }

    }catch(err){
        throw new Error(err.message, err.stack )
    }
 }

 changeQuantity(newQuantity){
    this.quantity = newQuantity
    return this.quantity 

 }

 findSubTotal(price){
  this.subTotal =  this.quantity * price
 }



}


