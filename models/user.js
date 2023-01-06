
const {v4:uuidv4} = require('uuid');
const bcrypt = require("bcryptjs");
const moment = require('moment');
const  db  = require('../db');
const pgp = require('pg-promise')({capSQL: true})
const format = require('pg-format')

module.exports = class user {
    contructor(data = {}){
        this.id = uuidv4()
        this.firstName= data.firstName
        this.lastName = data.lastName
        this.email = data.email
        this.createDate = data.createDate || moment.utc().toISOString()
        this.modDate = moment.utc().toISOString()
        this.userName = data.userName
        this.password = this.hashPassword(data.password)

    }
    get id(){
        return uuidv4()
    }
 
    setId(newId){
    
        this.id = uuidv4()
    }
    get createDate(){
        return  moment.utc().toISOString()
    }

    get modDate(){
        return  moment.utc().toISOString()
    }
 /**
  * 
  * @param {Object} userInfo [User data]
  * @returns {Object|null} [Created User Record]  
  */

   async create(userInfo){
    
    try{
        const {firstName, lastName, password, email, username} = userInfo
       const  id = this.id
       const createDate = this.createDate
       const modDate = this.modDate
        const data = {id, firstName, lastName, password, email,username,createDate, modDate,} 
        const statement = pgp.helpers.insert(data,null, 'users') + 'RETURNING *'
       // const {firstName, lastName, password, email, username, createDate, modDate} = userInfo
///const text = 'INSERT INTO users ( "id", "firstName", "lastName", "password", "email", "username", "createDate", "modDate") VALUES($1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING *'
   //   const values = [, firstName, lastName, password, email, username, this.createDate, this.modDate]
    const result =await db.query(statement);
    if(result.rows?.length){
        return result.rows[0]
    }
    return null
    }catch(err){
      throw new Error(err.message, err.stack)
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
                return result.rows;
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
    ENCRYPT USER  
    * @param {string} password [user input]
    * @returns {string | err}  [hashed password]
    */
    hashPassword(password){
        bcrypt.genSalt(15, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) =>{
                this.password= hash
            })
        })
    }
    /**
     * compare user input password with hashed password
     * @param {string} password [user input] 
     * @returns {boolean} 
     */
    comparePassword(password){
        bcrypt.compare(password, this.password, (err, res) => {
            if(err){
                return console.error('Error', err.stack)
            }
            else if(!res){
                return console.log('password incorrect')
            }
            return console.log('password correct')
        })
    }
   

}

