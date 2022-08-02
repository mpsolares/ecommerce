// Creo los arrays de los productos como constantes
const courses = [
    {id:1, name:"Curso de Aleman", price:2000},
    {id:2, name:"Curso de Español", price:1000},
    {id:3, name:"Curso de Ingles", price:1500},
    {id:4, name:"Curso de Italiano", price:2500},
];
//Creo el contructor del objeto y los addons

class Course{
    constructor (object){
        this.id = object.id;
        this.name = object.name;
        this.price = object.price;
        this.discount = 0.10;
        this.iva = 0.21;
    }
    
    // fución aplicarle el iva a los cursos

    addIva(){
        this.price = this.price + (this.price * this.iva);
    }

    // aplicar descuento

    addDiscount(){
        if (createImageBitmap.lenght > 2){
            this.price = this.price + (this.price * this.discount);
        }
    }
}

//creando el array del arrito

const cart = [];

// Creo las funciones agregar y eliminar productos del carrito

function addCourse(course){
    cart.push(course);
    console.log("Producto Agregado excitosamente");
    console.log(cart);
}

function erraseCourse(id){
    let pos = cart.indexOf((element) => element.id == id);
    cart.splice(pos, 1);
    console.log("Producto Eliminado excitosamente");
    console.log(cart);
}

// Funncion buscar el producto dentro del array y devolver el objeto segun su id

function findCourse(id){
    return courses.find((element) => element.id == id);
}

// Agregar productos al carrito

function addCoursesToCart(){
    let outMessage = "Seleccione el producto a agregar al carrito \n PARA TERMINAR PRESIONES CANCELAR \n\n"

    for (let course of courses){
        outMessage += product.id + ". " + course.name + "   $" + course.price + "\n";
    }

    let id_course = 0; //creo e inicializo la variable donde guardo la elección del usuario
    

    while (id_course != null){
        let id_course = prompt(outMessage);
        

        if (id_course != null){
            
            id_course = parseInt(id_course);

            let course = findCourse(id_course); // guardo en la variable el resultado que trae la función findCourse para luego agregarla a la función addCourse

            addCourse(course); //agrego al array del carrito el contenido de variable course del carrito
        }else{
            let errorMessage = "Debe seleccionar una opción valida"
            alert (errorMessage);
            break;
        }
    }
}

//Función para Eliminar productos del carrito

function showCoursesToDiscard() {
    let outMessage = "";

    if (cart.length > 0) {
        outMessage += product.id + ". " + course.name + "   $" + course.price + "\n"; 

        let id_course = prompt(outMessage);
    
        if (id_course != null){
            id_course = parseInt (id_course);
            erraseCourse(id_course);
        }
        showCourseOnCart();
    }else {
        outMessage= "No Tiene Cursos en el Carrito";
        alert(outMessage);
    }
}

function showCourseOnCart() {
    let outMessage = "";

    if (cart.length > 0){
        outMessage = "Cursos Seleccionados: \n\n";
        let fullAmount = 0; // inicio la variable de total a pagar

        for (let courseOnCart of cart) {
            let course = new Course (courseOnCart);
            console.log("Precio sin iva: $" + course.price);
            course.addIva();
            console.log("Precio con iva: $" + course.price);
            course.addDiscount();
            console.log("Precio con descuento: $" + course.price);
            fullAmount += course.price;
            outMessage += course.id + ". " + course.name + "    $" + course.price + "\n";
        }
        outMessage += "\n\nTotal a pagar: $" + fullAmount.toFixed(1);
    } else {
        outMessage = "No Hay Productos en  el Carrito";
    }
    alert(outMessage);
}
addCoursesToCart();
showCoursesToDiscard();




    