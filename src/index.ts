require('dotenv').config()
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { addFile, getFile }  from './controllers/jsonController'
import {Request} from './models/interfaces'

const app = express()
const dbURI = `mongodb+srv://mypersonalusername:${process.env.MONGODB_PASSWORD}@cluster0.iv3yp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const connectToDB = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('conneted to db')
  } catch (error) {
   console.log(error)
  }
}

app.use(bodyParser.json())

app.get('/', async (req:Request, res:any) => {
  res.json('Please specify your desired route')
})

app.get('/*', async (req:Request, res:any) => {
  let file = await getFile(req)
  res.json(file)
})

app.post('/*', async (req:Request, res:any) => {
  const file = await addFile(req)
  res.json(file)
})

app.listen(process.env.PORT, async () => {
  await connectToDB()
  console.log(`server has been started at port: ${process.env.PORT}`)
})
