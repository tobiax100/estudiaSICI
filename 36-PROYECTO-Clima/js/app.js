const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const diario = document.querySelector('#resultado-diario')



window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e){
    e.preventDefault();

    //console.log('buscando el clima')

    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    console.log(ciudad)
    console.log(pais)

    if(ciudad === '' || pais === ''){
        mostrarError('Ambos campos deben ser obligatorios');

        return;
    }
    //consultar la API 
    consultarAPI(ciudad,pais);
    consultarClimaDiario(ciudad, pais);

}
function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
            // crear una alerta

        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto',',mt-6','text-center');

        alerta.innerHTML = `
        <strong class="font-bold">Error!!</strong>
        <span class="block">${mensaje}</span>`;

        container.appendChild(alerta);
       
        //Eliminar alerta
        setTimeout( ()=>{
            alerta.remove();

        },3000)}
}

function consultarAPI(ciudad,pais){

    const appId = '70a3d38046820f3f4c6bcd89c0f02dd7';

    const url =` https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    console.log(url)
    Spinner(); //Muestra un spinner de carga

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log(datos)
        if(datos.cod === "404"){
            mostrarError('Ciudad no encontrada')
            return;
        }
    
        //Imprime la respuesta en el html
        mostrarClima(datos)
    })

}

function mostrarClima(datos){
    limpiarHTML()
    const {name, main: {temp, temp_max, temp_min,humidity},wind: {speed},weather:{0:{icon}}} = datos;

    const centigrados = kelvinAcentrigrados(temp);
    const max = kelvinAcentrigrados(temp_max);
    const min = kelvinAcentrigrados(temp_min);
    const humedad = humidity;
    const velocidadViento = speed;
    const icono = icon;
    const urlIcon =`https://openweathermap.org/img/wn/${icono}@2x.png`; 


    
    // let emojiclima;
    // if(centigrados <= 15){
    //     emojiclima = '&#129398'
    // }else if (centigrados >= 27){
    //     emojiclima = '&#129397'
    // }else{
    //     emojiclima = '&#129299&#9757'
    // }

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name};`
    nombreCiudad.classList.add('font-bold','text-2xl'); 
    
    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451 `;
    actual.classList.add('font-bold','text-6xl',);
        
    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451`
    tempMaxima.classList.add('text-xl');

    const tempMinimo = document.createElement('p');
    tempMinimo.innerHTML = `Min: ${min} &#8451`
    tempMinimo.classList.add('text-xl');


    const humedadActual = document.createElement('p');
    humedadActual.innerHTML = `Humedad: ${humedad} %`
    humedadActual.classList.add('text-xl')

    const viento = document.createElement('p');
    viento.innerHTML = `Viento: ${velocidadViento} km/h`;
    viento.classList.add('text-xl')

    const img = document.createElement('img');
    img.src = urlIcon;
    actual.appendChild(img)
    img.classList.add('imagen');
    
    const divExtra = document.createElement('div');
    divExtra.classList.add('text-center','text-white','alineador');

  
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');
    resultadoDiv.appendChild(nombreCiudad);
    divExtra.appendChild(actual);
    resultadoDiv.appendChild(divExtra);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinimo);
    resultado.appendChild(resultadoDiv);
    resultadoDiv.appendChild(humedadActual);
    resultadoDiv.appendChild(viento);
}

function consultarClimaDiario(ciudad, pais) {
    const apiKey = '88bb78e7ff474dbaaf3122741241311';
    const url2 = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad},${pais}&days=7`

    console.log('2', url2);

    Spinner(diario);
    fetch(url2)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML(diario);
            mostrarClimaDiario(datos);
        })
        .catch(error => {
            console.error('Error al obtener los datos del clima:', error);
            mostrarError('No se pudo obtener el pronóstico diario');
        });
}


function mostrarClimaDiario(datos) {
    limpiarHTML(diario);

    const { forecast } = datos;
    const { forecastday } = forecast;

    if (!forecastday) {
        mostrarError('No se pudo obtener el pronóstico diario');
        return;
    }

    forecastday.forEach(dia => {
        const { date, hour } = dia;

        const mañana = hour.find(h => h.time.includes("06:00")).temp_c;
        const tarde = hour.find(h => h.time.includes("12:00")).temp_c;
        const noche = hour.find(h => h.time.includes("18:00")).temp_c;

        const díaClima = document.createElement('p');
        díaClima.innerHTML = `<strong>${date}</strong>`;
        díaClima.classList.add('font-bold', 'text-xl', 'card-title');

        const mañanaClima = document.createElement('p');
        mañanaClima.innerHTML = `Mañana: ${mañana} &#8451`;
        mañanaClima.classList.add('text-lg', 'card-content');

        const tardeClima = document.createElement('p');
        tardeClima.innerHTML = `Tarde: ${tarde} &#8451`;
        tardeClima.classList.add('text-lg', 'card-content');

        const nocheClima = document.createElement('p');
        nocheClima.innerHTML = `Noche: ${noche} &#8451`;
        nocheClima.classList.add('text-lg', 'card-content');

        const resultadoDiv = document.createElement('div');
        resultadoDiv.classList.add('text-center', 'card', 'mb-4');
       
        resultadoDiv.appendChild(díaClima);
        resultadoDiv.appendChild(mañanaClima);
        resultadoDiv.appendChild(tardeClima);
        resultadoDiv.appendChild(nocheClima);

        diario.appendChild(resultadoDiv);
    });
}


function limpiarHTML()
    {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }}

const kelvinAcentrigrados = grados => parseInt(grados-273.15);

//36.6.3

function Spinner(){
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}




/*
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const diario = document.querySelector('#resultado-diario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    // Consultar a la API
    consultarApi(ciudad, pais);
    consultarClimaDiario(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        // Crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}

function consultarApi(ciudad, pais) {
    const appId = 'c0790e3d3ed8af7f6a2ec0a99faf1c54';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    console.log('1', url);

    Spinner(resultado);
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML(resultado);
            if (datos.cod === "404") {
                mostrarError('Ciudad No Encontrada');
                return;
            }
            // Imprime la respuesta en el HTML
            mostrarClima(datos);
        });
}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinAcentrigrados(temp);
    const max = kelvinAcentrigrados(temp_max);
    const min = kelvinAcentrigrados(temp_min);

    let emojiClima;
    if (centigrados <= 15) {
        emojiClima = '🥶';
    } else if (centigrados >= 27) {
        emojiClima = '🔥';
    } else {
        emojiClima = '😶👌';
    }

    const nombreciudad = document.createElement('p');
    nombreciudad.textContent = `El clima en la ciudad de ${name} es:`;
    nombreciudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451; ${emojiClima}`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(nombreciudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}

function consultarClimaDiario(ciudad, pais) {
    const apiKey = '88bb78e7ff474dbaaf3122741241311';
    const url2 = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad},${pais}&days=7`;

    console.log('2', url2);

    Spinner(diario);
    fetch(url2)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML(diario);
            mostrarClimaDiario(datos);
        })
        .catch(error => {
            console.error('Error al obtener los datos del clima:', error);
            mostrarError('No se pudo obtener el pronóstico diario');
        });
}


function mostrarClimaDiario(datos) {
    limpiarHTML(diario);

    const { forecast } = datos;
    const { forecastday } = forecast;

    if (!forecastday) {
        mostrarError('No se pudo obtener el pronóstico diario');
        return;
    }

    forecastday.forEach(dia => {
        const { date, hour } = dia;

        const mañana = hour.find(h => h.time.includes("06:00")).temp_c;
        const tarde = hour.find(h => h.time.includes("12:00")).temp_c;
        const noche = hour.find(h => h.time.includes("18:00")).temp_c;

        const díaClima = document.createElement('p');
        díaClima.innerHTML = `<strong>${date}</strong>`;
        díaClima.classList.add('font-bold', 'text-xl', 'card-title');

        const mañanaClima = document.createElement('p');
        mañanaClima.innerHTML = `Mañana: ${mañana} &#8451;`;
        mañanaClima.classList.add('text-lg', 'card-content');

        const tardeClima = document.createElement('p');
        tardeClima.innerHTML = `Tarde: ${tarde} &#8451;`;
        tardeClima.classList.add('text-lg', 'card-content');

        const nocheClima = document.createElement('p');
        nocheClima.innerHTML = `Noche: ${noche} &#8451;`;
        nocheClima.classList.add('text-lg', 'card-content');

        const resultadoDiv = document.createElement('div');
        resultadoDiv.classList.add('text-center', 'card', 'mb-4');

        resultadoDiv.appendChild(díaClima);
        resultadoDiv.appendChild(mañanaClima);
        resultadoDiv.appendChild(tardeClima);
        resultadoDiv.appendChild(nocheClima);

        diario.appendChild(resultadoDiv);
    });
}


const kelvinAcentrigrados = grados => parseInt(grados - 273.15);

function limpiarHTML(contenedor) {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

function Spinner(contenedor) {
    limpiarHTML(contenedor);

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10"></div>
        <div class="sk-circle11"></div>
        <div class="sk-circle12"></div>
    `;

    contenedor.appendChild(divSpinner);
}


*/