const {Client} = require('pg');
const { db } = require('../config')
const client = new Client({
    user: db.user, 
    password:db.password, 
    host:db.host, 
    port:db.port, 
    database:db.database
})

module.exports = {
    client, 
    dbConnect: () => {return client
                .connect()
                .then(() => console.log('Database Connected'))
                .catch((err) => console.error('Connection Error', err.stack) )
    }
}