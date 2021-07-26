import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserAccount from 'user/user_account'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { ModalPlugin } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(ModalPlugin)

describe('UserAccount', () => {
  let wrapper
  const factory = (mq) => {
    const $mq = mq
    return shallowMount(UserAccount, {
      localVue,
      mocks: { $mq },
      propsData: { account: { name: 'testUser', user_id: 'testUserId', email: 'testUser@example.com' } }
    })
  }

  describe('$mq === pc', () => {
    beforeEach(() => {
      wrapper = factory('pc')
    })

    it('display 名前', () => {
      expect(wrapper.findAll('.setting-list').at(0).text()).toBe('名前 testUser')
    })

    it('display ユーザーID', () => {
      expect(wrapper.findAll('.setting-list').at(1).text()).toBe('ユーザーID testUserId')
    })

    it('display Eメール', () => {
      expect(wrapper.findAll('.setting-list').at(2).text()).toBe('Eメール testUser@example.com')
    })
  })

  describe('$mq === sp', () => {
    beforeEach(() => {
      wrapper = factory('sp')
    })

    it('display 名前', () => {
      expect(wrapper.findAll('.setting-list').at(0).text()).toBe('名前 testUser')
    })

    it('display ユーザーID', () => {
      expect(wrapper.findAll('.setting-list').at(1).text()).toBe('ユーザーID testUserId')
    })

    it('display Eメール', () => {
      expect(wrapper.findAll('.setting-list').at(2).text()).toBe('Eメール testUser@example.com')
    })
  })
})
