import { useEffect, useState } from "react";

const useValidate = (initialState, validate, func) => {

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [ submitForm, setSubmitForm ] = useState(false);

    useEffect(()=>{
        if( submitForm ) {
            const noErrors = Object.keys(errors).length === 0;

            if( noErrors ) {
                func(); //* Login, sign on, etc
            }

            setSubmitForm(false);
        }
    },[errors]);

    //* Func running while user writing something
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    //* Func when user submits info
    const handleSubmit = e => {
        e.preventDefault();

        const errorsValidate = validate(values);
        setErrors(errorsValidate);
        setSubmitForm(true);
    }

    //* Blur event
    const handleBlur = () => {
        const errorsValidate = validate(values);
        setErrors(errorsValidate);
    }

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        handleBlur
    }
}
 
export default useValidate;