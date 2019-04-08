<template>
  <section>
      <button @click="handleGet">get请求</button>
      <button @click="handlePost">post请求</button>
      <button @click="handleReqSync">请求成功才执行下一个请求</button>
      <button @click="handleReqConcurr">多请求并发执行,都完成后执行下一个请求</button>
      <button @click="handleGet">多请求顺序执行</button>
      <button @click="handleInterce">请求拦截器</button>
  </section>
</template>

<style>
</style>

<script>
/**
 * axios中文文档：
 * http://www.axios-js.com/zh-cn/docs/
 */
require("../apiMock/httpUsage");
export default {
  name: 'httpUsage',
  data() {
    return {};
  },
  methods: {
    handleGet() {
      this.$http
        .get("https://api.github.com/")
        .then(res => {
          console.log(res);
          alert(JSON.stringify(res.data));
        })
        .catch(err => {
          console.log(err);
        });
    },
    handlePost() {
      this.$http
        .post("/postReq1", {
          key1: "value1",
          key2: "value2"
        })
        .then(res => {
          console.log(res);
          alert(JSON.stringify(res.data));
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleReqSync() {
      this.$http
        .post("/login", {
          user: "xiaoming",
          password: "123456"
        })
        .then(res => {
          console.log(res);
          alert(JSON.stringify(res.data));
          if (res.data.status == "success") {
            this.$http.get("/loginInfo").then(res => {
              console.log(res);
              alert(JSON.stringify(res.data));
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleReqConcurr() {
      let vm = this;
      let getUserAccount = function() {
        return vm.$http.get("/user/12345");
      }

      let getUserPermissions = function() {
        return vm.$http.get("/user/12345/permissions");
      }

      this.$http.all([getUserAccount(), getUserPermissions(), 
    //   this.$http.get('http://www.baidu.com')
      ]).then(
        this.$http.spread(function(act, perms) {
          // 两个请求现在都执行完成
          console.log(act, perms);
          alert(JSON.stringify(act.data));
          alert(JSON.stringify(perms.data));
        })
      ).catch(err => { // 任何一个请求reject，走到这里
          console.log(err);
      });
    },
    handleInterce() {}
  }
};
</script>