
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  next();
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/makeorder', function (req, res) {
  // console.log(req.body);
  let rawdata = fs.readFileSync('db.json');
  let orders = JSON.parse(rawdata);
  let newOrder = {};
  Object.assign(newOrder, req.body);
  newOrder.orderId = '_' + Math.random().toString(36).substr(2, 9);
  orders.push(newOrder);
  let data = JSON.stringify(orders);
  fs.writeFileSync('db.json', data);
  res.send('order was made successfully');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


