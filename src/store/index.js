import Vue from 'vue';
import Vuex from 'vuex';
import questionbank from './modules/questionbank';
import common from './modules/common/common';
import user from '../../public/store/modules/common/user';
import common2 from '../../primary/store/modules/common/common';
import websocket from './modules/websocket/wbControl';
// import websocket from '../../public/store/modules/websocket/wbControl';
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        questionbank,
        common,
        common2,
        user,
        websocket
    },
    strict: process.env.NODE_ENV !== 'production'
});

export default store;
