const passport = require('passport');
const  User = require('../models/user');
const { userService } = require('../services');
const LocalStrategy = require('passport-local').Strategy
const {authService} = require('../services')
const authServiceInsta = new authService()
const userServiceInsta = new userService

module.exports = (app) => {
    app.use(passport.initialize())
    app.use(passport.session())
    

    passport.serializeUser((user, done) => {
       done(null, user.id)
    })
    passport.deserializeUser(async (id, done) =>{
      await userServiceInsta.getUserByID(id).then(user =>{
        done(null, user)
      }
 )})
     
    passport.use(new LocalStrategy(
        async function(username,password, done){
          try {
            const user = await authServiceInsta.login({username, password})
            if(!user){
             return  done(null, false)
            }
           return done(null, user)
          } catch (err) {
            return done(err)
          }

    
        }))
    return passport

}