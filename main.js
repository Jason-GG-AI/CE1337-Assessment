// =============================================================================
// CE1337 Programming Bootcamp - Assessment Project: Console Quiz Game
// =============================================================================

const prompt = require("readline-sync");

function createPlayer(playerName) {
	return { name: playerName, score: 0, correctCount: 0, incorrectCount: 0 };
}

function printDivider(title) {
	console.log("\n========================================");
	console.log("  " + title);
	console.log("========================================");
}

const categories = ["Computing history", "Javascript basics", "Music", "Movies"];

const quizMatrix = [
	[
		{ question: "Who developed the concept of a universal computing machine in 1936?", options: ["Alan Turing", "Charles Babbage", "Ada Lovelace", "John von Neumann"], correctIndex: 0, points: 10 },
		{ question: "What storage medium was commonly used for early IBM computer programs?", options: ["Magnetic Tape", "Punched Cards", "Floppy Disk", "Cassette"], correctIndex: 1, points: 15 }
	],
	[
		{ question: "Which keyword defines a variable that CANNOT be reassigned?", options: ["var", "let", "const", "static"], correctIndex: 2, points: 10 },
		{ question: "What does the expression typeof [1, 2, 3] evaluate to in JavaScript?", options: ["array", "object", "list", "undefined"], correctIndex: 1, points: 15 }
	],
	[
		{ question: "Which country is the birthplace of the musical style known as Reggae?", options: ["Cuba", "Jamaica", "Trinidad and Tobago", "Brazil"], correctIndex: 1, points: 10 },
		{ question: "Which pop star's real name is Stefani Joanne Angelina Germanotta?", options: ["Lady Gaga", "Katy Perry", "Rihanna", "Ariana Grande"], correctIndex: 0, points: 15 }
	],
	[
		{ question: "Which pop rock superstar collaborated with composer Hans Zimmer to write the award-winning songs for Disney's 1994 animated feature The Lion King?", options: ["Phil Collins", "Bryan Adams", "Elton John", "Sting"], correctIndex: 0, points: 10 },
		{ question: "Which legendary composer wrote the iconic, five-note alien communication theme for the 1977 film Close Encounters of the Third Kind?", options: ["Hans Zimmer", "John Williams", "Danny Elfman", "Jerry Goldsmith"], correctIndex: 1, points: 15 }
	]
];

function getValidatedChoice(min, max, questionPrompt) {
	let choice;
	do {
		choice = Number(prompt.question(questionPrompt));
		if (!Number.isInteger(choice) || choice < min || choice > max) {
			console.log("Invalid choice. Please enter a number between " + min + " and " + max + ".");
		}
	} while (!Number.isInteger(choice) || choice < min || choice > max);
	return choice;
}

function getRankFeedback(score) {
	if (score >= 40) return "Gold Tier: Outstanding technical knowledge!";
	if (score >= 20) return "Silver Tier: Solid grasp of foundational concepts.";
	return "Bronze Tier: Keep reviewing lecture slides and labs.";
}

function runQuizGame() {
	printDivider("WELCOME TO THE CE1337 TERMINAL QUIZ");
	const categoryPrompt = "Please select category:\n" + categories.map((category, index) => " Press " + (index + 1) + " for " + category).join("\n") + "\n";
	const catIndex = getValidatedChoice(1, categories.length, categoryPrompt) - 1;
	console.log("You selected " + categories[catIndex]);

	const totalPlayers = getValidatedChoice(1, 4, "Enter number of players (1-4): ");
	const players = [];
	for (let i = 0; i < totalPlayers; i++) {
		let name = prompt.question("Enter name for Player " + (i + 1) + ": ");
		while (name.trim() === "") name = prompt.question("Name cannot be blank. Enter name for Player " + (i + 1) + ": ");
		players.push(createPlayer(name.trim()));
	}

	printDivider("CATEGORY: " + categories[catIndex]);
	for (let qIndex = 0; qIndex < quizMatrix[catIndex].length; qIndex++) {
		const q = quizMatrix[catIndex][qIndex];
		for (const player of players) {
			console.log("\n" + player.name + "'s Turn!");
			console.log("Question " + (qIndex + 1) + " (" + q.points + " pts): " + q.question);
			q.options.forEach((option, index) => console.log("  " + (index + 1) + ") " + option));
			const answer = getValidatedChoice(1, q.options.length, "Select option (1-" + q.options.length + "): ") - 1;
			if (answer === q.correctIndex) {
				console.log(">> Correct! You earned " + q.points + " points.");
				player.score += q.points;
				player.correctCount++;
			} else {
				console.log(">> Incorrect! The correct answer was: " + q.options[q.correctIndex]);
				player.incorrectCount++;
			}
		}
	}

	printDivider("FINAL TOURNAMENT RESULTS");
	for (const player of players) {
		console.log("\nPlayer: " + player.name);
		console.log("Final Score:    " + player.score + " points");
		console.log("Correct/Wrong:  " + player.correctCount + " correct, " + player.incorrectCount + " incorrect");
		console.log("Rank:           " + getRankFeedback(player.score));
	}
	printDivider("THANK YOU FOR PLAYING");
}

runQuizGame();