const {MongoClient} = require('mongodb')
const mongo_url = "mongodb://localhost:27017"

MongoClient.connect(mongo_url, (err, client)=>{
    if(err) throw err;

    const  momentDB = client.db("momentDB")
    const moments = momentDB.collection("moments")
    moments.find({ }).toArray((err, data)=>{
        if(err)
            console.error(err)
            else
                console.log(data)  
    })  
    client.close()
})