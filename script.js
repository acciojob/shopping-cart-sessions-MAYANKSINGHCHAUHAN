const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 4", price: 40 },
    { id: 5, name: "Product 5", price: 50 },
];

function renderProducts() {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - $${product.price}`;
        
        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.onclick = () => addToCart(product);
        
        li.appendChild(button);
        productList.appendChild(li);
    });
}

function addToCart(product) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex === -1) {
        cart.push(product); // Add the new product
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = ""; // Clear the cart list before rendering

    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
    });
}

document.getElementById("clear-cart-btn").onclick = () => {
    sessionStorage.removeItem("cart");
    renderCart(); // Update the cart display
};

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    renderCart(); // Load cart items on page load
});