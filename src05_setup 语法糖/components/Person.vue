<template>
    <div class="person">
        <h2>姓名：{{ name }}</h2>
        <h2>年龄：{{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">年龄+1</button>
        <button @click="showTel">点我查看联系方式</button>
    </div>
</template>
<script lang="ts">
export default {
    name: "Person"
}
</script>

<script lang="ts" setup>
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