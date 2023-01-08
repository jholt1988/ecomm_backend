const  db  = require("../db")
const moment = require('moment')
const pgp = require("pg-promise")({capSQL:true})
module.exports = class product {
    constructor(data= {}){
        this.product_no=data.productNo
        this.product_name=data.productName
        this.product_description=data.productDescription
        this.product_vendor=data.productVendor
        this.price=data.price
        this.total_quantity=data.totalQuantity
        this.quantity_bysize=data.quantitybySize
        this.img= data.img
        this.createdate = moment.utc().toISOString()|| data.createDate
        this.modDate = moment.utc().toISOString()
    }
    get createdate(){
      
      return moment.utc().toISOString()
      
    }

    set createdate(newDate){
      newDate = moment.utc().toISOString();
      
    }
    async createProduct (productInfo) {
        productInfo.createdate=this.createdate
      const statement = pgp.helpers.insert(productInfo, null, 'products') + 'RETURNING *'


      const response = await db.query(statement).then((result) => {
        if(result){ 
            
            return result.rows[0]
        }

      }, (err) => {
        console.log(new Error(err.message, err.stack))
      }). catch((err) => {
            throw new Error(err.message, err.stack )
      })
 
return response

    }

async getAllProducts () {
        const text = "SELECT * FROM PRODUCTS"

        const response = await db.query(text).then((result) => {
            if(result){
                return result.rows
            }
        }).catch((err) => {
            return new Error(err.message, err.stack)
        })

        return response
    }

    async updateProduct (field,value, id) {
    const text = `UPDATE products SET ${field} = $1 WHERE product_no = $2`   
   const values=[value, id]     
   console.log(value, id)
   try{
   const response=  await db.query(text, values)

   if(response.rowCount !== 1){
    throw new Error('404-Product Not Updated')
   }
   return response.rowCount
    } catch(err){
      throw new Error(err.message, err.stack)
    }
  }

    async getProductByID (productno, client) {
    const text ='SELECT * FROM products WHERE product_no = $1';
    const value = [productno]
try{
      const response = await client.query(text, value)
      return  response.rows[0]
    

    }catch(err) {
      return new Error(err.message, err.stack)
    }
    
  }

  async getProductsByCatergory(catergory){
    try {
        const text = 'SELECT * FROM products WHERE "catergory" = $1'
        const values = [catergory]
        const result = await db.query(text, values);
        if(result.rows?.length){
            return result.rows
        }
    } catch (err) {
        throw new Error(err.message, err.stack)
    }
  }
    
    order(orderQuan){
      this.total_Quantity = this.total_Quantity - orderQuan
      return this.total_Quantity
    }

   
}
