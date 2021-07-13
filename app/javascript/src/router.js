import Vue from 'vue'
import VueRouter from 'vue-router'
import UserHome from '../src/user/user_home'
import UserHeader from '../src/user/user_header.vue'
import ThoughtsPartial from '../src/thoughts/thoughts_partial.vue'
import ThoughtAll from '../src/thoughts/thought_all_text.vue'
import MyThought from '../src/thoughts/my_thought.vue'
import UserShow from '../src/user/user_show.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/users',
      components: {
        user_header: UserHeader,
        thoughts_partial: ThoughtsPartial
      },
      children: [
        {
          path: ':thoughtId',
          name: 'thought',
          components: {
            thought_all: ThoughtAll
          },
          props: {
            thought_all: true
          }
        }
      ]
    },
    // { path: '/users/:thoughtId',
    //   name: 'thought',
    //   components: {
    //     user_header: UserHeader,
    //     thoughts_partial: ThoughtsPartial,
    //     thought_all: ThoughtAll,
    //     my_thought: MyThought
    //   },
    //   props: {
    //     user_header: false,
    //     thoughts_partial: false,
    //     thought_all: true,
    //     my_thought: false
    //   }
    // },
    // {
    //   path: '/users/:userId', component: UserShow,
    //   children: [

    //   ]
    // }
  ]
});
