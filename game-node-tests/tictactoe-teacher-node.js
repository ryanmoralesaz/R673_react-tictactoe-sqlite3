// main-tictactoe.js
const readline = require("readline");
const { checkForWin, applyMove, switchPlayer, resetGame, isValidMove } = require('./gameLogicFunctions.js');
const { displayBoard, displayGameResult } = require('./displayFunctions.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Game State
const gameState = resetGame();

//===========
// Game Logic
//===========
// WINNING_COMBINATIONS: arr
// checkForWin: takes board
// applyMove
// switchPlayer
// isValidMove: Check for valid moves
//================
// DISPLAY FUNCTIONS
//=================
// displayBoard // show the board in the terminal
//=================
// Game Loop Logic
//================
function promptMove() {
  displayBoard(gameState.board);
  console.log(`Player ${gameState.currentPlayer}'s turn`);

  rl.question('Enter position (0-8) or "q" to quit: ', (input) => {
    // handle quit
    if (input.toLowerCase() === "q") {
      console.log("Thanks for playing!");
      rl.close();
      return;
    }
    // Parse input
    const position = parseInt(input, 10);
    // validate position is a number
    if (isNaN(position)) {
      console.log('Invalid input. Please enter a number between 0-8');
      setTimeout(promptMove, 1000);
      return;
    }
    // validate the move
    const validation = isValidMove(gameState.board, position);
    if (!validation.valid) {
      console.log(`Invalid move: ${validation.reason}`);
      setTimeout(promptMove, 1000);
      return;
    }

    // Apply move
    gameState.board = applyMove(gameState.board, position, gameState.currentPlayer);

    // check for win or draw
    const result = checkForWin(gameState.board);

    if (result.winner) { // x or o or draw wins
      gameState.gameOver = true;
      gameState.winner = result.winner;
      gameState.winningCombo = result.winningCombo;
      displayBoard(gameState.board, result.winningCombo);
      displayGameResult(result);

      rl.question('\nPlay again? (y/n): ', (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
          resetGame();
          promptMove();
        } else {
          console.log('Thanks for playing!');
          rl.close();
        }
      });
    } else { // game continues
      gameState.currentPlayer = switchPlayer(gameState.currentPlayer);
      promptMove();
    }
  });
}
// =========
// Start Game
// =========
console.log("Welcome to Tic-Tac-Toe");
promptMove();
