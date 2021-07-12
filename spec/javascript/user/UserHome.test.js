import 'jsdom-global/register'
import { shallowMount } from '@vue/test-utils'
import UserHome from 'user/user_home'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import axios from 'axios'

jest.mock('axios')

describe('UserHome', () => {
  let wrapper
  let routerView

  const $store = { dispatch: jest.fn() }
  const factory = (route) => {
    const $route = route

    return shallowMount(UserHome, {
      stubs: ['router-view'],
      mocks: { $route, $store }
    })
  }

  describe('when route params is mythought', () => {
    beforeEach(() => {
      const route = { params: { thoughtId: 'mythought' } }
      wrapper = factory(route)
      routerView = wrapper.findAll('router-view-stub')
    })

    it('display MyThought', () => {
      expect(routerView.at(2).html()).toContain('my_thought')
    })
  })

  describe('when route params is thought id', () => {
    beforeEach(() => {
      const route = { params: { thoughtId: 1 } }
      wrapper = factory(route)
      routerView = wrapper.findAll('router-view-stub')
    })

    it('display ThoughtAll', () => {
      expect(routerView.at(2).html()).toContain('thought_all')
    })
  })

  describe('when route params is not exist', () => {
    beforeEach(() => {
      const route = { params: { thoughtId: '' } }
      wrapper = factory(route)
      routerView = wrapper.findAll('router-view-stub')
    })

    it('display UserHeader', () => {
      expect(routerView.at(0).html()).toContain('user_header')
    })

    it('display thoughts_partial', () => {
      expect(routerView.at(1).html()).toContain('thoughts_partial')
    })

    it('does not display both ThoughtAll and MyThought', () => {
      expect(routerView).toHaveLength(2)
    })
  })
})
