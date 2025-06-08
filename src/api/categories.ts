import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export interface Category {
    id: string
    name: string
    parentId?: string | null
}

export async function fetchCategories(): Promise<Category[]> {
    const querySnapshot = await getDocs(collection(db, 'categorii'))
    const categories: Category[] = []
    querySnapshot.forEach((doc) => {
        categories.push({
            id: doc.id,
            ...(doc.data() as Omit<Category, 'id'>),
        })
    })

    console.log(categories)
    return categories
}