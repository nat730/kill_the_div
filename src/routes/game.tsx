import { useState, useEffect, useMemo } from "react";
import "../Game.scss";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { useSound } from "use-sound";
import clickSound from '/sound/Pig.mp3';

const getRandomPosition = () => ({
  top: Math.random() * 90 + "%",
  left: Math.random() * 90   + "%",
});

const Game = () => {
  const [divsClicked, setDivsClicked] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [ping, refresh] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [position, setPosition] = useState(getRandomPosition());
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(undefined);
  const navigate = useNavigate();
  const [playClickSound] = useSound(clickSound);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [accumulator, setaccumulator] = useState(0);

  const timerValue = useMemo(() => {
    const delta = accumulator + (isPaused ? 0 : (Date.now() - startTime) / 1000)
    return parseFloat(delta.toFixed(3))
  }, [ping, startTime, isPaused])

  useEffect(() => {
    setIntervalId(setInterval(() => {
      refresh(Math.random())
    }, 120));
  }, [])

  useEffect(() => {
    if (divsClicked === 10) {
      setGameOver(true);
      clearInterval(intervalId);

      if (window.Notification) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Jeu terminé", {
              body: `Temps écoulé: ${timerValue} sec`,
            });
          }
        });
      }

      const bestScore = localStorage.getItem("bestScore");
      if (!bestScore || parseFloat(bestScore) > timerValue) {
        localStorage.setItem("bestScore", timerValue.toString());
      }

      navigate("/endgame/" + timerValue);
    }
  }, [divsClicked, timerValue, intervalId, navigate]);

  document.addEventListener("visibilitychange", function() {
    if (document.visibilityState !== "visible") {
      setIsPaused(true);
      handlePauseResumeClick()
    }
  });

  
  const handlePauseResumeClick = () => {
    if (isPaused) {
      setStartTime(Date.now())
      setIsPaused(false)
    }
    else {
      setIsPaused(true)
      setaccumulator(timerValue)
      clearInterval(intervalId);
        }
  };

  const handleFullscreenClick = () => {
    const element = document.documentElement;

    if (!document.fullscreenElement) {
      element.requestFullscreen().then(() => setIsFullscreen(true));
    }
  };

  const handleExitFullscreenClick = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
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

  const handleDivClick = () => {
    if (!isPaused) {
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      setDivsClicked(divsClicked + 1);
      setPosition(getRandomPosition());
      playClickSound();
    } 
  };
  

  const handleReplayClick = () => {
    setDivsClicked(0);
    setStartTime(Date.now());
    setGameOver(false);
  };

  return (
    <div className="outer-container">
      <div className="game-container">
        <h1>Jeu</h1>
        <div className="info-container">
          <p>Divs cliquées: {divsClicked}</p>
          <p>Chrono: {timerValue} sec</p>
        </div>
        <button onClick={handleShareClick}>Share</button>
        <button onClick={handlePauseResumeClick}>
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button onClick={isFullscreen ? handleExitFullscreenClick : handleFullscreenClick}>
          {isFullscreen ? "Remove Fullscreen" : "Fullscreen"}
        </button>
  
        {!gameOver ? (
          <div className="inner-container">
            <img
              id="clickable-div"
              src="/image_game/test.jpg"
              alt="Clickable Image"
              onClick={handleDivClick}
              className="clickable-div"
              style={position}
            />
          </div>
        ) : (
          <div className="inner-container">
            <h2>Partie terminée</h2>
            <p>Temps écoulé: {timerValue} sec</p>
            <p>Meilleur score: {localStorage.getItem("bestScore")} sec</p>
            <button onClick={handleReplayClick}>Rejouer</button>
          </div>
        )}
      </div>
    </div>
  );    
};

export default Game;
