const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(bodyParser.json({limit: '500mb'}));

const url = 'mongodb+srv://GogoMogo1989:Password12345@cluster0.v457sky.mongodb.net/?retryWrites=true&w=majority'; // A MongoDB Atlas kapcsolati URL-je

app.get('/api', (req, res) => {
  res.send('Ez egy Node.js backend!');
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  console.log(data);

  MongoClient.connect(url, function(err, client) { // Kapcsolódás a MongoDB adatbázishoz
    if (err) throw err;
    const db = client.db("Base64"); // Adatbázis kiválasztása
    const collection = db.collection("Base64"); // Kollekció kiválasztása
    collection.insertOne(data, function(err, result) { // Adatok beszúrása a kollekcióba
      if (err) throw err;
      console.log('Az adatok mentése sikeres volt!');
      res.send('Adatok sikeresen fogadva és mentve a szerveren.');
      client.close();
    });
  });
});

app.get('/api/dataget', (req, res) => {
 
  MongoClient.connect(url, function(err, client) { // Kapcsolódás a MongoDB adatbázishoz
    if (err) throw err;
    const db = client.db("Base64"); // Adatbázis kiválasztása
    const collection = db.collection("Base64"); // Kollekció kiválasztása
    collection.find({}).toArray(function(err, data) { // Adatok lekérdezése a kollekcióból
      if (err) throw err;
      res.send(data);
      client.close();
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`A szerver fut a ${port}-es porton!`));