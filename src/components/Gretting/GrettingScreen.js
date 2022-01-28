import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { db } from '../../firebase/firebase-config';
import Swal from 'sweetalert2';
import { getName } from '../../helper/getName';

export const GrettingScreen = () => {

    const [formValues, handleInputChange, validateInput] = useForm();
    const [check, setCheck] = useState("1");

    const handleGreet = async (e) => {
        e.preventDefault()
        await db.collection('saludo').doc().set(formValues)
        validateName(formValues.nombre, idiomasSaludo)
    }

    const validateName = (name, language) => {
        getName(name)
            .then(res => {
                res ? Swal.fire(language[check - 1] + ' ' + name) :
                    Swal.fire("No existes en la base de datos")
            }

            ).catch(() => Error)
    }

    const handleDespedir = (e) => {
        e.preventDefault();
        validateName(formValues.nombre, idiomasDespedida)
    }

    const handleName = (e) => {
        e.preventDefault();
        validateName(formValues.nombre, idiomasNombre)
    }
    const changeStatus = (e) => {
        setCheck(e.target.value)
    }

    const idiomasSaludo = [
        "Hello", "Hola"
    ]

    const idiomasDespedida = [
        "See you later", "Hasta luego"
    ]

    const idiomasNombre = [
        "My name is", "Mi nombre es"
    ]
    return <div>

        <div className="padre2">
            <div className="hijo2">
                <div className='abs-center'>

                    <form>
                        <h1 className='form_title'>Acá te saludamos por tu nombre</h1>
                        <label className='labels'>Nombre </label>

                        <input
                            type="text"
                            name="nombre"
                            className="mt-10 input"
                            autoComplete="off"
                            onChange={handleInputChange}

                        />
                        {validateInput &&
                            <div className='auth__alert-error'>
                                Debes ingresar nombre
                            </div>
                        }


                        <div className="padre">
                            <div className="hijo">
                                <input id="radio1" value="1" onChange={changeStatus} checked={check === "1" ? true : false} className="form-check-input" type="radio" />
                                <label className="form-check">
                                    Inglés
                                </label></div>
                            <div className="hijo">
                                <input id="radio2" value="2" onChange={changeStatus} checked={check === "2" ? true : false} className="form-check-input" type="radio" />
                                <label className="form-check">
                                    Español
                                </label></div>
                        </div>

                        <div className="padre">
                            <div className="hijo"><button disabled={validateInput} onClick={handleGreet}
                                className='btn btn-primary btn-block buttom'>Saludar</button></div>
                            <div className="hijo"><button disabled={validateInput} onClick={handleName} className='btn btn-primary btn-block buttom'>Nombre</button></div>
                            <div className="hijo"><button disabled={validateInput} onClick={handleDespedir} className='btn btn-primary btn-block buttom'>Despedir</button></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div >
};

