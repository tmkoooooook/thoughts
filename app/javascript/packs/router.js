import Vue from 'vue'
import VueRouter from 'vue-router'
import UserHeader from './user/user_header.vue'
import ThoughtsPartial from './thoughts/thoughts_partial.vue'
import ThoughtAll from './thoughts/thought_all_text.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: "history",
  routes: [
    { path: '/users',
      components: {
        user_header:      UserHeader,
        thoughts_partial: ThoughtsPartial
      }
    },
    { path: '/users/:thoughtId',
      name: 'thought',
      components: {
        user_header : UserHeader,
        thoughts_partial: ThoughtsPartial,
        default: ThoughtAll
      }
    }
  ]
});
