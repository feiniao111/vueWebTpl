<template>
  <section>
    {{$t('page.examples.homePage2', {username: getUsername})}}
    <p>
      <input :placeholder="$t('page.examples.placeholder')">
    </p>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'getUsername'
    ])
  }
};
</script>