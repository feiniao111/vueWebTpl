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

    <h1>{{$t('page.examples.reqMock')}}</h1>
    <p>
      <label><input type="radio" v-model="isMockMode" :value='true'>{{$t('page.examples.openMock')}}</label>
      <label><input type="radio" v-model="isMockMode" :value='false'>{{$t('page.examples.closeMock')}}</label>
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
import api from '../api/examples/httpUsage.js'
import config from '../api/config.js'
export default {
  name: "httpUsage",
  data() {
    return {
      isMockMode: false
    };
  },
  watch: {
    isMockMode(val) {
      if (val) {
        this.openMock();
      } else{
        this.cancelMock();
      }
    }
  },
  methods: {
    handleGet() {
      api.getGithub()
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
      api.getPaginationData()
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
        api.getLoginInfo().then(res => {
          console.log(res);
          alert(JSON.stringify(res.data));
        });
      };

      api.login()
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
      this.$http
        .all([api.getUserAccount(), api.getUserPermissions()])
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
      this.$http
        .all([api.getUserAccount(), api.getUserPermissions(), api.getBaidu()])
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
          api.getPrice(product)  
            .then(res => {
              console.log(33, res)
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
          api.getNum(product)  
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
        return new Promise((resolve, reject) => {
          api.getRate(product).then(res => {
            alert(this.$t('page.examples.goodRate', {product: product, rate: res}));
            resolve(res);
          }).catch(err => {
              console.log(err);
              reject(err);
            });
        })
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
      config.handleGlobConfig();
      alert(this.$t('page.examples.setSucc'));
    },
    handleInterce() {
      config.handleInterce();
      alert(this.$t('page.examples.setSucc'));
    },
    openMock() {
      window.myGlobalClosure.openMock();
      alert(this.$t('page.examples.openSucc'));
    },
    cancelMock() {
      window.myGlobalClosure.cancelMock();
      alert(this.$t('page.examples.closeSucc'));
    }
  }
};
</script>