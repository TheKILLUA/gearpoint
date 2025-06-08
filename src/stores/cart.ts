import { defineStore } from 'pinia'
import type { Product } from "../api/products.ts";

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as { product: Product, quantity: number }[]
    }),
    getters: {
        itemCount: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: (state) => state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    },
    actions: {
        addItem(product: Product) {
            const existing = this.items.find(item => item.product.id === product.id)
            if (existing) {
                existing.quantity++
            } else {
                this.items.push({ product, quantity: 1 })
            }
            this.saveToLocalStorage()
        },
        removeItem(productId: string) {
            this.items = this.items.filter(item => item.product.id !== productId)
            this.saveToLocalStorage()
        },
        decreaseQuantity(productId: string) {
            const itemIndex = this.items.findIndex(item => item.product.id === productId)

            if (itemIndex !== -1) {
                if (this.items[itemIndex].quantity > 1) {
                    this.items[itemIndex].quantity--
                } else {
                    this.items.splice(itemIndex, 1)
                }
            }

            this.saveToLocalStorage()
        },
        increaseQuantity(productId: string) {
            const itemIndex = this.items.findIndex(item => item.product.id === productId)

            if (itemIndex !== -1) {
                this.items[itemIndex].quantity++
            }

            this.saveToLocalStorage()
        },
        clearCart() {
            this.items = []
            this.saveToLocalStorage()
        },
        saveToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.items))
        },
        loadFromLocalStorage() {
            const data = localStorage.getItem('cart')
            if (data) {
                this.items = JSON.parse(data)
            }
        }
    }
})
