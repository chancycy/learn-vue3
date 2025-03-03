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

# 正式开始

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

## 02 写个组件(对应视频P5)
对于组件: 引入 --> 注册 --> 使用
结论: vue3兼容vue2的语法
---
写了一个叫做Person的组件,希望出现在页面里,需要在App.vue的script引入
App.vue中
```vue
<template>
    <h3 class="app">hello vue3</h3>
    <Person />  <!-- 使用 -->
</template>
<script lang="ts">
import Person from './components/Person.vue'; // 引入--这句
export default {
    name: "App",
    components: { Person }  // 注册组件
}
</script>
```
新增Person.vue组件
代码略,Person里的内容,全部是用vue2的语法写的 --> vue3兼容vue2的语法

注意:
在模板里写`<Person />`在运行项目时会被vite提醒,这时换成非单标签`<Person></Person>`

## 03 PotionsAPI与CompositionsAPI
vue2 --> 是选项式/配置项API
 - 什么是选项:即像export default里的`name`、`data`、`methods`都是一个个的选项/配置项
 - 弊端:Options类型的 API，数据、方法、计算属性等，是分散在：data、methods、computed中的，若想新增或者修改一个需求，就需要分别修改：data、methods、computed，不便于维护和复用。
vue3 --> 组合式API
- 可以用函数的方式，更加优雅的组织代码，让相关功能的代码更加有序的组织在一起。
```js
------vue2:
export default {
    data() {
        return {
            -功能A-
            --功能B
        };
    },
    methods: {
        -功能A-
        --功能B
    }
}
------vue3:
function {
    -功能A-
}
function {
    --功能B
}
```