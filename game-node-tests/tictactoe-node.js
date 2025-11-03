// terminal-tictactoe.js
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ============================================
// GAME STATE
// ============================================
const gameState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  gameOver: false,
  winner: null,
  winningCombo: null,
};

// ============================================
// GAME LOGIC FUNCTIONS
// ============================================

const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal \
  [2, 4, 6], // diagonal /
];

function checkForWin(board) {
  // Check all winning combinations
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningCombo: combo,
      };
    }
  }

  // Check for draw (board full, no winner)
  if (board.every((cell) => cell !== null)) {
    return { winner: "DRAW", winningCombo: null };
  }

  // Game still active
  return { winner: null, winningCombo: null };
}

function isValidMove(board, position) {
  // Position must be 0-8
  if (position < 0 || position > 8) {
    return { valid: false, reason: "Position must be between 0-8" };
  }

  // Position must be empty
  if (board[position] !== null) {
    return { valid: false, reason: "Position already occupied" };
  }

  return { valid: true };
}

function applyMove(board, position, player) {
  // Return NEW board (immutability - important for server later)
  const newBoard = [...board];
  newBoard[position] = player;
  return newBoard;
}

function switchPlayer(currentPlayer) {
  return currentPlayer === "X" ? "O" : "X";
}

// ============================================
// DISPLAY FUNCTIONS
// ============================================

function displayBoard(board, winningCombo = null) {
  console.clear();
  console.log("\n  TIC-TAC-TOE\n");

  // Display with position numbers when empty, symbols when filled
  for (let row = 0; row < 3; row++) {
    let rowString = " ";
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      const cell = board[index];

      // If cell is part of winning combo, highlight it
      const isWinningCell = winningCombo && winningCombo.includes(index);

      if (cell === null) {
        // Show position number
        rowString += ` ${index} `;
      } else if (isWinningCell) {
        // Highlight winning cells
        rowString += `[${cell}]`;
      } else {
        rowString += ` ${cell} `;
      }

      if (col < 2) rowString += "|";
    }
    console.log(rowString);
    if (row < 2) console.log("  -----------");
  }
  console.log("");
}

function displayGameResult(result) {
  console.log("=".repeat(40));
  if (result.winner === "DRAW") {
    console.log("  GAME OVER: It's a DRAW!");
  } else {
    console.log(`  GAME OVER: Player ${result.winner} WINS!`);
    console.log(`  Winning combo: ${result.winningCombo.join(", ")}`);
  }
  console.log("=".repeat(40));
}

// ============================================
// GAME LOOP
// ============================================

function promptMove() {
  displayBoard(gameState.board);
  console.log(`Player ${gameState.currentPlayer}'s turn`);

  rl.question('Enter position (0-8) or "q" to quit: ', (input) => {
    // Handle quit
    if (input.toLowerCase() === "q") {
      console.log("Thanks for playing!");
      rl.close();
      return;
    }

    // Parse input
    const position = parseInt(input, 10);

    // Validate input is a number
    if (isNaN(position)) {
      console.log("Invalid input. Please enter a number between 0-8.");
      setTimeout(promptMove, 1000);
      return;
    }

    // Validate move
    const validation = isValidMove(gameState.board, position);
    if (!validation.valid) {
      console.log(`Invalid move: ${validation.reason}`);
      setTimeout(promptMove, 1000);
      return;
    }

    // Apply move
    gameState.board = applyMove(
      gameState.board,
      position,
      gameState.currentPlayer,
    );

    // Check for win/draw
    const result = checkForWin(gameState.board);

    if (result.winner) {
      // Game over
      gameState.gameOver = true;
      gameState.winner = result.winner;
      gameState.winningCombo = result.winningCombo;

      displayBoard(gameState.board, result.winningCombo);
      displayGameResult(result);

      rl.question("\nPlay again? (y/n): ", (answer) => {
        if (answer.toLowerCase() === "y") {
          resetGame();
          promptMove();
        } else {
          console.log("Thanks for playing!");
          rl.close();
        }
      });
    } else {
      // Game continues - switch player
      gameState.currentPlayer = switchPlayer(gameState.currentPlayer);
      promptMove();
    }
  });
}

function resetGame() {
  gameState.board = Array(9).fill(null);
  gameState.currentPlayer = "X";
  gameState.gameOver = false;
  gameState.winner = null;
  gameState.winningCombo = null;
}

// ============================================
// START GAME
// ============================================

console.log("Welcome to Tic-Tac-Toe!");
promptMove();
