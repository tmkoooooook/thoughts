import 'jsdom-global/register'
import '../__mocks__/localStorage_mock'
import { shallowMount } from '@vue/test-utils'
import ThoughtsPartial from 'thoughts/thoughts_partial'
import ThoughtsCollection from 'thoughts/thoughts_collection'
import MyThought from "thoughts/my_thought"
import UserShow from "user/user_show"
import 'thoughts_logo_005163.png'
import { beforeEach, describe, expect, it } from '@jest/globals'

describe('ThoughtsPartial', () => {
  let wrapper
  const thoughts = [
    { id: 1, title: 'title1', shorted_text: 'text1', user_id: 1,
      user: { name: 'testUser1', user_id: 'testUserId1' } },
    { id: 2, title: 'title2', shorted_text: 'text2', user_id: 2,
      user: { name: 'testUser2', user_id: 'testUserId2' } }
  ]
  const factory = (route) => {
    const $route = { name: route }
    return shallowMount(ThoughtsPartial, {
      stubs: ['router-link', 'router-view'],
      mocks: { $router: { push: jest.fn() }, $route },
      propsData: { thoughts: thoughts },
      attrs: { thoughtId: 1, userId: 'testUserId1' }
    })
  }
  beforeEach(() => {
    wrapper = factory('userShow')
  })

  it('display thought partial', () => {
    expect(wrapper.find('div.thoughts-partial').exists()).toBe(true)
  })

  it('display MyThought component', () => {
    expect(wrapper.findComponent(MyThought).exists()).toBe(true)
  })

  describe('activateMyThought', () => {
    it('reverse myThoughtActive', () => {
      wrapper.setData({
        myThoughtActive: true,
        thoughtAllActive: false
      })
      wrapper.findComponent(MyThought).vm.$emit('activateMyThought')
      expect(wrapper.vm.myThoughtActive).toBe(false)
    })

    it('returns ThoughtAllActive false when myThoughtActive is false', () => {
      wrapper.setData({
        myThoughtActive: false,
        thoughtAllActive: true
      })
      expect(wrapper.vm.thoughtAllActive).toBe(true)
      wrapper.findComponent(MyThought).vm.$emit('activateMyThought')
      expect(wrapper.vm.thoughtAllActive).toBe(false)
    })
  })

  describe('activateThoughtAll', () => {
    it('call router.push when route path equals thought partial', () => {
      wrapper.findComponent(ThoughtsCollection).vm.$emit('activateThoughtAll','testUserId2', 2)
      expect(wrapper.vm.$router.push).toHaveBeenCalled()
    })

    it('does not call router.push when route path different thought partial', () => {
      wrapper.findComponent(ThoughtsCollection).vm.$emit('activateThoughtAll', 'testUserId1', 1)
      expect(wrapper.vm.$router.push).not.toHaveBeenCalled()
    })
  })

  describe('setIsUserShow', () => {
    it('isUserShow true when route name is userShow', () => {
      wrapper = factory('userShow')
      expect(wrapper.vm.isUserShow).toBe(true)
      expect(wrapper.findComponent(UserShow).exists()).toBe(true)
    })

    it('isUserShow true when route name is userShow', () => {
      window.localStorage.setItem('isShowUser','testUser1')
      wrapper = factory('thought')
      expect(wrapper.vm.isUserShow).toBe(true)
      expect(wrapper.findComponent(UserShow).exists()).toBe(true)
      window.localStorage.clear()
    })

    it('isUserShow false when route is not userShow and localStorage have no item', () => {
      window.localStorage.clear()
      wrapper = factory('userHome')
      expect(wrapper.vm.isUserShow).toBe(false)
      expect(wrapper.findComponent(UserShow).exists()).toBe(false)
    })
  })

  describe('isThoughtsCollectionShow', () => {
    it('does not show ThoughtsCollection when route is interests', () => {
      wrapper = factory('interests')
      expect(wrapper.findComponent(ThoughtsCollection).exists()).toBe(false)
    })

    it('shows ThoughtsCollection when route is userShow', () => {
      wrapper = factory('userShow')
      expect(wrapper.findComponent(ThoughtsCollection).exists()).toBe(true)
    })
  })
})
