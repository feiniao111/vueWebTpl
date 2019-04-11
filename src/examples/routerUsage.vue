<template>
  <section>
    <header>
        <h1>请选择一个身份</h1>
      <input type="radio" v-model="role" name="admin" value='admin'>管理员
      <input type="radio" v-model="role" name="client" value='client'>普通用户
    </header>
    <p>
        <h1>请选择进入页面</h1>
        <ul>
          <li>
            <a @click='routeTo("backend")'>后台管理</a>
          </li>
          <li>
            <a @click='routeTo("shop")'>商城</a>
          </li>
          <li>
            <a @click='routeTo("homepage")'>个人主页</a>
          </li>
        </ul>
    </p>
    <p>
      <h1>网页</h1>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </p>
  </section>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  cursor: pointer;
}
</style>
    
<script>
export default {
  watch: {
    role: {
      handler(val) {
        window.myGlobalClosure.setRole(val);
      },
      immediate: true
    }
  },
  data() {
    return {
      role: ''
    };
  },
  methods: {
    routeTo(name) {
      this.$router.push({name: name});
    }
  }
};
</script>
