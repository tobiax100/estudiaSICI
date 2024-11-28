const cargarJsonArrayBtn = document.querySelector('#cargarJSONArray')
cargarJsonArrayBtn.addEventListener('click',obtenerDatos)

function obtenerDatos(){
    const url = 'data/empleados.json';

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => mostrarHtml(resultado))
    .catch(error => console.log('Error al cargar el JSON:',error)) 
}


function mostrarHtml(empleados){
    const contenido = document.querySelector('.contenido')
    
    let html = ''

    empleados.forEach(empleado =>{
    const {empresa, id , nombre ,trabajo} = empleado
   
    html += `
        <p>Nombre :${nombre} </p>
        <p>Empresa :${empresa} </p>
        <p>Trabajo :${trabajo} </p>
        <p>ID :${id} </p>
    `;


    })
    
     contenido.innerHTML = html
}