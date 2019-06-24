var express = require('express');
var router = express.Router();

/* under about static */
router.get('/introduction', function(req, res, next) {
    res.render('layout', {
        title: 'Introduction',
        content: 'pages/devIntroduction'
    });
});
router.get('/investigators', function(req, res, next) {
    res.render('layout', {
        title: 'Investigators',
        content: 'pages/devInvestigators'
    });

});


module.exports = router;
