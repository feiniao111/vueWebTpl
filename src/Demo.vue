<template>
  <div id="app">
    <img src="./assets/logo.png" @click="routeToHome">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    routeToHome() {
      this.$router.push({path: '/'});
    }
  },
  mounted() {
    // 将实例绑定到全局闭包中
    myGlobalClosure.setVueInst(this);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
