import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueQrcode from '@chenfengyuan/vue-qrcode';
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import Notifications from 'notiwind'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

app.component(VueQrcode.name, VueQrcode);

app.use(VueSweetalert2)
app.use(Notifications);
app.use(LoadingPlugin);
app.use(router);

app.mount('#app')
