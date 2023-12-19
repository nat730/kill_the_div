import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userCountry, setUserCountry] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`)
        .then((response) => response.json())
        .then((data) => {
          const country = data.city;
          setUserCountry(country);
        })
    },
  );
}, [])

  const handleStartClick = () => {
    navigate('/game');
  };

  return (
    <div>
      <h1>Accueil</h1>
      <p>Bonjour, tu habites à {userCountry}</p>
      
      <button onClick={handleStartClick}>Start</button>
    </div>
  );
};

export default Home;
