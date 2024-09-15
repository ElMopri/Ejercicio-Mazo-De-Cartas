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