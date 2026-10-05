/* =====================================================
   KUN4L GAMING STORE
   JavaScript
===================================================== */


/* ================= CART DATA ================= */

let cart = [];


/* ================= ELEMENTS ================= */

const cartButton = document.getElementById("cartButton");

const cartPanel = document.getElementById("cartPanel");

const closeCart = document.getElementById("closeCart");

const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

const checkoutBtn = document.getElementById("checkoutBtn");


/* ================= OPEN CART ================= */

function openCart() {

    cartPanel.classList.add("active");

    overlay.classList.add("active");

}


/* ================= CLOSE CART ================= */

function closeCartPanel() {

    cartPanel.classList.remove("active");

    overlay.classList.remove("active");

}


/* ================= CART BUTTON ================= */

cartButton.addEventListener("click", function () {

    openCart();

});


/* ================= CLOSE BUTTON ================= */

closeCart.addEventListener("click", function () {

    closeCartPanel();

});


/* ================= OVERLAY ================= */

overlay.addEventListener("click", function () {

    closeCartPanel();

});


/* ================= ADD TO CART ================= */

const buyButtons = document.querySelectorAll(".buy-btn");


buyButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name = button.dataset.name;

        const price = Number(button.dataset.price);


        const existingItem = cart.find(function (item) {

            return item.name === name;

        });


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }


        updateCart();

        openCart();

    });

});


/* ================= UPDATE CART ================= */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your cart is empty.
            </div>
        `;

    } else {

        cart.forEach(function (item, index) {

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>

                </div>

                <button
                    class="remove-item"
                    data-index="${index}">
                    Remove
                </button>

            `;


            cartItems.appendChild(cartItem);

        });

    }


    updateCartCount();

    updateCartTotal();

    addRemoveEvents();

}


/* ================= CART COUNT ================= */

function updateCartCount() {

    let count = 0;


    cart.forEach(function (item) {

        count += item.quantity;

    });


    cartCount.textContent = count;

}


/* ================= CART TOTAL ================= */

function updateCartTotal() {

    let total = 0;


    cart.forEach(function (item) {

        total += item.price * item.quantity;

    });


    cartTotal.textContent = "₹" + total.toLocaleString("en-IN");

}


/* ================= REMOVE ITEMS ================= */

function addRemoveEvents() {

    const removeButtons =
        document.querySelectorAll(".remove-item");


    removeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index =
                Number(button.dataset.index);


            cart.splice(index, 1);


            updateCart();

        });

    });

}


/* ================= CHECKOUT ================= */

checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    alert(
        "Demo checkout only.\n\n" +
        "This project does not process real payments."
    );

});


/* ================= ESC KEY ================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeCartPanel();

    }

});


/* ================= FAQ ================= */

const faqDetails =
    document.querySelectorAll("details");


faqDetails.forEach(function (detail) {

    detail.addEventListener("toggle", function () {

        if (detail.open) {

            faqDetails.forEach(function (otherDetail) {

                if (otherDetail !== detail) {

                    otherDetail.removeAttribute("open");

                }

            });

        }

    });

});


/* ================= CONSOLE MESSAGE ================= */

console.log(
    "KUN4L Gaming Store loaded successfully!"
);