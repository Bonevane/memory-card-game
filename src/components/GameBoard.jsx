import Card from "./Card";
import "./GameBoard.css";

export default function GameBoard({ pokemons, handleCardClick }) {
  return (
    <div className="game-board">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
          handleCardClick={handleCardClick}
        />
      ))}
    </div>
  );
}
