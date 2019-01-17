const express = require('express');
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const app = express();
const port = 3010;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload.array());

//load data from json file
app.use(express.static('img'));
var imgPath = "http://localhost:3010/"
var fullData = [
  {
    id: 0,
    name: "HoneyCrisp",
    picture: imgPath + "apple-honeycrisp.png",
    wins: 0
  },
  {
    id: 1,
    name: "Red Delicious",
    picture: imgPath + "apple-red-delicious.png",
    wins: 0
  },
  {
    id: 2,
    name: "Gala",
    picture: imgPath + "apple-gala.png",
    wins: 0
  },
  {
    id: 3,
    name: "Fuji",
    picture: imgPath + "apple-fuji.png",
    wins: 0
  },
  {
    id: 4,
    name: "Granny Smith",
    picture: imgPath + "apple-grannysmith.png",
    wins: 0
  },
  {
    id: 5,
    name: "Golden Delicious",
    picture: imgPath + "apple-golden-delicious.png",
    wins: 0
  },
  {
    id: 6,
    name: "Ambrosia",
    picture: imgPath + "apple-ambrousia.png",
    wins: 0
  },
  {
    id: 7,
    name: "McIntosh",
    picture: imgPath + "apple-mcIntosh.png",
    wins: 0
  },
  {
    id: 8,
    name: "Crispin",
    picture: imgPath + "apple-crispin.png",
    wins: 0
  },
  {
    id: 9,
    name: "JonaGold",
    picture: imgPath + "apple-jonagold.png",
    wins: 0
  }
]

// Each request returns two random apples to be compared against each other
app.get('/data', function (req, res) {
  let index1 = Math.floor(Math.random() * 10);
  let index2 = Math.floor(Math.random() * 10);
  //If same, pick new number until different
  while (index1 === index2) index2 = Math.floor(Math.random() * 10);
  let comparisonData = [ fullData[index1], fullData[index2] ];
  res.json(comparisonData);
});

// Return all of the apples, sorted by wins
app.get('/fulldata', function (req, res) {
  res.json(fullData);
});

// Recieves a 'PUT' with an id, adds a win to the apple with that id
app.put('/updatedata', function (req, res) {
  let winner = req.body.selected_id;
  console.log(winner);
  fullData[winner].wins++;
  res.send("Request Recieved");
})

app.listen(port, () => console.log(`Express app listening on port ${port}!`));
