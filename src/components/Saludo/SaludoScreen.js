import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { db } from '../../firebase/firebase-config';
import Swal from 'sweetalert2';


export const SaludoScreen = () => {

    const [formValues, handleInputChange] = useForm();

    const handleSaludar = async (e) => {
        e.preventDefault();
        console.log(formValues)
        await db.collection('saludo').doc().set(formValues)
        Swal.fire(idiomasSaludo[check - 1] + ' ' + formValues.nombre)

    }

    const handleDespedir = (e) => {
        e.preventDefault();
        console.log('nueva tarea')
        Swal.fire(idiomasDespedida[check - 1] + ' ' + formValues.nombre)

    }

    const handleNombre = (e) => {
        e.preventDefault();
        console.log('nueva tarea')
        Swal.fire('Mi nombre es' + ' ' + formValues.nombre)

    }

    const idiomasSaludo = [
        "Hello", "Hola"
    ]

    const idiomasDespedida = [
        "See you later", "Hasta luego"
    ]




    const [check, setCheck] = useState(true);

    const cambiarEstado = (e) => {
        setCheck(e.target.value)
    }
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

                        <div className="padre">
                            <div className="hijo"><input id="radio1" value="1" onChange={cambiarEstado} checked={check == 1 ? true : false} className="form-check-input" type="radio" />
                                <label for="radio1" className="form-check">
                                    Inglés
                                </label></div>
                            <div className="hijo"><input id="radio2" value="2" onChange={cambiarEstado} checked={check == 2 ? true : false} className="form-check-input" type="radio" />
                                <label for="radio2" className="form-check">
                                    Español
                                </label></div>
                        </div>

                        <div className="padre">
                            <div className="hijo"><button onClick={handleSaludar}
                                className='btn btn-primary btn-block buttom'>Saludar</button></div>
                            <div className="hijo"><button onClick={handleNombre} className='btn btn-primary btn-block buttom'>Nombre</button></div>
                            <div className="hijo"><button onClick={handleDespedir} className='btn btn-primary btn-block buttom'>Despedir</button></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>



    </div >
};

