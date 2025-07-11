import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import i18n from '../../i18n.ts'

import './cos.scss'
import '../../root.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)
app.use(i18n)
app.use(createPinia())
app.mount('#app')