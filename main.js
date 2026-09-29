// Initialising variables and arrays
const prompt = require("readline-sync");
let names = [];
let points = [];

// Asking for players names and returning them.
function askNames(){
    let name = prompt.question("Please enter your name: ");
    names.push(name);
};

// Asking how many players then running askNames function to collect names.
function howManyPlayers(){
    let numPlayers = prompt.question("How many players is there? ");
    for(let i=0;i<numPlayers;i++){
        console.log("Player", i+1);
        askNames();
    };
}

// Displaying current Scores
function leaderboard(){
    console.log("=== LEADERBOARD ===");
    for(let i=0;i<numPlayers;i++){
        console.log("Player ",i+1 ,"score: ", points[i]);
    };
};

howManyPlayers();
