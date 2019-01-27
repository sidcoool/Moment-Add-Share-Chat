const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("./db").User

passport.serializeUser((user, done)=>{
    done(null, user.username)
})

passport.deserializeUser((user, done)=>{
    User.findOne({
        username: user
    }).then(user => {
        if(!user)
        return done(new Error("No such user"))
        else
        return done(null, user)
    }).catch((err) => {
    done(err)
 })
})

passport.use(new LocalStrategy((username, password, done)=>{
    User.findOne({
        where: {
            username: username
        }
    }).then((user)=>{
        if(!user)
        return done(null, false, {message: "No such User"})

        if(user.password !==password){
            return done(null, false, {meassage: "Wrong password"})
        }
        return done(null, user)
    }).catch((err) => {
        return done(err)
    })
}))

module.exports = {
    passport
}