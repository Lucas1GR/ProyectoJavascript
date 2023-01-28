class Producto{
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const hidratante = new Producto (1,"Crema hidratante enzimatica",2000,"img/crema.png");
const antiage = new Producto(2," Crema Antiage",6000,"img/antiage.png");
const limpieza = new Producto (3,"Gel de limpieza con vitamina C", 3600, "img/geldelimpieza.png");
const reparadora = new Producto (4, "Crema con Vitamina C", 2700,"img/vitaminac.png");
const serum = new Producto (5, "Serum hidratacion intensiva", 4000,"img/serum.png");
const hyaluronico = new Producto(6, "Crema con Hyaluronico B5",3600, "img/hyaluronico.png");
const pestañas = new Producto(7,"Lash Pro",800, "img/pestañas.png");
const exfoliante = new Producto(8,"Exfoliante enzimatico", 1500, "img/exfoliante.png");

//arrays
const productos =[hidratante, antiage , limpieza, reparadora, serum, hyaluronico, pestañas, exfoliante];

//array del carrito
let carrito = [];
/**carga de carrito**/
if(localStorage.getItem("carrito")){
    carrito =JSON.parse(localStorage.getItem("carrito"));
}

//modificacion de DOM
 const contenedorProducto = document.getElementById("contenedorProductos");

 //funcion muestra productos

 const mostrarProductos =() => {
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6","colxs-12");
        card.innerHTML =`
        <div class="card">
            <img src="${producto.img}"class="card-img-top imgProductos" alt="${"producto.nombre"}>
            <div class = "card-body">
                <h5>${producto.nombre} </h5>
                <p> ${producto.precio} <p>
                <button class="btn colorBoton" id="boton${producto.id}"> Añadir al carrito </button>
            </div>
        </div>
                    `
        contenedorProducto.appendChild(card);            
        
        //añadir productos al carrito
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click",() => {
            agregarAlCarrito(producto.id);
        })
    })
 }
 mostrarProductos();

 //funcion agregar al carrito
 const agregarAlCarrito =(id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else{
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
        //localStorage
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
 }

 //ver el carrito

 const contenedorCarrito = document.getElementById("contenedorCarrito");
 const verCarrito =document.getElementById("verCarrito");
 
 verCarrito.addEventListener("click",() => {
    mostrarCarrito();
 })

 //funcion para mostrar carrito
 const mostrarCarrito = () => { 
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => { 
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6","colxs-12");
        card.innerHTML =`
            <div class="card">
                <img src="${producto.img}"class="card-img-top imgProductos" alt="${"producto.nombre"}>
                <div class = "card-body">
                    <h5>${producto.nombre} </h5>
                    <p> ${producto.precio} <p>
                    <p> ${producto.cantidad} <p>
                    <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto </button>
                </div>
            </div>
                    `
        contenedorCarrito.appendChild(card);

        //Vaciar carrito
        const boton =document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click",() =>{
            eliminarDelCarrito(producto.id);
        })

    })
    calcularTotal();
 }
 //función que elimina el producto del carrito
 const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();
    //localStorage
    localStorage.setItem("carrito",JSON.stringify(carrito));
 }  
// vaciar carrito completo
const vaciarCarrito =document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click",() =>{
    eliminarTodoElcarrito();
})

//funcion que elimina todo del carrito
const eliminarTodoElcarrito = () => {
    carrito= []
    mostrarCarrito();
    //localStorage
    localStorage.clear();
}
//total de la compra
const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML =`Total: $${totalCompra}`;
}