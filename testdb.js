//db test. ignore and delete if not applied
// dont run this program only if u know what u are doing.

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var objectId = require('mongodb').ObjectId;

MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
    if (err) throw err;
    var dbo = db.db("data");

//find--->

    // dbo.collection("LMPD").find({name: "zhang"}).toArray(function(err, result) {
    //     //return all the data
    //     if (err) throw err;
    //
    //     console.log(result);
    //
    // });

//insert--->
//
//     var myobj = { name:"Zhang", test: 1 };
//     dbo.collection("LMPD").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("success");
//         db.close();
//     });

//delete--->

    // var whereStr = { _id : "pf_1"};
    // dbo.collection("LMPD").deleteMany(whereStr, function(err, obj) {
    //     if (err) throw err;
    //     console.log("delete");
    //
    // });

//update--->

    // var whereStr = {name: "zhang"};
    // var updateStr = {$set: { "_id" : "pf_001" }};
    // dbo.collection("LMPD").updateOne(whereStr, updateStr, function(err, res) {
    //     if (err) throw err;
    //     console.log("success");
    //
    // })


    dbo.collection("LMPD"). find({_id : "pf_1"}).toArray(function(err, result) {
        //return all the data
        if (err) throw err;
        console.log(result);
    });
    db.close();


});

function getNextSequenceValue(sequenceName){
    var sequenceDocument = db.counters.findAndModify(
        {
            query:{_id: sequenceName },
            update: {$inc:{sequence_value:1}},
            "new":true
        });
    return sequenceDocument.sequence_value;
}