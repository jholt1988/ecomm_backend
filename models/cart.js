const  db  = require("../db")
const cartItemModel = require("./cartItem")
const order = require("./order")
const moment = require('moment')

const pgp = require('pg-promise')({capSQL:true})

module.exports = class cart{
    constructor(data = {}){
        this.profileID=data.profileID
        this.cartID = `${this.profileID}.`+ Date.now().toString()
        this.cartItems= []
        this.subtotal = this.calcCartTotal()
        this.status = data.status || "ACTIVE"
        this.converted = false
         this.createDate = data.createDate || moment.utc().toISOString()
         this.modDate = moment.utc().toISOString()

        

    }

    get _createDate(){

        return moment.utc().toISOString()
    }

    set _createDate(newDate){
       this._createDate = newDate

    }

    get _modDate(){
        return moment.utc().toISOString()
    }

    set _modDate(newDate){
          
        this._modDate = newDate
    }
      
    async create(profileID){
         const data = {profileID,...this}
        try{
            const statement = pgp.helpers.insert(data,null, "carts") + 'returning *'
            const text = 'INSERT INTO carts ("cartID", "profileID") VALUES($1, $2) RETURNING *'
            const values = [this.cartID, this.profileID]

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
            const text = "UPDATE carts SET cartItems = $1 WHERE 'cartID' = $2"
            const values= [this.cartItems, this.cartID]

            const result = db.query(text, values);

            if(result.rows > 0){
                return this.cartItems
            }
        } catch(err){
            throw new Error(err.message, err.stack)
        }
    }
   
     calcCartTotal(){
      return  this.cartItems.reduce((prevValue,cartItem) => {
            
        prevValue = prevValue + cartItem.subTotal
            total= prevValue
        }, 0)
    }

    addItem(item){
        this.cartItems.push(item)
        return this.totalItems = this.cartItems.length
    }

    deleteItem(item){
       const itemIndex = this.cartItems.findIndex(item);
       const removedItem = this.cartItems.splice(itemIndex);
       console.log(`Removed ${removedItem} from cart`)
       return this.totalItems = this.cartItems.length
    }

    createOrder(){
       const newOrder = new order({
        profileID:this.profileID,
        items: Array.from(this.cartItems),
        subTotal: this.CartTotal
       }) 


       return newOrder
    }

    async loadByProfileID(profileID){
        try {
            const text = 'SELECT * FROM carts WHERE "profileID" = $1'
            const values =  [profileID]
      const response = await db.query(text, values);
      if(!response){
        throw new Error('404-CART NOT LOADED')
      }
      return response

        } catch (err) {
            throw new Error(err.stack, err.message)
        }
    }

    }




