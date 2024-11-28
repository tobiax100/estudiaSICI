// const navegacion = document.querySelector('.navegacion');
// console.log(navegacion)
// console.log(navegacion.childNodes) //los espacios en blanco son considerados elementos
// console.log(navegacion.children)//los espacios en blanco son considerados elementos

// console.log(navegacion.children[0])

// const card = document.querySelector('.card')
// console.log(card.children[1].children[1].textContent)

// card.children[1].children[1].textContent = 'musica electronica 2024'

// card.classList.add('fondo')

// const imagen = document.querySelector('#imagen1');
// console.log(imagen);

// imagen.src = '#imagen2';


let numeros=[]
//PUNTO 1
function parImpar(num){
    for(let i = 1; i <= 100;i++){
        if( num === 'P' && i % 2===0){
            console.log(`${i} es par`)
            numeros=[...numeros,i]
        } else if (num === 'I' && i % 2 !== 0) {
            console.log(`${i} es impar`);
            numeros=[...numeros,i]
        

    }
 }
}

parImpar('P')
//PUNTO 3 IMPRIMIENDO CON FOR EACH EL ARRAY
numeros.forEach(numeros => {
    console.log(numeros);
});



//PUNTO 2
let numero2=[]
//PUNTO 4, TERCER ARRAY CON OBJETOS
array3=[]

function multiplo(num2) {
    for (let i = 1; i <= 100; i++) {
        let condicion;
        if (num2 === 'M y I' && i % 3 === 0 && i % 2 === 1) {
            console.log(`${i} es multiplo de 3 y es impar`);
            numero2 = [...numero2, i];
            condicion = "impar y múltiplo de 3";
        } else if (num2 === 'I' && i % 2 !== 0) {
            console.log(`${i} es impar`);
            numero2 = [...numero2, i];
            condicion = "impar";
        } else if (num2 === 'P' && i % 2 === 0) {
            console.log(`${i} es par`);
            numero2 = [...numero2, i];
            condicion = "par";
        } else {
            condicion = "par";
        }
        array3 = [...array3, { numero: i, condicion }];
    }
}
multiplo('I')
//PUNTO 3 IMPRIMIENDO CON FOR EACH EL ARRAY
numero2.forEach(numero2 => {
    console.log(numero2);
});


//PUNTO 3 IMPRIMIENDO CON FOR EACH EL ARRAY
array3.forEach(array3 =>{
    console.log(array3 ,'array 3')

})

