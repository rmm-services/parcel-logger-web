import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueQrcode from '@chenfengyuan/vue-qrcode';

const app = createApp(App)

app.component(VueQrcode.name, VueQrcode);

app.use(router)

app.mount('#app')
