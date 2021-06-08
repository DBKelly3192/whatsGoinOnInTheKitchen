const mongoose = require('mongoose')

const groceryItemSchema = new mongoose.Schema({
  item: {type: String, required: true},
  brand: {type: String, required: false},
  price: {type: Number, required: false},
  preferredStore: {type: String, required: false},
  quantity: {type: Number, required: false},
  quantityUnit: {type: String, required: false},
  userID: {type: String, required: true}
})

const GroceryItem = mongoose.model('GroceryItem', groceryItemSchema)

module.exports = GroceryItem
