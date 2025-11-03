steps

require readline and cache to readline

use readline createInterface method to create object 

assign process.stdin to input
assign process.stdout to output

assign interface to const rl

Initialize gameState object
assign to board an Array of 9 spaces and fill it with null values
assign the current player to X
assign gameOver to false
assign winner to null
assign winningCombo to null

assign all 8 winning combination patterns to an array and assign arrays to const WINNING_COMBINATIONS

create a function called checkForWin that takes an argument of board
test the indexes of board against each combo of WINNING_COMBINATIONS
if three in a row indexes match then return a winner of board`[winning player]`
if there's no winner skip if to next if check if every cell of the board is not null
if no nulls left and no winner then must return winner: 'DRAW', return winningCombo as null
otherwise return winningCombo: null, winningCombo: null


