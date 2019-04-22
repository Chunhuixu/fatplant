//mongoose library test

var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/data';
var Schema = mongoose.Schema;

var lmpdSchema = Schema({
    _id : String,
    lmp_id : String,
    entrez_gene_id : Number,
    gene_name : String,
    gene_symbol : String,
    refseq_id : String,
    mrna_id : String,
    protein_gi : Number,
    sequence : String,
    seqlength : Number,
    uniprot_id : String,
    protein_entry : String,
    protein_name : String,
    taxid: Number,
    species : String,
    species_long : String
    },
    {collection: "LMPD"}
    );
var lmpdModel =  mongoose.model('lmpdData',lmpdSchema);


mongoose.connect(url,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongoose opened!');

n

});
// lmpdModel.find({}, function(err, result){
//     if(err)
//         return console.log(err)
//     dbdata = result;
//     console.log(dbdata);
// }).limit(3);

module.exports = lmpdModel;
