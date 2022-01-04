var intentos = 3

function validar() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    if (username == "Admin" && password == "1234") {
        alert("Login reconocido. Bienvenido Administrador")
        window.location.href = "MenuFases.html"
    } else {
        alert("Nombre de usuario y/o contraseña inválidos, volver a intentarlo")
        window.location.href = "index.html"
    }
}