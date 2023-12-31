//Variables, capturo elementos de manera tradicional
const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

//Transformo JSON a objeto JS
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

//Creo div por cada producto e inyecto al HTML
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Madera: ${producto.madera}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)

    //Inserto el HTML en el DOM
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {

        agregarAlCarrito(producto.id)

    })
})


//Agrego productos al carrito
const agregarAlCarrito = (prodId) => {

   
    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe){ 
        const prod = carrito.map (prod => { 
            
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    
    actualizarCarrito()
    Swal.fire({
        position: 'top-start',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 2000
      })
}


const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 

    actualizarCarrito() 
    
    console.log(carrito)
}

const actualizarCarrito = () => {
    
    contenedorCarrito.innerHTML = "" 

    
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    
    //Longitud del carrito
    contadorCarrito.innerText = carrito.length
    console.log(carrito)
    //ACUMULADOR
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

}
//Formulario, capturo elementos con querySelector

const formulario =  document.querySelector(".form-contact")
const inputName = document.querySelector(".nombre")
const inputEmail = document.querySelector(".correo")
const inputCelular = document.querySelector(".celular")
const inputMensaje = document.querySelector("#mensaje")

formulario.addEventListener("submit", validarFormulario)

function validarFormulario(e) {
    e.preventDefault()
    
    console.log(`Nombre del usuario: ${inputName.value}, correo: ${inputEmail.value}, número de celular: ${inputCelular.value} y su mensaje es: ${inputMensaje.value}`)
}
