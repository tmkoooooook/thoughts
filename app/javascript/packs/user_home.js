import Vue from 'vue'
import Index from '../src/homes/index'
import router from '../src/router'
import store from '../src/store'
import '../src/mq'
import { ModalPlugin } from 'bootstrap-vue'
import TurbolinksAdapter from 'vue-turbolinks'
import axios from 'axios'
import VueAxiosPlugin from './plugins/vue_axios.js'
import VueMoment from 'vue-moment'

Vue.use(TurbolinksAdapter)
Vue.use(ModalPlugin)
Vue.use(VueAxiosPlugin, { axios: axios, store: store })
Vue.use(VueMoment)

document.addEventListener('turbolinks:load', () => {
  const template = document.querySelector("[data-vue]")

  new Vue({
    el: template,
    router,
    store,
    render: (h) => h(Index)
  })
})
