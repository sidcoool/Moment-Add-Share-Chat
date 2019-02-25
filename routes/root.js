const express = require("express")
const route = express.Router()
const path = require("path")
const User = require("../db").User
const session = require('express-session')
const flash = require("connect-flash")
const passport = require("../passport").passport

route.use(flash())

route.post("/signup", (req, res)=>{
    User.create({
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        username: req.body.username,
        password: req.body.password
    }).then(user => {
        res.redirect("/login")
    }).catch(err => {
        console.error(err)
    })
})

route.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/private",
    failureFlash: true
}))

route.get("/login", (req, res)=>{
        const dirName = path.join(__dirname, "../views")
       res.sendFile("index.html" , {root: dirName}, (err) => {
       res.end();
    if (err) throw(err);
  })
})



module.exports = route
