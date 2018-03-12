var express = require('express')
var app = express()
var http = require('http')
var path = require('path')
var gapi = require('./lib/gapi');

// app.configure('development', function() {
// app.use(express.errorHandler());
// });
// app.configure(function() {
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.cookieParser());
// app.use(express.methodOverride());
// app.use(app.router);
// });

app.get('/', function(req, res) {
var locals = {
    title: 'This is my sample app'
  };
res.render('index.jade', locals);
// res.render('hello world');
});

var server = app.listen(3000);

console.log('Express server started on port %s', server.address().port);