var express = require('express');
var router = express.Router();
var dbdata = "";
var pageid = 0;

router.get('/num', async function (req, res, next) {

    var db = req.app.locals.db;

        var num = await db.collection('LMPD').countDocuments(function(err,countData){
            console.log("hhaha");
//you will get the count of number of documents in mongodb collection in the variable
            console.log(countData);


        });
});


router.get('/', async function (req, res, next) {

    var db = req.app.locals.db;
    if (typeof (req.query.num) != "undefined") {
        res.render('layout', {
            title: 'File',
            content: 'fileupload'
        });

    }
    else{
        var num = await db.collection('LMPD').countDocuments(function(err,countData){
            console.log("hhaha");
            console.log(countData);


        });

        await db.collection('LMPD').find({}).toArray(function (err, result) {
        if (err) throw err;
        dbdata = result;

        res.render('table', {
            title: 'Table',
            data: dbdata
        });

    });}

});

module.exports = router;


// old version
//var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
// router.get('/', function (req, res, next) {
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("data");
//         dbo.collection("LMPD").find({}).limit(15).toArray(function (err, result) { // return all the data
//             if (err) throw err;
//             dbdata = result;
//             res.render('table', {
//                 title: 'Table',
//                 data: dbdata
//             });
//
//         });
//     });
// });