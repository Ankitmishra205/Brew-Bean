
const productContainer =
    document.getElementById("productContainer");

const loading =
    document.getElementById("loading");

const errorMessage =
    document.getElementById("error");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");


let products = [];


async function loadProducts() {

    try {

        products = await getProducts();

        loading.style.display = "none";

        displayProducts(products);

    } catch (error) {

        loading.style.display = "none";

        errorMessage.textContent =
            "Unable to load menu. Please try again.";

    }

}


function displayProducts(productList) {

    productContainer.innerHTML = "";


    if (productList.length === 0) {

        productContainer.innerHTML = `
            <div class="empty-state">
                <h2>No products found</h2>
                <p>Try another search.</p>
            </div>
        `;

        return;

    }


    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">
                ☕
            </div>

            <div class="product-content">

                <h3>${product.title}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="price">
                        ₹${Math.round(product.price * 15)}
                    </span>

                    <span>
                        ⭐ ${product.rating.toFixed(1)}
                    </span>

                </div>

                <div class="product-actions">

                    <button
                        class="small-btn cart-btn"
                        data-id="${product.id}">

                        🛒 Add

                    </button>

                </div>

            </div>
        `;


        const cartBtn =
            card.querySelector(".cart-btn");


        cartBtn.addEventListener(
            "click",
            () => addToCart(product)
        );


        productContainer.appendChild(card);

    });

}


function addToCart(product) {

    const cart = getCart();


    const existingProduct =
        cart.find(
            item => item.id === product.id
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart(cart);


    alert(
        `${product.title} added to cart!`
    );

}


function filterProducts() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const category =
        categoryFilter.value;


    const filtered =
        products.filter(product => {

            const matchesSearch =
                product.title
                    .toLowerCase()
                    .includes(searchText) ||

                product.description
                    .toLowerCase()
                    .includes(searchText);


            let matchesCategory = true;


            if (category !== "all") {

                if (category === "coffee") {

                    matchesCategory =
                        product.title
                            .toLowerCase()
                            .includes("coffee");

                }


                if (category === "drinks") {

                    matchesCategory =
                        product.category === "groceries";

                }


                if (category === "dessert") {

                    matchesCategory =
                        product.category === "groceries";

                }

            }


            return matchesSearch &&
                   matchesCategory;

        });


    displayProducts(filtered);

}


searchInput.addEventListener(
    "input",
    filterProducts
);


categoryFilter.addEventListener(
    "change",
    filterProducts
);


loadProducts();

