const pg = require("pg");
const db = require('../db');
const {userModel} = require('../models');
const {profileModel}= require('../models')

const userModelInsta =  new userModel()
const profileModelInsta = new profileModel()

module.exports = class  userService {
    /**
     * GET USER RECORD BY ID
     * @param {string} data [User ID] 
     * @returns {Object | null} [User Record]
     */

 async getUserByID(data){
    const {id} = data;
try{
    //CHECK: Does User Exist
   const user = await userModelInsta.getUserByID(id)

   //RESUlT-User Doesn't Exist-REJECT

   if(!user){
    throw new Error('404-User Not Found')
   }

   return user
 } catch(err){
    throw err
 }
 }

 async create(data){
    
    try{
    
        const user = await userModelInsta.create(data);
        const newProfile = new profileModel()
        const profile = await newProfile.create({userID:user.id, ...profile})

        if(!user || !profile){
            throw new Error('404 ERROR- USER NOT CREATED')
        
        }
    
        return{ user, profile}
    } catch(err){
        throw new Error(err.message, err.stack)
    }
 }

 async updateUser(data, id){
    try{
        const user = await userModelInsta.updateUser(data, id);
        if(!user){
            throw new Error('404-User Not Updated')
        }
        return user
    } catch(err){
        throw new Error(err.message, err.stack)
    }
 }

}