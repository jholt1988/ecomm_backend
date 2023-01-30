const db = require('../db')

const pgp = require('pg-promise')({capSQL:true})
const moment = require('moment');
const { orderModel } = require('.');
const Order = require('./order');

module.exports = class delivery{
    constructor(data = {}){
        


            this.shippingAddr1=data.shippingAddr1 || ""
            this.shippingAddr2=data.shippingAddr2 || ""
            this.city=data.city || ""
            this.state= data.state || ""
            this.zip=data.zip || ""
           this.profileID=data.profileID 
           this.orderID=data.orderID
           this.deliveryType = data.deliveryType
           this.deliveryStatus="PENDING" || data.deliveryStatus
           this.fee =  data.fee
           this.estArrDate =  data.estArrDate
           

 }
get _deliveryStatus(){
    return this.deliveryStatus
}
set _deliveryStatus(status){
    const statusOptions = {
        pending:"PENDING",
        cancelled:"CANCELLED",
        approved:"APPROVED",
        enRoute:"EN ROUTE",
        delivered:"DELIVERED"
    }
    this.deliveryStatus= statusOptions[status]
    
}





async create(){
    try{
        const {orderID, profileID, deliveryType,...delivery} = this
        console.log(this)
         const statement = pgp.helpers.insert(this, null, 'deliveries') + " RETURNING *"
       
        const result = await db.query(statement)
        console.log(delivery)
        if(result.rows?.length){
              Object.assign(this, result.rows[0])
              console.log(result.rows[0])
              
              return result.rows[0]
        }
        return null
    } catch(err){
        throw new Error(err.message, err.stack)
    }
}

  async getDeliveryInfo(){
try {
   const text = 'SELECT * FROM "delivery_type" WHERE deliverytype_id = $1'
   const values = [this.deliveryType]
   console.log(values)
   const result = await db.query(text, values).then((value) => {
    return value.rows[0]
   })

   if(result){
    const deliveryObj = result
    console.log(deliveryObj)
    return  deliveryObj
   }
} catch (err) {
     throw new Error(err.message, err.stack)
}
}

 async setFee(){
const getFee =  await this.getDeliveryInfo()
const fee = await getFee.fee
return this.fee = fee
}

 async calcArrDate(){
    try{
        const deliveryHours = await this.getDeliveryInfo()
        let now = moment()
    const estDate = now.add(deliveryHours.estarr, "seconds")
        console.log(estDate)
    
   return this.estArrDate= estDate
    
    } catch(err){
        throw new Error(err.message, err.stack)
    }
}


}


