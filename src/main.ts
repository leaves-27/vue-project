import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue'
import router from './router'
import "./interceptors";
import devtools from '@vue/devtools'

if (process.env.NODE_ENV === 'development') {
  devtools.connect(/* host, port */)
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
