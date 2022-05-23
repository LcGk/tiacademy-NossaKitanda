const removeAllChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild)
    }
};

let idCounter = 0;
class Product {
    constructor(productName, productPrice) {
        this.productName = productName;
        this.productPrice = new Intl.NumberFormat(
            "pt-BR", {
                currency: "BRL",
                style: "currency",
            }
        ).format(productPrice);
        this.productPriceRaw = productPrice;

        this.productId = idCounter++; // Id único para cada produto criado...
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
        li.setAttribute('data-productid', product.productId);
        li.innerHTML = `<span>${product.productName}</span><span>${product.productPrice}</span>`

        li.addEventListener(
            "click", handleAddProductToCart
        );

        productsList.appendChild(li);
    });
}

function handleAddProductToCart(e) {
    const productId = e.target.getAttribute('data-productid');
    if (productId == undefined)
        return;

    const product = products[productId];

    let onList = false;

    cart.forEach(product => {
        if (product.productId == productId) {
            alert(`O produto ${product.productName} já foi adicionado a sua cesta!`);
            onList = true;
        }
    });
    
    if (onList)
        return;

    cart = [...cart, product]; // Adiciona o produto selecionado ao final da cesta

    updateCart(); // Atualiza a cesta de produtos
}

function updateCart() {
    const cartList = document.querySelector("#cart");
    removeAllChilds(cartList);

    let totalPrice = 0;

    cart.forEach(product => {
        let li = document.createElement("li");
        li.setAttribute('data-productid', product.productId);
        li.innerHTML = `<span>${product.productName}</span><span>${product.productPrice}</span>`

        li.addEventListener(
            "click", handleRemoveProductFromCart
        );

        cartList.appendChild(li);

        // Calcula o valor total dos produtos
        totalPrice += product.productPriceRaw;
    });

    // Formata o preço
    let formattedPrice = new Intl.NumberFormat(
        "pt-BR", {
            currency: "BRL",
            style: "currency",
        }
    ).format(totalPrice);

    // Altera o valor total no header e na cesta
    document.querySelector("#total-header").innerHTML = `TOTAL: ${formattedPrice}`;
    document.querySelector("#total-price").innerHTML = `TOTAL: ${formattedPrice}`;
}

function handleRemoveProductFromCart(e) {
    const productId = e.target.getAttribute('data-productid');
    if (productId == undefined)
        return;

    cart = cart.filter((product) => {
        return product.productId != productId
    })

    updateCart(); // Atualiza a cesta de produtos
}

export { populateProducts };