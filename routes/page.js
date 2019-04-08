var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/introduction', function(req, res, next) {
    res.render('layout', {
        title: 'Introduction',
        content: 'pages/introduction'
    });
    next()
});

router.get('/investigators', function(req, res, next) {
    res.render('layout', {
        title: 'Investigators',
        content: 'pages/investigators'
    });

});


module.exports = router;
