import { useState, useRef } from "react";

// styles
import "./Game.css";

//Definição do Componente que recebe várias props
const Game = ({ verifyLetter, pickedCategory, pickedWord, letters, guessedLetters, wrongLetters, guesses, score, }) => {

   //Armazena a letra digitada pelo jogador
   const [letter, setLetter] = useState("");
   //Referência para o campo de entrada, permitindo dar foco automaticamente após cada tentativa
   const letterInputRef = useRef(null);

   const handleSubmit = (e) => {
      //Impede o recarregamento da página
      e.preventDefault();

      //Chama verifyLetter(letter), que verifica se a letra está correta.
      verifyLetter(letter);

      //Reseta o campo de input
      setLetter("");

      //Foca novamente no input
      letterInputRef.current.focus();
   };

   return (
      <div className="game">
         <p className="points">
            <span>Pontuação</span>: {score}
         </p>
         <h1>Advinhe a palavra:</h1>
         <h3 className="tip">
            Dica sobre a palavra: <span>{pickedCategory}</span>
         </h3>
         <p>Você ainda tem {guesses} tentativa(s).</p>

         {/*Exibição da palavra oculta*/}
         <div className="wordContainer">
            {letters.map((letter, i) =>
               guessedLetters.includes(letter) ? (
                  <span className="letter" key={i}>
                     {letter}
                  </span>
               ) : (
                  <span key={i} className="blankSquare"></span>
               )
            )}
         </div>

         {/*Campo para digitar uma letra*/}
         <div className="letterContainer">
            <p>Tente adivnhar uma letra da palavra:</p>
            <form onSubmit={handleSubmit}>
               <input type="text" name="letter" maxLength="1" onChange={(e) => setLetter(e.target.value)} required value={letter} ref={letterInputRef} />
               <button>Jogar!</button>
            </form>
         </div>

         {/*Exibição de letras erradas*/}
         <div className="wrongLettersContainer">
            <p>Letras já utilizadas:</p>
            {wrongLetters.map((letter, i) => (
               <span key={i}>{letter}, </span>
            ))}
         </div>
      </div>
   );
};

export default Game;