const {userModel, profileModel} = require('../models')
const bcrypt = require("bcryptjs")

const userModelInsta = new userModel()
const profileModelInsta  = new profileModel()
module.exports = class  authService{
    async register(data){
        const {username,email, firstName,lastName, password, address1, address2, city, state, zip, birthdate } = data
         console.log(data)
        try{
            const user = await userModelInsta.findByUsername(username)

            if(user){
                throw new Error('500-Username already taken')
            }
             
            const User = new userModel({username:username, email:email, firstName:firstName, lastName:lastName})

          
        
         

          await  User.create()
           User.hashPassword(password)
            
    const Profile = new profileModel({address1:address1, address2:address2, city:city, state:state, zip:zip, birthdate:birthdate, userID:User.id})

     await Profile.createProfile()

   return Profile, User
           
            
            } catch(err){
                throw err
            }
    }
    async login(data){
        const {username,password} = data

        try{
            const user = await userModelInsta.findByUsername(username)

            if(!user){
                throw new Error('User Not Found')
            }
             
            
            if(userModelInsta.comparePassword(password, user.password)=== false){
                throw new Error("Password Incorrect")
            }

            return user
        } catch(err){
        throw err
        }
    }
}