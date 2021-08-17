import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../src/homes/home.vue'
import SignIn from '../src/homes/sign_in.vue'
import SignUp from '../src/homes/sign_up.vue'
import ThoughtsPartial from '../src/thoughts/thoughts_partial.vue'
import ThoughtAll from '../src/thoughts/thought_all_text.vue'
import UserHome from '../src/user/user_home.vue'
import UserSettings from '../src/user/user_settings.vue'
import UserAccount from '../src/user/user_account.vue'
import Interests from '../src/relationships/interests.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      components: { home: Home }
    },
    {
      path: '/sign_in',
      name: 'signIn',
      components: { sign_in: SignIn }
    },
    {
      path: '/sign_up',
      name: 'signUp',
      components: { sign_up: SignUp }
    },
    {
      path: '/users',
      components: { user_home: UserHome },
      props: { user_home: true },
      children: [
        {
          path: 'settings',
          name: 'settings',
          components: { user_settings: UserSettings },
          children: [
            {
              path: 'account',
              name: 'userAccount',
              components: { user_account: UserAccount }
            },
            {
              path: 'account_edit',
              name: 'userAccountEdit',
              components: { user_account: UserAccount }
            },
            {
              path: 'password_edit',
              name: 'userPasswordEdit',
              components: { user_account: UserAccount }
            },
          ]
        },
        {
          path: '',
          name: 'userHome',
          components: { thoughts_partial: ThoughtsPartial },
          props: { thoughts_partial: true },
        },
        {
          path: ':userId',
          name: 'userShow',
          components: { thoughts_partial: ThoughtsPartial },
          props: { thoughts_partial: true },
          children: [
            {
              path: 'thoughts/:thoughtId',
              name: 'thought',
              components: {
                thought_all: ThoughtAll
              },
              props: { thought_all: true }
            },
            {
              path: 'interests',
              name: 'interests',
              components: { interests: Interests },
              props: { interests: true }
            },
            {
              path: 'interesters',
              name: 'interesters',
              components: { interests: Interests },
              props: { interests: true }
            }
          ]
        }
      ]
    },
  ]
});
