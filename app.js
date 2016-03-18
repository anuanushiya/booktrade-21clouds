var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var config = require('./config.json');
var FileStore = require('session-file-store')(session);

var routes = require('./routes/index');
var users = require('./routes/user');
var book = require('./routes/book');
var dashboard = require('./routes/dashboard');
var setting = require('./routes/setting');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 8080));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: config.secret, resave: true, saveUninitialized: true, store: new FileStore() }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'controllers')));
app.use(express.static(path.join(__dirname, 'models')));



app.use('/', routes);
app.use('/user', users);
app.use('/book', book);
app.use('/dashboard', dashboard);
app.use('/setting', setting);


app.post('/setSession', function(req, res, next) {
  console.log(req.body.username);
  req.session._id = req.body._id;
  req.session.username = req.body.username;
  req.session.password = req.body.password;
  req.session.email = req.body.email;
  req.session.phone = req.body.phone;
  //req.session.username = "awan21clouds.com";
  res.json(req.session._id);
});


app.get('/getSession', function(req, res, next) {
  res.send(req.session.username);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
