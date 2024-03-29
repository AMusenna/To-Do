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

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


app.get('/', (req, res) => {

  Item.find({}, function(err, foundItems){
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(error);
        } else {
          console.log("Successfully saved default items to DB.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });

});


app.get("/:customListName", function(req, res) {

  const customListName =  req.params.customListName;

  List.findOne({name: customListName}, function(err, foundList) {
    if(!err) {
      if (!foundList){
        // Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });

        list.save();
        res.redirect("/" + customListName)

      } else {
        //Show an existing list
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });

});



app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item = new Item ({
    name: itemName
  });

  item.save();

  res.redirect("/");

});

app.post("/delete", function(req, res){

  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function(err) {
    if (!err) {
      console.log("Successfully checked item.");
    }
  });
  res.redirect("/");
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
