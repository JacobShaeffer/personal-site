var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var app = express();

var accessLogStream = fs.createWriteStream((__dirname + '/access.log'), {flags: 'a'})
app.use(morgan('tiny', {stream: accessLogStream}));

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
   res.sendFile(__dirname + '/public/index.html')
});

var port = 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});