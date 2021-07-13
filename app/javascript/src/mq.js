import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    sp: 425,
    pc: 768
  },
  defaultBreakpoint: 'sp'
})
