class Nodo {
    constructor(idV, nombreV, nombreC, total, lista) {
        this.idV = idV
        this.nombreV = nombreV
        this.nombreC = nombreC
        this.total = total
        this.lista = lista
    }
}

class Hash {
    constructor() {
        this.claves = this.iniciarArreglo(7)
        this.clavesUsadas = 0
        this.size = 7
    }

    iniciarArreglo(tamanio) {
        let claves = []
        for (var i = 0; i < tamanio; i++) {
            claves[i] = null
        }
        return claves
    }

    calcularHash(idV) {
        //Metodo de division
        let resultado = 0
        resultado = idV % this.size
        return resultado
    }

    solucionColisiones(indice) { //Metodo de exploracion cuadratica
        let nuevoIndice = 0
        let i = 0
        let disponible = false

        while (disponible == false) {
            nuevoIndice = indice + Math.pow(i, 2)
            //Hay que validar que nuevoIndice sea menor al tamaño de la tabla
            if (nuevoIndice >= this.size) {
                nuevoIndice = nuevoIndice - this.size
            }
            //Validar que la posicion del nuevo indice este disponible
            if (this.claves[nuevoIndice] == null) {
                disponible = true
            }
            i++
        }
        return nuevoIndice
    }

    insertar(nuevo) {
        let indice = this.calcularHash(nuevo.idV)

        //Validaciones
        if (this.claves[indice] == null) { //Cuando la posicion esta disponible
            this.claves[indice] = nuevo
            this.clavesUsadas++
        } else { //Cuando existe una colision, hay que resolverla para continuar el flujo del programa
            indice = this.solucionColisiones(indice)
            this.claves[indice] = nuevo
            this.clavesUsadas++
        }

        //Despues de la validacion, toca la validacion de tamaño
        let porcentajeUso = this.clavesUsadas / this.size
        if (porcentajeUso >= 0.5) {
            this.rehash()
        }
    }

    rehash() {
        //Encontrar el siguiente número primo
        let primo = false
        let newSize = this.size
        while (primo == false) {
            newSize++
            let contador = 0
            for (var i = newSize; i > 0; i--) {
                if (newSize % i == 0) {
                    contador++
                }
            }

            //Validra cuatns veces se dividio exactamente
            if (contador == 2) {
                primo = true
            }
        }
        //Crear nuevo arreglo con el tamaño del siguiente número primo
        let clavesAux = this.claves
        this.size = newSize
        this.claves = this.iniciarArreglo(newSize)
        this.clavesUsadas = 0

        for (var i = 0; i < this.clavesAux.length; i++) {
            if (clavesAux[i] != null) {
                this.insertar(clavesAux[i])
            }
        }
    }

    recorrer() {
        let cadenaTabla = ""
        let contador = -1
        for (var i = 0; i < this.size; i++) {
            if (this.claves[i] != null) {
                contador += 1
                console.log("--> " + this.claves[i].idV)
                cadenaTabla += "\n<tr>\n\t<td>"+contador+" | "+" Id: " + this.claves[i].idV + " | " + " Vendedor: " + this.claves[i].nombreV + " | " + " Cliente: " + this.claves[i].nombreC + " | " + " Total: " + this.claves[i].total + " | " + "Lista: " + this.claves[i].lista + " |</td>\n</tr>\n"
            } else {
                contador += 1
                console.log("--------------------")
                cadenaTabla += "\n<tr>\n\t<td>"+contador+" |</td>\n</tr>\n"
            }
        }
        const elemento = document.getElementById("mynetwork")
        elemento.innerHTML = cadenaTabla
        console.log(cadenaTabla)
    }
}

class Producto {
    constructor(id, nombre, precio, cantidad) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
    }
}

let hash = new Hash()
let lista = new Array()

function insertarHash() {
    let idVenta = document.getElementById("idVenta").value
    let nombreVendedor = document.getElementById("nombreVendedor").value
    let nombreCliente = document.getElementById("nombreCliente").value
    let totalVenta = document.getElementById("totalVenta").value
    let idProducto = document.getElementById("idInventario").value
    let nombreProducto = document.getElementById("nombreInventario").value
    let precioProducto = document.getElementById("precioInventario").value
    let cantidadProducto = document.getElementById("cantidadInventario").value
    if (lista.length == 0) { //Si la lista no tiene nada dentro
        let producto = new Producto(idProducto, nombreProducto, precioProducto, cantidadProducto)
        lista = new Array()
        lista.push(producto)
    } else {
        let producto = new Producto(idProducto, nombreProducto, precioProducto, cantidadProducto)
        lista.push(producto)
    }
    let ventaNueva = new Nodo(idVenta, nombreVendedor, nombreCliente, totalVenta, lista)
    hash.insertar(ventaNueva)
    alert("Venta ingresada correctamente")
    document.getElementById("nombreVendedor").value = ""
    document.getElementById("nombreCliente").value = ""
    document.getElementById("totalVenta").value = ""
    document.getElementById("idInventario").value = ""
    document.getElementById("nombreInventario").value = ""
    document.getElementById("precioInventario").value = ""
    document.getElementById("cantidadInventario").value = ""
}

function graficar1() {
    hash.recorrer()
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
        for (x of json.ventas) {
            let total = 0
            let lista = new Array()
            for (z of x.productos) {
                console.log(z.cantidad)
                total += z.precio * z.cantidad
                let producto = new Producto(z.id, z.nombreC, z.precio, z.cantidad)
                lista.push(producto)
            }
            let ventaNueva = new Nodo(x.id, x.vendedor, x.cliente, total, lista)
            hash.insertar(ventaNueva)
        }
    }
    lector.readAsText(archivo)
    alert("Archivo JSON compilado y datos agregados correctamente")
}

document.querySelector('#archivo1').addEventListener('change', leerArchivoJSON, false)