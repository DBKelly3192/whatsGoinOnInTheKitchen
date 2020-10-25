require("dotenv").config()
const express = require("express")
const app = express()
const methodOverride = require("method-override")
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))
app.use(methodOverride("_method"))

const groceries = require("./models/groceries.js")

app.use((req, res, next) => {
  console.log("I run for all routes!")
  next()
})

app.get("/groceries/new", (req, res) => {
  res.render("groceries/newGroceries.ejs")
})

app.get("/groceries/", (req, res) => {
  res.render("groceries/indexGroceries.ejs",
  {
    allGroceries: groceries
  })
})

app.post("/groceries", (req, res) => {
  groceries.push(req.body)
  res.redirect("/groceries")
})

app.get("/groceries/:index", (req, res) => {
  res.render("groceries/showGroceries.ejs",
  {
    groceryItem: groceries[req.params.index]
  })
})

app.delete("/groceries/:index", (req, res) => {
  groceries.splice(req.params.index, 1)
  res.redirect("/groceries")
})

app.listen(PORT, () => {
    console.log("listening on port" , PORT)
});
