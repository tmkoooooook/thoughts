import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserAccountView from 'user/user_account_view'
import UserImage from 'parts/user_image'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { ModalPlugin } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(ModalPlugin)

describe('UserAccountView', () => {
  let wrapper
  const factory = (mq) => {
    const $mq = mq
    return shallowMount(UserAccountView, {
      localVue,
      mocks: { $mq },
      propsData: {
        account: {
          name: 'testUser',
          user_id: 'testUserId',
          email: 'testUser@example.com',
          icon_image: { url: 'image.png' },
          header_image: { url: 'image.png' }
        }
      }
    })
  }

  describe('$mq === pc', () => {
    beforeEach(() => {
      wrapper = factory('pc')
    })

    it('display icon_image', () => {
      expect(wrapper.findAllComponents(UserImage).at(0).exists()).toBe(true)
    })

    it('display header_image', () => {
      expect(wrapper.findAllComponents(UserImage).at(1).exists()).toBe(true)
    })

    it('display 名前', () => {
      expect(wrapper.findAll('.setting-list').at(2).text()).toBe('名前 testUser')
    })

    it('display ユーザーID', () => {
      expect(wrapper.findAll('.setting-list').at(3).text()).toBe('ユーザーID testUserId')
    })

    it('display Eメール', () => {
      expect(wrapper.findAll('.setting-list').at(4).text()).toBe('Eメール testUser@example.com')
    })
  })

  describe('$mq === sp', () => {
    beforeEach(() => {
      wrapper = factory('sp')
    })

    it('display icon_image', () => {
      expect(wrapper.findAllComponents(UserImage).at(0).exists()).toBe(true)
    })

    it('display header_image', () => {
      expect(wrapper.findAllComponents(UserImage).at(1).exists()).toBe(true)
    })

    it('display 名前', () => {
      expect(wrapper.findAll('.setting-list').at(2).text()).toBe('名前 testUser')
    })

    it('display ユーザーID', () => {
      expect(wrapper.findAll('.setting-list').at(3).text()).toBe('ユーザーID testUserId')
    })

    it('display Eメール', () => {
      expect(wrapper.findAll('.setting-list').at(4).text()).toBe('Eメール testUser@example.com')
    })
  })
})
