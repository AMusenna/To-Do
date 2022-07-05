const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

  var today = new Date();
  var dayName = today.toLocaleString('ge-us', {weekday: 'long'});;


  res.render("list", {dayNameEn: dayName});

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
