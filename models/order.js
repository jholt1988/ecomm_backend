const pgp = require('pg-promise')({capSQL: true})
const  db  = require("../db")
const format = require('pg-format');
const moment = require('moment');
const {v4:uuidv4} = require('uuid')

const cartItemModel = require("./cartItem");
const  delivery  = require('./delivery');
const cartItemInsta = new cartItemModel()




module.exports = class Order {
    constructor(data = {}){
    
        
        this.profileID=data.profileID
        this.items =  data.items || []
        this.deliveryTypeID=data.deliveryTypeID
        this.total =  0 ||data.total
        this.subtotal = 0 || data.subtotal
        this.createDate = data.createDate || moment.utc().toISOString() 
        this.modDate = moment.utc().toISOString()
        this.orderStatus= data.orderStatus || "PENDING"
        this.deliveryFee =  0 ||data.deliveryFee
        
    }

     addItems(cartItems){
        this.items = cartItems.map(item => new cartItemModel(item))
     }

     
    async create() {
        try{
        const {items, ...order}= this;
        console.log(this)
        const statement = pgp.helpers.insert(order, null, 'orders') +' RETURNING*';
        
       const result = await db.query(statement);

       if(result.rows?.length){

        Object.assign(this, result.rows[0])
        return result.rows[0]
       }
         return null
    } catch(err){
        throw new Error(err.message, err.stack)
    }
}
     async createOrder(data){
        const{orderID,profileID, items, deliveryTypeID, total, createDate, modDate, orderStatus, deliveryFee} = data
        try{
            const text = `INSERT INTO orders ("orderID","profileID", "items", "deliveryTypeID", "total", "createDate", "modDate", "orderStatus", "deliveryFee") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`
            const values=[orderID,profileID, items, deliveryTypeID, total, createDate, modDate, orderStatus, deliveryFee]

            const result = await db.query(text,values);

            if(result.rows){
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
   return null
} catch(err){
    throw new Error(err.message, err.stack)
}
   }


    calcSubTotal(){
        this.items.reduce((total, itemTotal) =>{
        console.log(itemTotal)
           total =+ itemTotal.subTotal
        this.subTotal = total
        },0)
    }

    calcTotal(){
        return this.deliveryFee + this.subTotal
    }

  async  createDelivery(){
    try{
        console.log(this.deliveryTypeID)
        const newDelivery =  new delivery({orderID: this.orderID, profileID:this.profileID,deliveryType:this.deliveryTypeID,...delivery})
        newDelivery.fee = await newDelivery.setFee()
        newDelivery.estArrDate = await newDelivery.calcArrDate()
        await  newDelivery.create()
         
         
        console.log(newDelivery)
        return newDelivery
    } catch(err){
        throw new Error(err.message, err.stack)
    }
    }


    set _orderStatus(status){
        const statusOptions = {
            pending:"PENDING",
            cancelled:"CANCELLED",
            approved:"APPROVED",
            enRoute:"EN ROUTE",
            delivered:"DELIVERED"
        }
        this._orderStatus =  statusOptions[status]
        
    }
    


    async getAllUserOrders(profileID){
       const text = 'SELECT * orders WHERE "profileID" = $1'
       const values = [profileID]

       try{
        const response = await db.query(text, values) 
        
        if(response){
            return response.rows
        }
        return null
    
       } catch(err) {
        throw err
       }

    }

    async getOrderById (orderId){
        try{
            const text = 'SELECT * FROM orders WHERE "orderID" = $1'
            const values = [orderId]

            const order = await db.query(text. values)

            if(order){
                return order.rows[0]
            }
             return null
        } catch(err){
            throw new Error(err.message, err.stack)
        }
    }

    async update(data){
        try{
            const condition = pgp.as.format('WHERE "orderID" = ${orderID} RETURNING *', {orderID: this.orderID})
            const statement = pgp.helpers.update(data, null,'orders') + condition

            const result = await db.query(statement);
           {
            if(result.rows?.length){
                return result.rows[0];
            }
            return null

        }
        } catch(err){
            throw new Error(err.message, err.stack)
        }

    }
    
}
