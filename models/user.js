
const {v4:uuidv4} = require('uuid');
const bcrypt = require("bcryptjs")

class user {
    contructor(firstName, lastName, email, userName){
        this.id= uuidv4()
        this.firstName= firstName
        this.lastName = lastName
        this.email = email
        this.createDate = this.createDate()
        this.userName = userName

    }
    /**
     * @param {number} date
     */
    set modDate(date){
        date= Date.now();
        return date
    }

    createDate(){
        if(this.createDate){
            return this.createDate
        }
        return Date.now()
    }

    hashPassword(password){
        bcrypt.genSalt(15, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) =>{
                this.password= hash
            })
        })
    }
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
   
    update(prop, val){
        this[prop] = val
        return this.modDate = Date.now();

    }

}

module.exports={
    user
}