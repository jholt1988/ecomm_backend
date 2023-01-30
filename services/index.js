const userService = require('./userService');
const profileService = require('./profileService');
const productService = require('./productService');
const cartService =  require('./cartService')
const orderService = require('./orderService')
const authService = require('./authService')
module.exports = {
 userService: userService,
 profileService: profileService, 
 productService: productService,
 cartService: cartService, 
 orderService: orderService,
 authService: authService,

}