import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './style.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(VueSweetalert2);

const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(router)

app.use(pinia)

app.mount('#app')
