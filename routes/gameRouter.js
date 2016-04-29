var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var GameCreate = require('./gameCreate');
var CalculateScore = require('./calculateScore');

var Games = require('../models/games');
var Scores = require('../models/scores');
var Users = require('../models/user');

var gameRouter = express.Router();
gameRouter.use(bodyParser.json());

gameRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {
        Games.find({ playerId: req.decoded._doc._id })
            .exec(function(err, game) {
                if (err) throw err;
                res.json(game);
            });
    })
    .post(Verify.verifyOrdinaryUser, function(req, res, next) {
        if (req.body) { // if req has a body

            var newgame = GameCreate.gameCreate(req.body.playerChoice, req.body.number, req.decoded._doc._id);

            Games.create(newgame, function(err, game) {
                if (err) throw err;
                var id = game._id;

                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Added the game with id: ' + id);
            });

        }
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Games.remove({}, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

gameRouter.route('/score')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {
        req.body.user = req.decoded._doc._id; // obtain the user's ObjectId to identify the user
        Games.find({ playerId: req.decoded._doc._id })
            .exec(function(err, game) {
                if (err) throw err;
                Users.findOne({ _id: req.body.user }, function(err, user) { // fetch the username of the user
                    if (err) throw err;
                    // reset score values and calculate score
                    var newscore = CalculateScore.calculateScore(game, req.body.user);
                    // add username to newscore
                    newscore.username = user.username;

                    // check if a Scores document corresponding to this user already exist
                    Scores.findOne({ playerId: req.body.user }, function(err, score) {
                        if (err) throw err;
                        if (score) { //Scores document corresponding to this user already exists
                            Scores.findOneAndUpdate({ playerId: req.body.user }, { $set: newscore }, { new: true },
                                function(err, score) {
                                    if (err) throw err;
                                    newscore.playerId = "";
                                    res.json(newscore);
                                });
                        } else { //Scores document corresponding to this user does not exist, so create it
                            // console.log("Scores Document does not exists!");
                            Scores.create(newscore, function(err, score) {
                                if (err) throw err;
                                newscore.playerId = "";
                                res.json(newscore);
                            });
                        }
                    });
                });
            });
    });

module.exports = gameRouter;
