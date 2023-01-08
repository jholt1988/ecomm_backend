const  product  = require("./product");
const { prototype } = require("./user");

module.exports = class cartItemModel extends product{
    constructor(data = {}){
        super()

        this.product_no =data.product_no
        this.quantity= 0 || data.quantity
        this.subTotal = 0 || this.findSubTotal()
    }

  async createItem(product_no){
    try{
    const product = await this.getProductByID(product_no)
    console.log(product)
    
     if(product){
      for(let prop of Object.entries(product)){
        console.log(prop)
          this[prop[0]] = prop[1]
          
      }
     return this
     }

    }catch(err){
        throw new Error(err.message, err.stack )
    }
 }

 changeQuantity(newQuantity){
    this.quantity = newQuantity
    return this.quantity 

 }

 findSubTotal(){
  const subTotal =  this.quantity * this.price
   return subTotal
 }



}


