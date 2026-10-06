// =============================================================================
// CE1337 Programming Bootcamp - Assessment Project: Console Quiz Game
// =============================================================================

const prompt = require("readline-sync");

// 1D array of quiz categories, corresponding to rows in quizMatrix.
const categories = ["Computing History", "JavaScript Basics", "Computer Hardware", "Computer Networks"];

// 2D Array: Rows represent Categories, Columns represent Questions
// Each cell contains a question object holding the prompt, options, correct answer, and points
const quizMatrix = [
	[
        // Questions in category Computing History
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
	[
        // Questions in category Javascript Basics
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
	],
    [
        // Questions in category Computer Hardware
		// Questions obtained from GOOGLE
        {   
            question: "Which hardware component is commonly referred to as the 'brain' of the computer because it performs most of the processing calculations and instructions?", 
            options: ["GPU", "RAM", "CPU", "Motherboard"], 
            correctIndex: 2, 
            points: 10 
        },
        { 
            question: "What is the primary operational difference between Random Access Memory (RAM) and a Hard Disk Drive (HDD) or Solid State Drive (SSD)?", 
            options: ["RAM is used only for permanently storing personal files, whereas drives are used only for running applications.", "RAM is fast, temporary, volatile memory for active tasks, whereas a drive is slower, permanent, non-volatile storage.", "There is no difference; RAM and drives are interchangeable terms for the same hardware component.", "RAM is slower than an SSD and retains data even when the computer is turned off, whereas an SSD is faster but loses data when powered down."], 
            correctIndex: 1, 
            points: 15 
        }
    ],
    [
        //Questions in category Computer Networks
		//Questions obtained from GOOGLE
        {   question: "What is the fundamental purpose of an IP (Internet Protocol) address on a network?", 
            options: ["A. It uniquely identifies a device connected to a network so that data can be sent to and from it.", "It acts as the physical hardware identification burned into a network card during manufacturing.", "It encrypts all internet traffic to prevent hackers from intercepting data.", "It measures the maximum physical download speed of an internet connection."], 
            correctIndex: 0, 
            points: 10 
        },
        {   question: "What is the primary role of a router in a computer network?", 
            options: ["A. To display web pages inside a browser interface.", "To forward data packets between different networks.", "C. To store and manage files on a local network.", "To provide power to network devices."], 
            correctIndex: 1, 
            points: 15 
        }
    ],
];

// -----------------------------------------------------------------------------
// 2. HELPER FUNCTIONS
// -----------------------------------------------------------------------------

// Factory function to construct and return a new player object initialized to zero
function createPlayer(playerName, categoryIndex) {
	return { name: playerName, categoryIndex, score: 0, correctCount: 0, incorrectCount: 0 };
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
		const input = prompt.question(questionPrompt).trim();
		choice = Number(input);
		if (input === "" || !Number.isFinite(choice) || choice < min || choice > max) {
			console.log("Invalid choice. Please enter a number between " + min + " and " + max + ".");
		}
	} while (!Number.isFinite(choice) || choice < min || choice > max);
	return choice;
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

// Leaderboard function to be displayed after every question - Ethan
function leaderboard(players) { 
    console.log("\n");
    console.log("=== LEADERBOARD ===");
    for (let i = 0; i < players.length; i++) {
        console.log("Player", i + 1, "(" + players[i].name + ") score:", players[i].score);
    }
}

// Streak function to add up and display the number of consecutive correct answers - Craig
function playerStreak(player){
    if(player.streak > 1){
        console.log(player.name + " is on a streak of " + player.streak);

    }
    if(player.streak > player.highestStreak){
        player.highestStreak = player.streak;
    }
    player.streakScore = player.highestStreak * 5;
}
}

// -----------------------------------------------------------------------------
// 3. MAIN GAME CONTROLLER
// -----------------------------------------------------------------------------

function runQuizGame() {
	printDivider("WELCOME TO THE CE1337 TERMINAL QUIZ");

    // Validate the total number of players (between 1 and 4)
	const totalPlayers = getValidatedChoice(1, 4, "Enter number of players (1-4): ");
	const players = [];

    // Collect each player's name and populate the players array
	for (let i = 0; i < totalPlayers; i++) {
		let name = prompt.question("Enter name for Player " + (i + 1) + ": ");
		while (name.trim() === "") {
			name = prompt.question("Name cannot be blank. Enter name for Player " + (i + 1) + ": ");
		}

        // Allows player's to choose a category
		const categoryPrompt = "Choose a category:\n" + categories.map((category, index) => "  " + (index + 1) + ") " + category).join("\n") + "\n";
		const categoryIndex = getValidatedChoice(1, categories.length, categoryPrompt) - 1;
		players.push(createPlayer(name.trim(), categoryIndex));
	}

        // Main Game Engine: Nested loops iterating over the 2D matrix
        // Outer loop: iterate through each category (matrix rows)
	for (let catIndex = 0; catIndex < categories.length; catIndex++) {
		const categoryPlayers = players.filter((player) => player.categoryIndex === catIndex);
		if (categoryPlayers.length === 0) continue;

		printDivider("CATEGORY " + (catIndex + 1) + ": " + categories[catIndex]);

         // Middle loop: iterate through each question in the category (matrix columns)
		for (let qIndex = 0; qIndex < quizMatrix[catIndex].length; qIndex++) {
			const q = quizMatrix[catIndex][qIndex];

             // Inner loop: rotate through each player so everyone answers the question
			for (let pIndex = 0; pIndex < categoryPlayers.length; pIndex++) {
				const currentPlayer = categoryPlayers[pIndex];

				console.log("\n" + currentPlayer.name + "'s Turn!");
				console.log("Question " + (qIndex + 1) + " (" + q.points + " pts): " + q.question);

                // Display answer options numbered 1 to 4 for the user
				for (let optIndex = 0; optIndex < q.options.length; optIndex++) {
					console.log("  " + (optIndex + 1) + ") " + q.options[optIndex]);
				}

                // Collect user choice and convert from 1-based display to 0-based array index
				const playerSelection = getValidatedChoice(1, q.options.length, "Select option (1-" + q.options.length + "): ");
				
                // Check the answer and update player object statistics
                if (playerSelection - 1 === q.correctIndex) {
					console.log(">> Correct! You earned " + q.points + " points.");
					currentPlayer.score += q.points;
					currentPlayer.correctCount++;
				} else {
					console.log(">> Incorrect! The correct answer was: " + q.options[q.correctIndex]);
					currentPlayer.incorrectCount++;
				}
			}
		}
	}

     // -------------------------------------------------------------------------
    // 4. FINAL RESULTS & LEADERBOARD SUMMARY
    // 
	printDivider("FINAL TOURNAMENT RESULTS");

    // Display summary statistics for each player
	for (let i = 0; i < players.length; i++) {
		const player = players[i];
		console.log("\nPlayer: " + player.name);
		console.log("Final Score:    " + player.score + " points");
		console.log("Correct/Wrong:  " + player.correctCount + " correct, " + player.incorrectCount + " incorrect");
		console.log("Rank:           " + getRankFeedback(player.score));
	}
	printDivider("THANK YOU FOR PLAYING");

// -------------------------------------------------------------------------
// Display winner - Ethan
// -------------------------------------------------------------------------

let currentWinner = "";
let highestScore = 0;
for (let i = 0; i < players.length; i++) {
    if (players[i].score > highestScore) {
        highestScore = players[i].score;
        currentWinner = players[i].name;
    };
};
console.log("\n")
console.log("=== THE WINNER IS! ===");
printDivider(currentWinner);
};
// -------------------------------------------------------------------------
// Rules Function That must be agreed to, to start game - Ethan
// -------------------------------------------------------------------------
function Rules(){
    printDivider("GAME RULES");
    console.log("1. You must not google answers!", "\n2. You must not copy other players answers", "\n3. The winner is who has the most points at the end" );
    let agreement = prompt.question("Do you agree to these rules?\n1.Yes\n2.No\nPlease select an option:" );
    while(agreement != 1){
        console.log("You must agree to the rules! Try again");
        agreement = prompt.question("Do you agree to these rules?\n1.Yes\n2.No\nPlease select an option: ");
    };
    runQuizGame();
}

// Start program execution
Rules();1