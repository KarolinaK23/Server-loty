var mongoose = require('mongoose');

var HOST_NAME = 'localhost';
var DATABASE_NAME = 'practise';

var db = mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME, { useNewUrlParser: true }  );

function connection(){
    return db;
}

module.exports.initData = connection;