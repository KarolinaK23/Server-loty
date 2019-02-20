var mongoose = require('mongoose');
var autoIncrement = require('mongoose-plugin-autoinc');

/**
 * Class repressenting tourist.
 * It contains basic informations about Tourist
 */
var TouristInFlightSchema = new mongoose.Schema({

    /**
     * Tourists asigned to the flight
     */
    tourists: [{ type: Number, ref: 'Tourist' }],

    /**
     * Flights connected with the tourist
     */
    flights: [{ type: Number, ref: 'Flight' }]

});

mongoose.model('TouristInFlight', TouristInFlightSchema);
TouristInFlightSchema.plugin(autoIncrement.plugin, {
    model: 'TouristInFlight',
    startAt: 1
});
module.exports = mongoose.model('TouristInFlight');
