import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      userInfo:{}
    },
    mutations: {
      LOGIN(state,userInfo) {
        state.userInfo = userInfo;
      },
    },
    actions: {
      login(ctx, userInfo) {
        ctx.commit('LOGIN', userInfo);
      },
    }
});

export default store;
