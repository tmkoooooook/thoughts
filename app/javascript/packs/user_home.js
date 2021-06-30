import Vue from 'vue'
import UserHome from './user/user_home.vue'
import router from './router'
import TurbolinksAdapter from 'vue-turbolinks'

Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  const element = document.getElementById('user_home')
  const csrf_token = JSON.parse(element.getAttribute('data-csrf'))

  var userHome = new Vue({
    el: '#user_home',
    router,
    render: (h) => h(UserHome, { props: csrf_token })
  })
})
