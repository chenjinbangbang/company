import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    imgList: null
  },
  mutations: {
    set_imgList(state,msg){
      //console.log(msg);
      state.imgList = msg;
    }
  },
  getters: {
    imgList: state => state.imgList
  }
});

export default store;
