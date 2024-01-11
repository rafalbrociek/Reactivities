import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";


export default observer(function ActivityDashboard(){

    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    // za każdym razem jak komponent się zaktualizuje, to od razu pobiera dane z API
    // drugi pusty argument zapobiega wpadnięciu w nieskończoną pętle
    // bo za każdym razem jak pobrane zostaną dane, komponent jest aktualizowany
    // a jak jest aktualizwoany to na nowo pobiera dane
    useEffect(() => {
        if(activityRegistry.size <= 1) loadActivities();
    }, [loadActivities, activityRegistry.size])

    // jeśli dane są ładowane
    if(activityStore.loadingInitial) return <LoadingComponent content='Loading...' />


    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})