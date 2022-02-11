import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useFormLogIn } from '../../hooks/useFormLogIn';
const images = require.context('../../assets/img', true);


export const LoginScreen = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useFormLogIn({
        email: 'carlos2@yopmail.com',
        password: '1234567'

    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password))
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }

    return (
        <div>
            <div className='auth__img-login'>
                <img src={images(`./log.PNG`)} className='auth__img' alt='' />
            </div>

            <h3 className='auth__title'>
                LogIn
            </h3>
            <form onSubmit={handleLogin}>

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

                <button
                    className='btn btn-primary btn-block'
                    type='submit'
                    disabled={loading}
                >
                    LogIn
                </button>

                <hr />
                <div className='auth__social-networks'>
                    <p>Login with social network</p>
                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className='link' >
                    Create new Account
                </Link>
            </form>
        </div>
    )
}
