const express = require('express');
const router = express.Router(); 
const {userService} = require('../services');

module.exports = (app) => {
 //Mount user endpoint 
    app.use('/users', router)
  /**
     * @summary This endpoint gets all user records
     */
router.get('/', async (req, res, err) => {
    const response  = await userService.getAllUsers()
    if(err){
        console.error(err.message, err.stack)
    }
  return  res.sendStatus(202).json(response)
})

/**@summary This endpoint get user by user ID */

router.get('/:userID', (req, res, err) => {
    const response = userService.getUserByID(req.param.userID)
    if(err){
        console.error(err.message, err.stack)
    }
    res.sendStatus(200).json(response)
})




}