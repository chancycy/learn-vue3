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

## 04 setup
首先对代码进行精简 --> 去掉了app组件的'hello vue3'和样式部分
注意: vue3支持template里写多个组件,而不是像vue2里一定需要用个大标签包起来
即支持
```js
<template>
  <Person /> <!-- 使用 -->
  <Person /> <!-- 使用 -->
  <Person /> <!-- 使用 -->
</template>
```
setup函数里没有维护this,所以在函数里出现this会报错
  - 如果在setup里`console.log(this)` --> `undefined` vue3中已经开始弱化this了
  - setup不是响应式的
    - 响应式 --> 数据后期如果变化了,用到数据的地方会自动更新

`setup`是`Vue3`中一个新的配置项，值是一个函数。组件中所用到的：数据、方法、计算属性、监视......等等，均配置在`setup`中。

特点如下：
- `setup`函数返回的对象中的内容，可直接在模板中使用。
- `setup`中访问`this`是`undefined`。
- `setup`函数会在`beforeCreate`之前调用，它是“领先”所有钩子执行的。
```vue
<template>
  <div class="person">
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">年龄+1</button>
    <button @click="showTel">点我查看联系方式</button>
  </div>
</template>

<script lang="ts">
  export default {
    name:'Person',
    setup(){
      // 数据，原来写在data中（注意：此时的name、age、tel数据都不是响应式数据）
      let name = '张三'
      let age = 18
      let tel = '13888888888'

      // 方法，原来写在methods中
      function changeName(){
        name = 'zhang-san' //注意：此时这么修改name页面是不变化的
        console.log(name)
      }
      function changeAge(){
        age += 1 //注意：此时这么修改age页面是不变化的
        console.log(age)
      }
      function showTel(){
        alert(tel)
      }

      // 返回一个对象，对象中的内容，模板中可以直接使用
      return {name,age,tel,changeName,changeAge,showTel}
    }
  }
</script>
```

### 04-1 setup返回值 (对应视频P8)
- 若返回一个**对象**：则对象中的：属性、方法等，在模板中均可以直接使用**(重点关注)**
- 若返回一个**函数**：则可以自定义渲染内容，代码如下：
```jsx
setup(){
  return ()=> '你好啊！'
}
```

### 04-2 setup 与 Options API(vue2) 的关系
- `Vue2` 的配置（`data`、`methos`......）中可以访问到 `setup`中的属性、方法。
  - `c: this.name,   // 能读取到setup中的name,页面会显示'张三'`
- 但在`setup`中**不能访问到**`Vue2`的配置（`data`、`methos`......）。
  - `let x = d // 一运行就会报错：setup中不能直接使用data中的数据`
- 如果与`Vue2`冲突，则`setup`优先。
  - `age: 90 // 页面显示的age是setup中的age是18而不是90`

```js
data() {
        return {
            a: 100,
            c: this.name,   // 能读取到setup中的name,页面会显示'张三'
            d: 900,
            age: 90 // 页面显示的age是setup中的age是18而不是90
        }
    },
    methods: {
        b() {
            console.log('b')
        }
    },
    setup() {
        console.log(this) //undefined

        // 数据，原来写在data中（注意：此时的name、age、tel数据都不是响应式数据）
        let name = '张三'
        let age = 18
        let tel = '13888888888'
        // let x = d // 一运行就会报错：setup中不能直接使用data中的数据

        ......
    }
```

### 04-3 setup 语法糖
对于原本写的setup函数,必须将页面要用到的东西都return出去,不然页面是拿不到的,这就导致,当东西多且复杂时,很容易漏,不好。于是有了setup语法糖的出现
- 语法糖可以把setup独立出去,不用再写return了
- 注意事项: 两个script标签的语言要一致,不然会报错,即都需声明`lang="ts"`
```vue
<script lang="ts">
  export default {
    name:'Person',
  }
</script>

<!-- 下面的写法是setup语法糖 -->
<script setup lang="ts">
  console.log(this) //undefined
  
  // 数据（注意：此时的name、age、tel都不是响应式数据）
  let name = '张三'
  let age = 18
  let tel = '13888888888'

  // 方法
  function changName(){
    name = '李四'//注意：此时这么修改name页面是不变化的
  }
  function changAge(){
    console.log(age)
    age += 1 //注意：此时这么修改age页面是不变化的
  }
  function showTel(){
    alert(tel)
  }
</script>
```
扩展：
上述代码，还需要编写一个不写`setup`的`script`标签，去指定组件名字，比较麻烦，我们可以借助`vite`中的插件简化
- 注意: vue3.3版本之后自带defineOptions，已经不用安装插件了

1. 第一步：`npm i vite-plugin-vue-setup-extend -D`
2. 第二步：`vite.config.ts`
```jsx
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  plugins: [ VueSetupExtend() ]
})
```
3. 第三步：`<script setup lang="ts" name="Person234">`,只需要一个script标签即可

## 05 ref
### 05-1 【ref 创建：基本类型的响应式数据】

- 作用：定义响应式变量。
- 语法：`let xxx = ref(初始值)`。
- 返回值：一个`RefImpl`的实例对象，简称`ref对象`或`ref`，`ref`对象的`value`**属性是响应式的**。
- **注意点：**
   - `JS`中(方法里用)操作数据需要：`xxx.value`，但模板中不需要`.value`，直接使用即可。
   - 对于`let name = ref('张三')`来说，`name`不是响应式的，`name.value`是响应式的。
```vue
<template>
  <div class="person">
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">年龄+1</button>
    <button @click="showTel">点我查看联系方式</button>
  </div>
</template>

<script setup lang="ts" name="Person">
  import {ref} from 'vue'
  // name和age是一个RefImpl的实例对象，简称ref对象，它们的value属性是响应式的。
  let name = ref('张三')
  let age = ref(18)
  // tel就是一个普通的字符串，不是响应式的
  let tel = '13888888888'

  function changeName(){
    // JS中操作ref对象时候需要.value
    name.value = '李四'
    console.log(name.value)

    // 注意：name不是响应式的，name.value是响应式的，所以如下代码并不会引起页面的更新。
    // name = ref('zhang-san')
  }
  function changeAge(){
    // JS中操作ref对象时候需要.value
    age.value += 1 
    console.log(age.value)
  }
  function showTel(){
    alert(tel)
  }
</script>
```

### 05-2 【reactive 创建：对象类型的响应式数据】
什么叫做响应式对象
举例:对于`let car = reactive({ brand: '奔驰', price: 100 })`,
`{ brand: '奔驰', price: 100 }`是原对象,`reactive({ brand: '奔驰', price: 100 })`就是响应式对象,在控制台输出下会是个proxy函数

- **作用：**定义一个**响应式对象**（基本类型不要用它，要用`ref`，否则报错）
- **语法：**`let 响应式对象= reactive(源对象)`。
- **返回值：**一个`Proxy`的实例对象，简称：响应式对象。
- **注意点：**`reactive`定义的响应式数据是“深层次”的。即可以深层监控.
```vue
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <h2>测试：{{obj.a.b.c.d}}</h2>
    <button @click="changeCarPrice">修改汽车价格</button>
    <button @click="changeFirstGame">修改第一游戏</button>
    <button @click="test">测试</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { reactive } from 'vue'

// 数据
let car = reactive({ brand: '奔驰', price: 100 })
let games = reactive([
  { id: 'ahsgdyfa01', name: '英雄联盟' },
  { id: 'ahsgdyfa02', name: '王者荣耀' },
  { id: 'ahsgdyfa03', name: '原神' }
])
let obj = reactive({
  a:{
    b:{
      c:{
        d:666
      }
    }
  }
})

function changeCarPrice() {
  car.price += 10
}
function changeFirstGame() {
  games[0].name = '流星蝴蝶剑'
}
function test(){
  obj.a.b.c.d = 999
}
</script>
```

### 05-3【ref 创建：对象类型的响应式数据】

- 其实`ref`接收的数据可以是：**基本类型**、**对象类型**。但reactive只能接收对象类型.
- 若`ref`接收的是对象类型，内部其实也是调用了`reactive`函数。
```vue
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <h2>测试：{{obj.a.b.c.d}}</h2>
    <button @click="changeCarPrice">修改汽车价格</button>
    <button @click="changeFirstGame">修改第一游戏</button>
    <button @click="test">测试</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { ref } from 'vue'

// 数据
let car = ref({ brand: '奔驰', price: 100 })
let games = ref([
  { id: 'ahsgdyfa01', name: '英雄联盟' },
  { id: 'ahsgdyfa02', name: '王者荣耀' },
  { id: 'ahsgdyfa03', name: '原神' }
])
let obj = ref({
  a:{
    b:{
      c:{
        d:666
      }
    }
  }
})

console.log(car)

function changeCarPrice() {
  car.value.price += 10
}
function changeFirstGame() {
  games.value[0].name = '流星蝴蝶剑'
}
function test(){
  obj.value.a.b.c.d = 999
}
</script>
```

### 05-4【ref 对比 reactive】
宏观角度看：

> 1. `ref`用来定义：**基本类型数据**、**对象类型数据**；
>
> 2. `reactive`用来定义：**对象类型数据**。

- 区别：

> 1. `ref`创建的变量必须使用`.value`（可以使用`volar`插件自动添加`.value`）。
>
>    <img src="images/自动补充value.png" alt="自动补充value" style="zoom:50%;border-radius:20px" /> 
>
> 2. `reactive`重新分配一个新对象，会**失去**响应式（可以使用`Object.assign`去整体替换）。

- 使用原则：
> 1. 若需要一个基本类型的响应式数据，必须使用`ref`。
> 2. 若需要一个响应式对象，层级不深，`ref`、`reactive`都可以。
> 3. 若需要一个响应式对象，且层级较深，推荐使用`reactive`。

### 05-5 【toRefs 与 toRef】

- 作用：将一个响应式对象中的每一个属性，转换为`ref`对象。
- 备注：`toRefs`与`toRef`功能一致，但`toRefs`可以批量转换。
- 语法如下：
```vue
<template>
  <div class="person">
    <h2>姓名：{{person.name}}</h2>
    <h2>年龄：{{person.age}}</h2>
    <h2>性别：{{person.gender}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeGender">修改性别</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {ref,reactive,toRefs,toRef} from 'vue'

  // 数据
  let person = reactive({name:'张三', age:18, gender:'男'})
	
  // 通过toRefs将person对象中的n个属性批量取出，且依然保持响应式的能力
  let {name,gender} =  toRefs(person)
	
  // 通过toRef将person对象中的gender属性取出，且依然保持响应式的能力
  let age = toRef(person,'age')

  // 方法
  function changeName(){
    name.value += '~'
  }
  function changeAge(){
    age.value += 1
  }
  function changeGender(){
    gender.value = '女'
  }
</script>
```

## 06 computed
computed是惰性的 -> 数据不变时相同结果会缓存
computed是有缓存的,methods里的方法就是没有缓存的
computed也是响应式的(computedRefImpl)

案例:姓 + 名 = 全名
```vue
<template>
  <div class="person">
    姓：<input type="text" v-model="firstName"> <br>
    名：<input type="text" v-model="lastName"> <br>
    全名：<span>{{fullName}}</span> <br>
    <!-- 如果这时我的全名没有变化时 将上一行重复多次,也只会触发一次computed -->
    <button @click="changeFullName">全名改为：li-si</button>
  </div>
</template>

<script setup lang="ts" name="App">
  import {ref,computed} from 'vue'

  let firstName = ref('zhang')
  let lastName = ref('san')

  // 计算属性——只读取，不修改
  /* let fullName = computed(()=>{
    return firstName.value + '-' + lastName.value
  }) */


  // 计算属性——既读取又修改
  let fullName = computed({
    // 读取
    get(){
      return firstName.value + '-' + lastName.value
    },
    // 修改
    // 访问触发set 修改触发set
    set(val){
      console.log('有人修改了fullName',val)
      firstName.value = val.split('-')[0]
      lastName.value = val.split('-')[1]
    }
  })

  function changeFullName(){
    // 只是引起了setter的调用
    fullName.value = 'li-si'
  } 
</script>
```