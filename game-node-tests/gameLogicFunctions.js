// gameLogicFunctions.js
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
function checkForWin(board, WINNING_COMBINATIONS) {
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

function applyMove(board, position, player) {
  const newBoard = [...board]; // make a scoped board as a spread copy of board arg
  newBoard[position] = player; // set the position to the player choice
  return newBoard;
}

function switchPlayer(currentPlayer) {
  return currentPlayer === "X" ? "O" : "X";
}


function isValidMove(board, position) {
  // Position must be 0-8
  if (position < 0 || position > 8) {
    return { valid: false, reason: 'Position must be between 0-8' };
  }
  // Position must be empty
  if (board[position] != null) {
    return { valid: false, reason: 'Position already occupied' };
  }

  return { valid: true }
}

function resetGame() {
  const gameState = {};
  gameState.board = Array(9).fill(null);
  gameState.currentPlayer = "X";
  gameState.gameOver = false;
  gameState.winner = null;
  gameState.winningCombo = null;
  return gameState;
}
module.exports = { checkForWin, applyMove, switchPlayer, isValidMove, resetGame };
