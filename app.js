const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = 3000

app.get('/', (req, res) => {

  var today = new Date();
  var currentDay = today.getDay();

  if (currentDay === 6 || currentDay === 0 ){
    res.Write("<h1>Yay its the weekend</h1>");
  } else {
    res.sendFile(__dirname + "/index.html")
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
