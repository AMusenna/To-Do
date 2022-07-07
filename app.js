const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = 3000

let items = ["Learn Deutsch", "Learn more codes", "Love your wife"];

app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static("public"));


app.set('view engine', 'ejs');



app.get('/', (req, res) => {

  let today = new Date();

  let dayName = today.toLocaleDateString('de-DE', {month: 'long', day: 'numeric', weekday: 'long'});

  res.render("list", {dayNameEn: dayName, newListItems: items});

});



app.post("/", function(req, res){

  let item = req.body.newItem;

  items.push(item);

  res.redirect("/");


});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
