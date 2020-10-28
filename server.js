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

// mongoose.connect(mongodbURI, {useNewUrlParser: true})
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

// const groceries = require('./models/groceries.js')
const GroceryItem = require('./models/groceries.js')

app.use((req, res, next) => {
  console.log('I run for all routes!')
  next()
})

app.get('/groceries/', (req, res) => {
  // res.render('groceries/indexGroceries.ejs',
  // {
  //   allGroceries: groceries
  // })
  GroceryItem.find({}, (error, allGroceries) => {
    res.render('groceries/indexGroceries.ejs', {
      groceries: allGroceries
    })
  })
})

app.get('/groceries/new', (req, res) => {
  res.render('groceries/newGroceries.ejs')
})

app.post('/groceries', (req, res) => {
  // groceries.push(req.body)
  // res.redirect('/groceries')
  GroceryItem.create(req.body, (error, createdGroceryItem) => {
    // res.send(createdGroceryItem)
    res.redirect('/groceries')
  })
})

app.get('/groceries/:id/edit', (req, res) => {
  // res.render('groceries/editGroceries.ejs',
  // {
  //   groceryItem: groceries[req.params.index],
  //   index: req.params.index
  // })
  GroceryItem.findById(req.params.id, (err, foundGroceryItem) => {
    res.render('groceries/editGroceries.ejs',
    {
      groceryItem: foundGroceryItem
    })
  })
})

app.put('/groceries/:id', (req, res) => {
  // groceries[req.params.index] = req.body
  // res.redirect('/groceries')
  GroceryItem.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) =>
  {
    res.redirect('/groceries')
  })
})

app.get('/groceries/:index', (req, res) => {
  // res.render('groceries/showGroceries.ejs',
  // {
  //   groceryItem: groceries[req.params.index]
  // })
  Fruit.findById(req.params.id, (err, foundGroceryItem) => {
    res.send(foundGroceryItem)
  })
})

app.delete('/groceries/:id', (req, res) => {
  // groceries.splice(req.params.index, 1)
  // res.redirect('/groceries')
  GroceryItem.findByIdAndRemove(req.params.id, (err, data) =>
  {
    res.redirect('/groceries')
  })
})

app.listen(PORT, () => {
    console.log('listening on port' , PORT)
});
