import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  // zmienna activities trzyma tablicę aktywności
  // funkcja setActivities ustawia tę tablicę
  const [activities, setActivities] = useState([]);

  // za każdym razem jak komponent się zaktualizuje, to od razu pobiera dane z API
  // drugi pusty argument zapobiega wpadnięciu w nieskończoną pętle
  // bo za każdym razem jak pobrane zostaną dane, komponent jest aktualizowany
  // a jak jest aktualizwoany to na nowo pobiera dane
  useEffect(() => 
  {
    axios.get('http://localhost:5000/api/activities')
      .then(response => 
        {
          setActivities(response.data);
        })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
        <List>
          {activities.map((activity: any) => 
          (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
