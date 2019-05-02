// server.js
// where your node app starts

// init project
var express = require('express');
var accepts = require('accepts');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/whoami', function (req, res) {
    var open_paren = req.headers['user-agent'].indexOf('(');
    var close_paren = req.headers['user-agent'].indexOf(')');
    var system = req.headers['user-agent']; //.slice(open_paren + 1, close_paren);
    res.json({
        ipaddress: req.headers['x-forwarded-for'],
        language: accepts(req).languages()[0],
        software: system
    });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
