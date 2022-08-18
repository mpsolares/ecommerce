// Creo el Array de Productos
const pictures = [
    {id:01, name:"Cuadro Acuarelas Marrones", img: "cuadro01.jpg", price:4000},
    {id:02, name:"Cuadro Acuarelas Pasteles", img: "cuadro02.jpg", price:3000},
    {id:03, name:"Combo dos Cuadros Acuarelas", img: "cuadro03.jpg", price:7500},
    {id:04, name:"Cuadro Flores Acuarelas", img: "cuadro04.jpg", price:2500},
    {id:05, name:"Cuadro Acuarelas Marrones", img: "cuadro04.jpg", price:4000},
    {id:06, name:"Cuadro Acuarelas Pasteles", img: "cuadro03.jpg", price:3000},
    {id:07, name:"Combo dos Cuadros Acuarelas", img: "cuadro02.jpg", price:7500},
    {id:08, name:"Cuadro Flores Acuarelas", img: "cuadro01.jpg", price:2500},
    {id:09, name:"Cuadro Acuarelas Marrones", img: "cuadro01.jpg", price:4000},
    {id:10, name:"Cuadro Acuarelas Pasteles", img: "cuadro02.jpg", price:3000},
    {id:11, name:"Combo dos Cuadros Acuarelas", img: "cuadro04.jpg", price:7500},
    {id:12, name:"Cuadro Flores Acuarelas", img: "cuadro03.jpg", price:2500},
    {id:13, name:"Cuadro Acuarelas Marrones", img: "cuadro03.jpg", price:4000},
    {id:14, name:"Cuadro Acuarelas Pasteles", img: "cuadro02.jpg", price:3000},
    {id:15, name:"Combo dos Cuadros Acuarelas", img: "cuadro01.jpg", price:7500},
    {id:16, name:"Cuadro Flores Acuarelas", img: "cuadro04.jpg", price:2500}
];

// Funciones get y Set para elLocalStorage
function savePicturesLS(pictures){
  localStorage.setItem("cuadros", JSON.stringify(pictures));
}

function loadPictureslS(){
  return JSON.parse(localStorage.getItem("cuadros")) || [];
}

function savePicturesCart(pictures){
  localStorage.setItem("cuadros_cart", JSON.stringify(pictures));
}

function loadPicturesCart(){
  return JSON.parse(localStorage.getItem("cuadros_cart")) || [];
}

function findPicture(id){
  const pictures = loadPictureslS();
  
  return pictures.find(item => item.id === id);
}

function addPicture(id){
  const pictures_cart = loadPicturesCart();
  const picture = findPicture(id);
  pictures_cart.push(picture);
  savePicturesCart(pictures_cart);
}


function addLiCart(){
  const container_li = addPicture();
  let list = "";

  container_li.forEach((picture) =>{
    list += `<li><a class="dropdown-item" href="#">${picture.name}</a></li>`;
    document.getElementById("").innerHTML = list;

  });

}

function  btnCartLoad(){
  const pictures_cart = loadPicturesCart();
  const picture_item = addLiCart();
  let total = pictures_cart.length;
  let cartContent = `<div class="btn-group dropstart">

                        <button type="button" class="btn btn-outline-secondary dropdown mt-2 mx-4" data-bs-toggle="dropdown" aria-expanded="false">
                        
                        <a href="#" id="btn-cart navbarLightDropdownMenuLink" class="d-flex nav-link dropdown" title="send to cart" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a><iconify-icon icon="akar-icons:cart" height="30"></iconify-icon>  
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">${total}</span>

                        </button>

                        <ul class="dropdown-menu">
                          ${picture_item}
                        </ul>
                      </div>`;
  document.getElementById("btn-cart").innerHTML = cartContent;
}


// Creo la Galeria de Productos y la almaceno con el onclick (usando id) en funcion addPicture
function containerPictures(){
  const pictures = loadPictureslS();
  let gallery = "";

  pictures.forEach((picture)=>{
    gallery += `<div class="col-md-3">
                <div class="card my-2 mb-3">
                  <img src="img/${picture.img}" class="card-img-top" alt="${picture.name}">
                  <div class="card-body">
                    <p class="card-title">${picture.name}</p>
                    <h5><b>$${picture.price}</b></h5>
                    <a href="#" class="btn btn-outline-secondary align-self-center" onclick="addPicture(${picture.id})">Agregar <iconify-icon icon="akar-icons:cart" class="btn-bd-primary"></iconify-icon></a>
                  </div>
                </div>
                </div>`;
      document.getElementById("result").innerHTML = gallery;
  }); 
}

savePicturesLS(pictures);
containerPictures();
btnCartLoad();
addLiCart();
