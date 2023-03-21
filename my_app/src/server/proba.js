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
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Adat modellje
const DataModel = mongoose.model('Data', dataSchema);

// API végpontok

const authMiddleware = (req, res, next) => {
  const userId = req.headers.authorization;
  if (!userId) {
    return res.status(401).send('Nincs hozzáférési jog!');
  }
  req.user = { id: userId };
  next();
};

app.post('/api/data', authMiddleware, (req, res) => {
  if (!req.body.file) {
    res.status(400).send('Nincs fájl az adatokban!');
    return;
  }

  const userId = req.user.id;

  const data = new DataModel({
    file: req.body.file,
    userId: userId
  });

  data.save().then(() => {
    console.log('Az adatok mentése sikeres volt!');
   
