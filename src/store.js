import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName:"",
    chatRoom:""
  },
  mutations: {
    setdata(state, { username, chatroom }) {
      state.userName = username;
      state.chatRoom = chatroom;
    }
  },
  actions: {

  }
})
