import Vue from 'vue'
import VueRouter from 'vue-router'
import ThoughtsPartial from '../src/thoughts/thoughts_partial.vue'
import ThoughtAll from '../src/thoughts/thought_all_text.vue'
import MyThought from '../src/thoughts/my_thought.vue'
import UserSettings from '../src/user/user_settings.vue'
import UserAccount from '../src/user/user_account.vue'
import UserShow from '../src/user/user_show.vue'

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
      },
      children: [
        {
          path: ':userId',
          name: 'userShow',
          components: {
            user_show: UserShow
          }
        },
        {
          path: ':userId/thoughts/:thoughtId',
          name: 'thought',
          components: {
            user_show: UserShow,
            thought_all: ThoughtAll
          },
          props: {
            thought_all: true
          }
        }
      ]
    },
    {
      path: '/users/settings',
      name: 'settings',
      components: {
        user_settings: UserSettings
      },
      children: [
        {
          path: 'account',
          name: 'userAccount',
          components: {
            user_account: UserAccount
          }
        }
      ]
    },
  ]
});
