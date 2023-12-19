import { useState, useEffect } from "react";

const TargetGame = () => {
  const [showTarget, setShowTarget] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognitionInstance = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

      recognitionInstance.onresult = (event) => {
        const last = event.results.length - 1;
        const spokenWord = event.results[last][0].transcript.trim().toLowerCase();

        if (spokenWord === 'pan') {
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
