

export const getName = async (nombre) => {
    const url = `https://carlos-spring-pruebas.herokuapp.com/api/usuarios/validateName?name=${encodeURI(nombre)}`;
    const resp = await fetch(url).catch(Error)
    return resp.ok
}