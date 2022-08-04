const cursos = [
    {id:1, name:"Curso de Aleman", img "curso01.jpg",price:2000},
    {id:2, name:"Curso de Español", img "curso02.jpg", price:1000},
    {id:3, name:"Curso de Ingles", img "curso03.jpg",price:1500},
    {id:4, name:"Curso de Italiano", img "curso04.jpg", price:2500}];


for (const curso of cursos) {
    let container = document.createElement("div");
    container.className = "col-md-3";
    container.innerHTML = `<h3>ID: ${curso.id}</h3>
                            <p>${curso.name}<br>
                            <img src="images/${curso.img}" width="180"><br>
                            <b>$ ${curso.price}</b></p>
                            <hr>`;
    document.getElementById("resultado").appendChild(container);
}