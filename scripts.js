document.addEventListener("DOMContentLoaded",function(){

    var loginForm = document.getElementById("loginForm");
    if(loginForm){
        loginForm.addEventListener("submit",function(event){
            event.preventDefault();
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;

            //Verificacion de usuario y contraseña
            if(username == "admin" && password=="1234"){
                window.location.href = "dashboard.html";
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        });
    }

})

document.querySelector('#registroCartas').addEventListener('submit', function() { 
	guardarCarta();
	pintarTabla();
});

document.querySelectorAll(".imgCarta").forEach(function(element){
    element.addEventListener("click", function(){
        var datos = localStorage.getItem('datos');
        datos = JSON.parse(datos);
      
        for(let item of datos) {
            if(item.numero == this.dataset.carta) {
                item.cantidad++;
            }
        }

        localStorage.setItem('datos', JSON.stringify(datos));
        pintarTabla();
    });
});

function guardarCarta(){

	var numero = document.querySelector('#numero').value;
	var carta = document.querySelector('#carta').value;
	var datos = localStorage.getItem('datos');

	datos = JSON.parse(datos);

	var dato = {numero: numero, carta: carta, cantidad: '0'};

	datos.push(dato);

	localStorage.setItem('datos', JSON.stringify(datos));
}

function cargarJSON(){
	var miObjeto = [
				{ 'numero': '1', 'carta': 'as', 'cantidad': '2' },
				{ 'numero': '2', 'carta': '2 de diamantes', 'cantidad': '3' }];
		localStorage.setItem('datos', JSON.stringify(miObjeto));
}

function pintarTabla(){
	var datos = localStorage.getItem('datos');

	let res = document.querySelector('#tablaCartas');
		res.innerHTML = '';

	console.log('objetoObtenido: ', JSON.parse(datos));
	datos = JSON.parse(datos);

	for(let item of datos) {
		res.innerHTML += `<tr>
  				<td>${item.numero}</td>
  				<td>${item.carta}</td>
  				<td>${item.cantidad}</td>
			</tr>`;
	}
}

function leerJSON() {
    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json(); // Convertir a JSON
        })
        .then(datos => {
            console.log(datos); // Manipular los datos
        })
        .catch(error => {
            console.error("Hubo un problema con la solicitud fetch:", error);
        });
}
leerJSON();
cargarJSON();
pintarTabla();