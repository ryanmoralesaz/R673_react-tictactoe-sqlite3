import { GameState, Board } from "./types";

function createInitialState(): GameState {
  return {
    board: Array(9).fill(null),
    currentPlayer: "X",
    gameOver: false,
  };
}

function displayBoard(board: Board): void {
  console.clear();
  console.log("\nTic-Tac-Toe\n");
  for (let i = 0; i < 9; i += 3) {
    const row = board
      .slice(i, i + 3)
      .map((cell, idx) => cell || (i + idx).toString());
    console.log(` ${row.join(" | ")}`);
    if (i < 6) console.log(" ------");
  }
  console.log();
}

const gameState = createInitialState();
displayBoard(gameState.board);
