const { query } = require("express");
const express = require("express");
const db = require("../db");
const { profile } = require("../models/profile");
const router = express.Router();
const {profileService} = require('../services');

module.exports = (app) => {
    app.use('/profile', router)
            
    router.get('/:id/',async  (req, res, done) => {
      const {id} = req.params

    const response =await  profileService.getUserProfileByID(id).then(res => {
      return res
    }).catch(err => {
      throw new Error(err.message, err.stack)
    })
    
      res.status(200).send(response)
      done()
    
      

     } )


router.put('/:id', async (req, res, done) => {
   const {id} = req.params
   const {prop, val} = req.body

   const response = await profileService.updateProfile(prop, val, id).then(result => {
      if(result){
         return result
      }
   }).catch(err => {
      console.error(err.message, err.stack)
   })
     res.status(202).send(response)
     done()

})


    }
