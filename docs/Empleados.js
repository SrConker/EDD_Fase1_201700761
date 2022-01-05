class nodo{
    constructor(id, nombre, edad, correo, password){
        this.id = id
        this.nombre = nombre
        this.edad = edad
        this.correo = correo
        this.password = password
        this.izquierda = null
        this.derecha = null
        this.altura = 0
    }
}

class AVL{
    constructor(){
        this.raiz = null;
    }

    insertar(id, nombre, edad, correo, password){
        let nuevo = new nodo(id, nombre, edad, correo, password);

        if (this.raiz == null) {
            this.raiz= nuevo
        } else {
            this.raiz = this.insertarNodo(this.raiz,nuevo)
        }
    }

    insertarNodo(raizActual, nuevo){
        if (raizActual != null) {
            //recorrer hijos
            if (raizActual.id > nuevo.id) {
                raizActual.izquierda = this.insertarNodo(raizActual.izquierda,nuevo)
                //validaciones
                
                if (this.altura(raizActual.derecha)-this.altura(raizActual.izquierda) == -2) {
                    console.log("entra a rotacion IZQUIERDA")
                    //if(this.altura(raizActual.izquierda.derecha)-this.altura(raizActual.izquierda.izquierda))
                    if (nuevo.id < raizActual.izquierda.id) { //-1 ROTACION IZQUIERDA
                        console.log("entra a rotacion IZQUIERDA IZQUIERDA")
                        raizActual = this.rotacionIzquierda(raizActual)
                    } else { //1 ROTACION izquierda-DERECHA
                        console.log("entra a rotacion IZQUIERDA DERECHA")
                        raizActual = this.rotacionIzquierdaDerecha(raizActual)
                    }
                }
             }else if (raizActual.id < nuevo.id) {
                raizActual.derecha = this.insertarNodo(raizActual.derecha,nuevo)
                //validaciones
                if (this.altura(raizActual.derecha)-this.altura(raizActual.izquierda) == 2) {
                    console.log("entra a rotacion DERECHA")
                    if (nuevo.id > raizActual.derecha.id) { // 1 ROTACION DERECHA
                        console.log("entra a rotacion DERECHA DERECHA")
                        raizActual=this.rotacionDerecha(raizActual);
                    } else {//-1 ROTACION DERECHA IZQUIERDA
                        console.log("entra a rotacion DERECHA IZQUIERDA")
                        raizActual = this.rotacionDerechaIzquierda(raizActual)
                    }
                }

            } else { 
                console.log("NO SE PUEDE INSERTAR EL DATO PORQUE YA EXISTE")
            }

            raizActual.altura = this.alturaMaxima(this.altura(raizActual.derecha),this.altura(raizActual.izquierda)) + 1
            return raizActual
        } else {
            raizActual = nuevo;
            return raizActual
        }
    }

    altura(nodo) {
        if (nodo != null) {
            return nodo.altura
        } else {
            return -1
        }
    }

    alturaMaxima(h1,h2) {
        if (h2>=h1) { //************************ MAYOR O IGUAL */
            return h2
        } else {
            return h1
        }

    }

    //ROTACIONES
    //simple izquerda
    rotacionIzquierda(nodo) {
        let aux = nodo.izquierda
        nodo.izquierda = aux.derecha
        aux.derecha = nodo
        nodo.altura = this.alturaMaxima(this.altura(nodo.derecha), this.altura(nodo.izquierda)) + 1
        aux.altura = this.alturaMaxima(nodo.altura.altura, this.altura(nodo.izquierda)) + 1
        return aux
    }

    //simple derecha
    rotacionDerecha(nodo) {
        let aux = nodo.derecha
        nodo.derecha= aux.izquierda
        aux.izquierda = nodo
        nodo.altura = this.alturaMaxima(this.altura(nodo.izquierda),this.altura(nodo.derecha)) + 1
        aux.altura = this.alturaMaxima(nodo.altura.altura,this.altura(nodo.derecha)) + 1
        return aux
    }

    //rotacion izquierda-derecha
    rotacionIzquierdaDerecha(nodo) {
        nodo.izquierda = this.rotacionDerecha(nodo.izquierda)
        let aux = this.rotacionIzquierda(nodo)
        return aux
    }

    //rotacion derecha-izquierda
    rotacionDerechaIzquierda(nodo) {
        nodo.derecha = this.rotacionIzquierda(nodo.derecha)
        let aux = this.rotacionDerecha(nodo)
        return aux
    }

    //****************************************************** */

    preorden(raizActual) {
        if (raizActual != null) {
            console.log(raizActual.id)
            this.preorden(raizActual.izquierda)
            this.preorden(raizActual.derecha)
        }
    }

    inOrden(raizActual) {
        if (raizActual != null) {
            this.inOrden(raizActual.izquierda)
            console.log(raizActual.id)
            console.log("altura= " + (this.altura(raizActual.derecha)-this.altura(raizActual.izquierda)))
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

    encriptacion(raizActual) {
        let cadena = ""
        if (raizActual != null) {
            cadena += "ID: " + raizActual.id + "\n Nombre: " + raizActual.nombre + "\n Edad: " + raizActual.edad +"\n Correo: " + sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(raizActual.correo)) + "\n Password: " + sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(raizActual.password))
            if (raizActual.izquierda != null) {
                cadena += "ID: " + raizActual.id + "\n Nombre: " + raizActual.nombre + "\n Edad: " + raizActual.edad +"\n Correo: " + sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(raizActual.correo)) + "\n Password: " + sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(raizActual.password))
                this.encriptacion(raizActual.izquierda)
            }
            if (raizActual.derecha != null) {
                cadena += "ID: " + raizActual.id + "\n Nombre: " + raizActual.nombre + "\n Edad: " + raizActual.edad +"\n Correo: " + sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(raizActual.correo)) + "\n Password: " + sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(raizActual.password))
                this.encriptacion(raizActual.derecha)
            }
        }
        const elemento = document.getElementById("contenido-encriptado")
        elemento.innerHTML = cadena
    }

    desencriptado(raizActual) {
        let cadena = ""
        if (raizActual != null) {
            cadena += "ID: " + raizActual.id + "\n Nombre: " + raizActual.nombre + "\n Edad: " + raizActual.edad + "\n Correo: " + raizActual.correo + "\n Password: " + raizActual.password
            if (raizActual.izquierda != null) {
                cadena += "ID: " + raizActual.id + "\n Nombre: " + raizActual.nombre + "\n Edad: " + raizActual.edad + "\n Correo: " + raizActual.correo + "\n Password: " + raizActual.password
            }
            if (raizActual.derecha != null) {
                cadena += "ID: " + raizActual.id + "\n Nombre: " + raizActual.nombre + "\n Edad: " + raizActual.edad + "\n Correo: " + raizActual.correo + "\n Password: " + raizActual.password
            }
        }
        const elemento = document.getElementById("contenido-desencriptado")
        elemento.innerHTML = cadena
    }

    generarDot() {
        let cadena="digraph arbol {\n"
        cadena += this.generarNodos(this.raiz)
        cadena +="\n"
        cadena += this.enlazar(this.raiz);
        cadena += "\n}"
        const elemento = document.getElementById("contenido-dot")
        elemento.innerHTML = cadena
        console.log(cadena);
        this.encriptacion(this.raiz)
        this.desencriptado(this.raiz)
    }

    generarNodos(raizActual) { //metodo preorden
        let nodos ="";
        if (raizActual != null) {
            nodos += "n"+raizActual.id+"[label=\""+raizActual.id+", "+ raizActual.nombre+ ", " + raizActual.edad+ ", "+ raizActual.correo+ ", " +raizActual.password +"\"]\n"
            nodos += this.generarNodos(raizActual.izquierda)
            nodos += this.generarNodos(raizActual.derecha)
        }
        return nodos;
    }

    enlazar(raizActual) {
        let cadena = ""
        if(raizActual != null){
            cadena += this.enlazar(raizActual.izquierda)
            cadena += this.enlazar(raizActual.derecha)
            //validaciones
            if (raizActual.izquierda != null) {
                cadena+="n"+raizActual.id + "-> n"+raizActual.izquierda.id+"\n"
            }
            if (raizActual.derecha != null) {
                cadena+="n"+raizActual.id + "-> n"+raizActual.derecha.id+"\n"
            }
        }
        return cadena;
    }
}

let avlEmpleados = new AVL()

function recuperarAVL() {
    var arbolTemporal = JSON.parse(sessionStorage.getItem("AVL"))
    avlEmpleados = new AVL()
    arbolTemporal = CircularJSON.parse(arbolTemporal)
    Object.assign(avlEmpleados, arbolTemporal)
}

function insertarArbol() {
    let idNuevo = document.getElementById("idVendedor").value
    let nombreNuevo = document.getElementById("nombreVendedor").value
    let edadNuevo = document.getElementById("edadVendedor").value
    let correoNuevo = document.getElementById("correoVendedor").value
    let passwordNuevo = document.getElementById("passwordVendedor").value
    avlEmpleados.insertar(idNuevo, nombreNuevo, edadNuevo, correoNuevo, passwordNuevo)
    alert("Vendedor ingresado correctamente")
    document.getElementById("idVendedor").value = ""
    document.getElementById("nombreVendedor").value = ""
    document.getElementById("edadVendedor").value = ""
    document.getElementById("correoVendedor").value = ""
    document.getElementById("passwordVendedor").value = ""
}

function borrarArbol() {

}

function graficar() {
    avlEmpleados.generarDot()
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
                avlEmpleados.insertar(j.id, j.nombre, j.edad, j.correo, j.password)
            }
        }
    }
    lector.readAsText(archivo)
    alert("Archivo JSON compilado y datos agregados correctamente")
}

document.querySelector('#archivo1').addEventListener('change', leerArchivoJSON, false)