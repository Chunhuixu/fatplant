var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'upload/'});
var fs = require('fs');

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
        var file_type = '.' + file.type;
        console.log(file.type);
        cb(null, file.fieldname + '-' + Date.now() + file_type);
    }
});
var upload = multer({storage: storage})
router.post('/upload', upload.array('logo', 2), function (req, res, next) {
    res.render('layout', {
        title: 'File',
        content: 'pages/fileupload',
        judge: 'success'
    });
});

router.get('/', function(req, res, next) {
     res.render('layout', {
        title: 'File',
        content: 'pages/fileupload'
    });
});


module.exports = router;