var express = require('express');
var router = express.Router();

/* GET home page. */

/* example
app.get('/', function (req, res) {
  res.send('Hello World!');
  //next()
});
*/

router.get('/', function(req, res, next) {
    console.log('this is a api-test request!');
});

module.exports = router;
