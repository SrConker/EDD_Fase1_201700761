var intentos = 3

function validar() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    if (username == "Admin" && password == "1234") {
        alert("Login reconocido. Bienvenido Administrador")
        window.location.replace()
        return false
    } else {
        intentos--
        alert("Te quedan " + intentos + " intentos permitidos.")
        if (intentos == 0) {
            document.getElementById("username").disabled = true
            document.getElementById("password").disabled = true
            document.getElementById("submit").disabled = true
            return false
        }
    }
}