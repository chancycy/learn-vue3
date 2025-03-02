<template>
  <h3 class="app">hello vue3</h3>
  <Person></Person> <!-- 使用 -->
</template>
<script lang="ts">
import Person from './components/Person.vue'; // 引入--这句
export default {
  name: "App",
  components: { Person }  // 注册组件
}
</script>
<style>
.app {
  background-color: gray;
  box-shadow: 0 0 10px;
  padding: 20px;
}
</style>