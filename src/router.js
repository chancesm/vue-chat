import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HelloWorld from './components/HelloWorld.vue'
import Chat from './components/Chat.vue'
Vue.use(Router)
import store from "./store"
function authcheck(to,from,next) {
  if(store.state.userName && store.state.chatRoom){
    next();
  }
  else next('/')
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello-world',
      component: HelloWorld
    },
    {
      path:'/chat',
      name:'chat',
      component:Chat,
      beforeEnter: authcheck
    }
  ]
})
