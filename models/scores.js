// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var scoreSchema = new Schema({
    playerId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: Number,
        required: true
    },
    totalgames: {
        type: Number,
        required: true
    },
    wins: {
        type: Number,
        required: true
    },
    losses: {
        type: Number,
        required: true
    },
    ties: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Scores = mongoose.model('Score', scoreSchema);

// make this available to our Node applications
module.exports = Scores;
