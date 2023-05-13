var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection(process.env.DATABASE_URL)
var app = express()
app.use(cors())
app.use(express.json())

app.get('/user', function (req, res, next) {
    connection.query(
        'SELECT * FROM `user`',
        function (err, results, fields) {
            res.json(results);
        }
    );
})

app.get('/user/:id', function (req, res, next) {
    const id = req.params.uid;
    connection.query(
        'SELECT * FROM user WHERE uid = ?',
        [id],
        function (err, results) {
            res.json(results);
        }
    );
})

app.post('/adduser', function (req, res, next) {
    connection.query(
        'INSERT INTO `user`( `username`, `password`,`email`, `avatar`) VALUES (?, ?, ?, ?)',
        [req.body.username, req.body.password, req.body.email, req.body.avatar],
        function (err, results) {
            res.json(results);
        }
    );
})

app.put('/updateuser', function (req, res, next) {
    connection.query(
        'UPDATE `user` SET `username`= ?, `password`= ?, `email`= ?, `avatar` = ? WHERE uid = ?',
        [req.body.username, req.body.password, req.body.email, req.body.avatar, req.body.uid],
        function (err, results) {
            res.json(results);
        }
    );
})

app.delete('/deleteuser', function (req, res, next) {
    connection.query(
        'DELETE FROM users WHERE uid = ?',
        [req.body.uid],
        function (err, results) {
            res.json(results);
        }
    );
})

app.get('/tourd', function (req, res, next) {
    connection.query(
        'SELECT * FROM `tourd`',
        function (err, results, fields) {
            res.json(results);
        }
    );
})

app.get('/tourd/:id', function (req, res, next) {
    const id = req.params.order_ID;
    connection.query(
        'SELECT * FROM tourd WHERE id = ?',
        [id],
        function (err, results) {
            res.json(results);
        }
    );
})

app.post('/tourd', function (req, res, next) {
    connection.query(
        'INSERT INTO `tourd`(`tourname`,`hostname`,`prizepool`,`contract`) VALUES (?,?,?,?)',
        [req.body.tourname, req.body.hostname, req.body.prizepool, req.body.contract],
        function (err, results) {
            res.json(results);
        }
    );
})

app.put('/tourd', function (req, res, next) {
    connection.query(
        'UPDATE tourd SET `tourname`= ?,`hostname`= ?,`prizepool`= ? ,`contract`= ? WHERE id = ?',
        [req.body.tourname, req.body.hostname, req.body.prizepool, req.body.contract,req.body.order_ID],
        function (err, results) {
            res.json(results);
        }
    );
})

app.delete('/tourd', function (req, res, next) {
    connection.query(
        'DELETE FROM tourd WHERE id = ?',
        [req.body.id],
        function (err, results) {
            res.json(results);
        }
    );

})

app.post('/login', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
  
    connection.query(
      'SELECT * FROM user WHERE username = ? AND password = ?',
      [username, password],
      function(err, results) {
            res.json(results);
    })
})


app.listen(3000, function () {
    console.log(' web server listening on port 3000')
})
