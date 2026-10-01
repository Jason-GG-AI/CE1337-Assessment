const prompt = require("readline-sync");


// 
let noPlayers = prompt.question("Enter the number of players: ");
noPlayers = Number(noPlayers);


// Player details function
function createPlayer(name){
    return({name: name, score: 0, correctCount: 0, incorrectCount: 0, streak: 0, highestStreak: 0});
}

// create players array
let players = [];
for(i=0; i<noPlayers; i++){
    let name = prompt.question("Enter name of player " + [i+1] + " ")
players.push(createPlayer(name))}

console.log(players);

// winning player function
function displayWinner(players){
    let winningPlayer = players[0];

    for(let i = 1; i < players.length; i++){
        if(players[i].score > winningPlayer.score){
            winningPlayer = players[i];
        }
    }
}

// streak function
function playerStreak(player){
    if(player.streak > 1){
        console.log(player.name + " is on a streak of " + player.streak);

    }
    if(player.streak > player.highestStreak){
        player.highestStreak = player.streak;
    }
}


const categories = ["Computiong History", "JavaScript Basics"];

const quizMatrix = [
    [
        { 
            question: "Who developed the concept of a universal computing machine in 1936?",
            options: ["Alan Turing", "Charles Babbage", "Ada Lovelace", "John von Neumann"],
            correctIndex: 0,
            points: 10
        },
        {
            question: "What storage medium was commonly useed for early IBM computer programs?",
            options: ["Magnetic tape", "Punched Cards", "Floppy Disk", "Cassette"],
            correctIndex: 1,
            points: 10
        }
    ],

    [
        {
            question: "Which keyword defines a variable that CANNOT be reassigned?",
            options: ["var", "let", "const", "static"],
            correctIndex: 2,
            points: 10
        },
        {
            question: "What does the expression typeof [1, 2, 3] evaluate to in JavaScript?",
            options: ["array", "object", "list", "undefined"],
            correctIndex: 1,
            points: 10
        }
    ]

];

function getValidChoice(min, max, questionPrompt){
    let choice;
    do{
        let input = prompt.question(questionPrompt);
        choice = Number(input);

        if(isNaN(choice) || choice < min || choice > max){
            console.log("Invalid input, please enter a number between " + min + "and " + max);

        }

    }while(isNaN(choice) || choice < min || choice > max);

    return choice;
}


function runQuiz(){

    for(let catIndex = 0; catIndex < categories.length; catIndex++){
        console.log("Category " + (catIndex + 1) + ": " + categories[catIndex]);

        for(let qIndex = 0; qIndex < quizMatrix[catIndex].length; qIndex++){
            let q = quizMatrix[catIndex][qIndex];
        
            for(let pIndex = 0; pIndex < players.length; pIndex++){
                let currentPlayer = players[pIndex];

                console.log("\n" + currentPlayer.name + "'s turn ");
                console.log("Question " + (qIndex + 1) + " (" + q.points + " pts): " + q.question);

                for (let optIndex = 0; optIndex < q.options.length; optIndex++) {
                    console.log("  " + (optIndex + 1) + ") " + q.options[optIndex]);
            }
            let playerSelection = getValidChoice(1, q.options.length, "Select option (1-" + q.options.length + "): ");
            let chosenIndex = playerSelection - 1;


            if (chosenIndex === q.correctIndex) {
                    console.log("Correct! You earned " + q.points + " points.");
                    currentPlayer.score += q.points;
                    currentPlayer.correctCount++;
                    currentPlayer.streak++;
                    playerStreak(currentPlayer);
                } else {
                    console.log("Incorrect! The correct answer was: " + q.options[q.correctIndex]);
                    currentPlayer.incorrectCount++;
                    currentPlayer.streak = 0;
                }
        }   

    }
}
}

runQuiz();

for(let i = 0; i < players.length; i++){
    let p = players[i];
    console.log("\nplayer: " + p.name);
    console.log("Final Score: " + p.score + " points");
    console.log("Correct Answers: " + p.correctCount);
    console.log("Incorrect Answers: " + p.incorrectCount);
    console.log("Correct Streak: " + p.streak);
    console.log("Highest Streak: " + p.highestStreak);

}

