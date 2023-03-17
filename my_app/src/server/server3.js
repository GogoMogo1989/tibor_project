const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const mongoURI = 'mongodb+srv://GogoMogo1989:12345@cluster0.tdidybh.mongodb.net/password?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('A MongoDB adatbázishoz sikeresen kapcsolódva!'))
  .catch(err => console.log('Hiba a MongoDB adatbázis kapcsolat során:', err));

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({ email, password });

  newUser.save()
  .then(() => {
    console.log('Felhasználó mentve!');
    res.status(200).json({}); 
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`A szerver fut a ${port}-es porton!`));