const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.send('Ez egy Node.js backend!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`A szerver fut a ${port}-es porton!`));