import Vue from 'vue'
import Vuex from 'vuex'
import teacherTest from './modules/teacher.test'
import common from './modules/common/common'
// import websocket from '@/public/store/modules/websocket/wbControl';

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        common,
        teacherTest,
        // websocket
    },
    strict: process.env.NODE_ENV !== 'production'
});

export default store
