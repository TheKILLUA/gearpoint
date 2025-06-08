const axios = require('axios');

const products = [
    {
        id: 'prod001',
        name: 'Cheie combinată 13mm',
        nameEn: 'Combination wrench 13mm',
        description: 'Cheie combinată profesională din oțel crom-vanadiu, mărime 13mm.',
        descriptionEn: 'Professional combination wrench made of chrome vanadium steel, size 13mm.',
        price: 18.5
    },
    {
        id: 'prod002',
        name: 'Set șurubelnițe 6 piese',
        nameEn: 'Screwdriver set 6 pcs',
        description: 'Set de șurubelnițe magnetice, 6 piese cu mânere ergonomice.',
        descriptionEn: 'Magnetic screwdriver set, 6 pieces with ergonomic handles.',
        price: 89.0
    },
];

const databaseURL = 'https://gearpoint-project-default-rtdb.europe-west1.firebasedatabase.app';
const authToken = 'VAkLhZ1YZtLh1l1mVy8k1jR0GJhKTUiQFqXgrVyb';

products.forEach(async (product) => {
    try {
        await axios.put(
            `${databaseURL}/produse/${product.id}.json?auth=${authToken}`,
            product
        );
        console.log(`Added product ${product.id}`);
    } catch (error) {
        console.error(`Error adding product ${product.id}:`, error.message);
    }
});