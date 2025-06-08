const admin = require("firebase-admin");

const serviceAccount = require("./src/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gearpoint-project-default-rtdb.europe-west1.firebasedatabase.app"
});

export const db = admin.firestore();

async function addMultipleProducts(productsArray) {
    const batch = db.batch();
    const productsCollection = db.collection('produse');

    productsArray.forEach(product => {
        const docRef = productsCollection.doc(product.slug);
        batch.set(docRef, product);
    });

    try {
        await batch.commit();
        console.log(`${productsArray.length} products added successfully`);
    } catch (error) {
        console.error('Error adding products: ', error);
        throw error;
    }
}

import { products } from "./src/data/products";

addMultipleProducts(products).then();