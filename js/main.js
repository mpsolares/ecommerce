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

  if (pictures_cart[position].value == 0){
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
  const pictures_cart = loadPicturesCart();
  let position = pictures_cart.findIndex(item => item.id === id); // Find out if the item exists

  if (position >= 0){
    pictures_cart.splice(position, 1); // decrease by 1 the count
    /*Toastify({
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
    }).showToast();*/
  }

  savePicturesCart(pictures_cart);
  refreshCartBtn();

}


function addTableCart(){
  const container_table = loadPicturesCart();
  let list = "";
  console.log(container_table)

  if (pictures.length == 0 ){
    list += `<p>Todavía no agregaste cuadros al carrito!</p>`;
  } else{
    list += `<table class="table" >`;
    container_table.forEach((picture) =>{
      list += `<tr>
                 <td><img src="img/${picture.img}" class=" mx-4 d-flex justify-content-between" alt="${picture.name}" height="50"></td>
                 <td><a href="#" class="btn btn-outline-secondary rounded-circle" title="delete item" onclick="deletePicture(${picture.id})" style="margin-right: 5px" aria-labelledby="dropdownMenuClickable">-</a>${picture.value}<a href="#" class="btn btn-outline-secondary rounded-circle" style="margin-left: 7px" title="add item" onclick="addItem(${picture.id})" aria-labelledby="dropdownMenuClickable">+</a></td>
                 <td>${picture.name}</td>
                 <td><b>$ ${picture.value * picture.price}</b></td>
                 <td><a href="#" class="text-decoration-none mb-4 d-flex justify-content-between mx-4" onclick="deleteItem(${picture.id})" aria-labelledby="dropdownMenuClickable"><iconify-icon icon="fluent:delete-16-regular" style="color: lightslategray;" height="25" alt="Delete" title="delete Picture"></iconify-icon></a></td>
                </tr>`;
  
    });
    list += `</table> `;  
  }
   return list;

}

function  refreshCartBtn(){  
  
  let cartContent = `<div class="btn-group dropstart " >
                        <button class="btn btn-outline-secondary dropdown mt-2 mx-4" type="button" id="dropdownMenuClickable" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                            <a href="#" id="btn-cart navbarLightDropdownMenuLink" class="d-flex nav-link dropdown" title="send to cart" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a><iconify-icon icon="akar-icons:cart" height="30"></iconify-icon>  
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">${cartTotal()}</span>
                        </button>
                        <ul class="dropdown-menu mx-4 px-3" style="width: 750px;" aria-labelledby="dropdownMenuClickable">
                            ${addTableCart()}
                            <p class=" mx-4 d-flex flex-row-reverse text-align-right">Total<b class="mx-4 px-4">$${cartTotalItems()}</b></p>
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

//Agregar fetch al proyecto

const result = document.getElementById("resultado");
fetch('https://mpsolares.github.io/ecommerce/')
.then((response) => response.json())
.then((data) => {
    console.log(data);

    data.forEach(value => {
        let column = document.createElement("div");
        column.className = "col-md-3";
        let div_father = document.createElement("div");
        div_father.className = "card my-3";
        let div_son1 = document.createElement("div");
        div_son1.className = "card-header";
        let div_son2 = document.createElement("div");
        div_son2.className = "card-body";
        let paragraph = document.createElement("p");
        div_son1.innerText = value.title;
        paragraph.innerText = value.body;
        div_son2.appendChild(paragraph);
        div_father.appendChild(div_son1);
        div_father.appendChild(div_son2);
        column.appendChild(div_father);
        result.appendChild(column);
    });
}) 

savePicturesLS(pictures);
containerPictures();
refreshCartBtn();
addTableCart();
