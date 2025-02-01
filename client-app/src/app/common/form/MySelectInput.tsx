import { useField } from "formik";
import React from "react";
import { Form, Label, Select } from "semantic-ui-react";

interface Props{
    placeholder: string;
    name: string;
    label?: string;
    options: any
}

export default function MySelectInput(props: Props){
    const [field, meta, helpers] = useField(props.name) // useField jest z Formika
    return (
        /* podwójny !! rzutuje obiekt na boola */
        // meta.touched - czy pole było wizytowane
        <Form.Field error={meta.touched && !!meta.error}> 
            <label>{props.label}</label>
            <Select 
                clearable
                options={props.options}
                value={field.value || null}
                onChange={(e, d) => helpers.setValue(d.value)} // e - event, d - data ustawiamy wartość przy zmianie
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {/* gdy będzie błąd będzie <Label>, w przeciwnym przypadku null*/}
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}