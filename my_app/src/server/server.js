const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));

app.get('/api', (req, res) => {
  res.send('Ez egy Node.js backend!');
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  console.log(data);
  // Az adatok mentése a data.json fájlba
  fs.writeFile('data.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('Az adatok mentése sikeres volt!');
    res.send('Adatok sikeresen fogadva és mentve a szerveren.');
  });
});

app.get('/api/data', (req, res) => {
  // Az adatok betöltése a data.json fájlból
  fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`A szerver fut a ${port}-es porton!`));