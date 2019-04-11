<!-- 原生input上传标签模拟-->
<template>
  <label class="input_mock" :title="uploadHint">
    <span class="input_mock__button">{{$t('comp.Input.chose')}}</span>
    <input type="file" class="input_mock__button--real" @change="handleChange">
    <span class="input_mock__hint">{{uploadHint}}</span>
  </label>
</template>

<style lang='scss' scoped>
// 推荐采用BEM语法
// https://en.bem.info/
.input_mock {
  &__button {
    padding: 3px 7.5px;
    border: 1px solid #999;
    border-radius: 2px;
    color: #333;
    background: #F3F3F3;

    &:hover {
      border-color: #666;
    }

    &--real {
      display: none;
    }
  }
}
</style>

<script>
export default {
  name: "InputMock",
  components: {},
  props: {},
  data() {
    return {
      file: undefined
    };
  },
  computed: {
    uploadHint() {
      return this.name == '' ? this.$t("comp.Input.unchosen") : this.name;
    },
    size() {
      return this.file ? this.file.size : 0;
    },
    name() {
      return this.file ? this.file.name: '';
    }
  },
  methods: {
    handleChange() {
        let inputDom = this.$el.querySelector('.input_mock__button--real');
        this.file = inputDom.files[0]
        console.log(this.file)
    }
  },
  mounted() {
  }
};
</script>
