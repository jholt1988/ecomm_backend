const db = require('../db')
const { profileModel } = require('../models')

module.exports = {

    getUserProfileUserID :  (userID) =>{
         const text = 'SELECT * FROM profile WHERE userID = $1'
         const values = [userID]

         db.query(text, values, (err, res) => {
        if (err) {
            console.error(err.message, err.stack)
        }
      console.log(res.rows)
      return res.rows
    
    })


},

    updateProfile : (prop, val, id) => {
        const text = "UPDATE TABLE profile SET $1 = $2 WHERE id=3"
        const values = [prop, val, id]

        db.query(text, values, (err, res) => {

            if (err) {
                console.error(err.message, err.stack)
            }
            if (res) {
                console.log(res.rows)
                return res.rows
            }


        })
    }

}
