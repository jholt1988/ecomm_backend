const { Pool } = require("pg");
const {db} = require('../config')
const pool = new Pool({
  user: db.user, 
  password:db.password, 
  host:db.host, 
  port:db.port, 
  database:db.database
});


module.exports ={

    query: async (text, params) => {
      try{
        const start = Date.now()
        const res = await  pool.query(text, params)
        const duration = Date.now() - start
            console.log('executed query', {text, duration, rows: res.rowCount})
          
            return res
          
        } catch (err){
          throw new Error(err.message, err.stack)
        }
      
      }
    ,

    getClient: (callback) => {
        pool.connect((err,client, done) => {
          const query = client.query
     
          // monkey patch the query method to keep track of the last query executed
           client.query = (...args) => {
            client.lastQuery = args
            return query.apply(client, args)
          }
     
          // set a timeout of 5 seconds, after which we will log this client's last query
          const timeout = setTimeout(() => {
            console.error('A client has been checked out for more than 5 seconds!')
            console.error(`The last executed query on this client was: ${client.lastQuery}`)
          }, 5000)
     
          const release = (err) => {
            // call the actual 'done' method, returning this client to the pool
            done(err)
     
            // clear our timeout
            clearTimeout(timeout)
     
            // set the query method back to its old un-monkey-patched version
            client.query = query
          }
     
          callback(err, client, release)
        })
      },


}