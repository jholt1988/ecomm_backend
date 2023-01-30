const Express = require('express');
const {orderService} = require('../services');

const router = Express.Router()
const orderServiceInsta = new orderService()

module.exports = (app) =>{
    app.use('/orders', router)

    router.get('/:profileID',async (req, res, next) => {
        const {profileID} = req.params
        try {
            const response = await orderServiceInsta.getOrdersByProfile(profileID)
            if(response){
                res.status(200).send(response)
                next()
            }
            
        } catch (err) {
            next()
        }
    })
}