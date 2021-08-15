import 'jsdom-global/register'
import '../__mocks__/localStorage_mock'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserShow from 'user/user_show'
import InterestingBtn from 'parts/interesting_btn'
import LogoutBtn from 'parts/logout_btn'
import UserImage from 'parts/user_image'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import Vuex from 'vuex'
import axios from 'axios'
import handler from 'utils/handler'

jest.createMockFromModule('axios')
let showUser
axios.get = jest.fn(response => response = { data: showUser })

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin(handler)

describe('userShow', () => {
  const factory = (route) => {
    const $route = route
    return shallowMount(UserShow, {
      localVue,
      store,
      mocks: { $route },
      stubs: ['router-link']
    })
  }
  let route
  let wrapper
  let getters
  let mutations
  let store

  beforeEach(() => {
    handler.methods.handle = jest.fn(response => ([response, undefined]))
    getters = { watchUser() { return store.state.user } }
    mutations = { setErrors: jest.fn() }
    store = new Vuex.Store({
      state: { user: { user_id: 'testUserId' } },
      getters,
      mutations
    })
  })

  describe('when showUser is other user', () => {
    beforeEach(() => {
      showUser = {
        id: 1,
        name: 'otherUser',
        user_id: 'otherUserId',
        icon_image: { url: 'image.png' },
        header_image: { url: 'image.png' },
        interests_size: 890,
        interesters_size: 2000
      }
      route = { params: { userId: 'otherUserId' } }
      wrapper = factory(route)
    })

    it('display user header_image', () => {
      expect(wrapper.findAllComponents(UserImage).at(0).exists()).toBe(true)
    })

    it('display user icon_image', () => {
      expect(wrapper.findAllComponents(UserImage).at(1).exists()).toBe(true)
    })

    it('display show user name', () => {
      expect(wrapper.find('.user-name').text()).toBe('otherUser')
    })

    it('display show user user_id', () => {
      expect(wrapper.find('.user-id').text()).toBe('otherUserId')
    })

    it('display interests amount', () => {
      expect(wrapper.findAll('.interest-link').at(0).text()).toBe('890 interests')
    })

    it('display interesters amount', () => {
      expect(wrapper.findAll('.interest-link').at(1).text()).toBe('2000 interesters')
    })

    it('display InterestingBtn', () => {
      expect(wrapper.findComponent(LogoutBtn).exists()).toBe(false)
      expect(wrapper.findComponent(InterestingBtn).exists()).toBe(true)
    })

    it('call axios when enter UserShow Route ', () => {
      expect(axios.get).toHaveBeenCalled()
    })

    it('calls set Errors when axios response receive errors', async () => {
      const errors = { message: 'error' }
      handler.methods.handle = jest.fn(() => ([undefined, errors]))
      wrapper = factory(route)
      await wrapper.vm.$nextTick()
      expect(mutations.setErrors).toHaveBeenCalled()
    })
  })

  describe('when showUser is self', () => {
    beforeEach(() => {
      showUser = {
        id: 2,
        name: 'testUser',
        user_id: 'testUserId',
        icon_image: { url: 'image.png' },
        header_image: { url: 'image.png' },
        interests_size: 500,
        interesters_size: 230
      }
      route = { params: { userId: 'testUserId' } }
      wrapper = factory(route)
    })

    it('display logoutBtn', () => {
      expect(wrapper.findComponent(InterestingBtn).exists()).toBe(false)
      expect(wrapper.findComponent(LogoutBtn).exists()).toBe(true)
    })
  })
})
