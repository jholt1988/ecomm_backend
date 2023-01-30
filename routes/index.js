const userRoute = require('./user');
const profileRoute = require('./profile');
const storeRoute = require('./store');
const cartRoute = require('./cart')
const ordersRouter = require('./orders')
const authRouter = require('./auth')

module.exports = (app, passport) => {
    userRoute(app);
    profileRoute(app);
    storeRoute(app);
    cartRoute(app);
    ordersRouter(app);
    authRouter(app, passport)

}