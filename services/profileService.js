const db = require('../db')
const { profileModel } = require('../models')

module.exports = {

    getUserProfileByID:  async (id) =>{


      const text = 'SELECT * FROM profile WHERE id = $1'
       const values=[id]
    
        
      const response = await db.query(text,values, function (err, res) {
                if (err) {
                    console.error(err.stack)
                } else {

                    console.log(res.rows[0])
                } 
                return res.rows[0]

            }
        ).then(result => {
            return result.rows
        }) 
      return response
        },

     

    


    updateProfile : async (prop, val, id) => {
        const text = `UPDATE profile SET ${prop} = $1 WHERE id= $2`
        const values = [ val, id]

       const response = await  db.query(text, values).then(res =>{
        return res.rows
       }).catch(err => {
         console.error(err.message, err.stack)
       })
       console.log(response)
        return response
    },

    createProfile: async (profile) => {
        const{address1, address2, city, state, userID,birthdate} = profile
        const text = 'INSERT INTO profile (address1, address2, city, state, userID, birthDate) VALUES ($1, $2, $3, $4, $5,$6)';
        const values =  [address1, address2, city, state, userID, birthdate]
        
        const response = await db.query(text, values).then(res => {
            return res.rows
        }).catch(err => {
            return new Error(err.message, err.stack)
        })
        return response
    }
}

