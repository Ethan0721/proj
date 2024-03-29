const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
var _ = require('lodash');
var cors = require('cors');
const PORT = process.env.PORT || 5000;
// const argument = process.argv;
// const ENV = argument[2];
//defining various routes to handle API calls
// const rtsMovies = require('./routes/movies');
console.log("EV in app:",ENV);

const rtsCigs = require('./routes/cig');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors())
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({
    limit:'50mb',
    extended:true,
    parameterLimit:50000
}))
app.use(cookieParser());
console.log(path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')));

// configuring the routes 
// app.use('/web/movies', rtsMovies);
app.use('/cig', rtsCigs);

app.use(function(req,res,next){
    let err = new Error('Not Found - request' + req.params);
    err.status = 404;
    next(err);
})
app.use(function(err,req,res,next){
    res.status(err.status || 500);
    res.json(err.message);
})

var server = app.listen(PORT, function(){
    let port = server.address().port;
    console.log("Mongo Db browser is listening ... at", port)
})

module.exports = {
    app : app,
    env: ENV
}