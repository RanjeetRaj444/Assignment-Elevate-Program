const fs = require('fs').promises;
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

async function getProducts() {
    try {
        const data = await fs.readFile(productsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Error reading products data');
    }
}

async function saveProducts(products) {
    try {
        await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
    } catch (error) {
        throw new Error('Error saving products data');
    }
}

function filterProducts(products, query) {
    let filteredProducts = products;

    if (query.name) {
        filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(query.name.toLowerCase()));
    }

    if (query.category) {
        filteredProducts = filteredProducts.filter(product => product.category.toLowerCase() === query.category.toLowerCase());
    }

    if (query.minPrice) {
        filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(query.minPrice));
    }

    if (query.maxPrice) {
        filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(query.maxPrice));
    }

    return filteredProducts;
}

module.exports = {
    getProducts,
    saveProducts,
    filterProducts
};