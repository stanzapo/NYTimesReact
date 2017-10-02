//START
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(express.static('./public'));

var PORT = process.env.PORT || 3000;


if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect('mongodb://localhost/nytimes');
};

var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

var Article = require('./server/model.js');

// routes

app.post('/api/saved', function(req, res) {

  var newArticle = new Article(req.body);

  var title = req.body.title;
  var date =req.body.date;
  var url = req.body.url;

  newArticle.save(function(err, doc){
    if(err){
      console.log(err);
    } else { res.send(doc._id); }
  });
};


app.get('/api/saved', function(req, res) {

  Article.find({}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});

app.delete('/api/saved/', function(req, res){
    var url = req.param('url');

    Article.find({"url": url}).remove().exec(function(err, data){
        if(err){
          console.log(err);
        } else { res.send("deleted");}
    });
});


app.get('/', function(req, res) {
  res.sendFile('./public/index.html');
});

app.listen(PORT, function() {
  console.log('App running on',PORT);
});
