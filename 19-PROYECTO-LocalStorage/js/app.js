//variables
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = [];


function eventListeners(){
    formulario.addEventListener('submit',agregarTweet)


   //cuando el documento esta listo
   document.addEventListener('DOMContentLoaded',()=>{
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    console.log(tweets)

    crearHTML()

   })


}

eventListeners()
    



//funciones

function agregarTweet(e){
    e.preventDefault()
    //guarda el valor de lo que el usuario escribe
    // const mensaje = tweet.value
    // 
    const tweet = document.querySelector('#tweet').value
    console.log(tweet)


    //validacion
   if(tweet ===''){
    mostrarError('Un mensaje no puede ir vacio');
    return;
   }

  const tweetObj={
    id: Date.now(),
    tweet,


  }
  

  //añadiendo el arreglo a twetts

  tweets=[...tweets,tweetObj]
    console.log(tweets)
    
    //una vez agregado vamos a agregar el html
    crearHTML()
   
    //reinicia el formulario

    formulario.reset();
}


//mostrar mensaje de error
function mostrarError(error){

  const mensajeError = document.createElement('p')
  mensajeError.textContent= error;
  mensajeError.classList.add('error');

  //insertarlo en el contenido
const contenido = document.querySelector('#contenido')
contenido.appendChild(mensajeError)

setTimeout(()=>{
  mensajeError.remove();
 },3000);

}


function crearHTML(){
limpiarHTML()
 
if(tweets.length > 0){
  tweets.forEach(tweet =>{
  //crear boton
  const btnEliminar  = document.createElement('a')
  btnEliminar.classList.add('borrar-tweet');
  btnEliminar.innerText='X';

  //añadiendo la funcion de eliminar
  btnEliminar.onclick = ()=>{
    borrarTweet(tweet.id)
  }


   //crear el html

   const li = document.createElement('li')
   
   //añadiendo el texto
  li.innerText= tweet.tweet

 
  //inserto en el html

  //agrega los tweets
  listaTweets.appendChild(li)
  //agrega el boton de eliminar
  li.appendChild(btnEliminar)
 


   })

  }
   sincronizarStorage();

}

function sincronizarStorage(){
  localStorage.setItem('tweets',JSON.stringify(tweets));


}


function limpiarHTML(){
  while(listaTweets.firstChild){
    listaTweets.removeChild(listaTweets.firstChild)
  }
}


function borrarTweet(id){
  tweets= tweets.filter(tweet => tweet.id !== id)
  crearHTML()
  console.log(tweets)
 
}
