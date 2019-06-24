// middleware
var debug = require('debug')('fatplant:server');
var http = require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var serveIndex = require('serve-index');
var db = require('./db/db.js');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// load the middleware module
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const serveOpt = {
    icons: true,
    view: 'details'
};


app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/ftp', express.static('upload/'), serveIndex('upload/', serveOpt))

// app.use("/",express.static(__dirname + "/public"));


//parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



//Route register --
var indexRouter = require('./routes/index'); //home
var tableRouter = require('./routes/table'); //table
var pageRouter = require('./routes/page'); //page-about
var fileRouter = require('./routes/file'); //file upload
var cytRouter = require('./routes/cyView') // for Cytoscape

var devIndexRouter = require('./routes/devIndex'); //home
var devTableRouter = require('./routes/devTable'); //table
var devPageRouter = require('./routes/devPage'); //page-about
var devFileRouter = require('./routes/devFile'); //file upload
var devCytRouter = require('./routes/devCyView') // for Cytoscape

//rountering ===>
app.use('/', indexRouter);
app.use('/table', tableRouter);
app.use('/page', pageRouter);
app.use('/file', fileRouter);
app.use('/cy', cytRouter);

app.use('/dev', devIndexRouter);
app.use('/dev/table', devTableRouter);
app.use('/dev/page', devPageRouter);
app.use('/dev/gile', devFileRouter);
app.use('/dev/cy', devCytRouter);


// //API- ignore and delete below if we dont have api route
// var dataRouter = require('./routes/api/data');
// var testAPI = require('./routes/test');
// var testAPI1 = require('./routes/api/data1');
//
// //API==>
// app.use('/data', dataRouter);
// app.use('/test', testAPI);
// app.use('/data1', testAPI1);
//



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

// connnect to db before app running
db.connect()
    .then(() => console.log('database connected'))
    .then(server.listen(port))
    .catch((e) => {
    console.error(' app crashed ');
    console.error(e);
    // Always hard exit on a database connection error
    process.exit(1);
    });
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
