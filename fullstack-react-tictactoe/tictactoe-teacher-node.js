const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Game State
const gameState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  gameOver: false,
  winner: null,
  winningCombo: null,
};

// Game Logic

const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // lefttop to rightbottom
  [2, 4, 6], // topright to botleft
  [(2, 4, 6)], // topright to botleft
];

function checkForWin(board) {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningCombo: combo,
      };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: "DRAW", winningCombo: null };
  }

  return { winner: null, winningCombo: null };
}

// Check for valid moves

// apply player moves
function applyMove(board, position, player) {
  const newBoard = [...board];
  newBoard[position] = player;
  return newBoard;
}

function switchPlayer(currentPlayer) {
  return currentPlayer === "X" ? "O" : "X";
}
//================
// DISPLAY FUNCTIONS
//=================
function displayBoard(board, winningCombo = null) {
  console.clear();
  console.log(` X0X0X0X0XOX\n TIC-TAC-TOE\n X0X0X0X0X0X\n`);

  //display with position numbers when cell is null, player symbols when filled in
  for (let row = 0; row < 3; row++) {
    let rowString = " ";
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      const cell = board[index];

      // If cell is part of winning combo, highlight it
      const isWinningCell = winningCombo && winnigCombo.includes(index);

      if (cell === null) {
        rowString += ` ${index} `;
      } else if (isWinningCell) {
        rowString += `[${cell}]`;
      } else {
        rowString += ` ${cell} `;
      }

      if (col < 2) rowString += "|";
    }
    console.log(rowString);
    if (row < 2) console.log(" --------");
  } // end board for loop
  console.log("");
}
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
  });
}
// Start Game
console.log("Welcome to Tic-Tac-Toe");
promptMove();
