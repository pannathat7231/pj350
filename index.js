const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

app.use(cors());

const connection = mysql.createConnection(process.env.DATABASE_URL);

app.get('/', (req, res) => {
  res.send('Hello there');
});

app.get('/tourd', (req, res) => {
  connection.query('SELECT * FROM tourd', function(err, results, fields) {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/user', (req, res) => {
  connection.query('SELECT * FROM user', function(err, results, fields) {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});
