var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var ghlint = require('ghlint');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/favicon.png'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

/* GET home page. */
app.get('/:user/:repo', function(req, res, next) {
  var repo = req.params.user + '/' + req.params.repo;
  ghlint.lintRepo(repo, function (err, results) {
    if (err) {
      next(err);
    } else {
      res.render('index', {
        repos: [{
          name: repo,
          results: results
        }]
      });
    }
  });
});
app.get('/:user', function(req, res, next) {
  ghlint.lintUserRepos(req.params.user, function (err, repos) {
    if (err) {
      next(err);
    } else {
      res.render('index', {
        repos: repos
      });
    }
  });
});
app.get('/', function(req, res, next) {
  if (req.query.repo) {
    res.redirect('/' + req.query.repo);
  } else {
    res.render('index');
  }
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
