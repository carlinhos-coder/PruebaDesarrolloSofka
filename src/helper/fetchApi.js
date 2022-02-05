

export const getName = async (nombre) => {
    const url = `https://carlos-spring-pruebas.herokuapp.com/api/usuarios/validateName?name=${encodeURI(nombre)}`;
    const resp = await fetch(url).catch(Error)
    return resp.ok
}

export const setName = async (nombre) => {
    const url = `https://carlos-spring-pruebas.herokuapp.com/api/usuarios`;
    let params = { "nombre": nombre };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    return response.ok
}

export const updateName = async (dataNueva) => {
    const { id, estado, nombre } = dataNueva;
    console.log(dataNueva, "esta es la data nueva");
    const url = `https://carlos-spring-pruebas.herokuapp.com/api/usuarios/update`;
    let params = { "nombre": nombre, "estado": estado, "id": id };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    return response
}

export const getNames = async () => {
    const urlGet = `https://carlos-spring-pruebas.herokuapp.com/api/usuarios`;
    const resp = await fetch(urlGet).catch(Error);
    return resp
}

export const deleteName = async (data) => {
    const { id } = data;
    const url = `https://carlos-spring-pruebas.herokuapp.com/api/usuarios?id=${encodeURI(id)}`;
    console.log(url);
    const resp = await fetch(url, { method: 'DELETE' }).catch(Error)
    console.log(resp);
    return resp.ok
}
