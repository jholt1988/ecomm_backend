const {user} = require('./user');
const {profile} = require('./profile');
const {product} = require('./product');
const {cart} = require('./cart');
const {cartItem} = require('./cartItem');
const {order} = require('./order');
const {delivery} = require('./delivery');

module.exports={
    userModel:  user ,
    profileModel: profile ,
    productModel:  product ,
    cartModel:  cart ,
    cartItemModel:  cartItem , 
    orderModel:  order ,
    deliveryModel: delivery
}