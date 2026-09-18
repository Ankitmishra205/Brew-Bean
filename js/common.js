function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


function updateCounts() {

    const cart = getCart();

    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        cartCount.textContent = totalItems;

    }

}


function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCounts();

}


updateCounts();