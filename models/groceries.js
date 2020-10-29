const mongoose = require('mongoose')

const groceryItemSchema = new mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  preferredStore: {type: String, required: true},
  userID: {type: String, required: true}
})

const GroceryItem = mongoose.model('GroceryItem', groceryItemSchema)

module.exports = GroceryItem
