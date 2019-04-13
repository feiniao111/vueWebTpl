/**
 * 相比于static目录下的全局文件global.js, vuex其实更算是一种状态管理方式，另外也有模块化特征，它更适合于存放以下特点的数据：
 *  —— 变量
 *  —— 多处业务使用到（比如用户登录信息、购物车商品信息，没必要每个使用到的页面都去服务器请求一次）
 *  —— 响应式数据（比如在支持多语言的网站，存放当前语言变量，当变量改变，自动触发视图重新渲染）
 *  —— 两个子路由组件间数据通信（如果数据量不大，可以用$route.query传递）
 */
import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common/common';
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        common,
    },
    strict: process.env.NODE_ENV !== 'production'
});

export default store;
