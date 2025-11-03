// server/src/routes/game.routes.js
import express from 'express';
import {
  createGame,
  getGame,
  makeMove,
  getAllGames,
  deleteGame
} from '../services/gameService.js';

const router = express.Router();

/**
 * POST /api/games
 * Create a new game
 */
router.post('/', (req, res) => {
  try {
    // For now, use a dummy player ID (will become JWT user ID later)
    const playerId = req.body.playerId || 'player-temp-id';
    const game = createGame(playerId);
    
    res.status(201).json({
      success: true,
      game
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/games/:id
 * Get game state
 */
router.get('/:id', (req, res) => {
  try {
    const game = getGame(req.params.id);
    
    if (game.error) {
      return res.status(game.status).json({
        success: false,
        error: game.error
      });
    }
    
    res.json({
      success: true,
      game
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/games/:id/move
 * Make a move
 */
router.post('/:id/move', (req, res) => {
  try {
    const { position, player } = req.body;
    
    // Validate request body
    if (position === undefined || !player) {
      return res.status(400).json({
        success: false,
        error: 'Missing position or player'
      });
    }
    
    const result = makeMove(req.params.id, position, player);
    
    if (result.error) {
      return res.status(result.status).json({
        success: false,
        error: result.error
      });
    }
    
    res.json({
      success: true,
      game: result.game,
      gameResult: result.gameResult
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/games
 * Get all games (debugging endpoint)
 */
router.get('/', (req, res) => {
  try {
    const games = getAllGames();
    res.json({
      success: true,
      games,
      count: games.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * DELETE /api/games/:id
 * Delete a game
 */
router.delete('/:id', (req, res) => {
  try {
    const deleted = deleteGame(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Game not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Game deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
