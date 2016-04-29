// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var gameSchema = new Schema({
    playerId: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    playerChoice: {
        type: String,
        required: true
    },
    computerChoice: {
        type: String,
        required: true
    },
    scorepoint: {
        type: Number,
        required: true
    },
    tie: {
        type: Number,
        required: true
    },
    winner: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Games = mongoose.model('Game', gameSchema);

// make this available to our Node applications
module.exports = Games;
