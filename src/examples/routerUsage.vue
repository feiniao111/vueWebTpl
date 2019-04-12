<template>
  <section>
    <header>
      <h1>请选择一个身份</h1>
      <label><input type="radio" v-model="role" name="admin" value='admin'>管理员</label>
      <label><input type="radio" v-model="role" name="client" value='client'>普通用户</label>
      <label><input type="radio" v-model="role" name="client">游客</label>    
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
      <h1>子页面</h1>
      <keep-alive>
        <!-- 这里的页面在路由离开当前页面（但还在父路由中）时，将存入内存中，状态不丢失 -->
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
