//Importações
import { useCallback, useEffect, useState } from "react";

// Importação dos componentes da tela inicial, do jogo e da tela de game over.
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// Importação de arquivo de estilos
import "./App.css";

// Importação de lista de palavras categorizadas
import { wordsList } from "./data/words";

//Definição dos estágios do jogo
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  //Controla em qual estágio o jogo está
  const [gameStage, setGameStage] = useState(stages[0].name);
  //Armazena a lista de palavras importada.
  const [words] = useState(wordsList);

  //Guarda a palavra escolhida, sua categoria e suas letras separadas
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]); //Letras acertadas
  const [wrongLetters, setWrongLetters] = useState([]); //Letras erradas
  const [guesses, setGuesses] = useState(3); //Número de tentativas restantes
  const [score, setScore] = useState(0); //Pontuação do jogador


  //Escolha da palavra e categoria
  const pickWordAndCategory = useCallback(() => {
    // Escolhe uma categoria aleatória
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Escolhe uma palavra aleatória dentro dessa categoria
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    //Retorna um objeto
    return { category, word };
  }, [words]);


  //Início do jogo
  const startGame = useCallback(() => {
    // Limpa as letras
    clearLettersStates();

    // Escolhe uma palavra e separa suas letras
    const { category, word } = pickWordAndCategory();
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //Define os estados necessários
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    //Muda o jogo para a fase "game"
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);


  // Verificação da letra
  const verifyLetter = (letter) => {
    //Normaliza a letra
    const normalizedLetter = letter.toLowerCase();

    //Verifica se a letra já foi usada
    if (
      guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // Adiciona à lista correta (guessedLetters ou wrongLetters)
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      //Se errar, reduz o número de tentativas
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };


  // Reiniciar o jogo - reseta a pontuação e as tentativas, retorna para a tela inicial
  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  // Função auxiliar para limpar estados, esvazia as listas de letras acertadas e erradas
  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // Efeito: Verificar fim de tentativas
  useEffect(() => {
    //Se guesses chegar a zero, muda para a fase de "end"(game over)
    if (guesses === 0) {
      clearLettersStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Efeito: Verificar vitória
  useEffect(() => {
    //Só roda se já estivermos no jogo (correção)
    if (gameStage !== "game") return;
    //Cria um conjunto de letras únicas
    const uniqueLetters = [...new Set(letters)];

    // Se o número de letras acertadas for igual ao de letras únicas, o jogador venceu
    if (guessedLetters.length === uniqueLetters.length) {
      // Aumenta a pontuação
      setScore((actualScore) => (actualScore += 100));

      // Inicia um novo jogo (correção)
      setTimeout(() => startGame(), 500);

    }
  }, [guessedLetters, letters, startGame, gameStage]);

  //Renderização do componente
  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />)}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

//"start" → StartScreen
//"game" → Game
//"end" → GameOver
export default App;