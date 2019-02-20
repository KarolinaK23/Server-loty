var express = require('express');
var Flight = require('./models/flight-model');



function init() {
    var fs = require('fs');
    var tmp = null;
    var file = fs.readFile('/flight-data.json', 'utf8', function(err, data) {
        tmp = data;
    });
    var obj = JSON.parse(tmp);

    var item = new Flight(obj);

    item.save();
}
module.exports.initData = init;