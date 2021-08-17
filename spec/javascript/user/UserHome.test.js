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

  const factory = (userId) => {
    return shallowMount(UserHome, {
      localVue,
      store,
      stubs: ['router-view'],
      attrs: { userId: userId }
    })
  }
  let actions
  let store

  beforeEach(() => {
    actions = {
      fetchCurrentUser: jest.fn()
    }

    store = new Vuex.Store({
      state: { thoughts: [] },
      actions
    })
  })

  describe('display router-view', () => {
    beforeEach(() => {
      route = { name: 'userHome', params: { thoughtId: null, userId: null } }
      wrapper = factory(null)
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
})
