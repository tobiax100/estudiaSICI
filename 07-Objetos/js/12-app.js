const carrito=[
    {nombre:"Monitor de 20 pulgadas", precio:10000},
    {nombre:"caca",precio:5000},
    {nombre:"cartuchera de color roja", precio:900},
    {nombre:"gato de peluche", precio:400},
    {nombre:"celular a20", precio:500},
    {nombre:"playstation 5", precio:3000000},
    {nombre:"cartuchera de color azul", precio:500},
]

const nuevoArreglo= carrito.map( producto => `${producto.nombre} - precio: ${producto.precio}`)
const nuevoArreglo2 =carrito.forEach( producto => `${producto.nombre} - precio: ${producto.precio}`)

console.log(carrito)
console.log(nuevoArreglo)
console.log(nuevoArreglo2)
