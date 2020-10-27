// const groceries = [
//   {
//     name: 'milk',
//     price: 3,
//     preferredStore: 'Costco'
//   },
//   {
//     name: 'prosciutto',
//     price: 5,
//     preferredStore: 'Costco'
//   },
//   {
//     name: '1000 day old gouda',
//     price: 4,
//     preferredStore: 'Trader Joe\'s'
//   },
//   {
//     name: 'coffee',
//     price: 10,
//     preferredStore: 'Costco'
//   },
// ]
//
// module.exports = groceries

const mongoose = require('mongoose')

const groceryItemSchema = new mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  preferredStore: {type: String, required: true}
})

const GroceryItem = mongoose.model('GroceryItem', groceryItemSchema)

module.exports = GroceryItem
