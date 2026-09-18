
const cartContainer =
    document.getElementById(
        "cartContainer"
    );

const emptyCart =
    document.getElementById(
        "emptyCart"
    );

const cartSummary =
    document.getElementById(
        "cartSummary"
    );


function displayCart() {

    const cart = getCart();


    cartContainer.innerHTML = "";


    if (cart.length === 0) {

        emptyCart.style.display = "block";

        cartSummary.style.display = "none";

        return;

    }


    emptyCart.style.display = "none";

    cartSummary.style.display = "block";


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        const price =
            Math.round(item.price * 15);


        cartItem.innerHTML = `

            <div class="cart-item-image">
                ☕
            </div>

            <div class="cart-item-info">

                <h3>${item.title}</h3>

                <p>
                    ₹${price} each
                </p>

            </div>


            <div class="quantity-controls">

                <button class="decrease">
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button class="increase">
                    +
                </button>

            </div>


            <strong>
                ₹${price * item.quantity}
            </strong>


            <button class="remove-btn">
                Remove
            </button>

        `;


        cartItem
            .querySelector(".decrease")
            .addEventListener(
                "click",
                () => changeQuantity(
                    item.id,
                    -1
                )
            );


        cartItem
            .querySelector(".increase")
            .addEventListener(
                "click",
                () => changeQuantity(
                    item.id,
                    1
                )
            );


        cartItem
            .querySelector(".remove-btn")
            .addEventListener(
                "click",
                () => removeItem(item.id)
            );


        cartContainer.appendChild(cartItem);

    });


    updateSummary(cart);

}


function changeQuantity(id, change) {

    const cart = getCart();


    const item =
        cart.find(
            product => product.id === id
        );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        const updated =
            cart.filter(
                product => product.id !== id
            );

        saveCart(updated);

    } else {

        saveCart(cart);

    }


    displayCart();

}


function removeItem(id) {

    const cart = getCart();


    const updated =
        cart.filter(
            item => item.id !== id
        );


    saveCart(updated);

    displayCart();

}


function updateSummary(cart) {

    let subtotal = 0;


    cart.forEach(item => {

        const price =
            Math.round(item.price * 15);

        subtotal +=
            price * item.quantity;

    });


    const delivery =
        subtotal > 0 ? 40 : 0;


    const total =
        subtotal + delivery;


    document.getElementById(
        "subtotal"
    ).textContent =
        `₹${subtotal}`;


    document.getElementById(
        "delivery"
    ).textContent =
        `₹${delivery}`;


    document.getElementById(
        "total"
    ).textContent =
        `₹${total}`;

}


displayCart();
