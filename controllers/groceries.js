const express = require('express')
const router = express.Router()
const GroceryItem = require('../models/groceries.js')

const isAuthenticated = (req, res, next) =>  {
	if (req.session.currentUser) {
		return next()
	} else {
		res.redirect('/sessions/new')
	}
}

router.get('/seed', (req, res)=>{
    GroceryItem.create([
        {
          item: 'Aspirin',
          price: 5,
          preferredStore: 'Whole Foods',
          userID: 'Deja'
        },
        {
          item: 'Jameson',
          price: 10,
          preferredStore: 'Safeway',
          userID: 'Mohammed'
        },
        {
          item: 'French Press Coffee',
          price: 20,
          preferredStore: 'Trader Joe\'s',
          userID: 'Matt'
        },
				{
          item: 'Haribo Gummy Bears',
          price: 5,
          preferredStore: 'No Preference',
          userID: 'Brian'
        }
    ], (err, data)=>{
        res.redirect('/groceries');
    })
})

router.get('/', isAuthenticated, (req, res) => {
  GroceryItem.find({userID: {$eq: req.session.currentUser.username}}, (error, allGroceries) => {
    res.render('groceries/indexGroceries.ejs',
    {
      groceries: allGroceries,
      currentUser: req.session.currentUser
    })
  })
})

router.get('/new', isAuthenticated, (req, res) => {
  res.render('groceries/newGroceries.ejs',
  {
    currentUser: req.session.currentUser
  })
})

router.post('/', isAuthenticated, (req, res) => {
  GroceryItem.create(req.body, (error, createdGroceryItem) => {
    res.redirect('groceries')
  })
})

router.get('/:id/edit', isAuthenticated, (req, res) => {
  GroceryItem.findById(req.params.id, (err, foundGroceryItem) => {
    res.render('groceries/editGroceries.ejs',
    {
      groceryItem: foundGroceryItem,
      currentUser: req.session.currentUser
    })
  })
})

router.put('/:id', isAuthenticated, (req, res) => {
  GroceryItem.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
    res.redirect('/groceries')
  })
})

router.get('/:id', isAuthenticated, (req, res) => {
  GroceryItem.findById(req.params.id, (err, foundGroceryItem) => {
    res.render('groceries/showGroceries.ejs',
    {
      groceryItem: foundGroceryItem,
      currentUser: req.session.currentUser
    })
  })
})

router.delete('/:id', isAuthenticated, (req, res) => {
  GroceryItem.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/groceries')
  })
})

module.exports = router
