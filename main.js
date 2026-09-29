const prompt = require("readline-sync");

let noPlayers = prompt.question("Enter the number of players: ");
noPlayers = Number(noPlayers);


// Player details
function createPlayer(name){
    return({name: name, score: 0});
}

// Players array
for(i=0; i<noPlayers; i++){
    players = [
    createPlayer(prompt.question("Enter name of player " + [i+1] + " "))]
}


console.log(players);

// winning player
function displayWinner(players){
    let winningPlayer = players[0];

    for(let i = 1; i < players.length; i++){
        if(players[i].score > winningPlayer.score){
            winningPlayer = players[i];
        }
    }
}

