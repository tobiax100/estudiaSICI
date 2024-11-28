const cargarApiBtn = document.querySelector('#cargarAPI')
cargarApiBtn.addEventListener('click',obetenerDatos)

function obetenerDatos(){
    const url = 'https://picsum.photos/list'

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => mostrarHTML(resultado))
    .catch(err => console.log('error en la carga de la api',err))
}


function mostrarHTML(datos){
    const contenido = document.querySelector('.contenido')
    let html = ''

    datos.forEach( perfil => {
        const {author, post_url} = perfil
        
        html += `
        <p>Autor : ${author} </p>
        // <a href="${post_url}" target="_blank">Ver Imagen </a>
        `
    });
    contenido.innerHTML = html
}