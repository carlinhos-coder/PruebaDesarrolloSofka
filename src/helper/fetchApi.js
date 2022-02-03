

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