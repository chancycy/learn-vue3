<template>
    <div class="person">
        <h2>姓名：{{ name }}</h2>
        <h2>年龄：{{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">年龄+1</button>
        <button @click="showTel">点我查看联系方式</button>
        <hr>
        <h2>测试1：{{ a }}</h2>
        <h2>测试2：{{ c }}</h2>
        <h2>测试3：{{ d }}</h2>
        <button @click="b">测试</button>
    </div>
</template>
<script lang="ts">
export default {
    name: "Person",
    data() {
        return {
            a: 100,
            c: this.name,   // 能读取到setup中的name,页面会显示'张三'
            d: 900,
            age: 90 // 页面显示的age是setup中的age
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

        // 方法，原来写在methods中
        function changeName() {
            name = 'zhang-san' //注意：此时这么修改name页面是不变化的
            console.log(name)
        }
        function changeAge() {
            age += 1 //注意：此时这么修改age页面是不变化的
            console.log(age)
        }
        function showTel() {
            alert(tel)
        }

        // 返回一个对象，对象中的内容，模板中可以直接使用
        return { name, age, tel, changeName, changeAge, showTel }
    }
}
</script>
<style>
.person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    padding: 20px;
}

button {
    margin: 0 5px;
}
</style>