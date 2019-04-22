<template>
  <section>
    {{$t('page.examples.homePage2', {username: getUsername})}}
    <p>
      <h2>{{$t('page.examples.nicknameModify')}}</h2>
      <input v-model='newname'>
      <button @click='handleRename'>{{$t('comp.button.confirm')}}</button>
    </p>
  </section>
</template>

<script>
require('../../apiMock/examples/vuexUsage')
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      newname: ''
    }
  },
  computed: {
    ...mapGetters([
      'getUsername'
    ])
  },
  methods: {
    handleRename() {
      this.$store.dispatch('editNickname', {name: this.newname}).then(() => {}).catch(() => {});
    }
  }
};
</script>