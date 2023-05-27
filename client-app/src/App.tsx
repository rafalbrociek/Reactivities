import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  // zmienna activities trzyma tablicę aktywności
  // funkcja setActivities ustawia tę tablicę
  const [activities, setActivities] = useState([]);

  // za każdym razem jak komponent się zaktualizuje, to od razu pobiera dane z API
  // drugi pusty argument zapobiega wpadnięciu w nieskończoną pętle
  // bo za każdym razem jak pobrane zostaną dane, komponent jest aktualizowany
  useEffect(() => 
  {
    axios.get('http://localhost:5000/api/activities')
      .then(response => 
        {
          console.log(response);
          setActivities(response.data);
        })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {activities.map((activity: any) => 
          (
            <li key={activity.id}>
              {activity.title}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
