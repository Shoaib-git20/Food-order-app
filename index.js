import  express from 'express'
import mongoose from 'mongoose'
import customer from './Routes/customers.js'
import admin from './Routes/admin.js'
import data from './models/database.js'

const app = express();

app.use(express.json())

app.get('/', async (req,res)=>{
    const Data =  await data.find({})
    res.status(201).json({Data})
})

app.use('/admin',admin)
app.use('/customer',customer)

const PORT = 5000
const url = "mongodb+srv://admin:admin@food-data.bjepev6.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(url).then(()=>
      app.listen(PORT,console.log("server is running on port 5000"))  
).catch((err)=> console.log(err.message))