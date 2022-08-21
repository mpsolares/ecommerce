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
// contructor del objeto

class Picture{
  constructor (price){
    this.price = parseFloat(price);
    this.sold = false;
    this.iva = 1.21;
  }
  addIva(){
    this.price = this.price * this.iva;
  }
}


// Funciones get y Set para el LocalStorage
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

// Add Pictures to Cart

function addPicture(id){
  const pictures_cart = loadPicturesCart();
  let position = pictures_cart.findIndex(item => item.id === id); // Find out if the item exists

  if (position > -1 ){
    pictures_cart[position].value += 1;
  }else{
    const picture = findPicture(id);
    picture.value = 1; 
    pictures_cart.push(picture);
  }

  savePicturesCart(pictures_cart);
  refreshCartBtn();
  
  Toastify({
    text: "¡Tu cuadro ya esta en el carrito!",
    duration: 3000,
    gravity: "top", 
    position: "right",
    offset: {
    y: 70, 
    },
    style: {
      background: "#778899",
      color: "#FFF"
    }
  }).showToast();

}

// add item to cart list

function addItem(id){
  addPicture(id);
  refreshCartBtn();
}


// Delete Pictures from Cart

function deletePicture(id){
  const pictures_cart = loadPicturesCart();
  let position = pictures_cart.findIndex(item => item.id === id); // Find out if the item exists
  pictures_cart[position].value -=1;

  if (picture.value == 0 ){
    pictures_cart.splice(position, 1); // decrease by 1 the count
    
    Toastify({
      text: "¡Quitaste un cuadro del carrito!",
      duration: 3000,
      gravity: "top", 
      position: "right",
      offset: {
      y: 70, 
      },
      style: {
        background: "#778899",
        color: "#FFF"
      }
    }).showToast();
  }

  savePicturesCart(pictures_cart);
  refreshCartBtn();

}
// Delete Pictures from Cart list

function deleteItem(id){

  deletePicture(id);
  refreshCartBtn();

}


function addTableCart(){
  const container_table = loadPicturesCart();
  let list = "";
  console.log(container_table)

  if (pictures.length == 0 ){
    list += `<p>Todavía no agregaste cuadros al carrito!</p>`;
  } else{
    list += `<table class="table">`;
    container_table.forEach((picture) =>{
      list += `<tr>
                 <td><img src="img/${picture.img}" class=" mx-4 d-flex justify-content-between" alt="${picture.name}" height="50"></td>
                 <td><a href="#" class="btn btn-outline-secondary" title="delete item" onclick="deleteItem(${picture.id})">-</a> ${picture.value} <a href="#" class="btn btn-outline-secondary"  title="add item" onclick="addItem(${picture.id}">+</a></td>
                 <td>${picture.name}</td>
                 <td><b>$ ${picture.price}</b></td>
                 <td><a href="#" class="text-decoration-none mb-4 d-flex justify-content-between mx-4" onclick="deletePicture(${picture.id})"><iconify-icon icon="fluent:delete-16-regular" style="color: lightslategray;" height="25" alt="Delete" title="delete Picture"></iconify-icon></a></td>
                </tr>`;
  
    });
    list += `</table> `;  
  }
   return list;

}

function cartTotal (){

}

function  refreshCartBtn(){  
  
  let cartContent = `<div class="btn-group dropstart">
                        <button type="button" class="btn btn-outline-secondary dropdown mt-2 mx-4" data-bs-toggle="dropdown" aria-expanded="false">
                            <a href="#" id="btn-cart navbarLightDropdownMenuLink" class="d-flex nav-link dropdown" title="send to cart" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a><iconify-icon icon="akar-icons:cart" height="30"></iconify-icon>  
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">${cartTotal()}</span>
                        </button>
                        <ul class="dropdown-menu" style="width: 750px;">
                            ${addTableCart()}
                            <p class=" mx-4 d-flex flex-row-reverse text-align-right">Total<b class="mx-4 px-3">$${cartTotalItems()}</b></p>
                        </ul>
                      </div>`;
  document.getElementById("btn-cart").innerHTML = cartContent;
}

// Adding price items

function cartTotal(){
  const pictures_cart = loadPicturesCart();
 
  return pictures_cart.reduce((accumulator, item) => accumulator + item.value, 0);
}

// Adding price items

function cartTotalItems(){
  const pictures_cart = loadPicturesCart();
 
  return pictures_cart.reduce((accumulator, item) => accumulator + (item.value * item.price), 0);

}

// Creo la Galeria de Productos y la almaceno con el onclick (usando id) en funcion addPicture
function containerPictures(){
  const pictures = loadPictureslS();
  let gallery = "";

  
  pictures.forEach((picture)=>{
    gallery += `<div class="col-md-3">
                <div class="card my-2 mb-3">
                  <img src="img/${picture.img}" class="card-img-top" alt="${picture.name}">
                  <div class="card-body" style="adisplay: flex;justify-content: center;align-items: center;gap: 5px;font-family: sans-serif;">
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
refreshCartBtn();
addTableCart();
