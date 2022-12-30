const express = require('express');
const router = express.Router(); 
const {userService} = require('../services');

module.exports = (app) => {
 //Mount user endpoint 
    app.use('/users', router)
  /**
     * @summary This endpoint gets all user records
     */
router.get('/allUsers', async  (req, res, err) => {
    const response  =  await userService.getAllUsers()
    if(err){
        console.error(err.message, err.stack)
    }
  return  res.status(200).send(response)
})

/**@summary This endpoint get user by user ID */

router.get('/:id', async (req, res, next) => {
    const{id} = req.params
    const response = await userService.getUserByID(id)
    if (response){
    res.send(response)
    next()
    }
    

})




}