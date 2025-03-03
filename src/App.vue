<template>
  <Person></Person> <!-- 使用 -->
</template>
<script lang="ts">
import Person from './components/Person.vue'; // 引入--这句
export default {
  name: "App",
  components: { Person }  // 注册组件
}
</script>
<style></style>