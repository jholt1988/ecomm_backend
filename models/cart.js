const moment = require('moment')
const { cartModel } = require('.')
const  db  = require("../db")
const cartItemModel = require("./cartItem")
const order = require("./order")


const pgp = require('pg-promise')({capSQL:true})

module.exports = class cart{
    constructor(data ={}){
        this.userID = data.userID

        this.profileID=data.profileID
        this.cartID = `${this.userID}.`+ Date.now().toString() || data.cartID
        this.subtotal = data.subtotal || 0
        this.status = data.status || "ACTIVE"
        this.converted = false
         this.createDate = data.createDate || moment.utc().toISOString()
         this.modDate = moment.utc().toISOString()
         
        

    }

    
    

      
      
    async createCart(){
         const {...cart} = this
        try{
            const statement = pgp.helpers.insert(cart,null, "carts") + 'RETURNING *'


            const result = await db.query(statement);

            if(result.rows?.length){
                return result.rows[0]
            }
           return null
        } catch(err){
            throw new Error(err.message, err.stack)
        }
    }

    async updateCart(){
        try{
            const text = 'UPDATE carts SET "cartItems" = $1   WHERE "cartID" = $2;'
            const values= [this.cartItems, this.cartID]
console.log(this.cartID, this.cartItems)

      const result = await db.query(text, values)
        return result.rowCount
        } catch(err){
            throw new Error(err.message, err.stack)
        }
    }
   
     
    async loadByUserID(userID){
        try {
            const text = 'SELECT * FROM carts WHERE "userID" = $1'
            const values =  [userID]
        
      const response = await db.query(text, values);
      
            const Cart = response.rows[0] = {...this}
          
            const Items =  cartItemModel.find(Cart.cartID)

            return {Cart, Items}
            
            
        } catch (err) {
            throw new Error(err.stack, err.message)
        }
    }
    /**
     * CREATES A CART ITEM AND ADDS IT TO CART
     * @param {string} product_no 
     * @param {integer} quantity 
     * @param {string} profileID 
     */
   async addItem(data){
    const {product,qty,cartid} = data

       const result = await new cartItemModel.create({cartid: cartid,qty:qty, productid:product.productid,...product});
     return result 

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

    




