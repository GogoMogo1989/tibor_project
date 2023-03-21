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
  
  fs.writeFile('..//assets/data.json', JSON.stringify(data), (err) => { // Az adatok mentése a data.json fájlba
    if (err) throw err;
    console.log('Az adatok mentése sikeres volt!');
    res.send('Adatok sikeresen fogadva és mentve a szerveren.');
  });
});

app.get('/api/dataget', (req, res) => {
 
  fs.readFile('..//assets/data.json', (err, data) => {  // Az adatok betöltése a data.json fájlból
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`A szerver fut a ${port}-es porton!`));