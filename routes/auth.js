const Express = require('express');
const router = Express.Router();
const {authService} = require('../services')
const authServiceInsta = new authService()

module.exports = (app, passport) => {
    app.use('/auth', router)

    router.post('/register', async(req, res, next) => {
        

        try {
            const data = req.body
           const response = await authServiceInsta.register(data) 
           console.log(data)
           res.status(202).send(response)
           next()
        } catch (err) {

            next(err)
        }
    })

    router.post('/login',passport.authenticate('local'), async (req, res, next) => {
        try{
            const {username, password}= req.body

            const response = await authServiceInsta.login({username, password})

            res.status(200).send(response)
            next()
        }catch(err){
            next(err)
        }

    })
}