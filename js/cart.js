
const apiCarrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let total = 0;


// Obtener productos del carrito almacenados en localStorage
let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

function carritoLocal() {
    // Crear un nuevo producto
    let nuevoProducto = {
        id: localStorage.getItem("prodID"),
        imagen: localStorage.getItem("imagenCarrito"),
        nombre: localStorage.getItem("nombreCarrito"),
        costo: localStorage.getItem("costoCarrito"),
        moneda: localStorage.getItem("monedaCarrito"),
    };

    // Verificar si el producto ya existe en el carrito
    let productoExistente = productosCarrito.find(item => item.nombre === nuevoProducto.nombre);

    if (productoExistente) {
        // Si el producto existe, incrementar la cantidad en el objeto existente
        productoExistente.cantidad++;
    } else {
        // Agregar el nuevo producto al array
        nuevoProducto.cantidad = 1; // Establecer la cantidad en 1 para un nuevo producto
        productosCarrito.push(nuevoProducto);
    }

    // Actualizar el carrito en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}






async function carritoFetch() {
    const res = await fetch(apiCarrito);
    const data = await res.json();
    return data;
}




mostrarCarrito();

async function mostrarCarrito() {
    const element = await carritoFetch();
    let contenedor = document.querySelector("main .container");


    contenedor.innerHTML += `
        <h2 class="h1Carrito">Carrito de Compras</h2>
        <br>
        <h3>Artículos a comprar</h3>
        <br>
        <table class="tabla-carrito" id="tabla-carrito">
            <tr class="titulos">
            
                <th></th>
                <th>Nombre</th>
                <th>Costo</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
            <br>
            <tr>
                <td><img class="imagen-carrito" src="${element.articles[0].image}"/></td>
                <td>${element.articles[0].name}</td>
                <td>${element.articles[0].currency} ${element.articles[0].unitCost}</td>
                <td><input id="cantidadInput" type="number"  name="${element.articles[0].unitCost}"></td>
                <td id="total" class="negrita">${element.articles[0].currency} ${element.articles[0].unitCost}</td>
            </tr>
        </table>
    `;


    //ENTREGA 5 DESAFIATE

    let cont_tabla = document.getElementById("tabla-carrito");



    


    productosCarrito.forEach((producto) => {


        

        
        let fila_tabla = document.createElement("tr");
        if(producto.nombre != null){


       fila_tabla.innerHTML = `
    <td><img class="imagen-carrito" src="${producto.imagen}"/></td>
    <td>${producto.nombre}</td>
    <td>${producto.moneda} ${producto.costo}</td>
    <td><input class="cantidadInputNuevo" type="number" value="${producto.cantidad}" id="cantidad_${producto.nombre}"></td>
    <td id="subTotal" class="negrita">${producto.moneda} <span class="costoProducto">${producto.cantidad * producto.costo}</span></td>
`;
        cont_tabla.appendChild(fila_tabla);

        
        localStorage.removeItem('nombreCarrito'); 
        localStorage.setItem('costoCarrito', producto.costo); 
       

       
        }

           // Agregar un evento para cada input
    const cantidadInputNuevo = document.querySelectorAll(".cantidadInputNuevo");
    const costoProducto = document.querySelectorAll(".costoProducto");
    
    cantidadInputNuevo.forEach((input, index) => {
        input.addEventListener("input", () => {
            const cantidadInputID = input.getAttribute("id");
            const productoNombre = cantidadInputID.split("_")[1];
            const cantidad = parseFloat(input.value);
            const producto = productosCarrito.find(item => item.nombre === productoNombre);
    
            if (!isNaN(cantidad) && producto) {
                const costo = parseFloat(producto.costo);
                const subtotal = cantidad * costo;
                costoProducto[index].textContent = `${producto.moneda} ${subtotal.toFixed(2)}`;
            } else {
                // Maneja el caso donde la cantidad no es un número válido
                costoProducto[index].textContent = `${producto.moneda} 0.00`;
            }
        });
    });



    });
    
    
    //FIN ENTREGA 5 DESAFIATE

    
    //ENTREGA 5 PARTE 3


   
    var cantidadInput = document.getElementById("cantidadInput");
    var totalTd = document.getElementById("total");

    cantidadInput.addEventListener("input", calcularTotal);
    


   async function calcularTotal() {
        const element = await carritoFetch();
        var cantidad = cantidadInput.value;        
        var precioUnitario = element.articles[0].unitCost;      
        var total = cantidad * precioUnitario;

        totalTd.textContent = "$" + total.toFixed(2);
    }




}

const btnTema = document.getElementById('btnTema');
const body = document.body;

// Función para cambiar el tema
function toggleTheme() {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light'); // Guardar el tema en el almacenamiento local
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark'); // Guardar el tema en el almacenamiento local
    }
}

// Verificar el tema almacenado en el almacenamiento local y aplicarlo si existe
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
  } else {

  body.classList.add('light-theme')
  }
    
// Agregar un listener al botón para cambiar el tema cuando se hace clic
btnTema.addEventListener('click', toggleTheme);



let email = localStorage.getItem("email"); // <- email = "emilianopintos18@gmail.com"




let li_nav = document.getElementById("usuario");


li_nav.innerHTML = `<span class="nav-link">${email}</span>`;