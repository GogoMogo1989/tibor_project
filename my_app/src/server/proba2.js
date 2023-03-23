const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const secretKey = 'mysecretkey';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(cookieParser());
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true
}));

const url = 'mongodb+srv://GogoMogo1989:12345@cluster0.v457sky.mongodb.net/Base64?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Error connecting to database:', err);
  });

const dataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  file: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return `/^data:[a-z]+\/[a-z]+;base64,/.test(v)`;
      },
      message: 'Invalid file data'
    }
  }
});

const DataModel = mongoose.model('Data', dataSchema);

function authenticateToken(req, res, next) {
  try {
    const token = req.session.token;
    if (!token) throw new Error('Token is missing');
    req.user = req.session.user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Authentication failed' });
  }
}

app.post('/api/data', authenticateToken, (req, res) => {
  if (!req.body.file || !req.body.user._id) {
    res.status(400).send('Invalid request');
    return;
  }

  const data = new DataModel({
    user: mongoose.Types.ObjectId(req.body.user._id),
    file: req.body.file,
  });

  data.save().then(() => {
    console.log('Data saved successfully');
    res.send('');
  }).catch((err) => {
    console.log('Error saving data:', err);
    res.status(500).send('Internal server error');
  });
});