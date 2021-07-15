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

  const factory = (route) => {
    const $route = route
    return shallowMount(UserHome, {
      localVue,
      store,
      stubs: ['router-view'],
      mocks: { $route }
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
      wrapper = factory(route)
      routerView = wrapper.findAll('router-view-stub')
    })

    it('display UserHeader', () => {
      expect(wrapper.findComponent(UserHeader).exists()).toBe(true)
    })

    it('display thoughts_partial', () => {
      expect(routerView.at(0).html()).toContain('thoughts_partial')
    })

    it('display MyThought', () => {
      expect(routerView.at(1).html()).toContain('my_thought')
    })

    it('display ThoughtAll', () => {
      expect(routerView.at(2).html()).toContain('thought_all')
    })
  })

  describe('when thought_all opening', () => {
    beforeEach(() => {
      route = { name: 'thought', params: { thoughtId: 1, userId: null } }
      wrapper = factory(route)
    })

    it('does not run fetchThoughts ', () => {
      expect(actions.fetchThoughts).not.toHaveBeenCalled()
    })
  })
  describe('when thought_all is not opening', () => {
    describe('when current route is userShow', () => {
      beforeEach(() => {
        route = { name: 'userShow', params: { thoughtId: null, userId: 'user' } }
        wrapper = factory(route)
      })

      it('run fetchThoughts', () => {
        expect(actions.fetchThoughts).toHaveBeenCalled()
      })
    })
  })
})
