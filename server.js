const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

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


const usersController = require('./controllers/users.js')
app.use('/users', usersController)

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)


app.get('/', (req, res) => {
  res.render('home.ejs', {currentUser: req.session.currentUser })
})


app.listen(PORT, () => {
    console.log('listening on port' , PORT)
});
