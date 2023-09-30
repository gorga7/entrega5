

const apiCarrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json";


async function carritoFetch(){
    const res = await fetch(apiCarrito);
    const data = await res.json();
    return data
}


mostrarCarrito();

async function mostrarCarrito(){
  const element = await carritoFetch();

  let contenedor = document.querySelector("main .container");


  contenedor.innerHTML= `

  <h1 class="h1Carrito">Carrito de Compras</h1>
  
  <h3>Articulos a comprar</h3>

  <table class="tabla-carrito">

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
    <td><input type="number" placeholder="${element.articles[0].count}"</td>
    <td class="negrita">${element.articles[0].currency} ${element.articles[0].unitCost}</td>


    

  </tr>

</table>
  
  
  
  `

}