class Product {
    constructor(productName, productPrice) {
        this.productName = productName;
        this.productPrice = new Intl.NumberFormat(
            "pt-BR", {
                currency: "BRL",
                style: "currency",
            }
        ).format(productPrice);
    }
}

const products = [
    new Product("Mamão Papaia", 5.00),
    new Product("Laranja", 2.00),
    new Product("Manga", 3.00),
    new Product("Melão", 3.50),
    new Product("Melancia", 4.50),
    new Product("Maçã", 2.00),
];

let cart = [];

function populateProducts() {
    const productsList = document.querySelector("#products");

    products.forEach(product => {
        let li = document.createElement("li");
        li.innerHTML = `<span>${product.productName}</span><span>${product.productPrice}</span>`

        productsList.appendChild(li);
    });
}

export { populateProducts };