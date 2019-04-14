const express = require("express")
const route = express.Router()
const path = require("path")
const User = require("../db").User
const passport = require("../passport").passport
const bcrypt = require("bcrypt")


route.post("/signup", (req, res)=>{
    User.findAll({
        where:{
            username: req.body.username
        }
    }).then(data => {
       
        if(data.length !== 0)
        res.redirect("/signup.html")
        else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                User.create({
                    Fname: req.body.Fname,
                    Lname: req.body.Lname,
                    username: req.body.username,
                    password: hash
                }).then(user => {
                    res.redirect("/login")
                }).catch(err => {
                    console.error(err)
                })
              })
        }

    }).catch(err => console.error(err))

    
})

route.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/private",
}))

route.get("/login", (req, res)=>{
        const dirName = path.join(__dirname, "../views")
       res.sendFile("index.html" , {root: dirName}, (err) => {
       res.end();
    if (err) throw(err);
  })
})

module.exports = route
