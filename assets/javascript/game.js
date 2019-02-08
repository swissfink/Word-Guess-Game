var randomAnimals =             // Animal Word list
    [
        "giraffe",
        "lion",
        "rhinoceros",
        "tiger",
        "monkey",
        "penguin",
        "antelope",
        "elephant",
        "bear",
        "owl",
        "otter",
    ];

var maxTries = 12;              // Maximum number of tries a player has
var guessedLetters = [];        // Stores the letters the player guessed
var animalChoice;               // Choice of animal from the array above
var guessingWord = [];          // The word that will be built to match the current animal
var remainingGuesses = 0;       // How many guesses a player has left
var gameStarted = false;        // Flag to tell if the game has started
var hasFinished = false;        // Flag for 'press any key to try again'     
var wins = -1;                  // How many wins a player has
var losses = -1;                // How many losses a player has

// Show start text. 
document.getElementById("pressKeyToStart").style.cssText = "display: block";

// Reset game variables
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    // Hide win / lose / play again / start text.
    document.getElementById("pressKeyToStart").style.cssText = "display: none";
    document.getElementById("pressKeyPlayAgain").style.cssText = "display: none";
    document.getElementById("youwinText").style.cssText = "display: none";
    document.getElementById("youloseText").style.cssText = "display: none";
    
    // Clear out arrays
    guessedLetters = [];
    guessingWord = [];
    
    // Choose an animal from the random animals array.
    animalChoice = Math.floor(Math.random() * (randomAnimals.length));

    // Break out the word into individual letters and replace the letters with dashes.
    for (var i = 0; i < randomAnimals[animalChoice].length; i++) {
        guessingWord.push("_");
    }
    
    // Show display
    updateDisplay();
};

//  Update the display on the HTML Page.
function updateDisplay() {
    
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("totalLosses").innerText = losses;
    document.getElementById("currentWord").innerText = "";
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    
    // Update the progress of the player's guesses.
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
};

// Updates to the word based on the player's guesses.
document.onkeyup = function(event) {
    
    // If player finishes a game, dump one keystroke and reset. (?)
   if(hasFinished) {
        resetGame();
        hasFinished = false;
        
    } else {
        // Check to make sure only a-z is pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

// Once a player starts guessing letters
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        // Check to make sure a player only uses available letters.
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    updateDisplay();
    checkWin();
};

// Finds all instances of a letter in the random animal chosen and replaces them in the guess word.
function evaluateGuess(letter) {
    
    // Array to store positions of letters in the string.
    var positions = [];

    // Loop through word and find all instances of guessed letter, 
    // store the indicies in the "positions" array.
    for (var i = 0; i < randomAnimals[animalChoice].length; i++) {
        if(randomAnimals[animalChoice][i] === letter) {
            positions.push(i);
        }
    }

    // If there are no matches, remove a guess.
    if (positions.length <= 0) {
        remainingGuesses--;

    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        } 
    }
};

function checkWin() {

    // If the player loses
    if (remainingGuesses <= 0) {
        losses++;
        document.getElementById("youloseText").style.cssText = "display: block";
        document.getElementById("pressKeyPlayAgain").style.cssText= "display: block";
        hasFinished = true;
    }
    
    // if the player wins
    if (guessingWord.indexOf("_") === -1) {
        wins++;
        document.getElementById("youwinText").style.cssText = "display: block";
        document.getElementById("pressKeyPlayAgain").style.cssText= "display: block";
        hasFinished = true;
    } 
};