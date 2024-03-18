// Mostrar el botón cuando se hace scroll hacia abajo
window.addEventListener("scroll", function() {
    var btn = document.getElementById("scrollToTopBtn");
    if (window.scrollY > 100) { // Cambiar 100 según sea necesario
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
});

// Scroll hacia arriba al hacer clic en el botón
document.getElementById("scrollToTopBtn").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Obtener elementos del DOM
let totalPrice = 0;
const cartIcon = document.getElementById("cartIcon");
const cartMenu = document.getElementById("cartMenu");
const closeBtn = document.getElementById("closeBtn");
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const cartItemsContainer = document.getElementById("cartItems");
const quantityLessButtons = document.querySelectorAll(".quantity-btn-less");

// Mostrar el carrito al hacer clic en el icono del carrito
cartIcon.addEventListener("click", function() {
    cartMenu.classList.toggle("show");
});

// Ocultar el carrito al hacer clic en el botón de cerrar
closeBtn.addEventListener("click", function() {
    cartMenu.classList.remove("show");
});

// Crear un objeto para almacenar los elementos del carrito y su cantidad
const cartItems = {};

// Agregar evento click a todos los botones "Añadir al Pedido"
addToCartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const item = this.parentElement.parentElement;
        const itemName = item.querySelector("h3").innerText;
        const itemPriceText = item.querySelector("p").innerText;
        const itemPrice = parseFloat(itemPriceText.match(/\d+(\.\d+)?/)[0]); // Extraer solo el número

        // Agregar la clase de animación al botón cuando se hace clic en él
        this.classList.remove("pulse-animation");
        void this.offsetWidth; // Reiniciar la animación
        this.classList.add("pulse-animation");

        // Actualizar el total y mostrarlo
        totalPrice += itemPrice;
        totalContainer.innerText = `Total: $${totalPrice.toFixed(2)}`;

        // Verificar si el elemento ya está en el carrito
        if (cartItems[itemName]) {
            cartItems[itemName].quantity++; // Incrementar la cantidad
            cartItems[itemName].element.querySelector('.cart-item-quantity').innerText = `x${cartItems[itemName].quantity}`; // Actualizar el contador
            cartItems[itemName].totalPrice += itemPrice; // Sumar el precio al total
            cartItems[itemName].element.querySelector('.cart-item-price').innerText = `$${cartItems[itemName].totalPrice.toFixed(2)}`; // Actualizar el precio total en el carrito
        } else {
            // Crear un nuevo elemento para el carrito
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span class="cart-item-name">${itemName}</span>
                <span class="cart-item-price">$${itemPrice.toFixed(2)}</span>
                <span class="cart-item-quantity">x1</span>
            `;
            cartItemsContainer.appendChild(cartItem);
            pedido.style.display = "block";

            // Almacenar el elemento en el objeto cartItems
            cartItems[itemName] = {
                element: cartItem,
                quantity: 1,
                totalPrice: itemPrice
            };
        }
        
        updateEmptyCartMessage();
    });
});

// Selecciona el mensaje de carrito vacío
var emptyCartMessage = document.getElementById("emptyCartMessage");

// Lógica para mostrar el mensaje si el carrito está vacío
function updateEmptyCartMessage() {
    var cartItemsCount = Object.keys(cartItems).length;
    if (cartItemsCount === 0) {
        totalContainer.style.display = "none"; // Ocultar el contenedor del total
        emptyCartMessage.style.display = "block";
        pedido.style.display = "none";
    } else {
        totalContainer.style.display = "block";
        totalContainer.innerText = `Total: $${totalPrice.toFixed(2)}`;
        emptyCartMessage.style.display = "none";
    }
}

// Llama a la función para actualizar el mensaje cuando sea necesario
updateEmptyCartMessage();

// Agregar evento click a todos los botones "Menos"

quantityLessButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const item = this.closest(".item"); // Obtener el elemento del artículo más cercano
        const itemName = item.querySelector(".item-details h3").innerText;
        const itemPriceText = item.querySelector("p").innerText;
        const itemPrice = parseFloat(itemPriceText.match(/\d+(\.\d+)?/)[0]); // Extraer solo el número

        // Agregar la clase de animación al botón cuando se hace clic en él
        this.classList.remove("pulse-animation");
        void this.offsetWidth; // Reiniciar la animación
        this.classList.add("pulse-animation");


        // Verificar si el elemento ya está en el carrito
        if (cartItems[itemName]) {
            if (cartItems[itemName].quantity > 1) {
                cartItems[itemName].quantity--; // Disminuir la cantidad si es mayor que 1
                cartItems[itemName].totalPrice -= itemPrice; // Restar el precio del total
                cartItems[itemName].element.querySelector('.cart-item-quantity').innerText = `x${cartItems[itemName].quantity}`; // Actualizar el contador
                cartItems[itemName].element.querySelector('.cart-item-price').innerText = `$${cartItems[itemName].totalPrice.toFixed(2)}`; // Actualizar el precio total en el carrito
                totalPrice -= itemPrice;
                totalContainer.innerText = `Total: $${totalPrice.toFixed(2)}`;
            } else {
                // Si la cantidad es 1, eliminar el artículo del carrito
                totalPrice -= itemPrice;
                cartItemsContainer.removeChild(cartItems[itemName].element);
                delete cartItems[itemName];
            }
        }      
        updateEmptyCartMessage();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const addWithoutAddonsBtn = document.getElementById('addWithoutAddonsBtn');

    addToCartBtn.addEventListener('click', function() {
        addToCartBtn.style.display = 'none';
        addWithoutAddonsBtn.style.display = 'inline';
    });

    addWithoutAddonsBtn.addEventListener('click', function() {
        // Aquí colocas la lógica para agregar el pedido
        const item = this.parentElement.parentElement;
        const itemName = item.querySelector("h3").innerText;
        const itemPriceText = item.querySelector("p").innerText;
        const itemPrice = parseFloat(itemPriceText.match(/\d+(\.\d+)?/)[0]); // Extraer solo el número

        // Agregar la clase de animación al botón cuando se hace clic en él
        this.classList.remove("pulse-animation");
        void this.offsetWidth; // Reiniciar la animación
        this.classList.add("pulse-animation");

        // Verificar si el elemento ya está en el carrito
        if (cartItems[itemName]) {
            cartItems[itemName].quantity++; // Incrementar la cantidad
            cartItems[itemName].element.querySelector('.cart-item-quantity').innerText = `x${cartItems[itemName].quantity}`; // Actualizar el contador
            cartItems[itemName].totalPrice += itemPrice; // Sumar el precio al total
            cartItems[itemName].element.querySelector('.cart-item-price').innerText = `$${cartItems[itemName].totalPrice.toFixed(2)}`; // Actualizar el precio total en el carrito
        } else {
            // Crear un nuevo elemento para el carrito
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span class="cart-item-name">${itemName}</span>
                <span class="cart-item-price">$${itemPrice.toFixed(2)}</span>
                <span class="cart-item-quantity">x1</span>
            `;
            cartItemsContainer.appendChild(cartItem);

            // Almacenar el elemento en el objeto cartItems
            cartItems[itemName] = {
                element: cartItem,
                quantity: 1,
                totalPrice: itemPrice
            };
        }
        updateEmptyCartMessage();

        // Luego, revertimos el proceso
        addToCartBtn.style.display = 'inline';
        addWithoutAddonsBtn.style.display = 'none';
    });   
});
