const express = require("express")
const app = express()
const path = require("path")
const {MongoClient} = require("mongodb")
const  mongo_url = "mongodb://localhost:27017"

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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

app.use(express.static(path.join(__dirname, "view-file")))

app.listen(3333, ()=>{
    console.log("Server Running")
})
