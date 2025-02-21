import { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import Scoreboard from "./components/Scoreboard";
import "./App.css";

export default function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [clickedPokemons, setClickedPokemons] = useState(new Set());

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then((response) => response.json())
      .then((data) => {
        const pokemonPromises = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        Promise.all(pokemonPromises).then((pokemonData) => {
          setPokemons(pokemonData);
        });
      });
  }, []);

  const handleCardClick = (id) => {
    if (clickedPokemons.has(id)) {
      setScore(0);
      setClickedPokemons(new Set());
    } else {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) setBestScore(newScore);
      setClickedPokemons(new Set(clickedPokemons).add(id));
    }
    setPokemons((prevPokemons) =>
      [...prevPokemons].sort(() => Math.random() - 0.5)
    );
  };

  return (
    <div className="app">
      <Scoreboard score={score} bestScore={bestScore} />
      <GameBoard pokemons={pokemons} handleCardClick={handleCardClick} />
    </div>
  );
}
