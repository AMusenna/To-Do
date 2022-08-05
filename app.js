const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();
const port = 3000

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
   name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new  Item({
  name: "Welcome your TodoList!"
});

const item2 = new  Item({
  name: "Hit the + button to off a new item."
});

const item3 = new  Item({
  name: "-- Hit this to delete an item."
});

const defaultItems = [item1, item2 , item3];

Item.insertMany(defaultItems, function(err) {
  if (err) {
    console.log(error);
  } else {
    console.log("Successfully saved default items to DB.");
  }
});


app.get('/', (req, res) => {


  res.render("list", {listTitle: "Today", newListItems: items});

});


app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});


app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res) {
  res.render("about");
});


app.post("/work", function(req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
