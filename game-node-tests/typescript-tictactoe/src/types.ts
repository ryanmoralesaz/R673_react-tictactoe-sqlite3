export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  gameOver: boolean;
}
