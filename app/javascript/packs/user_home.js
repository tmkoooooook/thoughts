import Vue from 'vue'
import UserHome from '../src/user/user_home.vue'
import router from '../src/router'
import store from '../src/store'
import '../src/mq'
import { ModalPlugin } from 'bootstrap-vue'
import TurbolinksAdapter from 'vue-turbolinks'

Vue.use(TurbolinksAdapter)
Vue.use(ModalPlugin)

document.addEventListener('turbolinks:load', () => {
  const template = document.querySelector("[data-vue]")
  const csrf_token = JSON.parse(template.getAttribute('data-csrf'))

  new Vue({
    el: template,
    router,
    store,
    render: (h) => h(UserHome, { props: csrf_token })
  })
})
