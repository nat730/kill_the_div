import { useState, useEffect } from "react";
import "../Game.css";
import { useNavigate } from "react-router-dom";

const getRandomPosition = () => ({
  top: Math.random() * 95 + "%",
  left: Math.random() * 95 + "%",
});

const Game = () => {
  const [divsClicked, setDivsClicked] = useState(0);
  const [_, setStartTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [position, setPosition] = useState(getRandomPosition());
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (divsClicked === 0) {
      setStartTime(Date.now());
  
      setIntervalId(setInterval(() => {
        setStartTime((prevStartTime) => {
          const elapsedSeconds = (Date.now() - prevStartTime) / 1000;
          setTimeElapsed(Number(elapsedSeconds.toFixed(3)));
          return prevStartTime;   
        });
      }, 100));
    }
  }, [divsClicked]);

  useEffect(() => {
    if (divsClicked === 10) {
      setGameOver(true);
      clearInterval(intervalId);
      navigate("/endgame/" + timeElapsed);
    }
  }, [divsClicked]);

  const handleDivClick = () => {
    setDivsClicked(divsClicked + 1);
    setPosition(getRandomPosition());
  };

  const navigate = useNavigate();

  const handleReplayClick = () => {
    setDivsClicked(0);
    setStartTime(Date.now());
    setTimeElapsed(0);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>Jeu</h1>
      <div className="info-container">
        <p>Divs cliquées: {divsClicked}</p>
        <p>Chrono: {timeElapsed} sec</p>
      </div>
      {!gameOver ? (
        <div
          id="clickable-div"
          onClick={handleDivClick}
          className="clickable-div"
          style={position}
        ></div>
      ) : (
        <div>
          <h2>Partie terminée</h2>
          <p>Temps écoulé: {timeElapsed} sec</p>
          <button onClick={handleReplayClick}>Rejouer</button>
        </div>
      )}
    </div>
  );
};

export default Game;
