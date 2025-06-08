import { createRouter, createWebHistory } from 'vue-router'
import ProductPage from '../components/ProductPage.vue'

const routes = [
    {
        path: '/produs/:slug',
        name: 'Product',
        component: ProductPage,
        props: true,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
