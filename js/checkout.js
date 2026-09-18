const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );

const checkoutItems =
    document.getElementById(
        "checkoutItems"
    );

const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );

const orderSuccess =
    document.getElementById(
        "orderSuccess"
    );


function displayCheckout() {

    const cart = getCart();


    checkoutItems.innerHTML = "";


    if (cart.length === 0) {

        checkoutItems.innerHTML =
            "<p>Your cart is empty.</p>";

        return;

    }


    let total = 0;


    cart.forEach(item => {

        const price =
            Math.round(item.price * 15);


        const itemTotal =
            price * item.quantity;


        total += itemTotal;


        const div =
            document.createElement("div");

        div.className =
            "checkout-item";


        div.innerHTML = `

            <span>
                ${item.title}
                × ${item.quantity}
            </span>

            <strong>
                ₹${itemTotal}
            </strong>

        `;


        checkoutItems.appendChild(div);

    });


    const delivery = 40;


    total += delivery;


    checkoutTotal.textContent =
        `₹${total}`;

}


checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const cart = getCart();


        if (cart.length === 0) {

            alert(
                "Your cart is empty!"
            );

            return;

        }


        orderSuccess.style.display =
            "block";


        localStorage.removeItem(
            "cart"
        );


        checkoutForm.reset();

        updateCounts();


        setTimeout(() => {

            window.location.href =
                "index.html";

        }, 2500);

    }
);


displayCheckout();