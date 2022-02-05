import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { db } from '../../firebase/firebase-config';
import Swal from 'sweetalert2';
import { getName, getNames, setName } from '../../helper/fetchApi';
import { GetNames } from './GetNames';



export const GrettingScreen = () => {

    const [formValues, handleInputChange, reset, validateInput] = useForm();
    const [check, setCheck] = useState("1");
    const [names, setNames] = useState([])
    const [changeComponent, setChangeComponent] = useState(true)

    const alphabeticComparator = (a, b) =>
        a.id < b.id ? -1 : a.id > b.id ? 1 : 0;

    const handleGreet = async (e) => {
        e.preventDefault()
        await db.collection('saludo').doc().set(formValues)
        validateName(formValues.nombre, idiomasSaludo)
        reset()
    }

    const handleAddBD = async (e) => {
        e.preventDefault()
        saveName(formValues.nombre)
        reset()
    }

    const validateName = (name, language) => {
        getName(name)
            .then(res => {
                res ? Swal.fire(language[check - 1] + ' ' + name) :
                    Swal.fire("No existes en la base de datos")
            }

            ).catch(() => Error)
    }

    const saveName = (name) => {
        setName(name)
            .then(res => {
                res ? Swal.fire("Se guardó correctamente") :
                    Swal.fire("No se guardó correctamente")
            }

            ).catch(() => Error)
    }

    const handleDespedir = (e) => {
        e.preventDefault();
        validateName(formValues.nombre, idiomasDespedida)
        reset()
    }

    const handleName = (e) => {
        e.preventDefault();
        validateName(formValues.nombre, idiomasNombre)
        reset()
    }
    const changeStatus = (e) => {
        setCheck(e.target.value)
    }

    const handleGetNames = (e) => {
        e.preventDefault();
        getNames()
            .then(resp =>
                resp.json()
            )
            .then(data => setNames(data.sort(alphabeticComparator)));

        setChangeComponent(false)

    }

    const idiomasSaludo = [
        "Hello:", "Hola:"
    ]

    const idiomasDespedida = [
        "See you later:", "Hasta luego:"
    ]

    const idiomasNombre = [
        "My name is:", "Mi nombre es:"
    ]
    return <div>
        {changeComponent &&
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
                                value={formValues?.nombre ? formValues?.nombre : ""}

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
                                <div className="hijo"><button disabled={validateInput} onClick={handleAddBD} className='btn btn-primary btn-block buttom'>Guardar</button></div>
                                <div className="hijo"><button onClick={handleGetNames} className='btn btn-primary btn-block buttom'>Consultar</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        }
        {!changeComponent &&
            <GetNames names={names} setNames={setNames} setChangeComponent={setChangeComponent} />
        }

    </div >
};

