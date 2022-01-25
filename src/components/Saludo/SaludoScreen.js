import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';

export const SaludoScreen = () => {

    const [formValues, handleInputChange] = useForm();

    const { name } = formValues;


    const handleSaludar = (e) => {

        e.preventDefault();
        console.log(formValues)

    }
    return <div>

        <div className="padre2">
            <div className="hijo2">
                <div className='abs-center'>

                    <form onSubmit={handleSaludar}>
                        <h1 className='form_title'>Acá te saludamos por tu nombre</h1>
                        <label className='labels'>Nombre </label>
                        <input
                            type="text"
                            name="nombre"
                            className="mt-10 input"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />

                        <div className="padre">
                            <div className="hijo"><input className="form-check-input" type="radio" />
                                <label className="form-check">
                                    Inglés
                                </label></div>
                            <div className="hijo"><input className="form-check-input" type="radio" />
                                <label className="form-check">
                                    Español
                                </label></div>
                        </div>

                        <div className="padre">
                            <div className="hijo"><button className='btn btn-primary btn-block buttom'>Saludar</button></div>
                            <div className="hijo"><button className='btn btn-primary btn-block buttom'>Nombre</button></div>
                            <div className="hijo"><button className='btn btn-primary btn-block buttom'>Despedir</button></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>



    </div >
};

