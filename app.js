//envi->
var debug = require('debug')('fatplant:server');
var http = require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var app = express();
var multer = require('multer');
var upload = multer({dest: 'upload/'});
var fs = require('fs');
var url = "mongodb://localhost:27017/";
var MongoClient = require('mongodb').MongoClient;



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// load the middleware module
// ** the order is matter! **
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


//using sass and static files
app.use(sassMiddleware({
    src: __dirname + "/public",
    dest: path.join(__dirname, 'public'),
    debug: true,
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
    outputStyle: 'compressed'
}));
app.use('/static', express.static(path.join(__dirname, 'public')));


//parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


MongoClient.connect(url,
    {
        useNewUrlParser: true,
        //poolsize could be change
        poolSize: 10

    }, function (err, db) {
        if (err) throw err;
        console.log("Connected correctly to server");
        var dbo = db.db("data");
        app.locals.db = dbo;

    });

//Route
//rountering --
var indexRouter = require('./routes/index'); //home
var tableRouter = require('./routes/table'); //table
var showRouter = require('./routes/show'); //show
var pageRouter = require('./routes/page'); //page-about
var fileRouter = require('./routes/file'); //page-about


//rountering ===>
app.use('/', indexRouter);
app.use('/table', tableRouter);
app.use('/show', showRouter);
app.use('/page', pageRouter);
app.use('/file', fileRouter);




//API- ignore this if we dont have api route
var dataRouter = require('./routes/api/data');
var testAPI = require('./routes/test');
var testAPI1 = require('./routes/api/data1');

//API==>
app.use('/data', dataRouter);
app.use('/test', testAPI);
app.use('/data1', testAPI1);


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


app.post('/upload', upload.array('logo', 2), function (req, res, next) {
    res.render('layout', {
        title: 'File',
        content: 'fileupload',
        judge: 'success'
    });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


/**
 below copy from www ignore------
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

/**
 above copy from www ignore------
 */


//change it back when finish!
//module.exports = app;
