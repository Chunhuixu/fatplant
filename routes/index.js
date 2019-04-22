var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', {
    title: 'FatPlant',
    content: 'pages/index'
  });
});



module.exports = router;
