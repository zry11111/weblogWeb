// import './assets/main.css'
import '@/assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'animate.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import '@/permisson'
import 'nprogress/nprogress.css'
// 图片点击放大
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

import pinia from '@/stores'
const app = createApp(App)
//引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(VueViewer)
app.use(router)
app.use(pinia)
app.mount('#app')
