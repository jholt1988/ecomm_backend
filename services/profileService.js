const db = require('../db')
const {profileModel, userModel} = require('../models')
const userModelInsta = new userModel
const profileInsta = new profileModel()
module.exports = class profileService {
 async get(id){
   
 
   try{
    //Check to see if profile exists
    
    const profile =  await profileInsta.getUserProfileByID(id)

    //if profile not found reject
    if(!profile){
        throw new Error('404-ERROR PROFILE NOT FOUND')
    }
    return profile
   }catch(err){
    throw new Error(err.message, err.stack )
   }
 }
  
 async post(data){

 try {
  const profile = await profileInsta.createProfile(data)
  if(!profile){
     throw new Error('404-ERROR-Profile Not Created')
  }
  return profile
 } catch (err) {
  throw new Error(err.message, err.stack)
 }

 }

async update(data, id){
  const {field, value} = data
try {
  const profile = profileInsta.updateProfile(field, value, id)
  if(!profile){
    throw new Error('404-ERROR- PROFILE NOT UPDATED')
  }
  return profile
} catch (err) {
  throw new Error(err.message, err.stack)
}
 }

 async create(data){
  const{address1, address2, city, state, zip, birthdate, userID} = data
  try {
    const profile = new profileModel({address1, address2, city, state, zip, birthdate, userID})

   const userProfile =  await profile.createProfile()

   return userProfile
    
  } catch (err) {
    throw err
  }
 }

}

