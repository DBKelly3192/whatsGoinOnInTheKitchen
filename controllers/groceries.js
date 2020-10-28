const express = require('express')
const router = express.Router()
const GroceryItem = require('../models/groceries.js')

router.use((req, res, next) => {
  console.log('I run for all routes!')
  next()
})

router.get('/', (req, res) => {
  GroceryItem.find({}, (error, allGroceries) => {
    res.render('groceries/indexGroceries.ejs', {
      groceries: allGroceries
    })
  })
})

router.get('/new', (req, res) => {
  res.render('groceries/newGroceries.ejs')
})

router.post('/', (req, res) => {
  GroceryItem.create(req.body, (error, createdGroceryItem) => {
    res.redirect('/groceries')
  })
})

router.get('/:id/edit', (req, res) => {
  GroceryItem.findById(req.params.id, (err, foundGroceryItem) => {
    res.render('groceries/editGroceries.ejs',
    {
      groceryItem: foundGroceryItem
    })
  })
})

router.put('/:id', (req, res) => {
  GroceryItem.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) =>
  {
    res.redirect('/groceries')
  })
})

router.get('/:index', (req, res) => {
  Fruit.findById(req.params.id, (err, foundGroceryItem) => {
    res.send(foundGroceryItem)
  })
})

router.delete('/:id', (req, res) => {
  GroceryItem.findByIdAndRemove(req.params.id, (err, data) =>
  {
    res.redirect('/groceries')
  })
})

module.exports = router
