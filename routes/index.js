const userRoute = require('./user');
const profileRoute = require('./profile');
const storeRoute = require('./store');
const cartRoute = require('./cart')

module.exports = (app, passport) => {
    userRoute(app);
    profileRoute(app);
    storeRoute(app);
    cartRoute(app);
}