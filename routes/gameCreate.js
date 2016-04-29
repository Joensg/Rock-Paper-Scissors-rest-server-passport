exports.gameCreate = function(userChoiceIndex, gameNumber, userId) {

    // initialize and reset previous game and winner data
    var choices = ["rock", "paper", "scissors"];
    var tie = 0;
    var scorepoint = 0;
    var winner = "";
    var gameNew = {};

    //compute random guess for comp_number using Math.random()
    var compChoiceIndex = Math.floor((Math.random() * 3));
    // compute difference of comp_number and player_number modulo three
    var difference = (userChoiceIndex - compChoiceIndex) % 3;

    // use if/elif/else to determine winner, print winner message
    if ((difference === 1) || (difference === -2)) {
        scorepoint = 1;
        winner = "You won!";
    } else if ((difference === -1) || (difference === 2)) {
        winner = "Computer wins!";
    } else {
        var tie = 1;
        winner = "You and the computer had a tie!";
    }
    // consruct new valid game object using data from req.body
    gameNew = {
        number: gameNumber,
        playerChoice: choices[userChoiceIndex],
        computerChoice: choices[compChoiceIndex],
        scorepoint: scorepoint,
        tie: tie,
        winner: winner,
        playerId: userId
    };

    console.log("gameNew: ", gameNew);

    return gameNew;

}
