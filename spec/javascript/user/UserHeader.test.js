import 'jsdom-global/register'
import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import UserHeader from 'user/user_header'

describe('UserHeader', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(UserHeader, {
      stubs: { RouterLink: RouterLinkStub }
    })
  })

  describe('links', () => {
    let links

    beforeEach(() => {
      links = wrapper.findAllComponents(RouterLinkStub)
    })

    it('display thought logo', () => {
      const links = wrapper.findAllComponents(RouterLinkStub)
      expect(links.at(0).find('img').exists()).toBe(true)
      expect(links.at(0).props().to).toBe('/users')
    })

    it('display ホーム', () => {
      const links = wrapper.findAllComponents(RouterLinkStub)
      expect(links.at(1).text()).toBe('ホーム')
      expect(links.at(1).props().to).toBe('/users')
    })

    it('display プロフィール', () => {
      expect(links.at(2).text()).toBe('プロフィール')
      expect(links.at(2).props().to).toBe('/users')
    })

    it('display 設定', () => {
      const links = wrapper.findAllComponents(RouterLinkStub)
      expect(links.at(3).text()).toBe('設定')
      expect(links.at(3).props().to).toBe('/users')
    })
  })
})
