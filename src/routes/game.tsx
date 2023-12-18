import { useState, useEffect } from "react";
import "../Game.css";

const getRandomPosition = () => ({
  top: Math.random() * 95 + "%",
  left: Math.random() * 95 + "%",
});

const Game = () => {
  const [divsClicked, setDivsClicked] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [position, setPosition] = useState(getRandomPosition());

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (divsClicked === 0) {
      setStartTime(Date.now());
      intervalId = setInterval(() => {
        const elapsedSeconds = (Date.now() - startTime) / 1000;
        setTimeElapsed(elapsedSeconds);
      }, 100);
    }

    if (divsClicked === 10) {
      setGameOver(true);
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [divsClicked, startTime]);

  const handleDivClick = () => {
    setDivsClicked(divsClicked + 1);
    setPosition(getRandomPosition());
  };

  const handleReplayClick = () => {
    setDivsClicked(0);
    setStartTime(0);
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
