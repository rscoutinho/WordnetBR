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
db.save("_design/busca",{
    nome:{
	map:function(doc){ if(doc.words_en){for(var i in doc.words_en) emit(doc.words_en[i],doc.words_en+" - "+doc.gloss)}}
},
    hyper:{
	map:function(doc){ if(doc.Hypo){for(var i in doc.Hypo) emit(doc.Hypo[i],[doc.words_en,doc.gloss])}}
},
    hypo:{
	map:function(doc){ if(doc.Hyper){for(var i in doc.Hyper) emit(doc.Hyper[i],[doc.words_en,doc.gloss])}}
},
    trans:{
	map:function(doc){ if(doc.id_origem) emit(doc.id_origem,doc)}
}
    length:{
	map:function(doc){ if(doc.trans) emit(null,null)}
}
});
console.log("Salvo")
res.send("funcionou")
});


app.listen(3467);
console.log("Ta no ar ")

