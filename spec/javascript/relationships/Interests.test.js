import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Interests from 'relationships/interests'
import InterestingBtn from 'parts/interesting_btn'
import NoContent from 'parts/no_content'
import UserImage from 'parts/user_image'
import 'thoughts_logo_005163.png'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import axios from 'axios'
import Vuex from 'vuex'
import handler from 'utils/handler'

jest.createMockFromModule('axios')
let interests

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin(handler)

describe('Interests', () => {
  let wrapper
  let mutations
  let store

  interests = [
    { id: 1, name: 'testUser1', user_id: 'testUserId1', icon_image: { url: 'image.png' } },
    { id: 2, name: 'testUser2', user_id: 'testUserId2', icon_image: { url: 'image.png' } }
  ]
  const factory = (route) => {
    const $route = { name: route }
    return shallowMount(Interests, {
      localVue,
      store,
      stubs: ['router-link'],
      mocks: { $route }
    })
  }

  beforeEach(() => {
    axios.get = jest.fn(response => response = { data: interests })
    handler.methods.handle = jest.fn(response => ([response, undefined]))
    mutations = {
      setErrors: jest.fn()
    }
    store = new Vuex.Store({
      state: { errors: [] },
      mutations
    })
    wrapper = factory('interests')
  })

  it('display interest user icon', () => {
    expect(wrapper.findAllComponents(UserImage).at(0).exists()).toBe(true)
  })

  it('display interest user name', () => {
    expect(wrapper.findAll('.user-info .user-show-link').at(0).text()).toContain('testUser1')
  })

  it('display interest user user_id', () => {
    expect(wrapper.findAll('.user-show-link span').at(0).text()).toBe('testUserId1')
  })

  it('display InterestingBtn', () => {
    expect(wrapper.findAllComponents(InterestingBtn).at(0).exists()).toBe(true)
  })

  it('display NoContent when interests is no content', async () => {
    interests = []
    wrapper = factory('interests')
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(NoContent).exists()).toBe(true)
  })

  describe('when route is interests', () => {
    it('fetches interest users', () => {
      const spy = jest.spyOn(Interests.methods, 'fetchInterests')
      wrapper = factory('interests')
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('when route is interesters', () => {
    it('fetches interesters', () => {
      const spy = jest.spyOn(Interests.methods, 'fetchInteresters')
      wrapper = factory('interesters')
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('when api response receives errors', () => {
    it('calls setErrors', async () => {
      const errors = { message: 'error' }
      handler.methods.handle = jest.fn(() => ([undefined, errors]))
      wrapper = factory('interests')
      await wrapper.vm.$nextTick()
      expect(mutations.setErrors).toHaveBeenCalled()
    })
  })
})
