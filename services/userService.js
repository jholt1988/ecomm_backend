const pg = require("pg");
const db = require('../db')

module.exports = {
    /**
     * Get all users 
     * @RETURNS A json list of users
     */

   getAllUsers: async ()=> {
   const response = await  db.query("SELECT * FROM users").then(res => {
      if(res){
        return res.rows
      }
      return 
   }).catch(err => {
      return new Error(err.message, err.stack)
   })
         return response   
        
    }, 

    getUserByID:async (id) =>{ 
        const text = "SELECT * FROM users WHERE id = $1"
        const values = [id]
        
      const response =  await  db.query(text, values) 
       .then((res) =>{

            return res.rows[0]
        }
    ).catch(err => {
        if(err){
            console.log(err.message, err.stack)
        }
    })
    
    return response
}
}