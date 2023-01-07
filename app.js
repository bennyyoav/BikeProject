
var express = require('express');
var app = express();

app.use(express.urlencoded({ extended: true }));//built-in middleware function in Express.It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.json());//It parses incoming JSON requests and puts the parsed data in req.body.


// 127.0.0.1:5000/api/customers/________
const routes = require('./routes/bikeRoutes');
app.use('/users/', routes);



app.use(express.static('public'));
//=================================================
const server = app.listen(80, '127.0.0.1', function () {
    var host = server.address().address
    var port = server.address().port
    console.log("My app is listening at http://%s:%s", host, port)
});