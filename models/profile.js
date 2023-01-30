
const {v4: uuidv4} = require('uuid');
const format = require('pg-format');
const  db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({capSQL: true});

module.exports = class profile{
    constructor(data= {}){
      this.id=uuidv4()  
      this.address1=data.address1 || " "
        this.address2=data.address2 || ""
        this.city=data.city|| ""
        this.state=data.state || ""
        this.zip=data.zip || ""
        this.birthdate=moment(data.birthdate).toISOString() || ""
        
        this.userID = data.userID|| ""
    }

    

    /**
     * @param {string} userID [userID ]
     * @returns {object| null} [Profile Record]
     */
  async createProfile(){
    
    
     try {
      const {...profile} = this
      const statement = pgp.helpers.insert(profile, null, "profile") + 'RETURNING *'
      const result = await db.query(statement)
      
      if(result.rows?.length){
        Object.assign(this,result.rows[0])
        return result.rows[0]
      }
  
     } catch (err) {
      throw new Error(err.message, err.stack)
    }
  }

  /**
    * UPDATE PROFILE RECORD
    * @param {object} data [{Field, value}] 
    * @returns 
    */
   async updateProfile(field,value, id){
    
    
    try{
    const text = format('UPDATE profile SET %I=%L WHERE "id" = %L RETURNING *',field, value, id)
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
  

async getUserProfileByID(userID){
  try {
    console.log(typeof(userID))
    const text =
    `SELECT * FROM profile                                                                                                                                                                                  
                  WHERE "userID" = $1`
    const values= [ userID ];
    console.log(values)
    const result = await db.query(text,values);

    if(result.rows?.length){
      return result.rows[0]
    }
    
  } catch (err) {
    throw new Error(err.message, err.stack)
  }
  }
}
