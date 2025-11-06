// client/src/components/Game/Cell.jsx

/**
 * Single cell in the tic-tac-toe board
 * @param {string|null} value - "X", "O", or null
 * @param {function} onClick - Handler when cell is clicked
 * @param {boolean} isWinning - Is this cell part of winning combo?
 * @param {number} position - 0-8 for debugging
 */
export default function Cell({ value, onClick, isWinning, position }) {
  return (
    <button
      className={`cell ${value ? "filled" : ""} ${isWinning ? "winning" : ""}`}
      onClick={onClick}
      disabled={value !== null}
      aria-label={`Cell ${position}, ${value || "empty"}`}
    >
      {value}
    </button>
  );
}
