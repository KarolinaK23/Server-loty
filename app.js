var express = require('express');
var bodyParser = require('body-parser');
//var serverDB = require('./db/server-conn');
var touristRouter = require('./routers/tourists');
var flightsRouter = require('./routers/flights');
var countriesRouter = require('./routers/countries');
//var initData = require('./flights-init');



var app = express();

var PORT = 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH, OPTIONS');

    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
}).options('*', function(req, res, next) {
    res.end();
});
module.exports = function(context, req) {

    context.res = {
        status: 200,
        headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": '*',
            "Content-Type": "application/json"
        },
        body: { "status": "alive" }
    };
    context.done();
};



app.use('/tourists', touristRouter);
app.use('/flights', flightsRouter);
app.use('/countries', countriesRouter);

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});