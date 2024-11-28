for (let i =3; i <=100;i++){
    /*if(i%3 === 0 && i %5 ===0){
    console.log(`${i}: Fizzbuzz`)
    continue;
 }else if (i%5 === 0){
    console.log(`${i}: Buzz`)
    continue;
 }else if(i % 3 === 0){
    console.log(`${i}: Fizz`)
    continue;
 }
}*/

console.log(i % 3 === 0 && i % 5 === 0 ? 'fizzbuzz' : i % 5 === 0 ? 'buzz' : i % 3 === 0 ? 'fizz' : i);
}
