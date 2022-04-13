require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { addFile, getFile } = require('./controllers/jsonController')

const app = express()
const dbURI = `mongodb+srv://mypersonalusername:${process.env.MONGODB_PASSWORD}@cluster0.iv3yp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const connectToDB = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('conneted to db')
  } catch (error) {
    handleError(error)
  }
}

app.use(bodyParser.json())

app.get('/json-storage/*', async (req, res) => {
  let file = await getFile(req)
  res.json(file)
})

app.post('/json-storage/*', async (req, res) => {
  const file = await addFile(req)
  res.json(file)
})

app.listen(process.env.PORT, async () => {
  await connectToDB()
  console.log(`server has been started at port: ${process.env.PORT}`)
})
