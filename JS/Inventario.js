class Nodo {
    constructor (id, nombre, precio, cantidad) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
        //Apuntadores de lista de tipo Nodo
        this.siguiente = null
        this.anterior = null
        //Apuntadores de arbol tipo pagina
        this.izquierda = null
        this.derecha = null
    }
}

//Lista ordenada para almacenar valores
class ListaNodo {
    constructor() {
        this.primero = null
        this.ultimo = null
        this.size = 0
    }

    insertar(nuevo) {
        if (this.primero == null) {
            this.primero = nuevo
            this.ultimo = nuevo
            this.size++
            return true
        } else {
            if (this.primero == this.ultimo) { //Solo hay un valor en la lista
                if (nuevo.id < this.primero.id) {
                    nuevo.siguiente = this.primero
                    this.primero.anterior = nuevo
                    //Cambiar punteros de paginas
                    this.primero.izquierda = nuevo.derecha

                    this.primero = nuevo
                    this.size++
                    return true
                } else if (nuevo.id > this.ultimo.id) {
                    this.ultimo.siguiente = nuevo
                    nuevo.anterior = this.ultimo
                    //Cambiar punteros de paginas
                    this.ultimo.derecha = nuevo.izquierda

                    this.ultimo = nuevo
                    this.size++
                    return true
                } else { //El id es igual al primero
                    console.log("Ya existe el id con ese valor en la lista")
                    return false
                } 
            } else { //hay mas de un dato
                if (nuevo.id < this.primero.id) {
                    nuevo.siguiente = this.primero
                    this.primero.anterior = nuevo
                    //Cambiar punteros de paginas
                    this.primero.izquierda = nuevo.derecha

                    this.primero = nuevo
                    this.size++
                    return true
                } else if (nuevo.id > this.ultimo.id) {
                    this.ultimo.siguiente = nuevo
                    nuevo.anterior = this.ultimo
                    //Cambiar punteros de paginas
                    this.ultimo.derecha = nuevo.izquierda

                    this.ultimo = nuevo
                    this.size++
                    return true
                } else {
                    let aux = this.primero
                    while (aux != null) {
                        if (nuevo.id < aux.id) {
                            nuevo.siguiente = aux
                            nuevo.anterior = aux.anterior
                            //cambiar punteros de paginas
                            aux.izquierda = nuevo.derecha
                            aux.anterior.derecha = nuevo.izquierda
                            ///////////////////////////////////
                            aux.anterior.siguiente = nuevo
                            aux.anterior = nuevo
                            this.size++
                            return true
                        } else if (nuevo.id == aux.id) {
                            console.log("Ya existe un id con ese valor en la lista")
                            return false
                        } else {
                            aux = aux.siguiente
                        }
                    }
                }
            }
        }
    }
}

//Pagina del arbol B

class pagina {
    constructor() {
        this.raiz = false
        this.clavesMax = 4
        this.clavesMin = 2
        this.size = 0
        this.claves = new ListaNodo()
    }

    insertarEnPagina(nodo) {
        if (this.claves.insertar(nodo)) {
            this.size = this.claves.size
            if (this.size < 5) {
                return this
            } else if (this.size == 5) { //Dividir pagina
                return this.dividirPagina(this)
            }
        }
        return null
    }

    dividirPagina(pag) {
        let temp = pag.claves.primero
        for (var i = 0; i < 2; i++) { //Ubicarnos en la posicion [2] de la lista (mitad)
            temp = temp.siguiente
        }

        //Pasar los valores de la pagina a nodos independientes
        let primero = pag.claves.primero
        let segundo = pag.claves.primero.siguiente
        let tercero = temp.siguiente
        let cuarto = pag.claves.ultimo

        primero.siguiente = null
        primero.anterior = null

        segundo.siguiente = null
        segundo.anterior = null

        tercero.siguiente = null
        tercero.anterior = null

        cuarto.siguiente = null
        cuarto.anterior = null

        temp.siguiente = null
        temp.anterior = null

        //Crear nuevas paginas
        let pagIzquierda = new pagina()
        pagIzquierda.insertarEnPagina(primero)
        pagIzquierda.insertarEnPagina(segundo)

        let pagDerecha = new pagina()
        pagDerecha.insertarEnPagina(tercero)
        pagDerecha.insertarEnPagina(cuarto)

        temp.izquierda = pagIzquierda
        temp.derecha = pagDerecha

        return temp
    }

    esHoja(pag) {
        if (pag.claves.primero.izquierda == null) {
            return true
        } else {
            return false
        }
    }
}

//Arbol B

class ArbolB {
    constructor() {
        this.raiz = null
        this.orden = 5
        this.altura = 0
    }

    insertarNodo(id, nombre, precio, cantidad) {
        let nuevo = new Nodo(id, nombre, precio, cantidad)

        if (this.raiz == null) {
            this.raiz = new pagina()
            this.raiz.raiz = true
            this.raiz = this.raiz.insertarEnPagina(nuevo)
        } else {
            if (this.altura == 0) {
                let respuesta = this.raiz.insertarEnPagina(nuevo)
                if (respuesta instanceof pagina) { //La raiz no se dividio
                    this.raiz = respuesta
                } else {
                    this.altura++
                    this.raiz = new pagina()
                    this.raiz = this.raiz.insertarEnPagina(respuesta)
                }
            } else { //Ya existe mas de una pagina, hay que recorrer el arbol para insertar el nuevo
                if (this.raiz == null) {
                    console.log("La raiz es null")
                    return
                }
                let respuesta = this.insertarRecorrer(nuevo, this.raiz)
                if (respuesta instanceof Nodo) { //La raiz no se dividio
                    this.altura++
                    this.raiz = new pagina()
                    this.raiz = this.raiz.insertarEnPagina(respuesta)
                } else if (respuesta instanceof pagina) {
                    this.raiz = respuesta
                }
            }
        }
    }

    insertarRecorrer(nuevo, paginaActual) {
        if (paginaActual.esHoja(paginaActual)) {
            let respuesta = paginaActual.insertarEnPagina(nuevo)
            return respuesta
        } else {
            if (nuevo.id < paginaActual.claves.primero.id) { //Va a la izquierda
                let respuesta = this.insertarRecorrer(nuevo, paginaActual.claves.primero.izquierda)
                if (respuesta instanceof Nodo) { //La pagina se dividio y el nodo se tiene que insertar en la pagina actual
                    return paginaActual.insertarEnPagina(respuesta)
                } else if (respuesta instanceof pagina) {
                    paginaActual.claves.primero.izquierda = respuesta
                    return paginaActual
                }
            } else if (nuevo.id > paginaActual.claves.ultimo.id) { //Va a la derecha porque es mayor al ultimo
                let respuesta = this.insertarRecorrer(nuevo, paginaActual.claves.ultimo.derecha)
                if (respuesta instanceof Nodo) {
                    return paginaActual.insertarEnPagina(respuesta)
                } else if (respuesta instanceof pagina) {
                    paginaActual.claves.ultimo.derecha = respuesta
                    return paginaActual
                }
            } else { //En los apuntadores de los nodos de en medio
                let aux = paginaActual.claves.primero

                while (aux != null) {
                    if (nuevo.id < aux.id) {
                        let respuesta = this.insertarRecorrer(nuevo, aux.izquierda)
                        if (respuesta instanceof Nodo) {
                            return paginaActual.insertarEnPagina(respuesta)
                        } else if (respuesta instanceof pagina) {
                            aux.izquierda = respuesta
                            aux.anterior.derecha = respuesta
                            return paginaActual
                        }
                    } else if (nuevo.id == aux.id) {
                        return paginaActual
                    } else {
                        aux = aux.siguiente
                    }
                }
            }
        }
        return this
    }

    graficar() {
        let cadena="digraph arbolB{\n";
        cadena+="rankr=TB;\n";
        cadena+="node[shape = box,fillcolor=\"azure2\" color=\"black\" style=\"filled\"];\n";
        //metodos para graficar el arbol
        cadena+= this.graficarNodos(this.raiz);
        cadena+=  this.graficarEnlaces(this.raiz);
        cadena+="}\n"

        return cadena; 
    }

    graficarNodos(raizActual) {
        let cadena = ""

        if (raizActual.esHoja(raizActual)) {
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raizActual.claves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.id+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raizActual.claves.primero.id+";\n";
            return cadena;
        }else{
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raizActual.claves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.id+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raizActual.claves.primero.id+";\n";

            //recorrer los hicos de cada clave
            aux = raizActual.claves.primero;
            while(aux != null){
                cadena+= this.graficarNodos(aux.izquierda);
                aux = aux.siguiente;
            }
            cadena+= this.graficarNodos(raizActual.claves.ultimo.derecha);
            return cadena; 
        }
    }

    graficarEnlaces(raizActual){
        let cadena="";
        if(raizActual.esHoja(raizActual)){
            return ""+raizActual.claves.primero.id+";\n";
        }else{
            //cadena += ""+raiz_actual.claves.primero.dato+";\n";

            let aux = raizActual.claves.primero;
            let contador =0;
            let raiz_actual_txt = raizActual.claves.primero.id;
            while(aux != null){
                cadena+= "\n"+raiz_actual_txt+":p"+contador+"->"+this.graficarEnlaces(aux.izquierda);
                contador++;
                aux = aux.siguiente;
            }
            cadena+="\n"+raiz_actual_txt+":p"+contador+"->"+this.graficarEnlaces(raiz_actual.claves.ultimo.derecha);
            return cadena;
        }
    }
}