const  db  = require("../db")
const cartItemModel = require("./cartItem")
const order = require("./order")
const moment = require('moment')

const pgp = require('pg-promise')({capSQL:true})

module.exports = class cart{
    constructor(data ={}){
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

        return this._createDate
    }

    set _createDate(newDate){
       this._createDate = newDate

    }

    get _modDate(){
        return this._modDate
    }

    set _modDate(newDate){
          
        this._modDate = newDate
    }
    get _cartItems(){
        return this._cartItems
    }
      set _cartItems(cart){
           this._cartItems = cart
      }
      
    async createCart(profileID){
         const data = {profileID,...this}
        try{
            const statement = pgp.helpers.insert(data,null, "carts") + 'RETURNING *'


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
   
     calcCartTotal(){
      return  this.cartItems.reduce((prevValue,cartItem) => {
            
        prevValue = prevValue + cartItem.subTotal
            total= prevValue
        }, 0)
    }

    /**
     * CREATES A CART ITEM AND ADDS IT TO CART
     * @param {string} product_no 
     * @param {integer} quantity 
     * @param {string} profileID 
     */
   async addItem(product_no, quantity,profileID){

        //CHECKOUT A CLIENT TO PERFORM DATABASE TRANSACTION

        db.getClient(async (err, client, release) => {
        try{ 
    //BEGIN TRANSACTION
          client.query('BEGIN')
      //LOAD USER CART
          const cartText = 'SELECT * FROM carts WHERE "profileID" = $1' 
          const cartValues = [profileID] 
          const cartRes = await client.query(cartText, cartValues)
          const cart = await cartRes.rows[0]
    console.log(cart)
    //LOAD PRODUCT, CREATE CART ITEM, ADD TO CART
          const productText = "SELECT * FROM products WHERE product_no = $1"
          const productValues = [product_no]
          const productRes = await client.query(productText, productValues)
          const newCartItem = new cartItemModel({product_no})
          const productResObj= productRes.rows[0]
          
          
            for(let prop of Object.entries(productResObj)){
              
                newCartItem[prop[0]] = prop[1]
                
            }
           
           
        
        newCartItem.quantity = quantity
        console.log( newCartItem)
        cart.cartItems = []
        cart.cartItems.push(newCartItem, ...cart.cartItems)
       console.log(cart.cartItems)
       //UPDATE CART IN DATABASE
       const updateText = 'UPDATE carts SET "cartItems" = $1, "modDate" = $2 WHERE "cartID" = $3'
       const updateValues = [cart.cartItems, cart.modDate, cart.cartID] 
       const updateRes = await client.query(updateText, updateValues)
       //COMMIT CHANGES TO DATABASE
       await client.query('COMMIT')
        return cart
        
        } catch(err){
            //IF ERROR ROLLBACK ALL DATABASE CHANGES
            client.query('ROLLBACK')
            throw err
        } finally {
            //RELEASE CLIENT AFTER COMMIT OR ROLLBACK
            release()
        }
    })
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

   static async loadByProfileID(profileID){
        try {
            const text = 'SELECT * FROM carts WHERE "profileID" = $1'
            const values =  [profileID]
        
      const response = await db.query(text, values);
            const cart = response.rows[0]
            return cart
            
            
        } catch (err) {
            throw new Error(err.stack, err.message)
        }
    }

    }




