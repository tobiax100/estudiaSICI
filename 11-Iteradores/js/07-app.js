const pendientes=['tarea','comer','proyecto','estudiar Java Script']
const carrito=[
    {nombre:"Monitor de 20 pulgadas", precio:10000},
    {nombre:"caca",precio:5000},
    {nombre:"cartuchera de color roja", precio:900},
    {nombre:"gato de peluche", precio:400},
    {nombre:"celular a20", precio:500},
    {nombre:"playstation 5", precio:3000000},
    {nombre:"cartuchera de color azul", precio:500},
]

for(let pendiente of pendientes){
    console.log(pendiente)
}
for (let producto of carrito){
    console.log(producto.nombre)
}
