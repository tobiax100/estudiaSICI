const metodoPago=''

switch(metodoPago){
    case 'efectivo':
    pagar('efectivo');
    break;
case 'cheque':
    pagar('cheque');
    break;
    case 'tarjeta':
        pagar('tarjeta');
        break;
default:
    console.log(`aun no has seleccionado un metodo de pago o metodo de pago no seleccionado`)
    
}
function pagar(metodoPago){
    console.log(`pagando... con ${metodoPago}`)
}