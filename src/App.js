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

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    //escolha uma categoria aleatória
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    //escolha uma palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  //Iniciando o jogo
  const startGame = useCallback(() => {

    //Limpa as letras
    clearLetterStates();

    //escolha a palavra e escolha a categoria
    const { word, category } = pickWordAndCategory();

    //Criar um array de letras
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //Preencher estados
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //Processando a letra 
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    //Checar se as letras já foram utilizadas
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    //Coloque a letra adivinhada ou remova a letra errada.
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    if (guesses <= 0) {
      //Apagar todo estados
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //Reiniciando o jogo
  const retry = () => {
    setScore(0);
    setGuesses(3);

    setGameStage(stages[0].name);
  }

  //Checando a condição de ganho

  //Renderizando componentes condicionalmente
  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
