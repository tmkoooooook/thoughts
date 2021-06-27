import Vue from 'vue'
import UserHome from './user/user_home.vue'
import router from './router'
import TurbolinksAdapter from 'vue-turbolinks'
Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  var userHome = new Vue({
    el: '#user_home',
    router,
    render: (h) => h(UserHome)
  })
})
