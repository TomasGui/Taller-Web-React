//URLS API 
const urlRegistro = "https://crypto.develotion.com/usuarios.php";
const urlLogin = "https://crypto.develotion.com/login.php";
const urlDepartamentos = "https://crypto.develotion.com/departamentos.php";
const urlCiudades = "https://crypto.develotion.com/ciudades.php";
const urlMonedas = "https://crypto.develotion.com/monedas.php";
const urlTransacciones = "https://crypto.develotion.com/transacciones.php";
const urlUsuario = "https://crypto.develotion.com/usuariosPorDepartamento.php";


const loginApi = async ({ usuario, password }) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
        usuario: usuario,
        password: password,
    });
    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };
    return fetch(urlLogin, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.codigo == 200) {
                return Promise.resolve(result);
            } else {
                return Promise.reject(result);
            }
        })
        .catch((error) => Promise.reject(error.mensaje ? error.mensaje : "Hubo un error"));
};

const registroApi = async ({ usuario, password, idDepartamento, idCiudad }) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
        usuario: usuario,
        password: password,
        idDepartamento: idDepartamento,
        idCiudad: idCiudad
    });
    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };
    return fetch(urlRegistro, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.codigo == 200) {
                return Promise.resolve(result);
            } else {
                return Promise.reject(result);
            }
        })
        .catch((error) => Promise.reject(error.mensaje ? error.mensaje : "Hubo un error"));
};

const monedasApi = async (apiKey) => {

    let myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apiKey", apiKey);

    let requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    return fetch(urlMonedas, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.codigo == 200) {
                return Promise.resolve(result);
            } else {
                return Promise.reject(result);
            }
        })
        .catch((error) => Promise.reject(error.mensaje ? error.mensaje : "Hubo un error"));
};

const departamentosApi = async () => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    return fetch(urlDepartamentos, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.codigo == 200) {
                return Promise.resolve(result);
            } else {
                return Promise.reject(result);
            }
        })
        .catch((error) => Promise.reject(error.mensaje ? error.mensaje : "Hubo un error"));
}

const ciudadesApi = async (idDepartamento) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    return fetch(`${urlCiudades}?idDepartamento=${idDepartamento}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.codigo == 200) {
                return Promise.resolve(result);
            } else {
                return Promise.reject(result);
            }
        })
        .catch((error) => Promise.reject(error.mensaje ? error.mensaje : "Hubo un error"));
}

const ciudades_todasApi = async () => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    return fetch(urlCiudades, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.codigo == 200) {
                return Promise.resolve(result);
            } else {
                return Promise.reject(result);
            }
        })
        .catch((error) => Promise.reject(error.mensaje ? error.mensaje : "Hubo un error"));
}


const transaccionesApi = async (apiKey) => {

    let myHeaders = new Headers();
    let url = `${urlTransacciones}?idUsuario=${localStorage.getItem("id")}`;
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apiKey", apiKey);

    let requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    return fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.codigo == 200) {
                return Promise.resolve(result);
            } else {
                return Promise.reject(result);
            }
        })
        .catch((error) => Promise.reject(error.mensaje ? error.mensaje : "Hubo un error"));
};

const altaTransaccionesApi = async ({ idUsuario, tipoOperacion, moneda, cantidad, valorActual, apiKey }) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apiKey", apiKey);
    let raw = JSON.stringify({
        idUsuario: idUsuario,
        tipoOperacion: tipoOperacion,
        moneda: moneda,
        cantidad: cantidad,
        valorActual: valorActual
    });
    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };
    return fetch(urlTransacciones, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.codigo == 200) {
                return Promise.resolve(result);
            } else {
                return Promise.reject(result);
            }
        })
        .catch((error) => Promise.reject(error.mensaje ? error.mensaje : "Hubo un error"));
};




export { loginApi, registroApi, monedasApi, departamentosApi, ciudadesApi, transaccionesApi, altaTransaccionesApi, ciudades_todasApi }

