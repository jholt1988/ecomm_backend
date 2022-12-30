const user = require('./userService');
const profile = require('./profileService');
const products = require('./productService');
const cart =  require('./cartService')
module.exports = {
 userService: user,
 profileService: profile, 
 productService: products,
 cartService: cart

}