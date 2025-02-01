import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";

interface Props{
    placeholder: string;
    name: string;
    label?: string;
    type?: string
}

export default function MyTextInput(props: Props){
    const [field, meta] = useField(props.name) // useField jest z Formika
    return (
        /* podwójny !! rzutuje obiekt na boola */
        // meta.touched - czy pole było wizytowane
        <Form.Field error={meta.touched && !!meta.error}> 
            <label>{props.label}</label>
            <input {...field} {...props}></input>
            {/* gdy będzie błąd będzie <Label>, w przeciwnym przypadku null*/}
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}