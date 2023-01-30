const { db } = require('../config')
const {orderModel} = require('../models')
const orderModelInsta = new orderModel()


module.exports = class orderService {

    async create(data){
        const {profileID} = data

        try{
            const Order = new orderModel()
            const order = await Order.create({profileID:profileID})

            return order 
        }catch(err){
            throw new Error(err.message, err.stack)
        }
    }

    async getOrdersByProfile(profileID){
        try{
            const orders = await orderModelInsta.getAllUserOrders(profileID)
            if(orders){
                return orders.rows
            }
            return null
        } catch(err){
            throw new Error(err.message, err.stack)
        }

    }

}