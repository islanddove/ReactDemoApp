const express = require('express');
const bodyParser = require('body-parser');
var multer = require('multer');
const path = require('path');
var upload = multer();
const app = express();
const port = 3010;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload.array());
app.use(express.static(path.join(__dirname, 'frontend/build')));

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
app.get('/getComparisonData', function (req, res) {
    let index1 = Math.floor(Math.random() * 10);
    let index2 = Math.floor(Math.random() * 10);
    //If same, pick new number until different
    while (index1 === index2) index2 = Math.floor(Math.random() * 10);
    let comparisonData = [ fullData[index1], fullData[index2] ];
    res.json(comparisonData);
});

// Return all of the apples, sorted by wins utilizing deep copy trick
app.get('/getSortedWins', function (req, res) {
    let sortedWins = JSON.parse(JSON.stringify(fullData));
    sortedWins.sort(function (a, b) {
        if (a.wins < b.wins) return 1;
        if (a.wins > b.wins) return -1;
        return 0;
    });
    res.json(sortedWins);
});

// Recieves a 'PUT' with an id, adds a win to the apple with that id
app.put('/putUpdateData', function (req, res) {
    if (req.body.selected_id){
        let winner = req.body.selected_id;
        //console.log('Winning apple: ', winner);
        fullData[winner].wins++;
        res.status(200).send({
            success: 'true',
            message: 'request recieved'
        });
    } else{
        res.status(400).send({
            success: 'false',
            message: 'no id selected'
        });
    }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});

app.listen(process.env.PORT || port);

module.exports = app;
