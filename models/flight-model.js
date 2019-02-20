var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var autoIncrement = require('mongoose-plugin-autoinc');
var serverDB = require('../db/server-conn');

serverDB.initData();

/**
 * Class repressenting flight.
 */
var FlightSchema = new mongoose.Schema({

    /**
     * Departure date
     */
    departureDate: Date,

    /**
     * Arrival date
     */
    arrivalDate: Date,

    country1: String,


    country2: String,

    /**
     * Number of seats
     */
    seats: Number,

    /**
     * Price
     */
    price: Number

});

mongoose.model('flights', FlightSchema);
FlightSchema.plugin(timestamps);
FlightSchema.plugin(autoIncrement.plugin, {
    field:'flightId',
    model: 'flights',
    startAt: 1 
});
module.exports = mongoose.model('flights');
//module.exports.flightVar = flightVar;

