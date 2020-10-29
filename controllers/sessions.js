const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {currentUser: req.session.currentUser})
})

sessions.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) =>
  {
    if (err) {
      console.log(err)
      res.send("We're having some technical difficulties over here. Sorry about that!")
    } else if (!foundUser){
      res.send('<a href="/">Sorry, who are you again?</a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/')
      } else {
        res.send('<a href="/">Try your other password!</a>')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions
