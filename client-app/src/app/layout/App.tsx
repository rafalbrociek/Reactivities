import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  // dostęp do magazynu danych
  const {activityStore} = useStore();

  // za każdym razem jak komponent się zaktualizuje, to od razu pobiera dane z API
  // drugi pusty argument zapobiega wpadnięciu w nieskończoną pętle
  // bo za każdym razem jak pobrane zostaną dane, komponent jest aktualizowany
  // a jak jest aktualizwoany to na nowo pobiera dane
  useEffect(() => {
      activityStore.loadActivities();
  }, [activityStore])

  // jeśli dane są ładowane
  if(activityStore.loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App);
