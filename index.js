
const Express = require('express');
const { dbConnect, client } = require('./loaders/database');
``
const app = Express();
const dotenv = require('dotenv').config()
const loaders = require('./loaders')
const { updateProfile } = require('./services/profileService');
const PORT= process.env.PORT;


function initializeServer( ){
   loaders(app, PORT)
   
    app.listen(PORT, () => {
        console.log(`Server is listening on PORT: ${PORT}`)
    });
 
    
}

initializeServer();