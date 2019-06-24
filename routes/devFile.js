var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');


//file handler
var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};

var uploadFolder = './upload/';

createFolder(uploadFolder);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {

        //
        // for no extention


        cb(null, path.parse(file.originalname).name+ '-' + Date.now());

        // for hex
        // crypto.pseudoRandomBytes(16, function (err, raw) {
        //     if (err) return cb(err)
        //     cb(null, raw.toString('hex') + path.extname(file.originalname))
        // })

        // for page  use
       // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))

    },

});

var upload = multer({storage: storage}).single('file')


router.post('/upload',function (req, res, next) {

        upload(req, res, function (err) {


            //
            if (err instanceof multer.MulterError) {
                res.render('dataPages/devFileupload', {

                    judgecode: 0

                });
            } else if (err) {
                res.render('dataPages/devFileupload', {

                    judgecode: 0

                });
            }

            //success

            res.send({
                judgecode: 1
            });
        })

});

router.get('/', function(req, res, next) {
     res.render('dataPages/fileupload', {
        title: 'File Upload',

    });
});


module.exports = router;