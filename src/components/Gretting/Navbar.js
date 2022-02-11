import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'

export const Navbar = () => {

    const dispatch = useDispatch()
    const { name } = useSelector(state => state.auth)


    const handleLogout = () => {
        dispatch(startLogout())
    }

    return (
        <div className='form__sidebar-navbar'>
            <h3 className='mt-5'>
                <i className='far fa-moon'></i>
                <span>{name}</span>
            </h3>
            <button
                onClick={handleLogout}
                className='btn'>
                LogOut
            </button>
        </div>
    )
}
