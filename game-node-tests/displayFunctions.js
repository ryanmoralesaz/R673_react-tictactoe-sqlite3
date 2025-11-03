// displayFunctions.js
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
      const isWinningCell = winningCombo && winningCombo.includes(index);

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

function displayGameResult(result) {
  console.log("=".repeat(40));
  if (result.winner === 'DRAW') {
    console.log(' GAME OVER: It\'s a DRAW!');
  } else {
    console.log(` GAME OVER: Player ${result.winner} WINS!`);
    console.log(` Winning Combo: ${result.winningCombo.join(', ')}`);
  }
  console.log('='.repeat(40));
}
module.exports = { displayBoard, displayGameResult }
