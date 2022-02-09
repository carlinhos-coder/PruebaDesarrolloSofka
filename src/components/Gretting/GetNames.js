import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { deleteName, updateName } from '../../helper/fetchApi';
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export const GetNames = ({ names, setNames, setChangeComponent, setloading }) => {

    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [nameSelected, setNameSelected] = useState({
        id: '',
        nombre: '',
        estado: ''
    });
    const [check, setCheck] = useState("1");
    const [tablaUsuarios, setTablaUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const modifyStatus = (e) => {
        setCheck(e.target.value)
    }

    const selectName = (elemento, caso) => {
        setNameSelected(elemento);
        (caso === 'Editar') ? setModalEdit(true) : setModalDelete(true)
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setNameSelected((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    const handleFilter = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = names.filter((elemento) =>
            elemento.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );
        setTablaUsuarios(resultadosBusqueda);

    }
    useEffect(() => {
        setTablaUsuarios(names);
    }, [names])

    const edit = () => {
        var dataNueva = names;
        dataNueva.forEach(name => {
            if (name.id === nameSelected.id) {
                name.nombre = nameSelected.nombre;
                if (check === "2") {
                    name.estado = false
                } else if (check === "1") {
                    name.estado = true;
                }
            }
        });
        setloading(true)
        updateName(nameSelected)
            .then(res => res.json())
            .then(data => data.status === 400 ? Swal.fire("No se actualizó correctamente") :
                setloading(false), Swal.fire("Se actualizó correctamente"))
        setModalEdit(false);

    }

    const deleteBd = () => {
        setloading(true)
        deleteName(nameSelected)
            .then(res => res.status === 400 ? Swal.fire("No se borró correctamente") :
                setloading(false), Swal.fire("Se borró correctamente")
            )
        setNames(names.filter(name => name.id !== nameSelected.id));
        setModalDelete(false);
    }

    return <div className='App'>
        <div className="containerInput">
            <input
                className="form-control inputBuscar"
                value={busqueda}
                placeholder="Búsqueda por Nombre"
                onChange={handleFilter}
            />
            <button className="btn btn-success">
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>

        <button onClick={() => setChangeComponent(true)} >
            Volver
        </button>
        <table className="table table-sm table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tablaUsuarios.map(element => (
                    <tr key={element.id}>
                        <td>{element.id}</td>
                        <td>{element.nombre}</td>
                        <td>{element.estado ? "Activo" : "Inactivo"}</td>
                        <td><button className="btn btn-primary" onClick={() => selectName(element, 'Editar')}>Editar</button> {"   "}
                            <button className="btn btn-danger" onClick={() => selectName(element, 'Eliminar')}>Eliminar</button></td>
                    </tr>
                ))
                }
            </tbody>
        </table>

        <Modal isOpen={modalEdit}>
            <ModalHeader>
                <div>
                    <h3>Editar Nombre</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>ID</label>
                    <input
                        className="form-control"
                        readOnly
                        type="text"
                        name="id"
                        value={nameSelected && nameSelected.id}
                    />
                    <br />

                    <label>Nombre</label>
                    <input
                        className="form-control"
                        type="text"
                        name="nombre"
                        value={nameSelected && nameSelected.nombre}
                        onChange={handleChange}
                    />
                    <br />

                    <label >Estado</label>
                    <br />
                    <div className="hijo">
                        <input id="radio1" value="1" onChange={modifyStatus} checked={check === "1" ? true : false} className="form-check-input" type="radio" />
                        <label className="form-check">
                            Activo
                        </label></div>
                    <div className="hijo">
                        <input id="radio2" value="2" onChange={modifyStatus} checked={check === "2" ? true : false} className="form-check-input" type="radio" />
                        <label className="form-check">
                            Inactivo
                        </label></div>
                    <br />
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={() => edit()}>
                    Actualizar
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => setModalEdit(false)}
                >
                    Cancelar
                </button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={modalDelete}>
            <ModalBody>
                Estás Seguro que deseas eliminar el nombre {nameSelected && nameSelected.nombre}
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-danger" onClick={() => deleteBd()}>
                    Sí
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => setModalDelete(false)}
                >
                    No
                </button>
            </ModalFooter>
        </Modal>
    </div>;
};
