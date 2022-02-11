import React from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { useFormLogIn } from '../../hooks/useFormLogIn';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useFormLogIn({
        name: 'carlos',
        email: 'carlos@yopmail.com',
        password: '123456',
        password2: '123456'

    });

    const { name, email, password, password2 } = formValues;



    const handleRegister = (e) => {
        e.preventDefault();
        console.log(name)
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }

    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Name is required'))
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email no valid'))
            return false;
        } else if (password !== password2 || password < 5) {
            dispatch(setError('Pass no valid,min 6 characters'))
            return false;
        }

        dispatch(removeError());

        return true
    }

    return (
        <div>
            <h3 className='auth__title'>
                Register
            </h3>
            <form onSubmit={handleRegister}>

                {
                    (
                        msgError &&
                        <div className='auth__alert-error'>
                            {msgError}
                        </div>
                    )
                }

                <input
                    className='auth__input'
                    type='text'
                    placeholder='Name'
                    name='name'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    className='auth__input'
                    type='text'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    className='auth__input'
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    className='auth__input'
                    type='password'
                    placeholder='Confirm password'
                    name='password2'
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    className='btn btn-primary btn-block mb-5'
                    type='submit'

                >
                    Register
                </button>



                <Link to="/auth/login" className='link mt-5' >
                    Already registered?
                </Link>
            </form>
        </div>
    )

}
