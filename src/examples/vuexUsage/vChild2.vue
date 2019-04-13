<template>
  <section>{{$t('page.examples.shopMallPage2', {username: getUsername})}}</section>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'getUsername'
    ])
  }
};
</script>