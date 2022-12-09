const expressLoader = require('./express');
const databaseLoader = require('./database');
const swaggerLoader = require('./swagger')

module.exports = async (app, port) => {
    const expressApp = await expressLoader(app)
    // databaseLoader.dbConnect()
    swaggerLoader(expressApp, port)
return app
}