const pg = require("pg");
const db = require('../db')

module.exports = {
    /**
     * Get all users 
     * @RETURNS A json list of users
     */

   getAllUsers: () => db.query("SELECT * FROM users", (err,res)=>{
        if(err){
            console.error(err.message, err.stack)
        }
        if(res){
            console.log(res.rows[0])
            return res.rows[0]
        }
    }), 

    getUserByID: (id) =>{ 
        const text = "SELECT * FROM users WHERE id=$1"
        const values = [id]
        
        db.query(text, values, (err,res) =>{
        if(err){
            console.log(err.message, err.stack)
        }
        if(res){
            console.log(res.rows[0])
            return res.rows[0]
        }
    })
    
}
}