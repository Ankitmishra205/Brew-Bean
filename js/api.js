
const API_URL = "https://dummyjson.com/products";


async function getProducts() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        return data.products;

    } catch (error) {

        console.error(error);

        throw error;
    }
}

