<template>
  <article class="usage-demo">
    <header>
      <h1>{{ msg }}</h1>
      <h2>Usage</h2>
    </header>
    <aside class="usage-demo__aside">
      <select v-model='lang'>
        <option value="en">{{$t('page.pageDemo1.en')}}</option>
        <option value="chn">{{$t('page.pageDemo1.chn')}}</option>
      </select>
    </aside>
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
      </ul>
    </section>
  </article>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "page1",
  watch: {
    lang(val) {
      this.$store.commit('common/SET_I18N_LANGUAGE', {vue: this, lang: val});
    }
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      lang: 'chn'
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
  },
  created() {
    this.lang = this.i18nLanguage
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
