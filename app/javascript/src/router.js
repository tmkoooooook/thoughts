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
import UserAccountEdit from '../src/user/user_account_edit.vue'
import UserPasswordEdit from '../src/user/user_password_edit.vue'
import UserShow from '../src/user/user_show.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        home: Home
      }
    },
    {
      path: '/sign_in',
      name: 'signIn',
      components: {
        sign_in: SignIn
      }
    },
    {
      path: '/sign_up',
      name: 'signUp',
      components: {
        sign_up: SignUp
      }
    },
    {
      path: '/users',
      components: {
        user_home: UserHome
      },
      props: {
        user_home: true
      },
      children: [
        {
          path: '',
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
          path: 'settings',
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
            },
            {
              path: 'account_edit',
              name: 'userAccountEdit',
              components: {
                user_account_edit: UserAccountEdit
              }
            },
            {
              path: 'password_edit',
              name: 'userPasswordEdit',
              components: {
                user_password_edit: UserPasswordEdit
              }
            },
          ]
        },
      ]
    },
  ]
});
