<template>
  <div id="app" class="w-screen">
    <Home />
  </div>
</template>
<script>
import Home from "@/views/Home.vue";
export default {
  name: "App",
  components: {
    Home,
  },
};
</script>
<style>
#app {
  font-family: Ariel, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
