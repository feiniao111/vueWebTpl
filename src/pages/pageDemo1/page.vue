<template>
  <article class="usage-demo">
    <header>
      <h1>{{ msg }}</h1>
      <h2>Usage</h2>
    </header>
    <section>
      <ul>
        <li>
          <a @click="routeTo('httpUsage')">{{$t('page.pageDemo1.httpReq')}}</a>
        </li>
        <li>
          <a @click="routeTo('routerUsageLogin')">{{$t('page.pageDemo1.routers')}}</a>
        </li>
        <li>
          <a @click="routeTo('vuexUsageLogin')">{{$t('page.pageDemo1.vuexManage')}}</a>
        </li>
        <li>
          <a href="https://feiniao111.github.io/2019/02/04/vue/vue%E6%A1%86%E6%9E%B6%E4%B8%8B%E7%9A%84%E5%9B%BD%E9%99%85%E5%8C%96-md/" target='__blank'>{{$t('page.pageDemo1.internation')}}</a>
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "page1",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  computed: {
    ...mapGetters([
      'i18nLanguage'
    ])
  },
  methods: {
    routeTo(name) {
      this.$router.push({ name: name });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
h1,
h2 {
  font-weight: normal;
}
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
