
class product {
    constructor(productNo, productName, productDescription, productVendor, price, totalQuantity, quantityBySize, img){
        this.product_no=productNo
        this.product_name=productName
        this.product_description=productDescription
        this.product_vendor=productVendor
        this.price=price
        this.total_Quantity=totalQuantity
        this.quantity_BySize=quantityBySize
        this.createDate=this.createDate()
    }
    get total_Quantity(){
        return this.total_Quantity
    }
    set total_Quantity(order){
        return order
    }
    /**
     * @param {number} date
     */
    set modDate(date){
        return date = Date.now();
    }
    order(orderQuan){
      this.total_Quantity = this.total_Quantity - orderQuan
      return this.total_Quantity
    }

    update(prop, val){
        this[prop] = val
        return this.modDate = Date.now();

    }

    createDate(){
        if(this.createDate){
            return this.createDate
        }
        return Date.now()
    }
}
module.exports={
    product
}