class Nodo {
    constructor(id, nombre, correo) {
        this.id = id
        this.nombre = nombre
        this.correo = correo
        this.siguiente = null
        this.anterior = null
    }
}

class ListaDobleClientes {
    constructor() {
        this.primero = null
        this.longitud = 0
    }

    insertar(id, nombre, correo) {
        let nuevo = new Nodo(id, nombre, correo)
        if (this.primero == null) { //Si la lista se encuentra vacia
            this.primero = nuevo
        } else {
            let aux = this.primero
            while (aux.siguiente != null) {
                if (aux.id == id) { //Si el id del cliente ya esta registrado, mostrara un mensaje de error
                    console.log("Valor ya ingresado, no se puede volver a insertar")
                    return
                }
                aux = aux.siguiente
            }
            if (aux.id == id) { //Lo mismo, si el id del cliente ya fue registrado, muestra el mismo mensaje de error
                console.log("Valor ya ingresado, no se puede volver a insertar")
                return
            }
            aux.siguiente = nuevo
            nuevo.anterior = aux
        }
    }

    mostrar() {
        let aux = this.primero
        console.log("///Mostrar Lista///")
        while (aux != null) {
            var idCliente = aux.id
            var nombreCliente = aux.nombre
            var correoCliente = aux.correo
            console.log("///////////////////////")
            console.log("Id: " + idCliente)
            console.log("Nombre: " + nombreCliente)
            console.log("Correo: " + correoCliente)
            console.log("///////////////////////")
            aux = aux.siguiente
        }
    }

    borrar(id) {
        if (this.primero.id == id) {
            this.primero = this.primero.siguiente
            this.longitud--
            if (this.primero != null) {
                this.primero.anterior = null
            }
        } else {
            let aux = this.primero
            while (aux.siguiente.id) {
                if (aux.siguiente.id == id) {
                    aux.siguiente = aux.siguiente.siguiente
                    this.longitud--
                    if (aux.siguiente != null) {
                        aux.siguiente.anterior = aux
                    }
                    break
                }
                aux = aux.siguiente
            }
        }
    }

    generarDot() {
        let aux = this.primero
        let dot = "digraph lista {\n"
        dot += "graph [rankdir=LR]\n"
        dot += "node [shape=plaintext]"
        dot += "edge [arrowhead=vee arrowsize=2]"
        while (aux != null) {
            
        }
    }
}

let listaClientes = new ListaDobleClientes()

function imprimirLista() {
    listaClientes.mostrar()
}

function recuperarLista() {
    var listaTemporal = JSON.parse(sessionStorage.getItem("ListaDobleClientes"))
    listaClientes = new ListaDobleClientes()
    listaTemporal = CircularJSON.parse(listaTemporal)
    Object.assign(listaClientes, listaTemporal)
}

function insertarLista() {
    let idNuevo = document.getElementById("idCliente").value 
    let nombreNuevo = document.getElementById("nombreCliente").value
    let correoNuevo = document.getElementById("correoCliente").value
    listaClientes.insertar(idNuevo, nombreNuevo, correoNuevo)
    document.getElementById("idCliente").value = ""
    document.getElementById("nombreCliente").value = ""
    document.getElementById("correoCliente").value = ""
    imprimirLista()
}

function borrarEnLista() {
    let idBuscar = document.getElementById("idCliente").value
    listaClientes.borrar(idBuscar)
    document.getElementById("idCliente").value = ""
    document.getElementById("nombreCliente").value = ""
    document.getElementById("correoCliente").value = ""
    imprimirLista()
}

function leerArchivo(file) {
    const reader = new FileReader()
    reader.onload = function () {
        let contenido = reader.result
        console.log(typeof (reader.result))
        console.log(reader.result)
        var objcliente = JSON.parse(contenido)
        console.log(objcliente, typeof (objcliente))
        for (let value of objcliente.listaClientes) {
            console.log(value)
            var idClientejson = parseInt(value.id)
            var nombreClientejson = value.nombre
            var correoClientejson = value.correo
            listaClientes.insertar(idClientejson, nombreClientejson, correoClientejson)
            console.log(idClientejson, nombreClientejson, correoClientejson)
        }
    }
    reader.readAsText(file)
}

function cargaMasivaCliente() {
    var data = document.getElementById("archivoClientes").files
    if (!data.length) {
        alert("No se ha seleccionado el archivo")
    } else {
        var cadena = leerArchivo(data[0])
        console.log(cadena)
    }
}