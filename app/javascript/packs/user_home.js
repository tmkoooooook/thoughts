import Vue from 'vue'
import UserHome from '../src/user/user_home.vue'
import router from '../src/router'
import store from '../src/store'
import mq from '../src/mq'
import { ModalPlugin } from 'bootstrap-vue'
import TurbolinksAdapter from 'vue-turbolinks'

Vue.use(TurbolinksAdapter)
Vue.use(ModalPlugin)

document.addEventListener('turbolinks:load', () => {
  const element = document.getElementById('user_home')
  const csrf_token = JSON.parse(element.getAttribute('data-csrf'))

  new Vue({
    el: '#user_home',
    router,
    store,
    render: (h) => h(UserHome, { props: csrf_token })
  })
})
