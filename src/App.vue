<template>
  <article id="app">
    <header>
      <img src="./assets/logo.png" @click="routeToHome">
    </header>
    <aside class="usage-demo__aside">
      <select v-model="lang">
        <option value="en">{{$t('page.pageDemo1.en')}}</option>
        <option value="chn">{{$t('page.pageDemo1.chn')}}</option>
      </select>
    </aside>
    <router-view/>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  watch: {
    lang(val) {
      this.$store.commit("common/SET_I18N_LANGUAGE", { vue: this, lang: val });
    }
  },
  data() {
    return {
      lang: "chn"
    }
    
  },
  computed: {
    ...mapGetters(["i18nLanguage"])
  },
  methods: {
    routeToHome() {
      this.$router.push({ path: "/" });
    }
  },
  created() {
    this.lang = this.i18nLanguage;
  },
  mounted() {
    // 将实例绑定到全局闭包中
    myGlobalClosure.setVueInst(this);
  }
};
</script>

<style scoped lang='scss'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.usage-demo {
  &__aside {
    position: absolute;
    right: 0;
    top: 0;

    select {
      margin: 10px 10px 0 0;
    }
  }
}
</style>
