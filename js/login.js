function validarFormulario() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');

    // Validación básica
    if (email === "" || password === "") {
        errorDiv.style.display = "block";
        errorDiv.textContent = "Todos los campos son obligatorios.";
        return false;
    }

    if (!validarEmail(email)) {
        errorDiv.style.display = "block";
        errorDiv.textContent = "Por favor, ingrese un correo válido.";
        return false;
    }

    // Si todo es correcto, enviar el formulario (aquí puedes añadir código para enviar los datos)
    errorDiv.style.display = "none";
    alert("Inicio de sesión exitoso.");
    return true;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}



document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const correo = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
    
 
    if (correo  && password) {
        // Redirigir a dashboard.html si las credenciales son correctas
        window.location.href = "../html/home.html";
    } else {
        // Mostrar mensaje de error si las credenciales no son correctas
        errorMessage.textContent = "!Error al Ingresar!";
    }
});
