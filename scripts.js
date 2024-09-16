document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita la recarga en el formulario de login
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;

            // Verificación de usuario y contraseña
            if (username == "admin" && password == "1234") {
                window.location.href = "dashboard.html";
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        });
    }

    // Formulario de registro de cartas
    var registroForm = document.querySelector('#registroCartas');
    if (registroForm) {
        registroForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita la recarga de la página
            guardarCarta();
            pintarTabla();
        });
    }

    // Evento click en las imágenes de cartas
    document.querySelectorAll(".imgCarta").forEach(function (element) {
        element.addEventListener("click", function () {
            var datos = localStorage.getItem('datos');
            if (datos) {
                datos = JSON.parse(datos);

                for (let item of datos) {
                    if (item.numero == this.dataset.carta) {
                        item.cantidad++;
                    }
                }

                localStorage.setItem('datos', JSON.stringify(datos));
                pintarTabla();
            }
        });
    });

    // Cargar los datos iniciales y pintar la tabla
    cargarJSON();
    pintarTabla();
});

// Función para guardar una nueva carta en localStorage
function guardarCarta() {
    var numero = document.querySelector('#numero').value;
    var carta = document.querySelector('#carta').value;
    var datos = localStorage.getItem('datos');

    if (datos) {
        datos = JSON.parse(datos);
    } else {
        datos = [];
    }

    var dato = { numero: numero, carta: carta, cantidad: '0' };
    datos.push(dato);

    localStorage.setItem('datos', JSON.stringify(datos));
}

// Función para cargar el JSON inicial en localStorage
function cargarJSON() {
    var miObjeto = [
        { 'numero': '1', 'carta': 'as', 'cantidad': '2' },
        { 'numero': '2', 'carta': '2 de diamantes', 'cantidad': '3' }
    ];

    localStorage.setItem('datos', JSON.stringify(miObjeto));
}

// Función para pintar la tabla con los datos almacenados en localStorage
function pintarTabla() {
    var datos = localStorage.getItem('datos');
    
    if (datos) {
        let res = document.querySelector('#tablaCartas');
        res.innerHTML = '';  // Limpia la tabla antes de volver a llenarla

        datos = JSON.parse(datos);

        for (let item of datos) {
            res.innerHTML += `<tr>
                <td>${item.numero}</td>
                <td>${item.carta}</td>
                <td>${item.cantidad}</td>
            </tr>`;
        }
    }
}
