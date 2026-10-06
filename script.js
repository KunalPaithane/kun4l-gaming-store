/* =====================================================
   KUN4L GAMING STORE
   UPGRADED JAVASCRIPT
===================================================== */

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


/* ================= LOAD CART ================= */

function loadCart() {

    try {

        const savedCart =
            localStorage.getItem("kun4lCart");

        if (savedCart) {

            const parsedCart =
                JSON.parse(savedCart);

            if (Array.isArray(parsedCart)) {
                cart = parsedCart;
            }
        }

    } catch (error) {

        console.error(
            "Could not load cart:",
            error
        );

        cart = [];
    }
}


/* ================= SAVE CART ================= */

function saveCart() {

    try {

        localStorage.setItem(
            "kun4lCart",
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error(
            "Could not save cart:",
            error
        );
    }
}


/* ================= CART OPEN / CLOSE ================= */

function openCart() {

    if (cartPanel) {
        cartPanel.classList.add("active");
    }

    if (overlay) {
        overlay.classList.add("active");
    }
}


function closeCartPanel() {

    if (cartPanel) {
        cartPanel.classList.remove("active");
    }

    if (overlay) {
        overlay.classList.remove("active");
    }
}


if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );
}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeCartPanel
    );
}


if (overlay) {

    overlay.addEventListener(
        "click",
        closeCartPanel
    );
}


/* ================= ADD TO CART ================= */

function addToCart(button) {

    const name =
        button.dataset.name;

    const price =
        Number(button.dataset.price);


    if (
        !name ||
        Number.isNaN(price) ||
        price < 0
    ) {

        return;
    }


    const existingItem =
        cart.find(function (item) {

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


    saveCart();

    updateCart();

    openCart();
}


/* ================= BUY BUTTONS ================= */

function attachBuyButtons() {

    const buyButtons =
        document.querySelectorAll(".buy-btn");


    buyButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                addToCart(button);
            }
        );
    });
}


attachBuyButtons();


/* ================= UPDATE CART ================= */

function updateCart() {

    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your cart is empty.
            </div>
        `;

    } else {

        cart.forEach(
            function (item, index) {

                const cartItem =
                    document.createElement("div");

                cartItem.className =
                    "cart-item";


                cartItem.innerHTML = `

                    <div class="cart-item-info">

                        <h4>
                            ${escapeHTML(item.name)}
                        </h4>

                        <p>
                            ₹${item.price.toLocaleString("en-IN")}
                        </p>

                    </div>


                    <div class="cart-item-controls">

                        <button
                            type="button"
                            class="quantity-btn decrease-btn"
                            data-index="${index}">
                            −
                        </button>


                        <span class="quantity">
                            ${item.quantity}
                        </span>


                        <button
                            type="button"
                            class="quantity-btn increase-btn"
                            data-index="${index}">
                            +
                        </button>

                    </div>


                    <div class="cart-item-subtotal">

                        ₹${(
                            item.price *
                            item.quantity
                        ).toLocaleString("en-IN")}

                    </div>


                    <button
                        type="button"
                        class="remove-item"
                        data-index="${index}">
                        Remove
                    </button>

                `;


                cartItems.appendChild(
                    cartItem
                );
            }
        );
    }


    updateCartCount();

    updateCartTotal();

    attachCartEvents();
}


/* ================= CART COUNT ================= */

function updateCartCount() {

    let count = 0;


    cart.forEach(function (item) {

        count += item.quantity;
    });


    if (cartCount) {

        cartCount.textContent =
            count;
    }
}


/* ================= CART TOTAL ================= */

function updateCartTotal() {

    let total = 0;


    cart.forEach(function (item) {

        total +=
            item.price *
            item.quantity;
    });


    if (cartTotal) {

        cartTotal.textContent =
            "₹" +
            total.toLocaleString("en-IN");
    }
}


/* ================= QUANTITY CONTROLS ================= */

function attachCartEvents() {

    const increaseButtons =
        document.querySelectorAll(
            ".increase-btn"
        );


    const decreaseButtons =
        document.querySelectorAll(
            ".decrease-btn"
        );


    const removeButtons =
        document.querySelectorAll(
            ".remove-item"
        );


    /* ================= INCREASE ================= */

    increaseButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (
                        !Number.isNaN(index) &&
                        cart[index]
                    ) {

                        cart[index].quantity++;

                        saveCart();

                        updateCart();
                    }
                }
            );
        }
    );


    /* ================= DECREASE ================= */

    decreaseButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (
                        !Number.isNaN(index) &&
                        cart[index]
                    ) {

                        cart[index].quantity--;


                        if (
                            cart[index].quantity <= 0
                        ) {

                            cart.splice(
                                index,
                                1
                            );
                        }


                        saveCart();

                        updateCart();
                    }
                }
            );
        }
    );


    /* ================= REMOVE ================= */

    removeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (
                        !Number.isNaN(index)
                    ) {

                        cart.splice(
                            index,
                            1
                        );

                        saveCart();

                        updateCart();
                    }
                }
            );
        }
    );
}


/* ================= HTML SECURITY ================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


/* ================= CHECKOUT ================= */

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;
            }


            alert(
                "Demo checkout only.\n\n" +
                "This project does not process real payments."
            );
        }
    );
}


/* ================= MOBILE MENU ================= */

const menuToggle =
    document.getElementById(
        "menuToggle"
    );


const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


if (
    menuToggle &&
    mobileMenu
) {

    menuToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                mobileMenu.classList.toggle(
                    "active"
                );


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
                    ? "true"
                    : "false"
            );


            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close menu"
                    : "Open menu"
            );
        }
    );


    const mobileLinks =
        mobileMenu.querySelectorAll(
            "a"
        );


    mobileLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.remove(
                        "active"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        "Open menu"
                    );
                }
            );
        }
    );
}


/* ================= SEARCH ================= */

const siteSearch =
    document.getElementById(
        "siteSearch"
    );


const searchButton =
    document.getElementById(
        "searchButton"
    );


const mainSearch =
    document.getElementById(
        "mainSearch"
    );


const mainSearchButton =
    document.getElementById(
        "mainSearchButton"
    );


const searchStatus =
    document.getElementById(
        "searchStatus"
    );


const searchableItems =
    document.querySelectorAll(
        ".product-card, .gift-card, .game-feature"
    );


/* ================= PERFORM SEARCH ================= */

function performSearch(searchValue) {

    const query =
        searchValue
            .trim()
            .toLowerCase();


    if (!query) {

        searchableItems.forEach(
            function (item) {

                item.style.display = "";
            }
        );


        if (searchStatus) {

            searchStatus.textContent = "";
        }


        return;
    }


    let matches = 0;


    searchableItems.forEach(
        function (item) {

            const text =
                item.textContent
                    .toLowerCase();


            const match =
                text.includes(query);


            item.style.display =
                match
                    ? ""
                    : "none";


            if (match) {
                matches++;
            }
        }
    );


    if (searchStatus) {

        if (matches === 0) {

            searchStatus.textContent =
                `No products found for "${searchValue.trim()}".`;

        } else {

            searchStatus.textContent =
                `${matches} result${matches === 1 ? "" : "s"} found.`;
        }
    }


    const firstMatch =
        Array.from(
            searchableItems
        ).find(
            function (item) {

                return (
                    item.style.display !==
                    "none"
                );
            }
        );


    if (firstMatch) {

        firstMatch.scrollIntoView({

            behavior: "smooth",

            block: "center"
        });
    }
}


/* ================= SYNC SEARCH BOXES ================= */

function syncSearchInputs(value) {

    if (
        siteSearch &&
        siteSearch.value !== value
    ) {

        siteSearch.value = value;
    }


    if (
        mainSearch &&
        mainSearch.value !== value
    ) {

        mainSearch.value = value;
    }
}


/* ================= RUN SEARCH ================= */

function runSearch(value) {

    syncSearchInputs(value);

    performSearch(value);
}


/* ================= NAVBAR SEARCH ================= */

if (
    searchButton &&
    siteSearch
) {

    searchButton.addEventListener(
        "click",
        function () {

            runSearch(
                siteSearch.value
            );
        }
    );


    siteSearch.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                runSearch(
                    siteSearch.value
                );
            }
        }
    );
}


/* ================= MAIN SEARCH ================= */

if (
    mainSearchButton &&
    mainSearch
) {

    mainSearchButton.addEventListener(
        "click",
        function () {

            runSearch(
                mainSearch.value
            );
        }
    );


    mainSearch.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                runSearch(
                    mainSearch.value
                );
            }
        }
    );
}


/* ================= CLEAR SEARCH ================= */

if (siteSearch) {

    siteSearch.addEventListener(
        "input",
        function () {

            if (
                siteSearch.value.trim() === ""
            ) {

                runSearch("");
            }
        }
    );
}


if (mainSearch) {

    mainSearch.addEventListener(
        "input",
        function () {

            if (
                mainSearch.value.trim() === ""
            ) {

                runSearch("");
            }
        }
    );
}


/* ================= ESCAPE KEY ================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeCartPanel();


            if (
                mobileMenu &&
                menuToggle
            ) {

                mobileMenu.classList.remove(
                    "active"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );
            }
        }
    }
);


/* ================= FAQ ================= */

const faqDetails =
    document.querySelectorAll(
        "details"
    );


faqDetails.forEach(
    function (detail) {

        detail.addEventListener(
            "toggle",
            function () {

                if (detail.open) {

                    faqDetails.forEach(
                        function (
                            otherDetail
                        ) {

                            if (
                                otherDetail !==
                                detail
                            ) {

                                otherDetail.removeAttribute(
                                    "open"
                                );
                            }
                        }
                    );
                }
            }
        );
    }
);


/* ================= INITIALIZE ================= */

loadCart();

updateCart();


/* ================= CONSOLE ================= */

console.log(
    "KUN4L Gaming Store loaded successfully!"
);