var express = require('express');
var router = express.Router();
var dbdata=" ";
var _id;
var db;

router.get('/', async function (req, res, next) {
   _id = req.query.id;
    db = req.app.locals.db;
    await db.collection('LMPD').find({"_id": _id}).toArray(function (err, result) {
    if (err) throw err;
    dbdata = result;

    res.render('show', {
      title: "FASTA",
      id:req.query.id,
      data:dbdata
    });

  });
});



module.exports = router;
