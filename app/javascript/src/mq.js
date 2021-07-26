import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    sp: 769,
    pc: 1040
  },
  defaultBreakpoint: 'sp'
})
