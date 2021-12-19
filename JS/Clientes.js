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
            aux = aux.siguiente
        }
    }
}