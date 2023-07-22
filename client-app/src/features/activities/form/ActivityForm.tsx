import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit}: Props){

    // jeśli selectedActivity jest undefined, to stwórz nowy pusty obiekt
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    // aktualizacja stanu formularza
    const [activity, setActivity] = useState(initialState);

    // obsługa zatwierdzenia formularza
    function handleSubmit(){
        createOrEdit(activity);
    }

    // zmiana pól formularza pociąga zmianę stanu obiektu activity
    // metoda ta jest za to odpowiedzialna
    // metodzie tej przekazywany jest event z danymi (które pole tekstowe jest uaktualniane)
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        // wyłuskanie z eventu informacji o nazwie kontrolki i wartości
        const {name, value} = event.target;

        // operator ... (spread operator) rozbija obiekt na składowe
        // [name]: value - szuka właściwości o nazwie pod zmienną name
        // i uaktualnia ją o wartość value
        setActivity({...activity, [name]: value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                {/* metodzie handleInputChange domyślnie przekazywane jest zdarzenie */}
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button floated="right" positive type="submit" content="Submit"></Button>
                <Button onClick={closeForm} floated="right" type="button" content="Cancel"></Button>
            </Form>
        </Segment>
    )
}