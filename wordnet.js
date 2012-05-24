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

// Transferência de dados


//Tela de busca de synsets
app.get('/index', function(req, res) {
    res.render('index2')
});


//Resultado busca
app.get('/aparece',function(req,res){
    var word = req.query['word']
    db.view('busca/nome',{ key: word }, function(err,doc){
	res.render('query',{dados:doc})
    })
})


//Mostra de synset
app.get('/home',function(req,res){
    var id_synset = req.query['id']
    db.get(id_synset, function(err,doc){
	db.view('busca/hyper',{key:id_synset},function(err,arq){
	    db.view('busca/hypo',{key:id_synset},function(err,aqr){
		db.view('busca/trans',{key:id_synset},function(err,qra){
		    res.render('home', {id: doc.id, palavras_en: doc.words_en, gloss_en: doc.gloss, exemplos: doc.Examp, Hyper: arq, Hypo: aqr, palavras_pt:qra})
		})	    
	    })
	})
    })
})


//Gravacao traducao
app.get('/traducao',function(req,res){
    db.save(" "+Math.random(),{
	words_trans: req.query["words_trans"],
	gloss_trans: req.query["gloss_trans"],
	id_origem: req.query["id"]
    })
    res.send("salvo <p><a href='/index'> Voltar </a></p>")
})

app.listen(3467);
console.log("Ta no ar ")

