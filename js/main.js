const cursos = [
    {id:01, name:"Curso de Aleman", img: "curso01.jpg", price:2000},
    {id:02, name:"Curso de Español", img: "curso02.jpg", price:1000},
    {id:03, name:"Curso de Ingles", img: "curso03.jpg", price:1500},
    {id:04, name:"Curso de Italiano", img: "curso04.jpg", price:2500}
];

for (const curso of cursos) {
    let container = document.createElement("div");
    container.className = "col-md-3";
    container.innerHTML = `<h3>ID ${curso.id}</h3>
                            <p>${curso.name}<br>
                            <img src="img/${curso.img}" width="180"><br>
                            <b>$ ${curso.price}</b></p>
                            <div class="card__btn">
                            <button class="btn btn btn-success" data-product-sku="${curso.name}">Agregar</button>
                            </div>      
                            <hr>`;
    document.getElementById("result").appendChild(container);
}

let buttons = document.getElementsByTagName("button");

const cart = [];

for (var i = 0; i < buttons.length; i++) {
  let button = buttons[i];
  console.log(button);
  button.addEventListener('click', function(event){
    console.clear();
    console.log(event.target);
    console.log(event.target.dataset.productSku);
    cart.push( event.target.dataset.productSku );
    console.log(cart)    
  });
  
}

