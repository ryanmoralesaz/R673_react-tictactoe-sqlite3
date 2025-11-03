// client/src/components/Game/Game.jsx
import { useState } from 'react';
import Board from './Board';
import GameStatus from './GameStatus';
import {
  checkForWin,
  isValidMove,
  applyMove,
  switchPlayer,
  createInitialGameState
} from '../../utils/gameLogic';

export default function Game() {
  // State management with useState
  const [gameState, setGameState] = useState(createInitialGameState());

  // Destructure for easier access
  const { board, currentPlayer, gameOver, winner, winningCombo } = gameState;

  /**
   * Handle when a cell is clicked
   */
  const handleCellClick = (position) => {
    // Ignore clicks if game is over
    if (gameOver) return;

    // Validate the move
    const validation = isValidMove(board, position);
    if (!validation.valid) {
      console.log('Invalid move:', validation.reason);
      return;
    }

    // Apply the move
    const newBoard = applyMove(board, position, currentPlayer);

    // Check for win/draw
    const result = checkForWin(newBoard);

    // Update state
    setGameState({
      board: newBoard,
      currentPlayer: result.winner ? currentPlayer : switchPlayer(currentPlayer),
      gameOver: result.winner !== null,
      winner: result.winner,
      winningCombo: result.winningCombo
    });
  };

  /**
   * Reset the game
   */
  const handleReset = () => {
    setGameState(createInitialGameState());
  };

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>

      <GameStatus
        currentPlayer={currentPlayer}
        winner={winner}
        gameOver={gameOver}
      />

      <Board
        board={board}
        onCellClick={handleCellClick}
        winningCombo={winningCombo}
      />

      <button
        className="reset-button"
        onClick={handleReset}
      >
        New Game
      </button>
    </div>
  );
}
