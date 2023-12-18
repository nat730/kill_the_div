import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  
    const handleStartClick = () => {
      navigate('/game');
    };
  
    return (
      <div>
        <h1>Accueil</h1>
        <button onClick={handleStartClick}>Start</button>
      </div>
    );
  };

  export default Home