// client/src/components/Game/Board.jsx
import Cell from './Cell';

/**
 * The 3x3 game board
 * @param {Array} board - Array of 9 values
 * @param {function} onCellClick - Handler when any cell is clicked
 * @param {Array|null} winningCombo - Indexes of winning cells [0,1,2]
 */
export default function Board({ board, onCellClick, winningCombo }) {
  return (
    <div className="board">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          position={index}
          onClick={() => onCellClick(index)}
          isWinning={winningCombo?.includes(index)}
        />
      ))}
    </div>
  );
}
