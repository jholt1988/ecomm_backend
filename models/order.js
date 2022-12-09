const { cart } = require("./cart");
const { delivery } = require("./delivery");



class order {
    constructor( items,deliveryTypeID ){
    
        this.orderID=orderID
        this.profileID=profileID
        this.items = items
        this.deliveryTypeID=deliveryTypeID
        this.total = this.calcTotal()
        this.createDate=this.createDate()
        
    }
    
    set modDate(date){
        date= Date.now();
        return date
    }

    get subTotal(){
        return this.calcSubTotal()
    }
     
   
    createDate(){
        if(this.createDate){
            return this.createDate
        }
        return Date.now()
    }
    calcSubTotal(){
       return this.items.reduce((total, itemTotal) =>{
        
            total = total + itemTotal.subTotal
            return total
        },0)
    }

    calcTotal(){
        return this.deliveryFee + this.subTotal
    }

    createDelivery(){
        const newDelivery = new delivery({shippingAddr1, shippingAddr2, city, state, zip,orderID: this.orderID, profileID:this.profileID})
        return newDelivery
    }

    get deliveryFee(){
        return this.deliveryFee
    }

    set deliveryFee(fee){

        fee = this.createDelivery().deliveryType(this.deliveryTypeID).fee

        return fee
    }

    set orderStatus(status){
        const statusOptions = {
            pending:"PENDING",
            cancelled:"CANCELLED",
            approved:"APPROVED",
            enRoute:"EN ROUTE",
            delivered:"DELIVERED"
        }
        this.modDate = Date.now();
        return statusOptions[status]
        
    }
    
}
module.exports={
order
}