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

// Usando Fetch para Carrousel

async function carouselFetch ( ) {
  let arrayCouresel = [ ] ;
  let carousel = "";
  await fetch ('js/carouselPictures.json')
      .then (response => response.json())
      .then (data => arrayCouresel = data)
      .catch (err => console.log (err));
      let active = "active";
      setTimeout(() => {
        arrayCouresel.forEach (picture => {
            carousel +=`<div class="carousel-item ${active}">
                          <img src="img/${picture.img}" class="d-block w-100" alt="img/${picture.name}">
                          <div class="carousel-caption d-none d-md-block">
                            <h5 class="back-picture pt-2">${picture.name}</h5>
                            <p class="back-picture pb-2">$${picture.price}</p>
                            <div class="btn-group m-2">
                             <button class="btn btn-outline-secondary dropdown mt-2 mx-4" type="button"><a href="#gallery"> Comprar </a></button>
                            </div>
                          </div>
                        </div>`;
            active = "";
          });
          document.getElementById("carousel").innerHTML = carousel;

  }, 200)
}
carouselFetch();

// Funciones get y Set para el LocalStorage
function savePicturesLS(){
  fetch ('js/pictures.json')
  .then (response => response.json())
  .then (data => {
    localStorage.setItem("cuadros", JSON.stringify(data));
  });
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
    duration: 2000,
    gravity: "top", 
    position: "right",
    offset: {
    y: 70, 
    },
    style: {
      background: "#778899",
      maxWidth: "fit-content",
      color: "#FFF"
    }
  }).showToast();

}

// add item to cart list

function addItem(id){
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
      duration: 2000,
      gravity: "top", 
      position: "right",
      offset: {
      y: 70, 
      },
      style: {
        background: "#778899",
        maxWidth: "fit-content",
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
    Toastify({
      text: "¡Quitaste un cuadro del carrito!",
      duration: 2000,
      gravity: "top", 
      position: "right",
      offset: {
      y: 70, 
      },
      style: {
        background: "#778899",
        maxWidth: "fit-content",
        color: "#FFF"
      }
    }).showToast();
  }

  savePicturesCart(pictures_cart);
  refreshCartBtn();

}


function addTableCart(){
  const container_table = loadPicturesCart();
  let list = "";
  //console.log(container_table)

  if (container_table.length == 0 ){
    list += `<p>Todavía no agregaste cuadros al carrito!</p>`;
  } else{
    list += `<table class="table" >`;
    container_table.forEach((picture) =>{
      list += `<tr>
                 <td><img src="img/${picture.img}" class=" mx-4 d-flex justify-content-between" alt="${picture.name}" height="50"></td>
                 <td><span class="btn btn-outline-secondary rounded-circle" title="delete item" onclick="deletePicture(${picture.id})" style="margin-right: 5px" aria-labelledby="dropdownMenuClickable">-</span>${picture.value}<span class="btn btn-outline-secondary rounded-circle" style="margin-left: 7px" title="add item" onclick="addItem(${picture.id})" aria-labelledby="dropdownMenuClickable">+</span></td>
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
                        <button class="btn btn-outline-secondary dropdown mt-2 mx-4" type="button" id="dropdownMenuClickableOutside" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                            <a href="#" id="btn-cart navbarLightDropdownMenuLink" class="d-flex nav-link dropdown" title="send to cart" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a><iconify-icon icon="akar-icons:cart" height="30"></iconify-icon>  
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">${cartTotal()}</span>
                        </button>
                        <ul class="dropdown-menu mx-4 px-3 dropdow-mobile" style="width: 750px;" aria-expanded="false" data-bs-auto-close="false" id="dropdownMenuClickableOutside">
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

async function usingFetch ( ) {
  let arr = [ ] ;
  let gallery = "";
  await fetch ('js/pictures.json')
      .then (res => res.json())
      .then (data => arr = data)
      .catch (err => console.log (err));

      setTimeout(() => {
        console.log(arr);
        arr.forEach (picture => {
            gallery += `<div class="col-md-3">
                        <div class="card my-2 mb-3">
                          <img src="./img/${picture.img}" class="card-img-top" alt="${picture.name}">
                          <div class="card-body" style="adisplay: flex;justify-content: center;align-items: center;gap: 5px;font-family: sans-serif;">
                            <p class="card-title">${picture.name}</p>
                            <h5><b>$${picture.price}</b></h5>
                            <a href="#" class="btn btn-outline-secondary align-self-center" onclick="addPicture(${picture.id})">Agregar <iconify-icon icon="akar-icons:cart" class="btn-bd-primary"></iconify-icon></a>
                          </div>
                        </div>
                        </div>`;
                      });
              document.getElementById("result").innerHTML = gallery;

      }, 200)
}
usingFetch();
savePicturesLS();
refreshCartBtn();
addTableCart();
