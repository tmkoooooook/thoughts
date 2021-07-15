import Vue from 'vue'
import VueRouter from 'vue-router'
import ThoughtsPartial from '../src/thoughts/thoughts_partial.vue'
import ThoughtAll from '../src/thoughts/thought_all_text.vue'
import MyThought from '../src/thoughts/my_thought.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'userHome',
      components: {
        thoughts_partial: ThoughtsPartial
      },
      props: {
        thoughts_partial: true
      }
    },
    {
      path: '/users/:userId',
      name: 'userShow',
      components: {
        thoughts_partial: ThoughtsPartial
      },
      props: {
        thoughts_partial: true
      }
    },
    {
      path: '/users/:userId/thoughts/:thoughtId',
      name: 'thought',
      components: {
        thoughts_partial: ThoughtsPartial,
        thought_all: ThoughtAll
      },
      props: {
        thoughts_partial: true,
        thought_all: true
      }
    },
    {
      path: '/users/mythought',
      name: 'myThought',
      components: {
        thoughts_partial: ThoughtsPartial,
        my_thought: MyThought,
      },
      props: {
        thoughts_partial: true
      }
    }
  ]
});
