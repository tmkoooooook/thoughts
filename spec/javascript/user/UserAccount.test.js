import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserAccount from 'user/user_account'
import UserAccountView from 'user/user_account_view'
import UserAccountEditForm from 'user/user_account_edit_form'
import UserPasswordEditForm from 'user/user_password_edit_form'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { ModalPlugin } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(ModalPlugin)

describe('UserAccount', () => {
  let wrapper
  let route
  const factory = (mq, route) => {
    const $mq = mq
    const $route = route
    return shallowMount(UserAccount, {
      localVue,
      mocks: { $mq, $route },
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
    it('does not display modal', () => {
      route = { name: 'userAccount'}
      wrapper = factory('pc',route)
      expect(wrapper.find('b-modal-stub').exists()).toBe(false)
    })

    it('display UserAccountView when route name is userAccount', () => {
      route = { name: 'userAccount'}
      wrapper = factory('pc', route)
      expect(wrapper.findComponent(UserAccountView).exists()).toBe(true)
    })

    it('display UserAccountEditForm when route name is userAccountEdit', () => {
      route = { name: 'userAccountEdit'}
      wrapper = factory('pc', route)
      expect(wrapper.findComponent(UserAccountEditForm).exists()).toBe(true)
    })

    it('display UserPasswordEditForm when route name is userPasswordEdit', () => {
      route = { name: 'userPasswordEdit'}
      wrapper = factory('pc', route)
      expect(wrapper.findComponent(UserPasswordEditForm).exists()).toBe(true)
    })
  })

  describe('$mq === sp', () => {
    beforeEach(() => {
      route = { name: 'userAccount'}
      wrapper = factory('sp', route)
    })

    it('display modal', () => {
      route = { name: 'userAccount'}
      wrapper = factory('sp',route)
      expect(wrapper.find('b-modal-stub').exists()).toBe(true)
    })

    it('display UserAccountView when route name is userAccount', () => {
      route = { name: 'userAccount'}
      wrapper = factory('sp', route)
      expect(wrapper.findComponent(UserAccountView).exists()).toBe(true)
    })

    it('display UserAccountEditForm when route name is userAccountEdit', () => {
      route = { name: 'userAccountEdit'}
      wrapper = factory('sp', route)
      expect(wrapper.findComponent(UserAccountEditForm).exists()).toBe(true)
    })

    it('display UserPasswordEditForm when route name is userPasswordEdit', () => {
      route = { name: 'userPasswordEdit'}
      wrapper = factory('sp', route)
      expect(wrapper.findComponent(UserPasswordEditForm).exists()).toBe(true)
    })
  })
})
