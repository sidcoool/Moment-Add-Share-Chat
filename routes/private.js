const express = require("express")
const route = express.Router()
const path = require("path")
const multer = require("multer")
const upload = multer({ dest: './uploads/' })
const {MongoClient} = require("mongodb")
const  mongo_url = "mongodb://localhost:27017"
const fs = require('fs')

let privateUser

route.get("/", (req, res) => {
    console.log("private here")
    if (req.user) {
        privateUser = req.user.username
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

route.get("/logout", (req, res)=>{
    console.log("inside logout")
    req.session.destroy(function (err) {
        privateUser = ""
          });
})


route.get("/username", (req,res)=>{
    res.send(privateUser)
})

route.get("/mom", (req, res)=>{
    MongoClient.connect(mongo_url, (err, client)=>{
        if(err) throw err;

        const  momentDB = client.db("momentDB")
        const moments = momentDB.collection("moments")
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


route.post("/mom", upload.single('picture'), (req, res) => {

let filename = "sid_pic.jpg"
if (req.file) {
    console.log("Uploading file...")
    filename = req.file.filename + ".jpg"

    fs.rename(`/home/sid/Desktop/Moment Adder and Chatting Platform/uploads/${req.file.filename}`, 
    `/home/sid/Desktop/Moment Adder and Chatting Platform/uploads/${req.file.filename}.jpg`,(err)=>{
        if(err)
        console.error(err)
    })
}

    MongoClient.connect(mongo_url, (err, client)=>{
        const  momentDB = client.db("momentDB")
        const moments = momentDB.collection("moments")

        moments.insertOne({
            img: filename,
            user: privateUser,
            date: req.body.date,
            place: req.body.place,
            mom_text: req.body.momentText
        }, (err, result)=>{
            if(err) console.error(err)
            else
            console.log(result)
        })

        client.close()
    })
})

module.exports = route

