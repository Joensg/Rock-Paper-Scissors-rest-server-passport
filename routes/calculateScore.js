exports.calculateScore = function(game, userId) {

    // reset score values and calculate score
    var scoredata = {};
    var score = 0;
    var wins = 0;
    var losses = 0;
    var ties = 0;
    var totalgames = 0;

    for (var x in game) {
        if (game[x].scorepoint || game[x].tie) {
            wins += game[x].scorepoint;
            ties += game[x].tie;
        }
        if (game[x].number) {
            totalgames++;
        }
    }
    losses = totalgames - wins - ties;
    score = wins - losses;

    // construct response object
    scoredata = {
        'playerId': userId,
        'score': score,
        'totalgames': totalgames,
        'wins': wins,
        'losses': losses,
        'ties': ties
    };

    return scoredata;

}
