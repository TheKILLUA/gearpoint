import { createApp } from 'vue'
import ProductPage from '../../components/ProductPage.vue'
import i18n from '../../i18n.ts'

import router from '../../router/index.ts'
import { createPinia } from 'pinia'
import './produs.scss'
import '../../root.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(ProductPage)
app.use(router)
app.use(i18n)
app.use(createPinia())
app.mount('#app')