const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const gameState = {
  board: Array(20).fill("."),
};

function displayBoard(board) {
  console.clear();
  console.log(`\n PAC-MAN \n`);
  let i = 0;
  let boardString = "";
  for (const dot of board) {
    if (i % 5 === 0) {
      boardString += `\n ${dot}`;
    } else {
      boardString += ` ${dot} ` + "|";
    }
    i++;
  }
  console.log(boardString);
}

function resetGame() {
  gameState.board = Array(9).fill(".");
}
//Game Loop
function promptMove() {
  displayBoard(gameState.board);
  console.log(`Let's move pacman`);
  rl.question('Which way to move? type "<", ">", "^", "v"', (input) => {
    if (input.toLowerCase() === "q") {
      console.log("Thanks for playing!");
      rl.close();
      return;
    }
  });
}
// Start Game
console.log("Welcome to Pacman!");
promptMove();
