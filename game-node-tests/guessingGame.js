// simple-guess.js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Pick a random number between 1-10
const secretNumber = Math.floor(Math.random() * 10) + 1;
let guessesLeft = 3;

console.log('Guess the number between 1 and 10!');
console.log('You have 3 guesses.\n');

function askForGuess() {
  rl.question(`Guess #${4 - guessesLeft}: `, (input) => {
    const guess = parseInt(input);
    
    // Check the guess
    if (guess === secretNumber) {
      console.log(`🎉 Correct! The number was ${secretNumber}!`);
      rl.close();
    } else {
      guessesLeft--;
      
      if (guessesLeft === 0) {
        console.log(`😞 Game Over! The number was ${secretNumber}.`);
        rl.close();
      } else {
        // Give hint
        if (guess < secretNumber) {
          console.log('Too low! Try higher.\n');
        } else {
          console.log('Too high! Try lower.\n');
        }
        askForGuess(); // Ask again
      }
    }
  });
}

askForGuess();
