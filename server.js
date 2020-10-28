const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(methodOverride('_method'))

mongoose.connect(mongodbURI,
  {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
  }
)
mongoose.connection.once('open', ()=> {
  console.log('connected to mongo')
})

const groceriesController = require('./controllers/groceries.js')
app.use('/groceries', groceriesController)

app.listen(PORT, () => {
    console.log('listening on port' , PORT)
});
