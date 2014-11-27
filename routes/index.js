var express = require('express');
var router = express.Router();
var ghlint = require('ghlint');

/* GET home page. */
router.get('/', function(req, res, next) {
  ghlint.lintAll(function (err, results) {
    if (err) {
      next(err);
    } else {
      res.render('index', {
        title: 'Express',
        results: results
      });
    }
  });
});

module.exports = router;
