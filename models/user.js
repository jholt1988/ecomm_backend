
const {v4:uuidv4} = require('uuid');
const bcrypt = require("bcryptjs");
const moment = require('moment');
const  db  = require('../db');
const pgp = require('pg-promise')({capSQL: true})
const format = require('pg-format')

module.exports = class User {
    constructor(data = {}){

        this.id = uuidv4()
        this.firstName= data.firstName ||""
        this.lastName = data.lastName || ""
        this.email = data.email || " "
        this.createDate = data.createDate || moment.utc().toISOString()
        this.modDate = moment.utc().toISOString()
        this.username = data.username || ""
        
        
    
    }
 


 /**
  * 
  * @param {Object} userInfo [User data]
  * @returns {Object|null} [Created User Record]  
  */

   async create(){
   
    try{
        
    const {...user} = this
        const statement = pgp.helpers.insert(user, null, 'users') + 'RETURNING *'
    const result = await db.query(statement)
    if(result.rows?.length){
        Object.assign(this, result.rows[0])
        return result.rows[0]
       }
    
    return null
    }catch(err){
      throw  Error(err.message, err.stack)
    }
}
 /**
  * LOOKS UP USER RECORD BY ID
  * @param {string} id [user ID]
  * @returns {object | null} [User Record]
  */
    async getUserByID(id){
        try{
     
            const text = 'SELECT * FROM users WHERE "id" = $1'
            const values = [id]
            
            const result = await db.query(text, values);
            
            if(result.rows?.length){
                return result.rows[0]
            }
            return null
        }catch(err){
            throw new Error(err.message, err.stack)
        }
    }
    /**
     * UPDATE USER RECORD
     * @param {object} data [{Field, value}] 
     * @returns 
     */
async updateUser(data, id){
    try{
    const {field, value} = data
    const text = format('UPDATE users SET %I=%L WHERE "id" = %L',field, value, id)
    console.log(text);
   const result = await db.query(text);
   if(result.rowCount > 0){
    console.log(result)
    return result.rows
   }
  return null
} catch(err){
    throw new Error(err.message, err.stack)
}
   }
   /**
    ENCRYPT USER PASSWORD
    * @param {string} password [user input]
    * @returns {string | err}  [hashed password]
    */

      hashPassword(password){
       bcrypt.genSalt(15,  (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if(err){
                    return err
                }
                const data = {id:this.id, password:hash}
                const condition = pgp.as.format(' WHERE id= ${id}', data) 
                const statement=  pgp.helpers.update(data, ['password'],'users') + condition

                   const result = await db.query(statement)

                   return result.rows

              
            })
            
        })
        }
    
    /**
     * compare user input password with hashed password
     * @param {stringi} password [user input] 
     * @returns {boolean} 
     */
     comparePassword(password, hashPassword){
        bcrypt.compare(password, hashPassword, (err, res) => {
            if(err){
                return console.error('Error', err.stack)
            }
         if(res === false){
                 console.log('password incorrect')
                 return res
            }

             console.log('password correct')
             return res
        })
    }
    
    
    async findByUsername(username){
        const text = 'SELECT * FROM users WHERE "username" = $1'
        const values = [username]
        try{
        const result = await db.query(text, values)

        
        if(result.rows){
           return result.rows[0]
        }
    } catch(err){
        throw err
    }
    }
 
}

