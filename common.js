// Function to add a product to the cart
function addToCart(id, name, price) {
    const cart = getCart();
    const product = {
        id: id,
        name: name,
        price: price,
        quantity: 1
    };

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        // Increment the quantity if the product is already in the cart
        existingProduct.quantity++;
    } else {
        // Otherwise, add the product to the cart
        cart.push(product);
    }

    // Update the cart in local storage
    setCart(cart);

    // Refresh the cart display
    displayCart();
}

// Function to remove a product from the cart
function removeFromCart(id) {
    const cart = getCart();

    // Find the index of the product in the cart
    const index = cart.findIndex(item => item.id === id);

    if (index !== -1) {
        // Remove the product from the cart
        cart.splice(index, 1);

        // Update the cart in local storage
        setCart(cart);

        // Refresh the cart display
        displayCart();
    }
}

// Function to display the cart
function displayCart() {
    const cart = getCart();
    const cartItemsList = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    // Clear the cart items list
    cartItemsList.innerHTML = "";

    let total = 0;

    // Loop through the cart and display each item
    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${item.name} (Quantity: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)} <button onclick="removeFromCart(${item.id})">Remove</button>`;
        cartItemsList.appendChild(listItem);

        // Calculate the total price
        total += item.price * item.quantity;
    });

    // Display the total price
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to retrieve the cart from local storage
function getCart() {
    const cartJSON = localStorage.getItem("cart");
    return cartJSON ? JSON.parse(cartJSON) : [];
}

// Function to set the cart in local storage
function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
