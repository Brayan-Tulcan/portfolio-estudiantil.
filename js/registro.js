function validarFormulario() {
    const correo = document.getElementById('correo').value;
    const nombre = document.getElementById('nombrecompleto').value;
    const confirmarCorreo = document.getElementById('correo2').value;
    const contrasena = document.getElementById('password').value;
    const confirmarContrasena = document.getElementById('password2').value;
    const errorDiv = document.getElementById('error-message');


    // Validar si los correos coinciden
    if (correo !== confirmarCorreo) {
        alert('Los correos electrónicos no coinciden.');
        return false;
    }

    // Validar si las contraseñas coinciden
    if (contrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden.');
        return false;
    }

    if (!validarEmail(correo)) {
        errorDiv.style.display = "block";
        errorDiv.textContent = "Por favor, ingrese un correo válido.";
        return false;
    }

    if (!validarNombre(nombre)) {
        errorDiv.style.display = "block";
        errorDiv.textContent = "Por favor, ingrese un nombre valido.";
        return false;
    }

    // Validación correcta
    alert('Formulario enviado exitosamente.');
    return true;
}

function validarEmail(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

function validarNombre(nombre) {
    const regex = /^[a-zA-ZÀ-ÿ\s]{4,40}$/;
    return regex.test(nombre);
}


document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const nombrecompleto = document.getElementById("nombrecompleto").value;
    const fechadenacimiento = document.getElementById("fechadenacimiento").value;
    const tipodedocumento = document.getElementById("tipodedocumento").value
    const numerodedocumento = document.getElementById("numerodedocumento").value
    const correo = document.getElementById("correo").value;
    const correo2 = document.getElementById("correo2").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const errorMessage = document.getElementById("error-message");
    
 
    if (nombrecompleto && validarNombre &&  fechadenacimiento && tipodedocumento && numerodedocumento &&  validarEmail  && correo === correo2 && password == password2) {
        // Redirigir a dashboard.html si las credenciales son correctas
        window.location.href = "../html/home.html";
    } else {
        // Mostrar mensaje de error si las credenciales no son correctas
        errorMessage.textContent = "!Error al Registrarse!";
    }
});





const pass = document.getElementById("password");
const pass2 = document.getElementById("password2");
const icon = document.querySelector(".bx")

    //password1

    icon.addEventListener("click", e => { 
        if (pass.type === "password") {
            pass.type = "text";
            icon.classList.remove('bx-show-alt')
            icon.classList.add('bx-hide')
        } else {
            pass.type = "password";
            icon.classList.add('bx-show-alt')
            icon.classList.remove('bx-hide')
        }
    })
    //password2
    
    icon.addEventListener("click", e => { 
        if (pass2.type === "password") {
            pass2.type = "text";
            icon.classList.remove('bx-show-alt')
            icon.classList.add('bx-hide')
        } else {
            pass2.type = "password";
            icon.classList.add('bx-show-alt')
            icon.classList.remove('bx-hide')
        }
    })