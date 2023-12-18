import { useState, useEffect } from "react";
import "../Game.css";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { useSound } from "use-sound";
import clickSound from '/sound/Pig.mp3';

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);



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

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    const handleInterval = () => {
      setStartTime((prevStartTime) => {
        const elapsedSeconds = (Date.now() - prevStartTime) / 1000;
        setTimeElapsed(Number(elapsedSeconds.toFixed(3)));
        return prevStartTime;
      });
    };
    
    if (!isPaused) {
      intervalId = setInterval(handleInterval, 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPaused]); 

  const handlePauseResumeClick = () => {
    setIsPaused(!isPaused);
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

  const handleInstallClick = () => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      console.log("Le jeu est déjà installé en mode standalone.");
      //@ts-ignore
    } else if (window.navigator.standalone) {
      console.log("Le jeu est déjà installé sur iOS.");
    } else {
      installApp();
    }
  };

  const installApp = () => {
      if (confirm("Installer le jeu?")) {
      addToHomeScreen();
    }
  };
  

  const addToHomeScreen = () => {
    const link = document.createElement("link");
    link.rel = "apple-touch-icon";
    link.href = "/path/to/icon.png";
    document.head.appendChild(link);
      const manifest = {
      short_name: "Nom Court",
      name: "Nom Complet",
      icons: [
        {
          src: "/assets/icons",
          sizes: "192x192",
          type: "image/png",
        },
      ],
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
    };
  
    const jsonManifest = JSON.stringify(manifest);
    const blob = new Blob([jsonManifest], { type: "application/json" });
    const manifestFile = URL.createObjectURL(blob);
  
    const manifestLink = document.createElement("link");
    manifestLink.rel = "manifest";
    manifestLink.href = manifestFile;
    document.head.appendChild(manifestLink);
  
    console.log("Le jeu a été ajouté à l'écran d'accueil.");
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
      <button onClick={handleShareClick}>Share</button>
      <button onClick={handleInstallClick}>Install</button>
      <button onClick={handlePauseResumeClick}>
        {isPaused ? "Resume" : "Pause"}
      </button>
      <button onClick={isFullscreen ? handleExitFullscreenClick : handleFullscreenClick}>
        {isFullscreen ? "Remove Fullscreen" : "Fullscreen"}
      </button>
      


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
