<template>
  <article>
    <header>
      <h1>{{$t('page.examples.enterPage')}}</h1>
    </header>
    <nav>
      <ul>
        <li>
          <a @click='routeTo("backend")'>{{$t('page.examples.backend')}}</a>
        </li>
        <li>
          <a @click='routeTo("shop")'>{{$t('page.examples.shopMall')}}</a>
        </li>
        <li>
          <a @click='routeTo("homepage")'>{{$t('page.examples.home')}}</a>
        </li>
        <li>
            <button @click='logout'>{{$t('comp.button.logout')}}</button>
        </li>
      </ul>
    </nav>
    <main>
      <h1>{{$t('page.examples.subpage')}}</h1>
      <keep-alive>
        <!-- 这里的页面在路由离开当前页面（但还在父路由中）时，将存入内存中，状态不丢失 -->
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </main>
  </article>
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
  },
  data() {
    return {
    };
  },
  methods: {
    routeTo(name) {
      this.$router.push({name: name})
    },
    logout() {
        this.$router.push({name: 'routerUsageLogin'})
    }
  }
};
</script>
