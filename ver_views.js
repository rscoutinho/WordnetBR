/**
 * Modulos dependentes
 */

var express = require('express')
  , routes = require('./routes')
  , cradle = require('cradle');

var app = module.exports = express.createServer();
var conn = new(cradle.Connection)();
var db = conn.database('synsets');

// Configuração 

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/index', function(req, res) {
    db.view("busca/nome",function(err,doc){
	console.log(doc)
});
res.send("funcionou")
});


app.listen(3467);
console.log("Ta no ar ")

