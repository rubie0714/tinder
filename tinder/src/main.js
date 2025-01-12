import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Swal from 'sweetalert2'

const app = createApp(App).use(router);

// 正確註冊到全局
app.config.globalProperties.$swal = Swal;

app.mount('#app');