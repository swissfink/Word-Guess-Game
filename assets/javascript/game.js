//Game Start
var newGame = true;


// Creating variables to hold the number of wins, losses, and guesses left.
var wins = 0;
var losses = 0;
var guessesLeft = 12;

// Create variables that hold references to the places in the HTML where we want to display things.
var directionsText = document.getElementById("directions-text");
var computerGuessText = document.getElementById("computerguess-text");
var userguessText = document.getElementById("userguess-text");
var guessesLeftText = document.getElementById("guessesleft-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");

//Array to capture user letter input
var guessList = []; 

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

// Determines which key was pressed.
var userGuess = event.key; 

//This is to capture the letters entered by the user 
guessList.push(userGuess);    


//for a new game

    if(newGame == true) {

      // Creates an array that lists out all of the computer's options.
      var computerChoices = ["giraffe", "elephant", "tiger", "rhinoceros", "lion", "penguin", "monkey", "walrus"];

      // Randomly chooses a choice from the options array. This is the Computer's guess.
      // var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

      var computerGuess = "monkey";

      // Count out how many letters are in the computer guess.
      var wordArray = computerGuess.split('');
      var wordLength = wordArray.length;
      console.log(wordLength);

      // Create variable to store dashes
      var animalDash = " ";

      // Convert the letters in animal name guessed by the computer to dashes
      for (var i = 0; i <= wordLength; i++) {
        animalDash += "<span id='dash-"+i+"'>-</span>";
      }

      // Hide the directions
      directionsText.textContent = "";

      // Show wins and losses
      winsText.textContent = "Wins: " + wins;
      lossesText.textContent = "Losses: " + losses;

      // Display a new animal name to guess
      computerGuessText.innerHTML = "Animal: " + animalDash;
    }

    newGame = false;

  // To reset game after there is a win or loss
  function reset() {
  (guessesLeft = 12);
  (guessList = []);
  }

  // This logic determines the outcome of the game (win/loss), and increments the appropriate number
  
  if (userGuess === "a" ||  "b" || "c" ||  "d" || "e" || "f" || "g" || "h" || "i" || "j" || "k" || "l" ||  "m" ||  "n" ||  "o" || "p" || "q" || "r" || "s" ||  "t" || "u" ||  "v" || "w" ||  "x" || "y" || "z") {

      for(var n = 0; n < wordLength; n++) {
        if (userGuess == wordArray[n]){
          document.getElementById("dash-"+n).textContent=userGuess;
        }

      }




      if (userGuess === computerGuess) {
          wins++;
          reset ();
      } else if (userGuess !== computerGuess) {
          guessesLeft--;
      }
      if (guessesLeft === 0) {
          losses++;
          reset ();
      }
  }

  // Display the user guesses, and wins / losses / guesses left / guesses so far.
  userguessText.textContent = "Letters already guessed: " + guessList.join(", ");
  guessesLeftText.textContent = "Guesses Left: " + guessesLeft;
};
