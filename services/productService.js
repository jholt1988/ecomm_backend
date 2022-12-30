const db  = require('../db');
const {productModel} = require('../models')

module.exports = {

    createProduct: async (productInfo) => {
        const {product_no, product_name, product_description, product_vendor, price, total_quantity, quantity_bysize} = productInfo
        const product = new productModel(product_no , product_name, product_description, product_vendor, price, total_quantity, quantity_bysize)
        
        let valueArr = []
        let fieldsArr = []
         Object.keys(product).map((prop) => {
            
            fieldsArr.push(prop)
        
            })
        
           const fieldString = fieldsArr.join(',')
    
        for(let i=1 ; i < fieldsArr.length+1; i++){
               const key = fieldsArr[i-1]
               const paramSub = {
                key: key, 
                value: `$${i}`
               }
               valueArr.push(paramSub.value)
            
        }
          
        

        const text = `INSERT INTO products(${fieldString}) VALUES(${valueArr})`
        
        
        const queryValues = Object.values(product)


      const response = await db.query(text, queryValues).then((result) => {
        if(result){ 
            
            return result.rowCount
        }

      }, (err) => {
        console.log(new Error(err.message, err.stack))
      }). catch((err) => {
            throw new Error(err.message, err.stack )
      })
 
return response

    },


    getAllProducts: async () => {
        const text = "SELECT * FROM PRODUCTS"

        const response = await db.query(text).then((result) => {
            if(result){
                return result
            }
        }).catch((err) => {
            return new Error(err.message, err.stack)
        })

        return response
    },

    updateProduct: async (field,value, id) => {
        console.log(field)
    const text = `UPDATE products SET ${field} = $1 WHERE product_no = $2`   
   const values=[value, id]     
   console.log(value, id)
   const response=  await db.query(text, values).then((result) => {
        return result.rowCount 
      }).then((err) => {
        return new Error(err.message, err.stack)
      })
      return response
    },
  getProductByID: async(productNo) => {
    const text ='SELECT * FROM products WHERE product_no = $1';
    const value = [productNo]

    const response = await db.query(text, value).then((result) => {
      return result.rows 
    }).catch((err) => {
      return new Error(err.message, err.stack)
    })
      return response
  }
}
