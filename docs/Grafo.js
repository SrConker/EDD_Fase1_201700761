class Nodo {
    constructor(id, nombre) {
        this.id = id
        this.nombre = nombre
        this.anterior = null
        this.siguiente = null
        this.ponderacion = 0
        this.adyacentes = new listaAdyacentes()
    }
}

class listaAdyacentes {
    constructor() {
        this.primero = null
        this.ultimo = null
    }

    insertar(id, nombre, p) {
        let nuevo = new Nodo(id, nombre)
        nuevo.ponderacion = p
        if (this.primero == null) {
            this.primero = nuevo
            this.ultimo = nuevo
        } else {
            if (this.primero == this.ultimo) {
                this.primero.siguiente = nuevo
                nuevo.anterior = this.primero
                this.ultimo = nuevo
            } else {
                nuevo.anterior = this.ultimo
                this.ultimo.siguiente = nuevo
                this.ultimo = nuevo
            }
        }
    }
}

class Grafo{
    constructor() {
        this.primero = null
        this.ultimo = null
    }

    insertar(id, nombre) {
        let nuevo = new Nodo(id, nombre)
        if (this.primero == null) {
            this.primero = nuevo
            this.ultimo = nuevo
        } else {
            if (this.primero == this.ultimo) {
                this.primero.siguiente = nuevo
                nuevo.anterior = this.primero
                this.ultimo = nuevo
            } else {
                nuevo.anterior = this.ultimo
                this.ultimo.siguiente = nuevo
                this.ultimo = nuevo
            }
        }
    }

    buscar(id) {
        let aux = this.primero
        while (aux != null) {
            if (aux.id == id) {
                return aux
            } else {
                aux = aux.siguiente
            }
        }
        return null
    }

    agregarAdyacente(id, idAdyacente, ponderacion) {
        let principal = this.buscar(id)

        if (principal != null) {
            principal.adyacentes.insertar(idAdyacente, ponderacion)
        } else {
            console.log("No existe el nodo origen")
        }
    }

    mostrar() {
        let aux = this.primero
        while (aux != null) {
            console.log("-> " + aux.id)
            let aux2 = aux.adyacentes.primero
            while (aux2 != null) {
                console.log("    -" + aux2.id)
                aux2 = aux2.siguiente
            }
            aux = aux.siguiente
        }
    }

    graficar() {
        let cadena= "digraph grafo {\n rankdir=\"LR\" \n"
        let aux = this.primero;
        while(aux != null){
            cadena+="n"+aux.id+"[label= \""+aux.id+"\"];\n"
            aux = aux.siguiente;
        }
        // graficar relaciones
        aux = this.primero;
        while(aux != null){
            let aux2 = aux.adyacentes.primero;
            while(aux2 != null){
                cadena+= "n"+aux.id+" -> n"+aux2.id+" [label=\""+aux2.ponderacion+"km\"]; \n";
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
        cadena += "}"
        console.log(cadena);
    }
}