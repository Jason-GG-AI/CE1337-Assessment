//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CE1337 Programming Bootcamp - Assessment Project: V2 Blind
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const prompt = require ("readline-sync");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1D & 2D Arrays and Objects
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 1D Array used to store quiz category names

const categories = ["Computing History", "JavaScript Basics"];

//2D Array - Rows hold categories, Columns hold questions within the categories

const quizMatrix = [
    //Row 0: Category "Computing History" (Arrays start from ZERO Not 1) 
    [
        {
            //First question in "Computing History"
            question: "Who developed the concept of a universal computing machine in 1936?",
            // Multiple options displayed for user to choose from
            options: ["Alan Turing", "Charles Babbage", "Ada Lovelace", "John von Neumann"],
            // Shows where in the Array the correct answer is stored, in this case it is position 0 (Alan Turing)
            correctIndex: 0,
            // Shows the points assinged for answering correctly
            points: 10
        },
        {
            //Second question in "Computing History"
            question: "What storage medium was commonly used for early IBM computer programs?",
            // Multiple options displayed for user to choose from
            options: ["Magnetic Tape", "Punched Cards", "Floppy Disk", "Cassette"],
            // Shows where in the Array the correct answer is stored, this case it is position 1 (Punched Cards)
            correctIndex: 1,
            // Shows the points assinged for answering correctly
            points: 15
        }
    ],
   // Row 1: Category "JavaScript Basics"
   [
        {
            //First question in "JavaScript Basics"
            question: "Which keyword defines a variable that CANNOT be reassigned?",
            // Multiple options displayed for user to choose from
            options: ["var", "let", "const", "static"],
            // Shows where in the Array the correct answer is stored, this case it is position 2 (Const)
            correctIndex: 2,
            // Shows the points assinged for answering correctly
            points: 10
        },
        {
            //Second question in "JavaScript Basics"
            question: "What does the expression typeof [1, 2, 3] evaluate to in JavaScript?",
            // Multiple options displayed for user to choose from
            options: ["array", "object", "list", "undefined"],
            // Shows where in the Array the correct answer is stored, this case it is position 1 (Object)
            correctIndex: 1,
            // Shows the points assinged for answering correctly
            points: 15
        }
    ]
];

