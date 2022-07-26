const productos = [{id:1,nombre:"Antull",imagen:"work-1.jpg"},{id:2,nombre:"Antull", imagen:"work-2.jpg"},{id:3,nombre:"Veo Veo",imagen:"work-3.jpg"},{id:4,nombre:"Veo Veo", imagen:"work-4.jpg"},{id:5,nombre:"Alexia", imagen:"work-5.jpg"},{id:6,nombre:"Alexia", imagen:"work-6.jpg"}];

let items = 2;
let contenido= "";

for(let producto of productos){

    contenido += "<div class='card col-md-4'>";
    contenido += "<img src='img/" + producto.imagen + "' class='card-img-top' width='400' alt='" + producto.nombre + "'>"; 
    contenido += "<div class='card-body'>";
    contenido += "<p class='card-text'>" + producto.nombre + "</p>";
    contenido += "</div>";
    contenido += "</div>";
}

document.getElementById("productos").innerHTML=contenido;
console.log("Fin del programa!");  