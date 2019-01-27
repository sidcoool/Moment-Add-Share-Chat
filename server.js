const express = require("express")
const app = express()
const path = require("path")
const User = require("./db").User
const session = require('express-session')
const passport = require('./passport').passport
const {MongoClient} = require("mongodb")
const  mongo_url = "mongodb://localhost:27017"

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    secret: "dont tell this to any one"
}))

app.use(passport.initialize())
app.use(passport.session())

app.post("/signup", (req, res)=>{
    User.create({
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        username: req.body.username,
        password: req.body.password
    }).then(user => {
        res.redirect("/momAdder")
    }).catch(err => {
        console.error(err)
    })
})

app.post("/login", passport.authenticate("local", {
    failureRedirect: "/index",
    successRedirect: "/"
}))

app.get("/mom-get", (req, res)=>{
    MongoClient.connect(mongo_url, (err, client)=>{
        if(err) throw err;

        const  momentDB = client.db("momentDB")
        const moments = momentDB.collection("moments")

        moments.find({}).toArray((err, data)=>{
            if(!err){
                res.send(data)
            }
        })

        client.close()
    })
} )


app.post("/mom-post", (req, res)=>{
    MongoClient.connect(mongo_url, (err, client)=>{
        if(err){
         res.send({
            success: false,
            message: `Could not connect to Database 
            ${err}`
        })
    }
        else{
         res.send({
            success: true,
            message: "Could  connect to Database"
        })
    }

        const  momentDB = client.db("momentDB")
        const moments = momentDB.collection("moments")

        moments.insertOne(req.body, (err, result)=>{
            if(err) console.log(err)
            else
            console.log(result)
        })

        client.close()
    })
})

app.get("/", (req, res) => {
    if (req.user) {
        const dirName = path.join(__dirname,"view-file")
       res.sendFile("momentAdder.html" , {root: dirName}, (err) => {
       res.end();

    if (err) throw(err);
  });
    } 
    else {
        res.redirect('/index')
    }
})

app.use("/signup", express.static(path.join(__dirname, "view-file/signup.html")))
app.use("/index", express.static(path.join(__dirname, "view-file/index.html")))
app.use(express.static(path.join(__dirname, "view-file")))

app.listen(3333, ()=>{
    console.log("Server Running")
})
