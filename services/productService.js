const db  = require('../db');
const {productModel} = require('../models')
const productModelInsta = new productModel()

module.exports = class productService{

  async createProduct (productInfo) {
    try{
      const product = await productModelInsta.createProduct(productInfo)
      if(!product){
        throw new Error('404-ERROR-PRODUCT NOT CREATED')
      }
      return product 
    } catch (err){
      throw new Error(err.message, err.stack)
    }


    }


    async getAllProducts() {
        const text = "SELECT * FROM PRODUCTS"

        const response = await db.query(text).then((result) => {
            if(result){
                return result
            }
        }).catch((err) => {
            return new Error(err.message, err.stack)
        })

        return response
    }

    async updateProduct(info){
      try{
        const {field, value, productno} = info
        console.log(field, value, productno)
        const product = await productModelInsta.updateProduct(field, value, productno)
        
        return product
      } catch(err){
        throw new Error(err.message, err.stack)
      }
    }
    async getByID(productno){
       try {
        const response = await productModelInsta.getProductByID(productno)
        if(!response){
          next('404-PRODUCT NOT FOUND')
        }
        return response
       } catch (err) {
          throw new Error(err.message, err.stack)
       }
    }
  }
