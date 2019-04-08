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
