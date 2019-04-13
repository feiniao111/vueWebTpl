<template>
  <section>
    <header>
      <h1>{{$t('page.examples.choseTitle')}}</h1>
      <label><input type="radio" v-model="role" name="admin" value='admin'>{{$t('page.examples.admin')}}</label>
      <label><input type="radio" v-model="role" name="client" value='client'>{{$t('page.examples.ordin')}}</label>
      <label><input type="radio" v-model="role" name="client" value=''>{{$t('page.examples.vistor')}}</label>    
    </header>
    <p>
        <button @click='login'>{{$t('comp.button.login')}}</button>
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
  },
  data() {
    return {
      role: null
    };
  },
  methods: {
    login() {
      if (this.role == null) {
          alert(this.$t('page.examples.choseTitle'))
          return;
      }  
      
      // 记录用户名到vuex中
      let username;
      switch (this.role) {
        case 'admin':
          username = this.$t('page.examples.admin')
          break;
        case 'client':
          username = this.$t('page.examples.ordin')
          break
        default:
          username = this.$t('page.examples.vistor')   
      }
      this.$store.commit('common/SET_USERNAME', username);
      // 记录身份信息到全局变量中
      window.myGlobalClosure.setRole(this.role)
      this.$router.push({name: 'vuexUsage'})
    }
  }
};
</script>
