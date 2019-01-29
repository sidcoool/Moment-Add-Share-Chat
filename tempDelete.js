const {MongoClient} = require('mongodb')
const MONGO_URL = "mongodb://localhost:27017"

MongoClient.connect(MONGO_URL, (err, client) => {
  if (err) throw err;

  const  momentDB = client.db("momentDB")
  const moments = momentDB.collection("moments")

  moments.deleteMany({}, (err, results) => {
    console.log(results)
  })
})