export default function Cell({ value, onClick, isWinning }) {
  return (
    <button
      onClick={onClick}
      className={`cell ${value ? "filled" : ""} ${isWinning ? "winning" : ""}`}
      disabled={value != null}
    >
      {value}
    </button>
  );
}
