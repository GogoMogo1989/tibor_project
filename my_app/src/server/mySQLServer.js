const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));

const connection = mysql.createConnection({
  host: 'localhost:3306',
  user: 'root',
  password: 'Password12345',
  database: 'LocalServer',
});


connection.connect((err) => {
  if (err) throw err;
  console.log('Az adatbázis kapcsolódás sikeres!');
});

app.get('/api', (req, res) => {
  res.send('Ez egy Node.js backend!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`A szerver fut a ${port}-es porton!`));