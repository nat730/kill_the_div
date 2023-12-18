import { useNavigate, useParams } from "react-router-dom";

const EndGame = () => {
  const {timelapsed} = useParams()
  const navigate = useNavigate();

  const handleReplayClick = () => {
    navigate("/game");
  };

  return (
    <div>
      <h2>Partie terminée</h2>
      <p>Temps écoulé : {timelapsed} sec</p>
      <button onClick={handleReplayClick}>Rejouer</button>
    </div>
  );
};

export default EndGame;
