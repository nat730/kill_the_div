import { useState, useEffect } from "react";

const pan = ["pan", "paul","pump","ok","poem","boom","spine"];

const TargetGame = () => {
  const [showTarget, setShowTarget] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognitionInstance = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

      recognitionInstance.onresult = (event) => {
        const last = event.results.length - 1;
        const spokenWord = event.results[last][0].transcript.trim().toLowerCase().replace(/\.$/, '');
        console.log(spokenWord);

        // Utilise includes pour vérifier si la parole reconnue est dans le tableau pan
        if (pan.includes(spokenWord)) {
          setShowTarget(true);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn("SpeechRecognition is not supported in this browser.");
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setShowTarget(false);
      recognition.start();
    }   
  };

  return (
    <div>
      <h1>Target Game</h1>
      <p>Say "pan" to reveal the target!</p>
      <button onClick={startListening}>Start Listening</button>
      {showTarget && <div className="target">🎯</div>}
    </div>
  );
};

export default TargetGame;
