const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(bodyParser.json({ limit: '500mb' }));

// MongoDB kapcsolódás
const url = 'mongodb+srv://GogoMogo1989:12345@cluster0.v457sky.mongodb.net/Base64?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('A MongoDB adatbázishoz sikeresen kapcsolódva!');
  })
  .catch((err) => {
    console.log('Hiba a MongoDB adatbázis kapcsolat során:', err);
  });

// Adat sémája
const dataSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^data:[a-z]+\/[a-z]+;base64,/.test(v);
      },
      message: 'A fájl nem base64 kódolt.'
    }
  }
});

// Adat modellje
const DataModel = mongoose.model('Data', dataSchema);

// API végpontok

app.post('/api/data', (req, res) => {
  if (!req.body.file) {
    res.status(400).send('Nincs fájl az adatokban!');
    return;
  }

  const data = new DataModel({
    file: req.body.file,
  });

  data.save().then(() => {
    console.log('Az adatok mentése sikeres volt!');
    res.send('Adatok sikeresen fogadva és mentve a szerveren.');
  }).catch((err) => {
    console.log('Hiba az adatok mentésekor:', err);
    res.status(500).send('Hiba az adatok mentésekor!');
  });
});

app.get('/api/data', (req, res) => {
  DataModel.find({}).then((data) => {
    console.log('Az adatok lekérdezése sikeres volt!')
    res.send(data);
  }).catch((err) => {
    console.log('Hiba az adatok lekérdezésekor:', err);
    res.status(500).send('Hiba az adatok lekérdezésekor!');
  });
});

// Szerver indítása
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`A szerver fut a ${port}-es porton!`);
});