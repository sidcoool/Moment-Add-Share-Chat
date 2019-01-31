const {MongoClient} = require('mongodb')
const mongo_url = "mongodb://localhost:27017"

MongoClient.connect(mongo_url, (err, client)=>{
        const  momentDB = client.db("momentDB")
        const moments = momentDB.collection("moments")

        moments.insertOne({
            img: "yfuyfuf",
            user: "fewf",
            date: "qwc",
            place: "nytnyn",
            mom_text: "qwerty"
        }, (err, result)=>{
            if(err) console.error(err)
            else
            console.log(result)
        })

        client.close()
    })