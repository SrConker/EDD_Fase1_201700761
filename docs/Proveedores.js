class Nodo {
    constructor(id, nombre, direccion, telefono, correo) {
        this.id = id
        this.nombre = nombre
        this.direccion = direccion
        this.telefono = telefono
        this.correo = correo
        this.izquierda = null
        this.derecha = null
    }
}

class ABB {
    constructor() {
        this.raiz = null
    }

    insertar(id, nombre, direccion, telefono, correo) {
        let nuevo = new Nodo(id, nombre, direccion, telefono, correo)
        if (this.raiz == null) {
            this.raiz = nuevo
        } else {
            this.raiz = this.insertarNodo(this.raiz.nuevo)
        }
    }

    insertarNodo(raizActual, nuevo) {
        if (raizActual != null) {
            //Recorrer hijos del arbol
            if (raizActual.id > nuevo.id) {
                raizActual.izquierda = this.insertarNodo(raizActual.izquierda, nuevo)
            } else if (raizActual.id < nuevo.id) {
                raizActual.derecha = this.insertarNodo(raizActual.derecha, nuevo)
            } else {
                console.log("No se puede insertar, porque ya existe el proveedor")
            }

            return raizActual
        } else {
            raizActual = nuevo
            return raizActual
        }
    }

    borrar(id) {
        let aux = this.raiz
        let padre = this.raiz
        let esHijoIzq = true
        while (aux.id != id) {
            padre = aux
            if (id < aux.id) {
                esHijoIzq = true
                aux = aux.izquierda
            } else {
                esHijoIzq = false
                aux = aux.derecha
            }
            if (aux == null) {
                return false
            }
        }
        //Salimos de la busqueda del elemento
        if (aux.izquierda == null && aux.derecha == null) {
            if (aux == this.raiz) {
                this.raiz == null
            } else if (esHijoIzq) {
                padre.izquierda = null
            } else {
                padre.derecha = null
            }
        } else if (aux.derecha == null) {
            if (aux == this.raiz) {
                this.raiz = aux.izquierda
            } else if (esHijoIzq) {
                padre.izquierda = aux.izquierda
            } else {
                padre.derecha = aux.izquierda
            }
        } else if (aux.izquierda == null) {
            if (aux == this.raiz) {
                this.raiz = aux.derecha
            } else if (esHijoIzq) {
                padre.izquierda = aux.derecha
            } else {
                padre.derecha = aux.derecha
            }
        } else {
            let reemplazo = this.obtenerReemplazo(aux)
            if (aux == this.raiz) {
                this.raiz = reemplazo
            } else if (esHijoIzq) {
                padre.izquierda = reemplazo
            } else {
                padre.derecha = reemplazo
            }
            reemplazo.izquierda = aux.izquierda
        }
        console.log("Nodo: " + id + " eliminado correctamente")
        return true
    }

    obtenerReemplazo(nodoReemplazo) {
        let reemplazarPadre = nodoReemplazo
        let reemplazo = nodoReemplazo
        let aux = nodoReemplazo.derecha
        while (aux != null) {
            reemplazarPadre = reemplazo
            reemplazo = aux
            aux = aux.izquierda
        }
        if (reemplazo != nodoReemplazo.derecha) {
            reemplazarPadre.izquierda = reemplazo.derecha
            reemplazo.derecha = nodoReemplazo.derecha
        }
        return reemplazo
    }

    preOrden(raizActual) {
        if (raizActual != null) {
            console.log(raizActual.id)
            this.preOrden(raizActual.izquierda)
            this.preOrden(raizActual.derecha)
        }
    }

    inOrden(raizActual) {
        if (raizActual != null) {
            this.inOrden(raizActual.izquierda)
            console.log(raizActual.id)
            this.inOrden(raizActual.derecha)
        }
    }

    postOrden(raizActual) {
        if (raizActual != null) {
            this.postOrden(raizActual.izquierda)
            this.postOrden(raizActual.derecha)
            console.log(raizActual.id)
        }
    }

    generarDot() {
        let cadena = "digraph arbol {\n";
        cadena += this.generarNodos(this.raiz)
        cadena +="\n"
        cadena +=this.enlazar(this.raiz)
        cadena +="\n}"

        console.log(cadena)
    }

    generarNodos(raizActual) { //metodo de preorden
        let nodos = ""
        if (raizActual != null) {
            nodos += "n" + raizActual.id + "[label=\"" + raizActual.id + ", "+ raizActual.nombre+ ", "+ raizActual.direccion+ ", "+ raizActual.telefono+ ", "+ raizActual.correo + "\"]\n"
            nodos += this.generarNodos(raizActual.izquierda)
            nodos += this.generarNodos(raizActual.derecha)
        }
        return nodos
    }

    enlazar(raizActual) {
        let cadena = ""
        if (raizActual != null) {
            cadena += this.enlazar(raizActual.izquierda)
            cadena += this.enlazar(raizActual.derecha)

            if (raizActual.izquierda != null) {
                cadena += "n" + raizActual.id + "-> n" + raizActual.izquierda.id + "\n"
            }
            if (raizActual.derecha != null) {
                cadena += "n" + raizActual.id + "-> n" + raizActual.derecha.id + "\n"
            }
        }
        return cadena
    }
}

let abbProveedores = new ABB()

function mostrarInOrden() {
    abbProveedores.inOrden()
}

function recuperarABB() {
    var arbolTemporal = JSON.parse(sessionStorage.getItem("ABB"))
    abbProveedores = new ABB()
    arbolTemporal = CircularJSON.parse(arbolTemporal)
    Object.assign(abbProveedores, arbolTemporal)
}

function insertarArbol() {
    let idNuevo = document.getElementById("idProveedor").value
    let nombreNuevo = document.getElementById("nombreProveedor").value
    let direccionNuevo = document.getElementById("direccionProveedor").value
    let telefonoNuevo = document.getElementById("telefonoProveedor").value
    let correoNuevo = document.getElementById("correoProveedor").value
    abbProveedores.insertar(idNuevo, nombreNuevo, direccionNuevo, telefonoNuevo, correoNuevo)
    alert("Proveedor ingresado exitosamente")
    document.getElementById("idProveedor").value = ""
    document.getElementById("nombreProveedor").value = ""
    document.getElementById("direccionProveedor").value = ""
    document.getElementById("telefonoProveedor").value = ""
    document.getElementById("correoProveedor").value = ""
    mostrarInOrden()
}

function borrarArbol() {
    let idBuscar = document.getElementById("idProveedor").value
    abbProveedores.borrar(idBuscar)
    alert("Proveedor borrado correctamente")
    document.getElementById("idProveedor").value = ""
    document.getElementById("nombreProveedor").value = ""
    document.getElementById("direccionProveedor").value = ""
    document.getElementById("telefonoProveedor").value = ""
    document.getElementById("correoProveedor").value = ""
    mostrarInOrden()
}

function graficar() {
    abbProveedores.generarDot()
}

function leerArchivoProveedores(e) {
    var archivo = e.target.files[0]
    if (!archivo) {
        return
    }

    var lector = new FileReader()
    lector.onload = function(e) {
        let contenido = e.target.result

        const obj = JSON.parse(contenido)
        for (let clave in obj) {
            for (let j of obj[clave]) {
                console.log(j.id)
                abbProveedores.insertar(j.id, j.nombre, j.direccion, j.telefono, j.correo)
            }
        }
    }
    lector.readAsText(archivo)
}