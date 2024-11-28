document.addEventListener('DOMContentLoaded',()=>{

const busqueda = document.querySelector('.busqueda')
const button = document.querySelector('#btn-submit')
const navegacion = document.querySelector('.navegacioon')
    
    
busqueda.addEventListener('input',(e)=>{
    console.log(e.target.value)
})
    
button.addEventListener('click',()=>{
    console.log('hiciste click')
})



navegacion.createElement('a')
navegacion.appendChild('a')













})