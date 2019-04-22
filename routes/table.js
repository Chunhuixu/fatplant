var express = require('express');
var db = require('../db/db.js');
var router = express.Router();
var dbdata = "";

var pageid = 0;
var pagesize = 20;
var pagenumber = 0

var _id;
var _num;


router.get('/', function (req, res, next) {
    var dbo = db.getconnect();
    dbo.collection('LMPD').find({}).limit(20).toArray(function (err, result) {
        if (err) throw err;
        dbdata = result;
        res.render('dataPages/table', {
            title: 'Table',

        });

    });

});




router.get('/data', function (req, res, next) {
    console.log("runnsfadsning");
    _num =req.query.num;

    console.log(_num);
    var dbo = db.getconnect();
    if (typeof (req.query.num) != "undefined") {
        var number;
        pagenumber = parseInt(req.query.num) ;
        number = pagenumber * pagesize;

        dbo.collection('LMPD').find({}).limit(20).skip(number).toArray(function (err, result) {
            if (err) throw err;

            res.render('dataPages/renderTable', {
                data: result
            });

        });

    }
    else {
        dbo.collection('LMPD').find({}).limit(20).toArray(function (err, result) {
            if (err) throw err;

            res.render('dataPages/renderTable', {
                data: result
            });

        });
    }


});

router.get('/show', function (req, res, next) {
    _id = req.query.id;
    var dbo = db.getconnect();
    dbo.collection('LMPD').find({"_id": _id}).toArray(function (err, result) {
        if (err) throw err;
        dbdata = result;
        res.render('dataPages/show', {
            title: 'Introduction',
            id:req.query.id,
            data:dbdata
        });


    });
});



// router.get('/:num', function (req, res, next) {
// });



module.exports = router;


