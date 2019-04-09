// mongodb-native library set

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var option = {
    useNewUrlParser: true,

    //number of retries off connection.
    numberOfRetries: 5,


    //reconnect on error
    auto_reconnect: true,
    // i suggest 10(the default size for nodejs is 5). datapool size.
    poolSize: 10,
    connectTimeoutMS: 500,

};





var connection = null;


module.exports.connect = () => new Promise((resolve, reject) => {
    MongoClient.connect(url, option, function (err, db) {
        if (err) {
            MongoClient.close();
            reject(err);
            return;
        }
        resolve(db);

        connection = db;

    });
});


module.exports.getconnect = () => {
    if (!connection) {
        throw new Error('Call mongodb connect first!');
    }
    return Promise.resolve(connection);
}

