const expressLoader = require('./express');
const databaseLoader = require('./database');
const swaggerLoader = require('./swagger')
const routeLoader = require('../routes')

module.exports = async (app, port) => {
    const expressApp = await expressLoader(app)
    // databaseLoader.dbConnect()
    swaggerLoader(expressApp, port)
    routeLoader(app)
return app
}