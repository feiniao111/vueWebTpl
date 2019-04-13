<template>
  <section>
    <h1>{{$t('page.examples.reqCall')}}</h1>
    <p>
      <button @click="handleGet">{{$t('page.examples.getReq')}}</button>
      <button @click="handlePost">{{$t('page.examples.postReq')}}</button>
      <button @click="handleReqSync">{{$t('page.examples.req1by1')}}</button>
      <button @click="handleReqConcurr">{{$t('page.examples.reqAllby1')}}</button>
      <button @click="handleReqConcurr2">{{$t('page.examples.req1by1f')}}</button>
      <button @click="handleReqSeq">{{$t('page.examples.reqSeq')}}</button>
    </p>
    
    <h1>{{$t('page.examples.reqConf')}}</h1>
    <p>
      <button @click="handleGlobConfig">{{$t('page.examples.globalTimeout')}}</button>
      <button @click="handleInterce">{{$t('page.examples.reqInteceptor')}}</button>
    </p>
  </section>
</template>

<script>
/**
 * axios中文文档：
 * http://www.axios-js.com/zh-cn/docs/
 * github:
 * https://github.com/axios/axios
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
              alert(this.$t('page.examples.goodPrice', {product: product, price: res.data.price}));
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
              alert(this.$t('page.examples.goodNum', {product: product, num: res.data.num}));
              resolve(res.data.num);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        });
      };

      let getRate = product => {
        alert(this.$t('page.examples.goodRate', {product: product, rate: 1.1}));
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
          alert(this.$t('page.examples.totalPrice', {price: res}));
          console.log(this.$t('page.examples.totalPrice', {price: res}));
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
      alert(this.$t('page.examples.timeoutSet', {second: timeout / 1000}));
    },
    handleInterce() {
      // 请求拦截器，在发送请求前，头部添加token
      this.$http.interceptors.request.use(config => {
        let token = window.myGlobalClosure.getToken(); // 也可以用其他的方式存储,比如localStorage
        let attr = window.myGlobalClosure.getTokenAttr();
        if (token) {
          config.headers.common[attr] = token;
        }

        return config;
      });

      // 响应拦截器
      this.$http.interceptors.response.use(
        res => {
          // 在接收请求前，校验token
          let expireCode = window.myGlobalClosure.getTokenExpireCode(); //token过期码
          let invalidCode = window.myGlobalClosure.getTokenInvalidCode(); //token无效码
          if (res.data.code === expireCode || res.data.code === invalidCode) {
            // code字段由服务端返回
            window.myGlobalClosure.setToken(undefined);
            // 跳转到登录页面
            // 。。。

            // 如果过期不跳转而是重新请求token，可以参考这篇文章
            // https://segmentfault.com/a/1190000016946316?utm_source=tag-newest
          } else if (res.data.token) {
            //提示token需要更新
            window.myGlobalClosure.setToken(res.data.token);
          }
          return res;
        },
        err => {
          // 处理断网、超时、服务器错误等异常
          if (err) {
            if (
              err.code == "ECONNABORTED" &&
              err.message.indexOf("timeout") != -1
            ) {
              // 超时
              // 更多超时处理可以查看这篇文章
              // https://juejin.im/post/5abe0f94518825558a06bcd9
              alert(this.$t('page.examples.reqTimeout'));
              return Promise.reject(err);
            } else if (err.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              switch (err.response.status) {
                case 404:
                  // 资源不存在
                  alert(this.$t('page.examples.sourceNoExist'));
                  break;
                default:
                  err.data && console.log(err.data.message);
              }
              return Promise.reject(err);
            } else if (err.request) {
              // The request was made but no response was received
              // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(err.request);
              return Promise.reject(err);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", err.message);
            }
          } else {
            // 处理断网的情况
            alert(this.$t('page.examples.offline'));
            return Promise.reject(err);
          }
        }
      );

      alert(this.$t('page.examples.setInteceptor'));
    }
  }
};
</script>