import { createApp } from 'vue' // createApp --> 盆
import App from './App.vue' // App --> 根(基)
createApp(App).mount('#app') // createApp(App) --> 把根放到盆中; mount('#app') --> 花盆放到哪里(这里是放到id="App"里)
// 先拿到渲染器,指定需要渲染的组件 以及 需要组件挂载的位置