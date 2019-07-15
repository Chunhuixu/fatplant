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

    dbo.collection(process.env.TABLE_COLLECTION).countDocuments({}, function(err, numOfDocs){
        if (err) throw err;
        totalnumber = parseInt(numOfDocs);
        pagenumber = Math.floor(totalnumber/pagesize);
        dbo.collection(process.env.TABLE_COLLECTION).find({}).toArray(function (err, result) {
            if (err) throw err;
            tabledata=[];
            result.forEach(function(entry){
              var newobj={
                _id:entry._id,
                gene_name:entry.gene_name,
                gene_symbol:entry.gene_symbol,
                refseq_id:entry.refseq_id,
                uniprot_id:entry.uniprot_id,
                species:entry.species};
                tabledata.push(newobj);
              });
            res.render('dataPages/table', {
                title: 'Table',
                tabledata: tabledata,
                pnumber:pagenumber,
                currentPnum:0
            });

        });

    });


});

router.get('/extended-table', function (req, res, next) {
    var dbo = db.getconnect();

    dbo.collection(process.env.TABLE_COLLECTION).countDocuments({}, function(err, numOfDocs){
        if (err) throw err;
        totalnumber = parseInt(numOfDocs);
        pagenumber = Math.floor(totalnumber/pagesize);
        dbo.collection(process.env.TABLE_COLLECTION).find({}).toArray(function (err, result) {
            if (err) throw err;
            res.render('dataPages/extendedtable', {
                title: 'Table',
                tabledata: result,
                pnumber:pagenumber,
                currentPnum:0
            });

        });

    });
});

router.get('/extended-table/species-filter',function(req,res,next){
  res.render('dataPages/species-filter',{
    title:'Species Filter'
  });
});

router.get('/extended-table/table/species-filter',function(req,res,next){
  res.redirect('/table/extended-table/species-filter');
})

router.get('/table/extended-table',function(req,res,next){
  res.redirect('/table/extended-table')
})

router.get('/extended-table/table/extended-table',function(req,res,next){
  res.redirect('/table')
})

router.post('/species-filter',function(req,res,next){
  const species_query=req.body.search;
  var dbo=db.getconnect();
  dbo.collection(process.env.TABLE_COLLECTION).find({species:species_query}).toArray(function(err,result){
    if(err) throw err;
    tabledata=[];
    result.forEach(function(entry){
      var newobj={
        _id:entry._id,
        gene_name:entry.gene_name,
        gene_symbol:entry.gene_symbol,
        refseq_id:entry.refseq_id,
        uniprot_id:entry.uniprot_id,
        species:entry.species};
        tabledata.push(newobj);
      });
    res.render('dataPages/table', {
        title: 'Table',
        tabledata: tabledata,
        pnumber:pagenumber,
        currentPnum:0
    });
  })
});

router.get('/table/species-filter',function(req,res,next){
  res.redirect('/table/species-filter');
})

router.get('/species-filter',function(req,res,next){
  res.render('dataPages/species-filter',{
    title:'Species Filter'
  });
});

router.post('/extended-table/species-filter',function(req,res,next){
  const species_query=req.body.search;
  var dbo=db.getconnect();
  dbo.collection(process.env.TABLE_COLLECTION).find({species:species_query}).toArray(function(err,result){
    if(err) throw err;
    res.render('dataPages/extendedtable',{
      title:'Table',
      tabledata:result
    })
  })
})
router.get('/data', function (req, res, next) {

    var dbo = db.getconnect();
    var reg = /^[0-9]+.?[0-9]*/;
    if (typeof (req.query.num) != "undefined") {
        _num = req.query.num;
        if (!reg.test(_num)) {
            res.render('dataPages/table', {
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

                    res.render('dataPages/table', {
                        title: 'Table',
                        alert: "Sry, There is no result"
                    });
                }else{
                    // successful result
                res.render('dataPages/table', {
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
            res.render('dataPages/table', {
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

        res.render('dataPages/show', {
            title: 'Introduction',
            id: req.query.id,
            data: dbdata
        });


    });
});


router.get('/search', function (req, res, next) {

    res.render('dataPages/tablesearch', {
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

        res.render('dataPages/renderTable', {
            data: dbdata,

        });


    });



});

// router.get('/:num', function (req, res, next) {
// });


module.exports = router;
