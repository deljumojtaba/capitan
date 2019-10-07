var express = require('express');
var router = express.Router();
var mid = require('../tools/mid')


/* GET home page. */
 router.get('/', function(req, res, next) {
   res.send('login please');
 });

// router.get('/',mid.test, function(req, res, next) {
//   res.sendFile('/login.html');
// });


module.exports = router;