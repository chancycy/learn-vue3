<template>
    <div class="person">
        <h2>姓名:{{ name }}</h2>
        <h2>年龄:{{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">查看联系方式</button>
    </div>
</template>
<script lang="ts">
export default {
    name: "Person",
    data() {
        return {
            name: 'lcy',
            age: 25,
            tel: '15818761217'
        }
    },
    methods: {
        changeName() {
            this.name = 'cycy'
        },
        changeAge() {
            this.age += 1
        },
        showTel() {
            alert(this.tel)
        }
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