export default function GameStatus({ currentPlayer, winner, gameOver }) {
  if (gameOver) {
    if (winner === "DRAW") {
      return (
        <div>
          <h2>It's a draw</h2>
        </div>
      );
    }
    return (
      <div>
        <h2>Player {winner} Wins!</h2>
      </div>
    );
  }
  return (
    <div>
      <h2>Player {currentPlayer}'s Turn</h2>
    </div>
  );
}
