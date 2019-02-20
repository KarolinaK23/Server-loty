var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var autoIncrement = require('mongoose-plugin-autoinc');

var NoteSchema = new mongoose.Schema({
    /**
     * Creation date of entity
     */
    creationDate: Date,
    /**
     * Body of entity
     */
    body: String

});
mongoose.model('Note', NoteSchema);
NoteSchema.plugin(timestamps);
NoteSchema.plugin(autoIncrement.plugin, {
    model: 'Note',
    startAt: 1
});
module.exports = mongoose.model('Note');




/**
 *Class repressenting Country
 */
var CountrySchema = new mongoose.Schema({

    /**
     * Name of country
     */
    name: String
});

mongoose.model('Country', CountrySchema);
CountrySchema.plugin(autoIncrement.plugin, {
    model: 'Country',
    field: 'name',
    startAt: 1
})
/*CountrySchema.plugin(autoIncrement.plugin, {
    model: 'Country',
    startAt: 1
}); */

module.exports = mongoose.model('Country');

