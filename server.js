const express = require('express');
const path = require('path');
const app = express();

app.listen(2320, () => {
  console.log('2320 connected');
});

app.use(express.static(path.join(__dirname, 'front/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front/build'));
});
