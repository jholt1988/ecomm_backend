const userRoute = require('./user');

module.exports = (app, passport) => {
    userRoute(app);
}