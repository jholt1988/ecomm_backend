'use strict';

const path = require('node:path');
const fs = require('node:fs');
const yaml = require('js-yaml');
const swaggerUI = require('swagger-ui-express')





const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(__dirname, '../api/openapi.yaml'), 'utf8'))



// Initialize the Swagger middleware
// http.createServer(app).listen(serverPort, function () {
//     console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
// });

module.exports = (app, port) => {
    app.use('/docs',swaggerUI.serve, swaggerUI.setup(swaggerDocument))
    console.log('Swagger-ui is available on http://localhost:%d/docs',port)  
    return app
}
