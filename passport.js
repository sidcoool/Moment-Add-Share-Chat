const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("./db").User

passport.serializeUser((user, done)=>{
    done(null, user.username)
})

passport.deserializeUser((userName, done)=>{
    User.findOne({
        where: {
            username: userName
        }
    }).then(user => {
        if(!user)
        return done(new Error("No such user"))
        else
        return done(null, user)
    }).catch((err) => {
    done(err)
 })
})

passport.use(new LocalStrategy((userName, password, done)=>{
    User.findOne({
        where: {
            username: userName
        }
    }).then((user)=>{

        if(!user)
        return done(null, false, {message: "No such User"})

        if(user.password !==password){
            return done(null, false, {message: "Wrong password"})
        }
        return done(null, user)
    }).catch((err) => {
        return done(err)
    })
}))

module.exports = {
    passport
}