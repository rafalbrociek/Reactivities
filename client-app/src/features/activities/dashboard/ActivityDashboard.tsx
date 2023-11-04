import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer(function ActivityDashboard(){

    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {/* Ważne. Ponieważ React najpierw ładuje wszystkie komponenty i próbuje je wyświetlić*/}
                {/* przekazywany do komponentu <ActivityDetails> obiekt activities[0] */}
                {/* może nie istnieć, stąd dodajemy warunek i łączymy go operatorem && */}
                {/* Wyświetl komponent dopiero jak obiekt activities[0] będzie zdefiniowany */}
                {selectedActivity && !editMode &&
                    <ActivityDetails />}
                {editMode && 
                    <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})