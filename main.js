// =============================================================================
// CE1337 Programming Bootcamp - Assessment Project: Console Quiz Game
// =============================================================================

const prompt = require("readline-sync");

// 1D array of quiz categories, corresponding to rows in quizMatrix.
const categories = ["Computing History", "JavaScript Basics", "Music", "Movies"];

// Rows represent categories; each question object stores its options and answer.
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
        // Questions in category Music
		// Questions obtained from GOOGLE
        {   
            question: "Which country is the birthplace of the musical style known as Reggae?", 
            options: ["Cuba", "Jamaica", "Trinidad and Tobago", "Brazil"], 
            correctIndex: 1, 
            points: 10 
        },
        { 
            question: "Which pop star's real name is Stefani Joanne Angelina Germanotta?", 
            options: ["Lady Gaga", "Katy Perry", "Rihanna", "Ariana Grande"], 
            correctIndex: 0, 
            points: 15 
        }
    ],
    [
        //Questions in category Movies
		//Questions obrained from GOOGLE
        {   question: "Which pop rock superstar collaborated with composer Hans Zimmer to write the award-winning songs for Disney's 1994 animated feature The Lion King?", 
            options: ["Phil Collins", "Bryan Adams", "Elton John", "Sting"], 
            correctIndex: 2, 
            points: 10 
        },
        {   question: "Which legendary composer wrote the iconic, five-note alien communication theme for the 1977 film Close Encounters of the Third Kind?", 
            options: ["Hans Zimmer", "John Williams", "Danny Elfman", "Jerry Goldsmith"], 
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

        // Let players choose a category
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
}

// Start program execution
runQuizGame();