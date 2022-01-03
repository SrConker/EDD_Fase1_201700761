class Nodo {
    constructor(idV, nombreV, nombreC) {
        this.idV = idV
        this.nombreV = nombreV
        this.nombreC = nombreC
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
        for (var i = 0; i < this.size; i++) {
            if (this.claves[i] != null) {
                console.log("--> " + this.claves[i].idV)
            } else {
                console.log("--------------------")
            }
        }
    }
}