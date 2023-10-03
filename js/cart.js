
const apiCarrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

// Obtener productos del carrito almacenados en localStorage
let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Crear un nuevo producto
let nuevoProducto = {
    imagen: localStorage.getItem("imagenCarrito"),
    nombre: localStorage.getItem("nombreCarrito"),
    costo: localStorage.getItem("costoCarrito"),
    moneda: localStorage.getItem("monedaCarrito"),
};

// Agregar el nuevo producto al array
productosCarrito.push(nuevoProducto);

// Guardar la lista actualizada en localStorage
localStorage.setItem('carrito', JSON.stringify(productosCarrito));

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
        <h1 class="h1Carrito">Carrito de Compras</h1>
        <h3>Artículos a comprar</h3>
        <table class="tabla-carrito" id="tabla-carrito">
            <tr class="titulos">
                <th></th>
                <th>Nombre</th>
                <th>Costo</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
            <tr>
                <td><img class="imagen-carrito" src="${element.articles[0].image}"/></td>
                <td>${element.articles[0].name}</td>
                <td>${element.articles[0].currency} ${element.articles[0].unitCost}</td>
                <td><input id="cantidadInput" type="number" placeholder="${element.articles[0].count}"></td>
                <td id="total" class="negrita">${element.articles[0].currency} ${element.articles[0].unitCost}</td>
            </tr>
        </table>
    `;


    //ENTREGA 5 DESAFIATE

    let cont_tabla = document.getElementById("tabla-carrito");


    productosCarrito.forEach((producto) => {
        let fila_tabla = document.createElement("tr");
        fila_tabla.innerHTML = `
            <td><img class="imagen-carrito" src="${producto.imagen}"/></td>
            <td>${producto.nombre}</td>
            <td>${producto.moneda} ${producto.costo}</td>
            <td><input class="cantidadInput" type="number" placeholder="${element.articles[0].count}"></td>
            <td class="total" class="negrita">${producto.moneda} ${producto.costo}</td>
        `;
        cont_tabla.appendChild(fila_tabla);
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