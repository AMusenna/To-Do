const express = require('express');
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js" )

const app = express();
const port = 3000

let items = ["Learn Deutsch", "Learn more codes", "Love your wife"];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static("public"));


app.set('view engine', 'ejs');



app.get('/', (req, res) => {

  let dayName = date.getDay();


  res.render("list", {listTitle: dayName, newListItems: items});

});



app.post("/", function(req, res){

  let item = req.body.newItem;

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
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
