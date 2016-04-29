var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Scores = require('../models/scores');

var scoresRouter = express.Router();
scoresRouter.use(bodyParser.json());

scoresRouter.route('/')
    .get(function(req, res, next) {
        Scores.find({})
            .exec(function(err, scores) {
                if (err) throw err;
                // hide all playerIds from client
                var scorestosend = scores;
                var scoresLen = scorestosend.length;
                for (var i = 0; i < scoresLen; i++) {
                    for (var x in scorestosend[i]) {
                        if (x === "playerId") {
                            scorestosend[i][x] = "";
                        }
                    }
                }
                res.json(scorestosend);
            });
    });

module.exports = scoresRouter;
