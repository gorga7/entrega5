let email = localStorage.getItem("email");
let li_nav = document.getElementById("usuario");


li_nav.innerHTML = `<span class="nav-link">${email}</span>`;