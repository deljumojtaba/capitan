var express = require('express');
var router = express.Router();
var mid = require('../tools/mid')

/* GET home page. */
 router.get('/',mid.test, function(req, res, next) {
   res.render('index', { title: 'Express' });
 });


module.exports = router;
