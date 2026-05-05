const mongoose = require('mongoose')
const Note = require('./models/note')

const password = process.argv[2]

if (!password) {
  console.log('Usage: node mongo.js <password>')
  process.exit(1)
}

const url = `mongodb://cawlon:${password}@ac-wghbgrm-shard-00-00.9caici4.mongodb.net:27017,ac-wghbgrm-shard-00-01.9caici4.mongodb.net:27017,ac-wghbgrm-shard-00-02.9caici4.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-sm1n4b-shard-0&authSource=admin&appName=Cluster0`

mongoose.connect(url)
  .then(async () => {
    const notes = await Note.find({})
    notes.forEach(note => console.log(note))
    mongoose.connection.close()
  })
  .catch(error => console.log(error.message))