// for all the basic mongodb test
// ingore if not applied

// dont run this program only if u know what u are doing.


require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;

var objectId = require('mongodb').ObjectId;


MongoClient.connect(process.env.DATABASE, { useNewUrlParser: true },function(err, db) {
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

    // var whereStr = {_id:"productid"};
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
//change the id number
    var cursor = dbo.collection("LMPD"). find({});
    var counter=0;
    cursor.each(function(err, result) {
        //return all the data
        if (err) throw err;
        if(result!=null) {

            result._id = "pf_"+counter;
            counter++;

            dbo.collection("data").insertOne(result, function (err, res) {
                if (err) throw err;
                console.log(counter);

            });
            // var whereStr = {_id: oldid};
            // dbo.collection("LMPD").deleteMany(whereStr, function (err, obj) {
            //     if (err) throw err;
            //
            //     console.log("success delete");
            //
            // });

        }
        else{
            console.log(counter);

            db.close();
        }
    });




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