var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var mydata
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("data");
    dbo.collection("LMPD"). find({}).limit(15).toArray(function(err, result) { // return all the data
      if (err) throw err;
      mydata = result;
      db.close();
      console.log(mydata);
      res.json(mydata);
    });
  });
});

module.exports = router;
