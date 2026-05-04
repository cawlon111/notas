const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb://cawlon:${password}@ac-wghbgrm-shard-00-00.9caici4.mongodb.net:27017,ac-wghbgrm-shard-00-01.9caici4.mongodb.net:27017,ac-wghbgrm-shard-00-02.9caici4.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-sm1n4b-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery', false)

// Schema
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// Model
const Note = mongoose.model('Note', noteSchema)

// Conexión
mongoose.connect(url)

// Obtener todas las notas
Note.find({}).then(result => {
  console.log('notes:')

  result.forEach(note => {
    console.log(note)
  })

  mongoose.connection.close()
})