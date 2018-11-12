var express = require('express');
var mongoose = require ('mongoose');
var nunjucks=  require ('nunjucks');
var bodyparser= require('body-parser');
var multer = require('multer');
const PORT = process.env.PORT || 5000;

var upload = multer({
    dest: __dirname +'/uploads'
});


mongoose.connect('mongodb://localhost/pokedex', { useNewUrlParser: true });
require('./models/Pokemon');
require('./models/Type');

var app = express();
app.use(bodyparser.urlencoded());
app.use(upload.single('file'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/', require('./routes/pokemons'));
app.use('/types', require('./routes/types'));

app.use('/uploads', express.static(__dirname + '/uploads'));


nunjucks.configure('views', {
    autoescape: true,
    express: app
});

console.log('app lancé sur: '+ PORT);
app.listen(PORT);