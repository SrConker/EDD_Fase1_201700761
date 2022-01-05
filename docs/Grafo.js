class Nodo {
    constructor(id, nombre) {
        this.id = id
        this.nombre = nombre
        this.anterior = null
        this.siguiente = null
        this.distancia = 0
        this.adyacentes = new listaAdyacentes()
    }
}

class listaAdyacentes {
    constructor() {
        this.primero = null
        this.ultimo = null
    }

    insertar(id, p) {
        let nuevo = new Nodo(id)
        nuevo.distancia = p
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

    agregarAdyacente(id, idAdyacente, distancia) {
        let principal = this.buscar(id)

        if (principal != null) {
            principal.adyacentes.insertar(idAdyacente, distancia)
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
            cadena+="n"+aux.id+"[label= \""+aux.id+", "+aux.nombre+"\"];\n"
            aux = aux.siguiente;
        }
        // graficar relaciones
        aux = this.primero;
        while(aux != null){
            let aux2 = aux.adyacentes.primero;
            while(aux2 != null){
                cadena+= "n"+aux.id+" -> n"+aux2.id+" [label=\""+aux2.distancia+"km\"]; \n";
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
        cadena += "}"
        console.log(cadena);

        const elemento = document.getElementById("contenido-dot")
        elemento.innerHTML = cadena
    }
}

let grafo = new Grafo()

function graficar() {
    grafo.graficar()
}

function leerArchivoJSON(e) {
    const archivo = e.target.files[0]
    if (!archivo) {
        return
    }
    const lector = new FileReader()
    lector.onload = function(e) {
        const contenido = e.target.result
        var json = JSON.parse(contenido)
        for (let fila in json) {
            console.log(fila)
            for (let j of json[fila]) {
                console.log(j)
                grafo.insertar(j.id, j.nombre)
                for (let k of j.adyacentes) {
                    console.log(k)
                    grafo.insertar(k.id, k.nombre)
                    grafo.agregarAdyacente(j.id, k.id, k.distancia)
                }
            }
        }
    }
    lector.readAsText(archivo)
    alert("Archivo JSON compilado y datos agregados correctamente")
}

document.querySelector('#archivo1').addEventListener('change', leerArchivoJSON, false)