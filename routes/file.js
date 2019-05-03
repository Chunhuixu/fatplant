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
        console.log(path.basename);
        cb(null, file.fieldname + '-' + Date.now());

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

    // if  (typeof (file) == "undefined") {
    //     res.render('dataPages/fileupload', {
    //         title: 'File Upload',
    //         judge: 'failed (no file upload)'
    //     });
    // }
    // else {
        upload(req, res, function (err) {
            var file = req.file;


            //
            if (err instanceof multer.MulterError) {
                res.render('dataPages/fileupload', {
                    title: 'File Upload',
                    judge: 'failed (multer error)'

                });
            } else if (err) {
                res.render('dataPages/fileupload', {
                    title: 'File Upload',
                    judge: 'failed (err)'

                });
            }

            //success

            res.send({
                title: 'File Upload',
                judge: 'success'

            });
        })

});

router.get('/', function(req, res, next) {
     res.render('dataPages/fileupload', {
        title: 'File Upload',

    });
});


module.exports = router;