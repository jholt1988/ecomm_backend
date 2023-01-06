const express = require('express');
const router = express.Router(); 
const {userService} = require('../services');
const userServiceInsta = new userService()
module.exports = (app) => {
 //Mount user endpoint 
    app.use('/users', router)
  /**
     * @summary ENDPOINT RETRIVES ALL USER RECORDS
     */
router.get('/allUsers', async  (req, res, err) => {
    const response  =  await userServiceInsta.getAllUsers()
    if(err){
        console.error(err.message, err.stack)
    }
  return  res.status(200).send(response)
})

/**@summary ENDPOINT RETRIEVES USER RECORD BY USER ID**/

router.get('/:id', async (req, res, next) => {
    
    try{
    const response = await userServiceInsta.getUserByID(req.params)
    console.log(response)
    if (response){
    res.send(response)
    
    next()
    }
  } catch(err){
    next(err.message)
  }
    

})

/**
 * @summary ENDPOINT MODIFIES USER RECORD
 */

router.put('/:id', async (req, res, next) => {
    const {id} = req.params
  try{
  const response = await userServiceInsta.updateUser(req.body, id)
  console.log(response)
  if (response){
  res.send(response)
  
  next()
  }
} catch(err){
  next(err.message)
}
  

})

router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    console.log(data)
    const response = await userServiceInsta.create(data);
    if(!response){
      next(new Error())
    }
   res.send(response)
   next()
  } catch (err) {
    next(new Error(err.message, err.stack))
  }
})


}