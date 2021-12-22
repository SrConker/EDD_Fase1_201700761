class Nodo {
    constructor(mes) {
        this.mes = mes
        this.siguiente = null
        this.anterior = null
    }
}

class ListaDobleClientes {
    constructor() {
        this.primero = null
        this.longitud = 0
    }

    insertar(mes) {
        let nuevo = new Nodo(mes)
        if (this.primero == null) { //Si la lista se encuentra vacia
            this.primero = nuevo
        } else {
            let aux = this.primero
            while (aux.siguiente != null) {
                if (aux.mes == mes) { //Si el id del cliente ya esta registrado, mostrara un mensaje de error
                    console.log("Valor ya ingresado, no se puede volver a insertar")
                    return
                }
                aux = aux.siguiente
            }
            if (aux.mes == mes) { //Lo mismo, si el id del cliente ya fue registrado, muestra el mismo mensaje de error
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
            var mesIngresado = aux.mes
            console.log("///////////////////////")
            console.log("Mes: " + mesIngresado)
            aux = aux.siguiente
        }
    }
}