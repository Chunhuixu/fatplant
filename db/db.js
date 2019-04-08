// mongodb-native library test

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbo
MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
    if (err) throw err;
    dbo = db.db("data");
    dbo.collection("LMPD"). find({}).toArray(function(err, result) {
        //return all the data
        if (err) throw err;

        console.log(result);
        db.close();
    });
});
