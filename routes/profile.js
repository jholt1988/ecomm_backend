const { query } = require("express");
const express = require("express");
const db = require("../db");
const router = express.Router();
const {profileService} = require('../services');
const profileServiceInsta = new profileService();

module.exports = (app) => {
    app.use('/profile', router)
            
    router.get('/:id/',async  (req, res, next) => {
  try{
    const response =await  profileServiceInsta.get(req.params)
    if(!response){
      next(new Error())
    }
    res.send(response)
  } catch(err){
    next(new Error(err.message, err.stack))
  }

}
    )

router.put('/:id', async (req, res, next) => {
   const {id} = req.params
   const {field, value} = req.body

   const response = await profileServiceInsta.update({field:field, value:value}, id).then(result => {
      if(result){
        res.status(202).send(response)
      }
   }).catch(err => {
      console.error(err.message, err.stack)
   })
     
     next()

})


    }
