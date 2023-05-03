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
const url = 'mongodb+srv://GogoMogo1989:Password12345@cluster0.v457sky.mongodb.net/Base64?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('A MongoDB adatbázishoz sikeresen kapcsolódva!');
  })
  .catch((err) => {
    console.log('Hiba a MongoDB adatbázis kapcsolat során:', err);
  });

//Documentum-upload álltal feltöltött adatok és annak sémája
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
  option:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
});

const DataModel = mongoose.model('Data', dataSchema);

app.post('/api/data', (req, res) => {
  if (!req.body.file) {
    res.status(400).send('Nincs fájl az adatokban!');
    return;
  }

  const data = new DataModel({
    file: req.body.file,
    option: req.body.option,
    email: req.body.email
  });

  data.save().then(() => {
    console.log('Az adatok mentése sikeres volt!');
    res.send('Adatok sikeresen fogadva és mentve a szerveren.');
  }).catch((err) => {
    console.log('Hiba az adatok mentésekor:', err);
    res.status(500).send('Hiba az adatok mentésekor!');
  });
});

//Adatok lekérdezése a documentum-view-ban
app.get('/api/data', (req, res) => {
  DataModel.find({}).then((data) => {
    console.log('Az adatok lekérdezése sikeres volt!')

    res.send(data);
  }).catch((err) => {
    console.log('Hiba az adatok lekérdezésekor:', err);
    res.status(500).send('Hiba az adatok lekérdezésekor!');
  });
});


//Kijelölt adatok törlése a view-documentum-ban
app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;
  DataModel.findByIdAndDelete(id)
    .then(() => {
      console.log('Az adat törlése sikeres volt!');
      res.status(200).json({ message: 'Az adat törlése sikeres volt!' });
    })
    .catch((err) => {
      console.log('Hiba az adat törlésekor:', err);
      res.status(500).send('Hiba az adat törlésekor!');
    });
});

//Regisztráció és a hozzátartozó séma
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: Boolean,
  yourAdminEmail: String
});

const User = mongoose.model('User', userSchema);

app.post('/signup', (req, res) => {
  const { email, password, isAdmin, yourAdminEmail } = req.body;

  const newUser = new User({ email, password, isAdmin, yourAdminEmail });

  newUser.save()
    .then(() => {
      console.log('Felhasználó mentve!');
      res.status(200).json({ message: 'Felhasználó mentve!' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Hiba történt a mentés során!' });
    });
});

//Bejelentkezés
app.post('/login', (req, res) => {
  const {email, password} = req.body;

  User.findOne({ email: email, password: password})
    .then(user => {
      if (!user) {
        console.log('Hibás felhasználó név vagy jelszó!');
        res.status(401).json({ message: 'Hibás felhasználó név vagy jelszó!' });
      } else {
        console.log('Bejelentkezés sikeres!');
        console.log('A felhasználó _id-je:', user._id);
        res.status(200).json({ message: 'Bejelentkezés sikeres!', userId: user._id, isAdmin: user.isAdmin, yourAdminEmail: user.yourAdminEmail });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Hiba történt a bejelentkezés során!' });
    });
});

//Felhasználó és az ahhoz tartozó adatok törlése
app.delete('/api/user/:id/:email', (req, res) => {
  const id = req.params.id;
  const email = req.params.email;
  
  User.findByIdAndDelete(id)
    .then(() => {
      console.log('A felhasználó törlése sikeres volt!');
      DataModel.deleteMany({ email: email })
        .then(() => {
          console.log('A felhasználóhoz tartozó adatok is törölve lettek!');
          res.status(200).send('A felhasználó törlése sikeres volt!');
        })
        .catch((err) => {
          console.log('Hiba a felhasználóhoz tartozó adatok törlésekor:', err);
          res.status(500).send('Hiba a felhasználó törlésekor!');
        });
    })
    .catch((err) => {
      console.log('Hiba a felhasználó törlésekor:', err);
      res.status(500).send('Hiba a felhasználó törlésekor!');
    });
});

// Felhasználók lekérdezése
app.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Hiba történt a felhasználók lekérdezésekor!' });
    });
});

//Itt keressük a felhasználókat az admin felületen
app.get('/api/data/search/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  DataModel.find({ email: searchTerm})
    .then((data) => {
      console.log(`Az adatok lekérdezése sikeres volt ezzel az email-címmel: ${searchTerm}`);
      res.send(data);
    })
    .catch((err) => {
      console.log('Hiba az adatok lekérdezésekor:', err);
      res.status(500).send('Hiba az adatok lekérdezésekor!');
    });
});

const port = process.env.PORT || 3000;

app.listen(port, ()  => console.log(`A szerver fut a ${port}-es porton!`));