import 'jsdom-global/register'
import '../__mocks__/localStorage_mock'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserShow from 'user/user_show'
import InterestingBtn from 'parts/interesting_btn'
import LogoutBtn from 'parts/logout_btn'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import Vuex from 'vuex'
import axios from 'axios'

jest.createMockFromModule('axios')
let showUser
axios.get = jest.fn(response => response = { data: showUser })

const localVue = createLocalVue()
localVue.use(Vuex)

describe('userShow', () => {
  const factory = (route) => {
    const $route = route
    return shallowMount(UserShow, {
      localVue,
      store,
      mocks: { $route }
    })
  }
  let route
  let wrapper
  let getters
  let store

  beforeEach(() => {
    getters = { watchUser() { return store.state.user } }
    store = new Vuex.Store({
      state: { user: { user_id: 'testUserId' } },
      getters
    })
  })

  describe('when showUser is other user', () => {
    beforeEach(() => {
      showUser = {
        id: 1,
        name: 'otherUser',
        user_id: 'otherUserId',
        interests_size: 890,
        interesters_size: 2000
      }
      route = { params: { userId: 'otherUserId' } }
      wrapper = factory(route)
      wrapper.setData({ isUserShow: true })
    })

    it('display user header image', () => {
      expect(wrapper.find('.header-img-wrapper img').exists()).toBe(true)
    })

    it('display user thumbnail image', () => {
      expect(wrapper.find('.header-thumbnail-wrapper img').exists()).toBe(true)
    })

    it('display show user name', () => {
      expect(wrapper.find('.user-name').text()).toBe('otherUser')
    })

    it('display show user user_id', () => {
      expect(wrapper.find('.user-id').text()).toBe('otherUserId')
    })

    it('display interests amount', () => {
      expect(wrapper.find('.interests').text()).toBe('890 interests')
    })

    it('display interesters amount', () => {
      expect(wrapper.find('.interesters').text()).toBe('2000 interesters')
    })

    it('display InterestingBtn', () => {
      expect(wrapper.findComponent(LogoutBtn).exists()).toBe(false)
      expect(wrapper.findComponent(InterestingBtn).exists()).toBe(true)
    })

    it('call axios when enter UserShow Route ', () => {
      expect(axios.get).toHaveBeenCalled()
    })
  })

  describe('when showUser is self', () => {
    beforeEach(() => {
      showUser = {
        id: 2,
        name: 'testUser',
        user_id: 'testUserId',
        interests_size: 500,
        interesters_size: 230
      }
      route = { params: { userId: 'testUserId' } }
      wrapper = factory(route)
      wrapper.setData({ isUserShow: true })
    })

    it('display logoutBtn', () => {
      expect(wrapper.findComponent(InterestingBtn).exists()).toBe(false)
      expect(wrapper.findComponent(LogoutBtn).exists()).toBe(true)
    })
  })

  describe('setIsUserShow', () => {
    it('isUserShow true when exists isShowUser prop in localStorage', async () => {
      window.localStorage.setItem('isShowUser', 'testUser')
      route = { name: 'userHome', params: { userId: null } }
      wrapper = factory(route)
      expect(wrapper.vm.isUserShow).toBe(true)
      window.localStorage.clear()
    })

    it('isUserShow true when current route is userShow', async () => {
      route = { name: 'userShow', params: { userId: 'testUserId' } }
      wrapper = factory(route)
      expect(wrapper.vm.isUserShow).toBe(true)
    })

    it('isUserShow false when does not exists isShowUser prop in localStorage', async () => {
      route = { name: 'userHome', params: { userId: null } }
      wrapper = factory(route)
      expect(wrapper.vm.isUserShow).toBe(false)
    })
  })

})
