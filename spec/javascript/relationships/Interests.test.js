import 'jsdom-global/register'
import { shallowMount } from '@vue/test-utils'
import Interests from 'relationships/interests'
import InterestingBtn from 'parts/interesting_btn'
import 'thoughts_logo_005163.png'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import axios from 'axios'
import { exp } from 'prelude-ls'

jest.createMockFromModule('axios')
let interests
axios.get = jest.fn(response => response = { data: interests })

describe('Interests', () => {
  let wrapper
  interests = [
    { id: 1, name: 'testUser1', user_id: 'testUserId1' },
    { id: 2, name: 'testUser2', user_id: 'testUserId2' }
  ]
  const factory = (route) => {
    const $route = { name: route }
    return shallowMount(Interests, {
      stubs: ['router-link'],
      mocks: { $route }
    })
  }

  beforeEach(() => {
    wrapper = factory('interests')
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
})
