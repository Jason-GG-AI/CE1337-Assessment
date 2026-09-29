// Initialising variables and arrays
const prompt = require("readline-sync");
let name = [];
let points = [];
// Asking for players names and returning them.
function askNames(){
    let name = prompt.question("Please enter your name: ");
    name.push(name);
};
// Asking how many players then running askNames function to collect names.
function howManyPlayers(){
    let numPlayers = prompt.question("How many players is there? ");
    for(let i=0;i<numPlayers;i++){
        console.log("Player", i+1);
        askNames();
    };
}
// Adding quiz categories

let category = " Please select category:\n Press 1 for Music\n Press 2 for History\n Press 3 for Sport\n Press 4 for Movies\n";
let choice = prompt.question(category);
let score = 0;


if (choice === "1") {
    console.log(" You selected Music");
} else if (choice === "2") {
    console.log("You selected History");
} else if (choice === "3") {
    console.log("You selected Sport");
} else if (choice === "4") {
    console.log("You selected Movies");
} else {
    console.log("Invalid category selection, enter number between 1 - 4");
    choice = prompt.question(category);
}
// Added questions for 1st category

if (choice === "1") {
    let question1_1 = prompt.question("Which artist released the historic, best-selling album Thriller in 1982?\n Press number:\n 1 for Prince\n 2 for Michael Jackson\n 3 for Madonna\n 4 Stevie Wonder\n");

    while (question1_1 < "1" || question1_1 > "4") {
        console.log("Invalid answer selection, enter number between 1 - 4");
        question1_1 = prompt.question("Which artist released the historic, best-selling album Thriller in 1982?\n Press number:\n 1 for Prince\n 2 for Michael Jackson\n 3 for Madonna\n 4 Stevie Wonder\n");
    }
    if (question1_1 === "2") {
        console.log("Correct answer");
        score += 10;
    } else {
        console.log("Incorrect answer, correct answer is Michael Jackson");
    }   score -= 5;

    let question1_2 = prompt.question("How many members were in the legendary British rock band The Beatles?\n Press number:\n 1 if you think it's 3\n 2 if you think it's 4\n 3 if you think it's 5\n 4 if you think it's 6\n");

    while (question1_2 < "1" || question1_2 > "4") {
        console.log("Invalid answer selection, enter number between 1 - 4");
        question1_2 = prompt.question("How many members were in the legendary British rock band The Beatles?\n Press number:\n 1 if you think it's 3\n 2 if you think it's 4\n 3 if you think it's 5\n 4 if you think it's 6\n");
    }
    if (question1_2 === "2") {
        console.log("Correct answer");
        score += 10;
    } else {
        console.log("Incorrect answer, correct answer is 4");
        score -= 5;
    }

    let question1_3 = prompt.question("What is the standard number of keys on a full-size acoustic piano?\n Press number:\n 1 if you think it's 64\n 2 if you think it's 76\n 3 if you think it's 88\n 4 if you think it's 92\n ");

    while (question1_3 < "1" || question1_3 > "4") {
        console.log("Invalid answer selection, enter number between 1 - 4");
        question1_3 = prompt.question("What is the standard number of keys on a full-size acoustic piano?\n Press number:\n 1 if you think it's 64\n 2 if you think it's 76\n 3 if you think it's 88\n 4 if you think it's 92\n ");
    }
    if (question1_3 === "3") {
        console.log("Correct answer");
        score += 10;
    } else {
        console.log("Incorrect answer, correct answer is 88");
        score -= 5;
    }

    let question1_4 = prompt.question("Which pop star's real name is Stefani Joanne Angelina Germanotta?\n Press number:\n 1 for Lady Gaga\n 2 for Katy Perry\n 3 for Rihanna\n 4 for Ariana Grande\n ");

    while (question1_4 < "1" || question1_4 > "4") {
        console.log("Invalid answer selection, enter number between 1 - 4");
        question1_4 = prompt.question("Which pop star's real name is Stefani Joanne Angelina Germanotta?\n Press number:\n 1 for Lady Gaga\n 2 for Katy Perry\n 3 for Rihanna\n 4 for Ariana Grande\n ");
    }
    if (question1_4 === "1") {
        console.log("Correct answer");
        score += 10;
    } else {
        console.log("Incorrect answer, correct answer is Lady Gaga");
        score -= 5;
    }

    let question1_5 = prompt.question("What was the title of Queen's iconic 1975 six-minute operatic rock suite?\n Press number:\n 1 for We Will Rock You\n 2 for Another One Bites the Dust\n 3 for Bohemian Rhapsody\n 4 for Under Pressure\n");

    while (question1_5 < "1" || question1_5 > "4") {
        console.log("Invalid answer selection, enter number between 1 - 4");
        question1_5 = prompt.question("What was the title of Queen's iconic 1975 six-minute operatic rock suite?\n Press number:\n 1 for We Will Rock You\n 2 for Another One Bites the Dust\n 3 for Bohemian Rhapsody\n 4 for Under Pressure\n");
    }
    if (question1_5 === "3") {
        console.log("Correct answer");
        score += 10;
    } else {
        console.log("Incorrect answer, correct answer is Bohemian Rhapsody");
        score -= 5;
    }

    let question1_6 = prompt.question("Which country is the birthplace of the musical style known as Reggae?\n Press number:\n 1 Cuba\n 2 Jamaica\n 3 Trinidad and Tobago\n 4 Brazil\n");

    while (question1_6 < "1" || question1_6 > "4") {
        console.log("Invalid answer selection, enter number between 1 - 4");
        question1_6 = prompt.question("Which country is the birthplace of the musical style known as Reggae?\n Press number:\n 1 Cuba\n 2 Jamaica\n 3 Trinidad and Tobago\n 4 Brazil\n");
    }
    if (question1_6 === "2") {
        console.log("Correct answer");
        score += 10;
    } else {
        console.log("Incorrect answer, correct answer is Jamaica");
        score -= 5;
    }

    let question1_7 = prompt.question("Who is known as the 'King of Rock and Roll'?\n Press number:\n 1 Chuck Berry\n 2 Johny Cash\n 3 Little Richard\n 4 Elvis Presley\n");

    while (question1_7 < "1" || question1_7 > "4") {
        console.log("Invalid answer selection, enter number between 1 - 4");
        question1_7 = prompt.question("Who is known as the 'King of Rock and Roll'?\n Press number:\n 1 Chuck Berry\n 2 Johny Cash\n 3 Little Richard\n 4 Elvis Presley\n");
    }
    if (question1_7 === "4") {
        console.log("Correct answer");
        score += 10;
    } else {
        console.log("Incorrect answer, correct answer is Elvis Presley");
        score -= 5;
    }

    let question1_8 = prompt.question("Which woodwind instrument is traditionally used to play a standard orchestral tuning note (A440)?\n 1 Flute\n 2 Clarinet\n 3 Oboe\n 4 Bassoon\n");

    while (question1_8 < "1" || question1_8 > "4") {
        console.log("Invalid answer selection, enter number between 1 - 4");
        question1_8 = prompt.question("Which woodwind instrument is traditionally used to play a standard orchestral tuning note (A440)?\n 1 Flute\n 2 Clarinet\n 3 Oboe\n 4 Bassoon\n");
    }
    if (question1_8 === "3") {
        console.log("Correct answer");
        score += 10;
    } else {
        console.log("Incorrect answer, correct answer is Oboe");
        score -= 5;
    }

    let question1_9 = prompt.question("What was Taylor Swift's debut country single released back in 2006?\n 1 Tim McGraw\n 2 Love Story\n 3 Teardrops on My Guitar\n 4 Our Song\n");

    while (question1_9 < "1" || question1_9 > "4") {
        console.log("Invalid answer selection, enter number between 1 - 4");
        question1_9 = prompt.question("What was Taylor Swift's debut country single released back in 2006?\n 1 Tim McGraw\n 2 Love Story\n 3 Teardrops on My Guitar\n 4 Our Song\n");
    }
    if (question1_9 === "1") {
        console.log("Correct answer");
        score += 10;
    } else {
        console.log("Incorrect answer, correct answer is Tim McGraw");
        score -= 5;
    }

    let question1_10 = prompt.question("Which hip-hop group released the landmark 1993 album Enter the Wu-Tang (36 Chambers)?\n 1 A Tribe Called Quest\n 2 Wu-Tang Clan\n 3 Outkast\n 4 Public Enemy\n");

    while (question1_10 < "1" || question1_10 > "4") {
        console.log("Invalid answer selection, enter number between 1 - 4");
        question1_10 = prompt.question("Which hip-hop group released the landmark 1993 album Enter the Wu-Tang (36 Chambers)?\n 1 A Tribe Called Quest\n 2 Wu-Tang Clan\n 3 Outkast\n 4 Public Enemy\n");
    }
    if (question1_10 === "2") {
        console.log("Correct answer");
        score += 10;
    } else {
        console.log("Incorrect answer, correct answer is Wu-Tang Clan");
        score -= 5;
    }
}
// Added quiz scoreing system
console.log(name + " you received " + score + " points");
if (score >= 75 && score <= 100) {
    console.log("WEll done, you did great");
} else if (score >= 50 && score <= 74) {
    console.log("well done, you did good");
} else if (score >= 25 && score <= 49) {
    console.log("Well! you got some points");
} else {
    console.log("You need to learn more");
} 

