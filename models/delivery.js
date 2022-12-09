class delivery {
    constructor(shippingAddr1,
        shippingAddr2, 
        city,
        state, 
        zip,
        profileID, 
        OrderID,
        ){
            this.shippingAddr1=shippingAddr1
            this.shippingAddr2=shippingAddr2
            this.city=city
            this.state= state
            this.zip=zip
           this.profileID=profileID
           this.OrderID=OrderID
           this.deliveryStatus="PENDING"
           this.deliveryFee = this.deliveryType.fee
 }
get deliveryStatus(){
    return this.deliveryStatus
}
set deliveryStatus(status){
    const statusOptions = {
        pending:"PENDING",
        cancelled:"CANCELLED",
        approved:"APPROVED",
        enRoute:"EN ROUTE",
        delivered:"DELIVERED"
    }
    return statusOptions[status]
    
}
/**
     * @param {string | number} type
     */
set deliveryType(type){
    const deliveryMethods={
        "ST-GR":{
            name:"Standard Ground",
            fee: 10.50,
            deliveryHours: 60 * 60 * 1000 * 96
        }, 
        "EX-GR":{
            name:"Express Ground",
            fee: 16.50,
            deliveryHours: 60 * 60 * 1000 * 48
        },
        "EX-OVN":{
            name:"Express Overnight",
            fee: 25.00,
            deliveryHours: 60 * 60 * 1000 * 24
        }
    }
    return deliveryMethods[type]
}
get estArrDate (){
   return this.calcArrDate()
}
calcArrDate(){
    const estDate = Date.now() + this.deliveryType.deliveryHours
    return estDate
}

}



module.exports={
    delivery
}