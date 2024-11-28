
//variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')

let articulosCarrito = [];

//funcion donde voy a cargar todos los eventos del proyecto

cargarEvenlisteners();
function cargarEvenlisteners(){
    listaCursos.addEventListener('click',agregarCurso);

    carrito.addEventListener('click',eliminarCurso)

    document.addEventListener('DOMContentLoaded',cargarAPI)

}

//funciones

function cargarAPI(){
  const url = 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline'
    
  fetch(url)
  .then(respuesta => respuesta.json())
  .then(datos => mostrarProductos(datos))
  .catch(err => console.log('Error al cargar los productos ', err))
}


function mostrarProductos(productos){
  productos.forEach(producto =>{
    const { id, name, price, image_link} = producto;
    const div = document.createElement('div')
    div.classList.add('four','columns');

    div.innerHTML = `
            <div class="card api-card">
                <img src="${image_link}" class="imagen-curso u-full-width">
                <div class="info-card">
                    <h4>${name}</h4>
                    <p>juana</p>
                    <p class="precio">$${price}<span class="u-pull-right">$${price}</span></p>
                    <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${id}">Añadir al carrito</a>
                </div>
            </div>
        `;
    
    listaCursos.appendChild(div)
  })
  

}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }

}

function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');
    
    const cursoIndex = articulosCarrito.findIndex(curso => cursoId === curso.id);
    
    if (cursoIndex !== -1) {
      if (articulosCarrito[cursoIndex].cantidad > 1) {
        articulosCarrito[cursoIndex].cantidad--;
      } else {
        articulosCarrito.splice(cursoIndex, 1);
      }
      
      carritoHTML();
    }
  }
}

function leerDatosCurso(curso){


    infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1 
    }
    console.log(infoCurso)

//revisa si un elemento ya existe en el
   const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
   if(existe){
    //actualizamos la cantidad
    const cursos = articulosCarrito.map(curso =>{
    if(curso.id === infoCurso.id){
      curso.cantidad++;
      return curso; //retorna el objeto acttualizado
    }else{
      return curso;// retorna los objetos q no son duplicados
    }

    });
    articulosCarrito = [...cursos]
    console.log(articulosCarrito)

   }else{
   //Agrega elementos al carrito
   articulosCarrito =[...articulosCarrito,infoCurso]

   }
console.log(existe)
    carritoHTML()
    // console.log(articulosCarrito)
}


function carritoHTML(){
  //limpiar el html
limpiarHTML()
 
 
  //recorre el carrito y genera html
articulosCarrito.forEach(curso =>{
    const{imagen,titulo,precio,cantidad,id} = curso
    const row = document.createElement('tr');
    row.innerHTML= `
    <td>
    <img src="${imagen}" width="100">
    </td>
    <td>
      ${titulo}
    </td>
    <td>
      ${precio}
    </td>
    <td>
      ${cantidad}
    </td>
    <td>
    <a href="#" class="borrar-curso" data-id="${id}"> X <a/>
    </td>
    `

    //agrega el html del carrito en el tbody
    contenedorCarrito.appendChild(row)
})
}


function limpiarHTML(){
  // contenedorCarrito.innerHTML='';

 while(contenedorCarrito.firstChild){
  contenedorCarrito.removeChild(contenedorCarrito.firstChild)
 }

}

vaciarCarrito.addEventListener('click',()=>{
  articulosCarrito = [];
  limpiarHTML();
})



