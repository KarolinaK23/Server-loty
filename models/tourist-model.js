var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var autoIncrement = require('mongoose-plugin-autoinc');

/**
 * Class repressenting tourist.
 * It contains basic informations about Tourist
 */
var TouristSchema = new mongoose.Schema({

    /**
     * First name
     */
    firstName: String,

    /**
     * Last name
     */
    lastName: String,

    /**
     * Sex
     */
    sex: {
        type: String,
        enum: ['FEMALE', 'MALE'],
        required: true
    },

    /**
     * Country
     */
    country: { type: Number, ref: 'Country' },

    /**
     * Notes
     */
    note: { type: Number, ref: 'Note' },

    /**
     * Date of birth
     */
    dateOfBirth: Date

});


mongoose.model('Tourist', TouristSchema);
TouristSchema.plugin(timestamps);
TouristSchema.plugin(autoIncrement.plugin, {
    model: 'Tourist',
    field: 'id',
    startAt: 1
});

module.exports = mongoose.model('Tourist');

