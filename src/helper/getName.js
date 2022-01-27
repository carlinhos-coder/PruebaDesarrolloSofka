

export const getName = async (nombre) => {
    const url = `http://localhost:8082/api/usuarios/validateName?name=${encodeURI(nombre)}`;
    const resp = await fetch(url).catch(Error)
    return resp.ok
}