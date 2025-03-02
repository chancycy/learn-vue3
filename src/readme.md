# vue3+ts学习视频跟练笔记

由于本地为vue2环境（node版本为16） 需先更新node

- 到nodejs官网下载最新版本v22.12 根据vue3官方文档命令创建vue3项目npm create vue@latest
- 其实项目名称最好是纯小写字母、数字、下划线
    - Ok to proceed? (y) y
    - 请输入项目名称: learn-vue3
    - 是否使用ts语法? 是
    - 其余项均选择否和不需要
cd learn-vue3 进入新创建的项目
进入后就可以输入以下指令了npm install、npm run dev

# 进入项目后 short into
简单介绍下除了src的文件

1. .vscode里的extensions.json里放的是安装推荐插件（不重要 为了顺序才写的这条
2. index.html是项目的入口文件，里面的/src/main.ts支持着整个应用跑起来。不同于vue2的main.js的项目入口文件
3. env.d.ts是让ts能识别txt等文件类型，如果没有npm i的话，进入这个文件会报错
4. package-lock.json和package.json 略过
5. tsconfig.app.json、tsconfig.json、tsconfig.node.json -- ts的三个配置文件 别删就行
6. vite.config.ts是整个工程的配置文件：安装插件、配置代理等

## 01 自己写一个App组件
注意事项:
1. 报错就重启下(因为这个时候按照视频里的删除了src,vscode不会立马反应找到对应文件)
2. `import App from './App.vue'`的`'./App.vue'`报错,就在App.vue的script里加个`lang="ts"`就好

main.ts内容
```js
import { createApp } from 'vue' // createApp --> 盆
import App from './App.vue' // App --> 根(基)
createApp(App).mount('#app') // createApp(App) --> 把根放到盆中; mount('#app') --> 花盆放到哪里(这里是放到id="app"里)
// 先拿到渲染器,指定需要渲染的组件 以及 需要组件挂载的位置
``` 
App.vue内容
```vue
<template>
    <h3 class="app">hello vue3</h3>
</template>
<script lang="ts">
    export default {
        name:"App"
    }
</script>
<style>
.app {
    background-color: gray;
    box-shadow: 0 0 10px;
    padding: 20px;
}
</style>
```