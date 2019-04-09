<template>
  <section>
    <button @click="handleGet">get请求</button>
    <button @click="handlePost">post请求</button>
    <button @click="handleReqSync">请求成功才执行下一个请求</button>
    <button @click="handleReqConcurr">多请求并发执行,都成功后执行下一个请求</button>
    <button @click="handleReqConcurr2">多请求并发执行,任一失败执行下一个请求</button>
    <button @click="handleReqSeq">多请求顺序执行</button>
    <button @click="handleGlobConfig">全局配置超时时间</button>
    <button @click="handleInterce">请求拦截器(设置token和处理token过期)</button>
  </section>
</template>

<script>
/**
 * axios中文文档：
 * http://www.axios-js.com/zh-cn/docs/
 */
require("../apiMock/httpUsage");
export default {
  name: "httpUsage",
  data() {
    return {};
  },
  methods: {
    handleGet() {
      this.$http
        .get("https://api.github.com/")
        .then(res => {
          // 请求成功返回
          console.log(res);
          alert(JSON.stringify(res.data));
        })
        .catch(err => {
          //  请求失败
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
          // 请求成功返回
          console.log(res);
          alert(JSON.stringify(res.data));
        })
        .catch(err => {
          //  请求失败
          console.log(err);
        });
    },
    handleReqSync() {
      let loginInfoFuc = () => {
        this.$http.get("/loginInfo").then(res => {
          console.log(res);
          alert(JSON.stringify(res.data));
        });
      };

      this.$http
        .post("/login", {
          user: "xiaoming",
          password: "123456"
        })
        .then(res => {
          // 请求成功返回
          console.log(res);
          alert(JSON.stringify(res.data));
          if (res.data.status == "success") {
            loginInfoFuc(); // 将请求封装成函数，避免回调地狱
          }
        })
        .catch(err => {
          //  请求失败
          console.log(err);
        });
    },
    handleReqConcurr() {
      let getUserAccount = () => {
        return this.$http.get("/user/12345");
      };

      let getUserPermissions = () => {
        return this.$http.get("/user/12345/permissions");
      };

      this.$http
        .all([getUserAccount(), getUserPermissions()])
        .then(
          // 注意 getUserAccount() 和getUserPermissions()，执行无顺序关系
          this.$http.spread(function(act, perms) {
            // 两个请求现在都执行成功
            console.log(act, perms);
            alert(JSON.stringify(act.data));
            alert(JSON.stringify(perms.data));
          })
        )
        .catch(err => {
          // 任何一个请求失败，走到这里
          console.log(err);
        });
    },
    handleReqConcurr2() {
      let getUserAccount = () => {
        return this.$http.get("/user/12345");
      };

      let getUserPermissions = () => {
        return this.$http.get("/user/12345/permissions");
      };

      let getBaidu = () => {
        return this.$http.get("http://www.baidu.com");
      };

      this.$http
        .all([getUserAccount(), getUserPermissions(), getBaidu()])
        .then(
          this.$http.spread(function(act, perms) {
            // 两个请求现在都执行成功
            console.log(act, perms);
            alert(JSON.stringify(act.data));
            alert(JSON.stringify(perms.data));
          })
        )
        .catch(err => {
          // 任何一个请求失败，走到这里
          console.log(err);
        });
    },
    handleReqSeq() {
      let getPrice = product => {
        return new Promise((resolve, reject) => {
          this.$http
            .get("/price?product=" + product)
            .then(res => {
              alert(product + "的价格是:" + res.data.price);
              resolve(res.data.price);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        });
      };
      let getNum = product => {
        return new Promise((resolve, reject) => {
          this.$http
            .get("/num?product=" + product)
            .then(res => {
              alert(product + "的数量是:" + res.data.num);
              resolve(res.data.num);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        });
      };

      let getRate = product => {
        alert(product + "的利率是" + 1.1);
        return 1.1;
      };

      /**async和await的用法，可以查看这篇文章
       * https://segmentfault.com/a/1190000007535316?utm_source=tag-newest
       */
      let calTotal = async product => {
        try {
          let price = await getPrice(product);
          let num = await getNum(product);
          let rate = await getRate(product);
          return price * num * rate;
        } catch (err) {
          throw err;
        }
      };

      calTotal("melon")
        .then(res => {
          alert("总价是" + res);
          console.log("总价是" + res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleGlobConfig() {
      // 覆写库的超时默认值
      // 现在，在超时前，所有请求都会等待 2.5 秒
      let timeout = window.myGlobalClosure.getTimeout();
      this.$http.defaults.timeout = timeout;
      alert('请求超时时间设置为' + timeout/1000 + '秒');
    },
    handleInterce() {
      // 请求拦截器，在发送请求前，头部添加token
      this.$http.interceptors.request.use( config => {
        let token = window.myGlobalClosure.getToken(); // 也可以用其他的方式存储,比如localStorage
        let attr = window.myGlobalClosure.getTokenAttr();
        if (token) {
          config.headers.common[attr] = token;
        }
        
        return config;
      })

      // 响应拦截器
      this.$http.interceptors.response.use( res => {
        let expireCode = window.myGlobalClosure.getTokenExpireCode(); //token过期码
        let invalidCode = window.myGlobalClosure.getTokenInvalidCode(); //token无效码
        if (res.data.code === expireCode || res.data.code === invalidCode) { // code字段由服务端返回
          window.myGlobalClosure.setToken(undefined);
          // 跳转到登录页面
          
        } else if (res.data.token) { //提示token需要更新
          window.myGlobalClosure.setToken(res.data.token);
        }
        return res;
      })
    }
  }
};
</script>