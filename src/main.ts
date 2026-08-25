import { createApp, vaporInteropPlugin } from 'vue'
import App from './App.vue'

import './assets/main.css'

createApp(App).use(vaporInteropPlugin).mount('#app')
