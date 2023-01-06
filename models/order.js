const  db  = require("../db");
const { cart } = require("./cart");
const { delivery } = require("./delivery");
const format = require('pg-format');



module.exports = class order {
    constructor( {}= data){
    
        this.orderID=data.orderID
        this.profileID=data.profileID
        this.items = data.items
        this.deliveryTypeID=data.deliveryTypeID
        this.total = this.calcTotal()
        this.createDate = moment.utc().toISOString | data.createDate
        this.modDate = moment.utc().toISOString
        this.orderStatus= data.orderStatus
        this.deliveryFee = data.deliveryFee
        
    }
     async create(data){
        const{orderID,profileID, items, deliveryTypeID, total, createDate, modDate, orderStatus, deliveryFee} = data
        try{
            const text = `INSERT INTO orders (orderID,profileID, items, deliveryTypeID, total, createDate, modDate, orderStatus, deliveryFee) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`
            const values=[orderID,profileID, items, deliveryTypeID, total, createDate, modDate, orderStatus, deliveryFee]

            const result = await db.query(text,values);

            if(result.rows?.length){
                return result.rows[0]
            }
            return null
        }catch(err){
            throw new Error(err.message, err.stack)
        }
     }
   /**  
     * UPDATE USER Order
     * @param {object} data [{Field, value}] 
     * @returns 
     */
   async updateOrder (data){
    try{
    const {field, value} = data
    const text = format('UPDATE users SET %I=%L WHERE "id" = %L',field, value, this.orderID)
    console.log(text);
   const result = await db.query(text);
   if(result.rows?.length){
    return result.rowCount
   }
   null
} catch(err){
    throw new Error(err.message, err.stack)
}
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


    set orderStatus(status){
        const statusOptions = {
            pending:"PENDING",
            cancelled:"CANCELLED",
            approved:"APPROVED",
            enRoute:"EN ROUTE",
            delivered:"DELIVERED"
        }
        return statusOptions[status]
        
    }
    
}
