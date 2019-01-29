const express = require("express")
const route = express.Router()
const path = require("path")
const User = require("../db").User
const {MongoClient} = require("mongodb")
const  mongo_url = "mongodb://localhost:27017"

let privateUser

route.get("/", (req, res) => {
    console.log("private here")
    if (req.user) {
        privateUser = req.user.username
        console.log("========================")
        console.log("After login", req.user.username)
        console.log("========================")
        const dirName = path.join(__dirname, "../views")
       res.sendFile("momentAdder.html" , {root: dirName}, (err) => {
       res.end();

    if (err) throw(err);
  });
    } 
    else {
        res.redirect('/login')
    }
})

route.get("/mom", (req, res)=>{
    MongoClient.connect(mongo_url, (err, client)=>{
        if(err) throw err;

        const  momentDB = client.db("momentDB")
        const moments = momentDB.collection("moments")
        console.log("========================")
        console.log(privateUser)
        console.log("========================")
        moments.find({
                user: privateUser
        }).toArray((err, data)=>{
            if(!err){
                res.send(data)
            }
        })  
        client.close()
    })
} )


route.post("/mom", (req, res)=>{
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

        moments.insertOne({
            user: privateUser,
            date: req.body.date,
            place: req.body.place,
            mom_text: req.body.mom_text
        }, (err, result)=>{
            if(err) console.log(err)
            else
            console.log(result)
        })

        client.close()
    })
})

module.exports = route
