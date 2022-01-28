import { useState } from 'react';


export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);
    const [validateInput, setvalidateInput] = useState(true);

    const reset = () => {
        setValues({
            nombre: ""
        });
    }

    const handleInputChange = ({ target }) => {
        if (target.value.length) {
            setvalidateInput(false)
        } else {
            setvalidateInput(true)
        }
        setValues({
            ...values,
            [target.name]: target.value
        });

    }

    return [values, handleInputChange, reset, validateInput];

}