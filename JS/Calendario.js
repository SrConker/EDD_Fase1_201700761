class nodo_interno {
    constructor(dia, hora, descripcion, x, y) {
        this.dia = dia
        this.hora = hora
        this.descripcion = descripcion
        this.x = x
        this.y = y
        //apuntadores
        this.siguiente = null
        this.anterior = null

        this.arriba = null
        this.abajo = null
    }
}

class lista_interna {
    constructor() {
        this.primero = null
    }

    insertar_x (dia, hora, descripcion, x, y) { //para las X usamos siguiente y anterior, y el valor para comparar y ordenar es Y
        let nuevo = new nodo_interno(dia, hora, descripcion, x, y)

        if(this.primero == null){
            this.primero = nuevo
        } else {
            if (nuevo.y < this.primero.y) {
                nuevo.siguiente = this.primero
                this.primero.anterior = nuevo
                this.primero = nuevo
            } else {
                let aux = this.primero
                while (aux != null) {
                    if (nuevo.y < aux.y) {
                        nuevo.siguiente = aux
                        nuevo.anterior = aux.anterior
                        aux.anterior.siguiente = nuevo
                        aux.anterior = nuevo
                        break
                    } else if (nuevo.x == aux.x && nuevo.y == aux.y) {
                        console.log("La posicion ya esta ocupada-> "+nuevo.x+","+nuevo.y)
                        break
                    } else {
                        if (aux.siguiente == null) {
                            aux.siguiente = nuevo
                            nuevo.anterior = aux
                            break
                        } else {
                            aux = aux.siguiente
                        }
                    }
                }
            }
        }
    }

    insertar_y (dia, hora, descripcion, x, y) { //para las Y usamos arriba y abajo, y el valor para comparar y ordenar es X
        let nuevo = new nodo_interno(dia, hora, descripcion, x, y)

        if (this.primero == null) {
            this.primero = nuevo
        } else {
            if (nuevo.x < this.primero.x) {
                nuevo.abajo = this.primero
                this.primero.arriba = nuevo
                this.primero = nuevo
            } else {
                let aux = this.primero
                while (aux != null) {
                    if (nuevo.x < aux.x) {
                        nuevo.abajo = aux
                        nuevo.arriba = aux.arriba
                        aux.arriba.abajo = nuevo
                        aux.arriba = nuevo
                        break
                    } else if (nuevo.x == aux.x && nuevo.y == aux.y) {
                        console.log("La posicion ya esta ocupada-> "+nuevo.x+","+nuevo.y)
                        break
                    } else {
                        if (aux.abajo ==null) {
                            aux.abajo=nuevo
                            nuevo.arriba = aux
                            break
                        } else {
                            aux = aux.abajo
                        }
                    }
                }
            }
        }
    }

    recorrer_x() {
        let aux = this.primero
        while (aux != null) {
            console.log("dia =",aux.dia,"hora =",aux.hora,"descripcion =",aux.descripcion," - x = ",aux.x , " y = ",aux.y)
            aux = aux.siguiente
        }
    }
    recorrer_y() {
        let aux = this.primero
        while (aux != null) {
            console.log("dia =",aux.dia,"hora =",aux.hora,"descripcion =",aux.descripcion," - x = ",aux.x , " y = ",aux.y)
            aux = aux.abajo
        }
    }
}

//**************************** CABECERAS ************************/
class nodo_cabecera{
    constructor(dato){
        this.dato = dato;
        this.siguiente= null;
        this.anterior = null;
        this.lista_interna = new lista_interna();
    }
}

class lista_cabecera{
    constructor(){
        this.primero = null;
    }

    insertar_cabecera(nuevo){

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.dato<this.primero.dato){
                nuevo.siguiente = this.primero;
                this.primero.anterior=nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.dato < aux.dato){
                        nuevo.siguiente = aux;
                        nuevo.anterior = aux.anterior;
                        aux.anterior.siguiente = nuevo;
                        aux.anterior = nuevo;
                        break;
                    }else{
                        if(aux.siguiente == null){
                            aux.siguiente = nuevo;
                            nuevo.anterior = aux;
                            break;
                        }else{
                            aux = aux.siguiente;
                        }
                    }
                }
            }
        }
    }

    buscar_cabecera(dato){
        let aux = this.primero;
        while(aux != null){
            if(aux.dato == dato){
                return aux;
            }else{
                aux = aux.siguiente;
            }
        }
        return null;
    }

    recorrer(){
        let aux = this.primero;
        while(aux != null){
            console.log("dato =",aux.dato);
            aux = aux.siguiente;
        }
    }
}

//**************************** Matriz ************************/
class matriz{
    constructor(){
        this.cabecetas_x = new lista_cabecera();
        this.cabecetas_y = new lista_cabecera();
    }

    insertar(valor,x,y){
        let nodo_cabecera_X = this.cabecetas_x.buscar_cabecera(x);
        let nodo_cabecera_y = this.cabecetas_y.buscar_cabecera(y);

        if(nodo_cabecera_X == null){
            nodo_cabecera_X =  new nodo_cabecera(x);
            this.cabecetas_x.insertar_cabecera(nodo_cabecera_X);
        }

        if(nodo_cabecera_y == null){
            nodo_cabecera_y =  new nodo_cabecera(y);
            this.cabecetas_y.insertar_cabecera(nodo_cabecera_y);
        }

        //insertar en cabecera X
        nodo_cabecera_X.lista_interna.insertar_x(valor,x,y);
        //insertar en cabecera Y
        nodo_cabecera_y.lista_interna.insertar_y(valor,x,y);
    }

    recorrer_matriz(){
        console.log("cabeceras en X");
        let aux = this.cabecetas_x.primero;
        while(aux != null){
            console.log("   pos->"+aux.dato);
            let aux2 = aux.lista_interna.primero;
            while(aux2!= null){
                console.log("       -"+aux2.valor);
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }

        console.log("cabeceras en Y");
        aux = this.cabecetas_y.primero;
        while(aux != null){
            console.log("   pos->"+aux.dato);
            let aux2 = aux.lista_interna.primero;
            while(aux2!= null){
                console.log("       -"+aux2.valor);
                aux2 = aux2.abajo;
            }
            aux = aux.siguiente;
        }
    }

    graficar_matriz(){
        let cadena="";
        cadena+= "digraph Matriz{ \n";
        cadena+= "node[shape = box,width=0.7,height=0.7,fillcolor=\"azure2\" color=\"white\" style=\"filled\"];\n";
        cadena+= "edge[style = \"bold\"]; \n"
        //graficar el nodo matriz
        cadena+="node[label = Matriz fillcolor=\" darkolivegreen1\" pos = \"-1,1!\"]principal;"
        //graficar cabeceras X
        let aux_x = this.cabecetas_x.primero;
        while(aux_x!=null){
            cadena+="node[label = "+aux_x.dato+" fillcolor=\" azure1\" pos = \""+aux_x.dato+",1!\"]x"+aux_x.dato+";\n"
            aux_x = aux_x.siguiente;
        }
        aux_x = this.cabecetas_x.primero;
        while(aux_x.siguiente != null){
            cadena+="x"+aux_x.dato+"->"+"x"+aux_x.siguiente.dato+";\n"
            cadena+="x"+aux_x.siguiente.dato+"->"+"x"+aux_x.dato+";\n"
            aux_x = aux_x.siguiente;
        }

        if(this.cabecetas_x.primero!= null){
            cadena+="principal->x"+this.cabecetas_x.primero.dato+";\n";
        }
        //graficar cabeceras Y
        let aux_y = this.cabecetas_y.primero;
        while(aux_y!=null){
            cadena+="node[label = "+aux_y.dato+" fillcolor=\" azure1\" pos = \"-1,-"+aux_y.dato+"!\"]y"+aux_y.dato+";\n"
            aux_y = aux_y.siguiente;
        }
        aux_y = this.cabecetas_y.primero;
        while(aux_y.siguiente != null){
            cadena+="y"+aux_y.dato+"->"+"y"+aux_y.siguiente.dato+";\n"
            cadena+="y"+aux_y.siguiente.dato+"->"+"y"+aux_y.dato+";\n"
            aux_y = aux_y.siguiente;
        }

        if(this.cabecetas_x.primero!= null){
            cadena+="principal->y"+this.cabecetas_y.primero.dato+";\n";
        }
        //graficar nodos internos
        aux_x = this.cabecetas_x.primero;
        while(aux_x!=null){ //recorrer listas de x para graficar los nodos de sus lista interna
            let aux = aux_x.lista_interna.primero;
            while(aux!=null){
                cadena+="   node[label = "+aux.valor+" fillcolor=\" gold2\" pos = \""+aux.x+",-"+aux.y+"!\"]x"+aux.x+"y"+aux.y+";\n"
                aux = aux.siguiente;
            }

            //graficar flechitas
            aux = aux_x.lista_interna.primero;
            while(aux.siguiente!= null){
                cadena+="   x"+aux.x+"y"+aux.y+"->x"+aux.siguiente.x+"y"+aux.siguiente.y+";\n";
                cadena+="   x"+aux.siguiente.x+"y"+aux.siguiente.y+"->x"+aux.x+"y"+aux.y+";\n";
                aux= aux.siguiente;
            }
            if(aux_x.lista_interna.primero!= null){
                cadena+="x"+aux_x.dato+"->"+"x"+aux_x.lista_interna.primero.x+"y"+aux_x.lista_interna.primero.y+";\n";
            }

            aux_x = aux_x.siguiente;
        }

        aux_y = this.cabecetas_y.primero;
        while(aux_y!=null){ //recorrer la lista de y para graficar cada lista
            //graficar flechitas Y
            let aux = aux_y.lista_interna.primero;
            while(aux.abajo!= null){
                cadena+="   x"+aux.x+"y"+aux.y+"->x"+aux.abajo.x+"y"+aux.abajo.y+";\n";
                cadena+="   x"+aux.abajo.x+"y"+aux.abajo.y+"->x"+aux.x+"y"+aux.y+";\n";
                aux= aux.abajo;
            }
            if(aux_y.lista_interna.primero!= null){
                cadena+="y"+aux_y.dato+"->"+"x"+aux_y.lista_interna.primero.x+"y"+aux_y.lista_interna.primero.y+";\n";
            }
            aux_y = aux_y.siguiente;
        }

        cadena+= "\n}"
        console.log(cadena);
    }
}


let matriz1 = new matriz();

matriz1.insertar(0,0,0);
matriz1.insertar(50,0,1);
matriz1.insertar(5,1,1);
matriz1.insertar(6,2,3);
matriz1.insertar(1,10,1);
matriz1.insertar(2,1,2);
matriz1.insertar(7,3,3);

matriz1.recorrer_matriz();
matriz1.graficar_matriz();