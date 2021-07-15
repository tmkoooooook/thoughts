import 'jsdom-global/register'
import { RouterLinkStub, createLocalVue, shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import UserHeader from 'user/user_header'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('UserHeader', () => {
  let wrapper
  let getters
  let store

  beforeEach(() => {
    getters = { watchUser () { return store.state.user } }
    store = new Vuex.Store({
      state: { user: { user_id: 'testUser' } },
      getters
    })

    wrapper = shallowMount(UserHeader, {
      localVue,
      store,
      stubs: { RouterLink: RouterLinkStub }
    })
  })

  describe('links', () => {
    let links

    beforeEach(() => {
      links = wrapper.findAllComponents(RouterLinkStub)
    })

    it('display thought logo', () => {
      expect(links.at(0).find('img').exists()).toBe(true)
      expect(links.at(0).props().to).toEqual({ name: 'userHome' })
    })

    it('display ホーム', () => {
      expect(links.at(1).text()).toBe('ホーム')
      expect(links.at(1).props().to).toEqual({ name: 'userHome' })
    })

    it('display プロフィール', () => {
      expect(links.at(2).text()).toBe('プロフィール')
      expect(links.at(2).props().to).toEqual({ name: 'userShow', params: { userId: 'testUser' } })
    })

    it('display 設定', () => {
      expect(links.at(3).text()).toBe('設定')
      expect(links.at(3).props().to).toEqual({ name: 'userHome' })
    })
  })
})
