let i = 3; //inicio

do {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log(`${i}: Fizzbuzz`);
    } else if (i % 5 === 0) {
        console.log(`${i}: Buzz`);
    } else if (i % 3 === 0) {
        console.log(`${i}: Fizz`);
    }
    i++; //incremento
} while (i <= 100); //condicion
