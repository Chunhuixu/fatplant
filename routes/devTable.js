var express = require('express');
var db = require('../db/db.js');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


var dbdata = "";

var totalnumber = 0;

var pagesize = 20;
var currentNumber = 0;
var pagenumber = 0
var number=0;

var _id;
var _num;




router.get('/', function (req, res, next) {
    var dbo = db.getconnect();

    dbo.collection('LMPD').countDocuments({}, function(err, numOfDocs){
        if (err) throw err;
        totalnumber = parseInt(numOfDocs);

        pagenumber = Math.floor(totalnumber/pagesize);
        dbo.collection('LMPD').find({}).limit(20).toArray(function (err, result) {
            if (err) throw err;
            res.render('dataPages/devTable', {
                title: 'Table',
                tabledata: result,
                pnumber:pagenumber,
                currentPnum:0
            });

        });

    });


});


router.get('/data', function (req, res, next) {

    var dbo = db.getconnect();
    var reg = /^[0-9]+.?[0-9]*/;
    if (typeof (req.query.num) != "undefined") {
        _num = req.query.num;
        if (!reg.test(_num)) {
            res.render('dataPages/devTable', {
                title: 'Table',
                alert: "The query has to be number"

            });
        } else {
            currentNumber = parseInt(_num);
            number = currentNumber * pagesize;

            //this could be change to id(primary) > number(current) for speed up the searching time...
            //I will just use skip() function for now.

            dbo.collection('LMPD').find({}).limit(20).skip(number).toArray(function (err, result) {
                pagenumber = req.query.pnumber;

                if (err) throw err;
                //if the result is null
                if(Array.isArray(result) && result.length === 0){

                    res.render('dataPages/devTable', {
                        title: 'Table',
                        alert: "Sry, There is no result"
                    });
                }else{
                    // successful result
                res.render('dataPages/devTable', {
                    title: 'Table',
                    tabledata: result,
                    pnumber:pagenumber,
                    currentPnum:currentNumber
                });
                }

            });
        }
    } else {

        //if query not exist. back to main page
        dbo.collection('LMPD').find({}).limit(20).toArray(function (err, result) {
            pagenumber = req.query.pnumber;
            if (err) throw err;
            res.render('dataPages/devTable', {
                title: 'Table',
                tabledata: result,
                pnumber:pagenumber,
                currentPnum:1
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

        res.render('dataPages/devShow', {
            title: 'Introduction',
            id: req.query.id,
            data: dbdata
        });


    });
});


router.get('/search', function (req, res, next) {

    res.render('dataPages/devTablesearch', {
        title: 'Search',

    });

});

router.post('/search/genename', function (req, res) {


    var searchname = req.body.name;

    var reg = new RegExp(searchname, 'i');

    var dbo = db.getconnect();
    dbo.collection('LMPD').find({"gene_name": {$regex : reg}}).limit(20).toArray(function (err, result) {
        if (err) throw err;
        dbdata = result;
        //console.log(dbdata)

        res.render('dataPages/devRenderTable', {
            data: dbdata,

        });


    });



});

// router.get('/:num', function (req, res, next) {
// });


module.exports = router;


