import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: undefined,
        items: undefined,
        allItems: undefined
    },
    plugins: [createPersistedState()],
    mutations: {
        setUserInfo(state, payload) {
            state.userInfo = payload;
        },
        setItems(state, payload) {
            state.items = payload;
        },
        setAllItems(state, payload) {
            state.allItems = payload;
        }
    },
    actions: {

    },
    getters: {
    }
});
