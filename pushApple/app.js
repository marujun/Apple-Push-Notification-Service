
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = express();

// Configuration
app.engine('html', require('ejs').renderFile);


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


// Routes

app.get('/', routes.index);
app.all('/token', routes.token);

http.createServer(app).listen(3000, function(){
    console.log("Express server listening on port 3000");
 });