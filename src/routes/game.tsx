import { useState, useEffect } from "react";
import "../Game.css";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { useSound } from "use-sound";
import clickSound from '/home/nat/dev/kill_the_div/public/sound/Pig.mp3';

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
  const navigate = useNavigate();
  const [playClickSound] = useSound(clickSound);

  useEffect(() => {
    if (divsClicked === 0) {
      setStartTime(Date.now());

      if ("vibrate" in navigator) {
        navigator.vibrate(200);
      }

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

      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Jeu terminé", {
              body: `Temps écoulé: ${timeElapsed} sec`,
            });
          }
        });
      }

      const bestScore = localStorage.getItem("bestScore");
      if (!bestScore || parseFloat(bestScore) < timeElapsed) {
        localStorage.setItem("bestScore", timeElapsed.toString());
      }

      navigate("/endgame/" + timeElapsed);
    }
  }, [divsClicked, timeElapsed, intervalId, navigate]);

  const handlePauseClick = () => {
    clearInterval(intervalId);
  };

  const handleFullscreenClick = () => {
      document.documentElement.requestFullscreen();
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: "Jouez à ce super jeu!",
        text: "Venez battre mon meilleur score!",
        url: window.location.href,
      });
    }
  };

  const handleInstallClick = () => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      console.log("Le jeu est déjà installé.");
      //@ts-ignore
    } else if (window.navigator.standalone) {
      console.log("Le jeu est déjà installé sur iOS.");
    } else {
      console.log("Installer le jeu...");
    }
  };

  const handleDivClick = () => {
    setDivsClicked(divsClicked + 1);
    setPosition(getRandomPosition());
    playClickSound();
    navigator.vibrate(200);
  };

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
      <button onClick={handlePauseClick}>Pause</button>
      <button onClick={handleFullscreenClick}>Fullscreen</button>
      <button onClick={handleShareClick}>Share</button>
      <button onClick={handleInstallClick}>Install</button>

      {!gameOver ? (
        <img
          id="clickable-div"
          src="/image_game/test.jpg"
          alt="Clickable Image"
          onClick={handleDivClick}
          className="clickable-div"
          style={position}
        />
      ) : (
        <div>
          <h2>Partie terminée</h2>
          <p>Temps écoulé: {timeElapsed} sec</p>
          <p>Meilleur score: {localStorage.getItem("bestScore")} sec</p>
          <button onClick={handleReplayClick}>Rejouer</button>
        </div>
      )}
    </div>
  );
};

export default Game;
