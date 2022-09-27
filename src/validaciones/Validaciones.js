const validar_Datos_usuario = ({ usuario, password, id_departamento, id_ciudad }) => {
    if ((usuario != undefined || usuario != "") && (password != undefined || password != "") && id_departamento != 0 && id_ciudad != 0) {
        return true;
    }
    return false
}
const validar_Datos_session = ({ usuario, password }) => {
    if (usuario != undefined || usuario != "" && password != undefined || password != "") {
        return true;
    }
    return false
}
const validar_Datos_Transaccion = ({ idUsuario, tipoOperacion, moneda, cantidad, valorActual, apiKey }) => {
    if (idUsuario != undefined || idUsuario != 0 && apiKey != undefined) {
        if (tipoOperacion == 1 || tipoOperacion == 2) {
            if (moneda > 0 && cantidad > 0 && valorActual > 0) {
                return true;
            }
        }
    }
    return false;
}

export { validar_Datos_session, validar_Datos_Transaccion, validar_Datos_usuario }

