import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserHome from 'user/user_home'
import UserHeader from 'user/user_header'
import Vuex from 'vuex'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('UserHome', () => {
  let route
  let wrapper
  let routerView

  const factory = (route, userId) => {
    const $route = route
    return shallowMount(UserHome, {
      localVue,
      store,
      stubs: ['router-view'],
      mocks: { $route },
      attrs: { userId: userId }
    })
  }
  let actions
  let store

  beforeEach(() => {
    actions = {
      fetchThoughts: jest.fn(),
      fetchCurrentUser: jest.fn()
    }

    store = new Vuex.Store({
      state: {
        thoughts: []
      },
      actions
    })
  })

  describe('display router-view', () => {
    beforeEach(() => {
      route = { name: 'userHome', params: { thoughtId: null, userId: null } }
      wrapper = factory(route, null)
      routerView = wrapper.findAll('router-view-stub')
    })

    it('display UserHeader', () => {
      expect(wrapper.findComponent(UserHeader).exists()).toBe(true)
    })

    it('display thoughts_partial', () => {
      expect(routerView.at(0).html()).toContain('thoughts_partial')
    })


    it('display user_settings', () => {
      expect(routerView.at(1).html()).toContain('user_settings')
    })
  })

  describe('route', () => {
    beforeEach(() => {
      route = { name: 'userHome', params: { thoughtId: null, userId: null } }
      wrapper = factory(route, 'testUser')
    })

    it('call runFetchThoughts when route from settings to userHome', async () => {
      const from = { name: 'settings' }
      const to = { name: 'userHome' }
      UserHome.watch.$route.call(wrapper.vm, to, from)
      await wrapper.vm.$nextTick()
      expect(actions.fetchThoughts).toHaveBeenCalled()
    })
  })
})
