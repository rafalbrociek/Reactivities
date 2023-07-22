import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import {Activity} from '../models/activity'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  // zmienna activities trzyma tablicę aktywności
  // funkcja setActivities ustawia tę tablicę
  // używamy typescript i w useState mówimy, że activities będzie tablicą obiektów typu Activity
  const [activities, setActivities] = useState<Activity[]>([]);

  // selectedActivity trzyma stan wybranej aktywności
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  // czy jesteśmy w trybie edycji formularza
  const [editMode, setEditMode] = useState(false);

  // za każdym razem jak komponent się zaktualizuje, to od razu pobiera dane z API
  // drugi pusty argument zapobiega wpadnięciu w nieskończoną pętle
  // bo za każdym razem jak pobrane zostaną dane, komponent jest aktualizowany
  // a jak jest aktualizwoany to na nowo pobiera dane
  useEffect(() => 
  {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => 
        {
          setActivities(response.data);
        })
  }, [])

  function handleSelectActivity(id: string){
    // find zwraca aktywność o danym id - przekazanym jako parametr funkcji
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity)
  {
    // jeśli id istnieje, to edytujemy aktwyność,
    // w przeciwnym razie dodajemy nową
    activity.id
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) // filtruj wszystkie oprócz uaktualnianej, po czym dodaj uaktualnioną
      : setActivities([...activities, {...activity, id: uuid()}]);
      setEditMode(false);
      setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
         />
      </Container>
    </Fragment>
  );
}

export default App;
