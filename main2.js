// =============================================================================
// CE1337 Programming Bootcamp - Assessment Project: Console Quiz Game
// Implements: Variables, Conditionals, Loops, 1D/2D Arrays, Objects, & Functions
// =============================================================================

// Import the synchronous terminal input package for Node.js
const prompt = require("readline-sync");

// -----------------------------------------------------------------------------
// 1. DATA STRUCTURES: 1D Arrays, 2D Arrays, and Objects
// -----------------------------------------------------------------------------

// 1D Array storing category names
const categories = ["Computing History", "JavaScript Basics"];

// 2D Array: Rows represent Categories, Columns represent Questions
// Each cell contains a question object holding the prompt, options, correct answer, and points
const quizMatrix = [
    // Row 0: Category "Computing History"
    [
        {
            question: "Who developed the concept of a universal computing machine in 1936?",
            options: ["Alan Turing", "Charles Babbage", "Ada Lovelace", "John von Neumann"],
            correctIndex: 0,
            points: 10
        },
        {
            question: "What storage medium was commonly used for early IBM computer programs?",
            options: ["Magnetic Tape", "Punched Cards", "Floppy Disk", "Cassette"],
            correctIndex: 1,
            points: 15
        }
    ],
    // Row 1: Category "JavaScript Basics"
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
            points: 15
        }
    ]
];

// -----------------------------------------------------------------------------
// 2. HELPER FUNCTIONS
// -----------------------------------------------------------------------------

// Factory function to construct and return a new player object initialized to zero
function createPlayer(playerName) {
    return {
        name: playerName,
        score: 0,
        streak: 0,
        highestStreak: 0,
        correctCount: 0,
        incorrectCount: 0
    };
}

// Display helper to output formatted visual banners in the terminal
function printDivider(title) {
    console.log("\n========================================");
    console.log("  " + title);
    console.log("========================================");
}

// Input validation helper using a do-while loop to prompt and verify numeric boundaries
function getValidatedChoice(min, max, questionPrompt) {
    let choice;
    do {
        let input = prompt.question(questionPrompt);
        choice = Number(input);

        // Check if the input is non-numeric or falls outside the allowed range
        if (isNaN(choice) || choice < min || choice > max) {
            console.log("Invalid choice. Please enter a number between " + min + " and " + max + ".");
        }
    } while (isNaN(choice) || choice < min || choice > max);

    return choice;
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

// Evaluates a final score and returns qualitative feedback using a switch statement
function getRankFeedback(score) {
    let tier;
    if (score >= 40) {
        tier = "EXPERT";
    } else if (score >= 20) {
        tier = "COMPETENT";
    } else {
        tier = "NOVICE";
    }

    switch (tier) {
        case "EXPERT":
            return "Gold Tier: Outstanding technical knowledge!";
        case "COMPETENT":
            return "Silver Tier: Solid grasp of foundational concepts.";
        case "NOVICE":
            return "Bronze Tier: Keep reviewing lecture slides and labs.";
        default:
            return "Completed the quiz.";
    }
}

// -----------------------------------------------------------------------------
// 3. MAIN GAME CONTROLLER
// -----------------------------------------------------------------------------

function runQuizGame() {
    printDivider("WELCOME TO THE CE1337 TERMINAL QUIZ");

    // Validate the total number of players (between 1 and 4)
    let totalPlayers = getValidatedChoice(1, 4, "Enter number of players (1-4): ");

    // Collect each player's name and populate the players array
    let players = [];
    for (let i = 0; i < totalPlayers; i++) {
        let name = prompt.question("Enter name for Player " + (i + 1) + ": ");
        // Ensure the entered name is not empty or whitespace only
        while (name.trim() === "") {
            name = prompt.question("Name cannot be blank. Enter name for Player " + (i + 1) + ": ");
        }
        players.push(createPlayer(name));
    }

    // Main Game Engine: Nested loops iterating over the 2D matrix
    // Outer loop: iterate through each category (matrix rows)
    for (let catIndex = 0; catIndex < categories.length; catIndex++) {
        printDivider("CATEGORY " + (catIndex + 1) + ": " + categories[catIndex]);

        // Middle loop: iterate through each question in the category (matrix columns)
        for (let qIndex = 0; qIndex < quizMatrix[catIndex].length; qIndex++) {
            let q = quizMatrix[catIndex][qIndex];

            // Inner loop: rotate through each player so everyone answers the question
            for (let pIndex = 0; pIndex < players.length; pIndex++) {
                let currentPlayer = players[pIndex];

                console.log("\n" + currentPlayer.name + "'s Turn!");
                console.log("Question " + (qIndex + 1) + " (" + q.points + " pts): " + q.question);

                // Display answer options numbered 1 to 4 for the user
                for (let optIndex = 0; optIndex < q.options.length; optIndex++) {
                    console.log("  " + (optIndex + 1) + ") " + q.options[optIndex]);
                }

                // Collect user choice and convert from 1-based display to 0-based array index
                let playerSelection = getValidatedChoice(1, q.options.length, "Select option (1-" + q.options.length + "): ");
                let chosenIndex = playerSelection - 1;

                // Check the answer and update player object statistics
                if (chosenIndex === q.correctIndex) {
                    console.log(">> Correct! You earned " + q.points + " points.");
                    currentPlayer.score += q.points;
                    currentPlayer.correctCount++;
                    currentPlayer.streak++;
                    playerStreak(currentPlayer);
                } else {
                    console.log(">> Incorrect! The correct answer was: " + q.options[q.correctIndex]);
                    currentPlayer.incorrectCount++;
                    currentPlayer.streak = 0;
                }
            }
        }
    }

    // -------------------------------------------------------------------------
    // 4. FINAL RESULTS & LEADERBOARD SUMMARY
    // -------------------------------------------------------------------------
    printDivider("FINAL TOURNAMENT RESULTS");

    // Display summary statistics for each player
    for (let i = 0; i < players.length; i++) {
        let p = players[i];
        console.log("\nPlayer: " + p.name);
        console.log("Final Score:    " + p.score + " points");
        console.log("Current Streak: " + p.streak);
        console.log("Highest Streak: " + p.highestStreak);
        console.log("Correct/Wrong:  " + p.correctCount + " correct, " + p.incorrectCount + " incorrect");
        console.log("Rank:           " + getRankFeedback(p.score));
    }

    printDivider("THANK YOU FOR PLAYING");
}

// Start program execution
runQuizGame();