
const {v4: uuidv4} = require('uuid');
const { user } = require('./user');
const {profileService, updateProfile} = require('../services/profileService')

class profile extends user{
    constructor(address1, address2, city, state, zip, birthdate){
        super(), 
        this.address1=address1
        this.address2=address2
        this.city=city 
        this.state=state
        this.zip=zip
        this.birthdate=birthdate
        this.profileID=uuidv4();
    }
  updateUserProfile = (prop, val) => {
    updateProfile

  }

}
module.exports = {
    profile

}