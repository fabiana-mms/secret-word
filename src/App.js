//CSS
import './App.css';

//REACT
import { useCallback, useEffect, useState } from "react";

//DATA
import { wordsList } from "./data/words";

//COMPONENTS
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

//Criando as fases do jogo
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
];

function App() {
  //Criando o estado do jogo
  const [gameStage, setGameStage] = useState(stages[0].name);
  //Criando um estado para as palavras
  const [words] = useState(wordsList);

  //Iniciando o jogo
  const startGame = () => {
    setGameStage(stages[1].name);
  };

  //Processando a letra 
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }

  //Reiniciando o jogo
  const retry = () => {
    setGameStage(stages[0].name);
  }

  //Renderizando componentes condicionalmente
  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
