import React, { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { CategoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import {v4 as uuid} from 'uuid'

export default observer(function ActivityForm(){

    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '2024-05-18',
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is requiered.'),
        description: Yup.string().required('The activity description is requiered.'),
        category: Yup.string().required(),
        date: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required()
    })

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    // obsługa zatwierdzenia formularza
     function handleFormSubmit(activity: Activity){
        if(!activity.id){
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
        else{
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    } 

    // zmiana pól formularza pociąga zmianę stanu obiektu activity
    // metoda ta jest za to odpowiedzialna
    // metodzie tej przekazywany jest event z danymi (które pole tekstowe jest uaktualniane)
    /* function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        // wyłuskanie z eventu informacji o nazwie kontrolki i wartości
        const {name, value} = event.target;

        // operator ... (spread operator) rozbija obiekt na składowe
        // [name]: value - szuka właściwości o nazwie pod zmienną name
        // i uaktualnia ją o wartość value
        setActivity({...activity, [name]: value})
    } */

    if(loadingInitial) return <LoadingComponent content="Loading activity ..." />

    return(
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className="ui form" onSubmit={handleSubmit}>
                        {/* metodzie handleInputChange domyślnie przekazywane jest zdarzenie */}
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea rows={3} placeholder='Description'  name='description'  />
                        <MySelectInput options={CategoryOptions} placeholder='Category'  name='category'  />
                        <MyTextInput 
                            placeholder='Date'  
                            name='date'
                              />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='City'  name='city'  />
                        <MyTextInput placeholder='Venue'  name='venue'  />
                        <Button
                            disabled={isSubmitting || !isValid || !dirty}
                            loading={loading} floated="right" positive type="submit" content="Submit"></Button>
                        <Button as={Link} to='/activities' floated="right" type="button" content="Cancel"></Button>
                    </Form>
                )}
            </Formik>
            
        </Segment>
    )
})


