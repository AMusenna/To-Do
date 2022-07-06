const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = 3000

var items = [];

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

  var today = new Date();


  var dayName = today.toLocaleDateString('de-DE', {month: 'long', day: 'numeric', weekday: 'long'});

  res.render("list", {dayNameEn: dayName, newListItem: items});

});

app.post("/", function(req, res){

  var item = req.body.newItem;

  items.push(item);

  res.redirect("/");
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
