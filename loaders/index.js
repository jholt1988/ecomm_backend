const expressLoader = require('./express');
const databaseLoader = require('./database');
const swaggerLoader = require('./swagger')
const routeLoader = require('../routes');
const passportLoader  = require('./passport')

module.exports = async (app, port,) => {
    const expressApp = await expressLoader(app)
    const passport =  passportLoader(expressApp)
   await swaggerLoader(expressApp, port)
    await routeLoader(expressApp, passport)

    // app.use((err, req, res, next) =>{
    //     const {message, status} = err

    //     return res.status(status).send(message)
    // })
}