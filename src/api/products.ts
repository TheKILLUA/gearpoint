
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export interface Product {
    id: string
    sku: string
    name: string
    nameEn: string
    slug: string
    shortDescription: string
    description: string
    shortDescriptionEn: string
    descriptionEn: string
    price: number
    image: string
    category: string
    inStock: boolean
    stockCount: number
}

export async function fetchProducts(): Promise<Product[]> {
    const querySnapshot = await getDocs(collection(db, 'produse'))
    const products: Product[] = []
    querySnapshot.forEach((doc) => {
        products.push({
            id: doc.id,
            ...(doc.data() as Omit<Product, 'id'>),
        })
    })
    return products
}
