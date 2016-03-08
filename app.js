var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.get("/page1", function(req, res){
    var socket = req.socket;
    //server listen msg from A
    socket.on("A", function(msgFromA){
        console.log("msgFromA: ", msgFromA);
        //sau do emit cho B
        socket.emit("B", msgFromA);
    });
    //server listen msg from B
    socket.on("B", function(msgFromB){
        console.log("msgFromB: ", msgFromB);
        //sau do emit cho A
        socket.emit("A", msgFromB);
    });
    res.render("pageX", {title: "page1"});
});
app.get("/page2", function(req, res){
    var socket = req.socket;
    //server listen msg from A
    socket.on("A", function(msgFromA){
        console.log("msgFromA: ", msgFromA);
        //sau do emit cho B
        socket.emit("C", msgFromA);
    });
    //server listen msg from B
    socket.on("C", function(msgFromC){
        console.log("msgFromC: ", msgFromC);
        //sau do emit cho A
        socket.emit("A", msgFromC);
    });
    res.render("pageX", {title: "page2"});
});
app.get("/page3", function(req, res){
    var socket = req.socket;
    //server listen msg from A
    socket.on("A", function(msgFromA){
        console.log("msgFromA: ", msgFromA);
        //sau do emit cho B
        socket.emit("D", msgFromA);
    });
    //server listen msg from B
    socket.on("D", function(msgFromD){
        console.log("msgFromD: ", msgFromD);
        //sau do emit cho A
        socket.emit("A", msgFromD);
    });
    res.render("pageX", {title: "page3"});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = Error('Not Found');
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
