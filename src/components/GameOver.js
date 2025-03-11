import "./GameOver.css";

//Definição do Componente
const GameOver = ({ retry, score }) => { //recebe duas props
   return (
      <div className="gameover">
         <h1>Fim de jogo!</h1>
         <h2>A sua pontuação foi: <span>{score}</span>!</h2>
         <button onClick={retry}>Reiniciar</button>
      </div>
   );
};

export default GameOver;