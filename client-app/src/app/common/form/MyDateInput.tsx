import { useField } from "formik";
import React, { useState } from "react";
import { Form, Label } from "semantic-ui-react";
import DatePicker, {DatePickerProps} from "react-datepicker";



export default function MyDateInput(props: DatePickerProps){
    const [field, meta, helpers] = useField(props.name!) // useField jest z Formika
    return (
        /* podwójny !! rzutuje obiekt na boola */
        // meta.touched - czy pole było wizytowane
        <Form.Field error={meta.touched && !!meta.error}> 
            <DatePicker 
                date={new Date()}
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                /*onChange={value => helpers.setValue(value)}*/
            />
            {/* gdy będzie błąd będzie <Label>, w przeciwnym przypadku null*/}
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}