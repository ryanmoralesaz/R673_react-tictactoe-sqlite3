// server/src/services/gameService.js
import { v4 as uuidv4 } from 'uuid';
import {
  checkForWin,
  isValidMove,
  applyMove,
  switchPlayer,
  createInitialGameState
} from '../utils/gameLogic.js';

const games = new Map();

export function createGame(playerId) {
  const gameId = uuidv4();
  const gameState = {
    id: gameId,
    player1Id: playerId,
    player2Id: null,
    ...createInitialGameState(),
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
  games.set(gameId, gameState);
  return gameState;
}

// Get Game By Id
export function getGame(gameId) {
  const game = games.get(gameId);
  if (!game) {
    return {
      error: 'Game not found',
      status: 404
    }
  }
  return game;
}

// make mave in game
export function makeMove(gameId, position, player) {
  const game = games.get(gameId);
  if (!game) {
    return {
      error: 'Game not found',
      status: 404
    };
  }

  if (game.gameOver) {
    return { error: 'Game is already over', status: 400 };
  }

  if (player !== game.currentPlayer) {
    return { error: `It's not ${player}'s turn`, status: 400 }
  }

  const validation = isValidMove(game.board, position);
  if (!validation.valid) {
    return { error: validation.reason, status: 400 }
  }

  // Apply move
  game.board = applyMove(game.board, position, player);

  // Check for win/draw
  const result = checkForWin(game.board);

  if (result.winner) {
    game.gameOver = true;
    game.winner = result.winner;
    game.winningCombo = result.winningCombo;
  } else {
    game.currentPlayer = switchPlayer(game.currentPlayer);
  }

  game.updatedAt = Date.now();

  return {
    game,
    gameResult: result.winner ? result : null
  };
}

/**
 * Get all games (for debugging)
 */
export function getAllGames() {
  return Array.from(games.values());
}

/**
 * Delete a game
 */
export function deleteGame(gameId) {
  return games.delete(gameId);
}

