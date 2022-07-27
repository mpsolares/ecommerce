class Product {
    constructor(name, price, image) {
        this.name = name.toUpperCase();
        this.price = parseFloat(price);
        this.image = image;
        this.sold = false;
        this.iva = 1.21;
    }

    addIva() {
        this.price = this.price * this.iva;
    }
}

const products = [];
products.push(new Product("Curso 01", 1200, "img01.jpg"));
products.push(new Product("Curso 02", 2000, "img02.jpg"));
products.push(new Product("Curso 03", 1900, "img02.jpg"));
console.log(products);
let content = "";

for (const product of products) {
    product.addIva();
    console.log("Nombre: " + product.name + ", Precio: $" + product.price);
    content += `<div>
    <p>${product.name}<br>
    <img src="img/${product.image}" alt="${product.name}" width="240"><br>
    <b>$${product.price}</b></p>
    </div>`;
}

console.log(content);
document.getElementById("Cursos").innerHTML = content;