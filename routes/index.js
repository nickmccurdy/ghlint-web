var express = require('express');
var router = express.Router();
var ghlint = require('ghlint');

/* GET home page. */
router.get('/', function(req, res) {
  ghlint.lintAll().then(function (results) {
    res.render('index', {
      title: 'Express',
      results: results
    });
  });
});

module.exports = router;
