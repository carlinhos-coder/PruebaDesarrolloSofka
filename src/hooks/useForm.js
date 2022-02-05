import { useState } from 'react';


export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);
    const [validateInput, setvalidateInput] = useState(true);

    const reset = () => {
        setValues({
            nombre: ""
        });
        setvalidateInput(true)
    }

    const handleInputChange = ({ target }) => {
        if (target.value.length && target.value !== "") {
            setvalidateInput(false)
        } else {
            setvalidateInput(true)
        }
        setValues({
            ...values,
            nombre: target.value,
        });

    }

    return [values, handleInputChange, reset, validateInput];

}