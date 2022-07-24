//First create courses

const course01 = 1000;
const course02 = 1500;
const course03 = 2000;
// add iva
const iva = (x) => { return (x * 0.21) + x };

// select course
let producto = prompt("Seleccionar Promoción 1, 2 o 3");

// depending on selected course, add iva to the final price

if (producto == 1){
 alert ("Selección la promoción 1 su total a pagar es $: " + iva(course01));
}else if (producto == 2){
    alert ("Selección la promoción 2 su total a pagar es $: " + iva(course02));
}else if (producto == 3){
    alert ("Selección la promoción 3 su total a pagar es $: " + iva(course03));
}                               