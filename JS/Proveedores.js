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
            this.raiz = this.insertar(this.raiz.nuevo)
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

    preOrden(raizActual) {
        if (raizActual != null) {
            console.log(raizActual.id)
            this.preOrden(raizActual.izquierda)
            this.preOrden(raizActual.derecha)
        }
    }

    inOrden() {
        if (raizActual != null) {
            this.inOrden(raizActual.izquierda)
            console.log(raizActual.id)
            this.inOrden(raizActual.derecha)
        }
    }

    postOrden() {
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
            nodos += "n" + raizActual.id + "[label=\"" + raizActual.id + "\"]\n"
            nodos += "n" + raizActual.nombre + "[label=\"" + raizActual.nombre + "\"]\n"
            nodos += "n" + raizActual.direccion + "[label=\"" + raizActual.direccion + "\"]\n"
            nodos += "n" + raizActual.telefono + "[label=\"" + raizActual.telefono + "\"]\n"
            nodos += "n" + raizActual.correo + "[label=\"" + raizActual.correo + "\"]\n"
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
                cadena += "n" + raizActual.nombre + "-> n" + raizActual.izquierda.nombre + "\n"
                cadena += "n" + raizActual.direccion + "-> n" + raizActual.izquierda.direccion + "\n"
                cadena += "n" + raizActual.telefono + "-> n" + raizActual.izquierda.telefono + "\n"
                cadena += "n" + raizActual.correo + "-> n" + raizActual.izquierda.correo + "\n"
            }
            if (raizActual.derecha != null) {
                cadena += "n" + raizActual.id + "-> n" + raizActual.derecha.id + "\n"
                cadena += "n" + raizActual.nombre + "-> n" + raizActual.derecha.nombre + "\n"
                cadena += "n" + raizActual.direccion + "-> n" + raizActual.derecha.direccion + "\n"
                cadena += "n" + raizActual.telefono + "-> n" + raizActual.derecha.telefono + "\n"
                cadena += "n" + raizActual.correo + "-> n" + raizActual.derecha.correo + "\n"
            }
        }
        return cadena
    }
}