import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserAccountEdit from 'user/user_account_edit'
import UploadImage from 'parts/upload_image'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { ModalPlugin } from 'bootstrap-vue'
import axios from 'axios'

jest.mock('axios')
const response = { data: 'ok' }
axios.patch.mockResolvedValue(response)

const localVue = createLocalVue()
localVue.use(ModalPlugin)

describe('UserAccountEdit', () => {
  let wrapper
  const factory = (mq) => {
    const $mq = mq
    return shallowMount(UserAccountEdit, {
      localVue,
      mocks: { $mq },
      propsData: { account: { name: 'testUser', user_id: 'testUserId', email: 'testUser@example.com' } }
    })
  }

  describe('$mq === pc', () => {
    beforeEach(() => {
      wrapper = factory('pc')
    })

    it('display icon_image', () => {
      expect(wrapper.findAllComponents(UploadImage).at(0).exists()).toBe(true)
    })

    it('display header_image', () => {
      expect(wrapper.findAllComponents(UploadImage).at(1).exists()).toBe(true)
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

    it('input form then accountEdit gets value ', () => {
      wrapper.find('input[name="name"]').setValue('updateName')
      wrapper.find('input[name="user_id"]').setValue('updateUser_id')
      wrapper.find('input[name="email"]').setValue('updateEmail')
      expect(wrapper.vm.accountEdit).toEqual({ email: 'updateEmail', name: 'updateName', user_id: 'updateUser_id'})
    })

    it('run axios.patch when submit form ', () => {
      wrapper.find('input[type="submit"]').trigger('submit.prevent')
      expect(axios.patch).toHaveBeenCalled()
    })

    it('delete empty prop when exists in accountEdit', () => {
      wrapper.find('input[name="name"]').setValue('')
      wrapper.find('input[name="user_id"]').setValue('updateUser_id')
      expect(wrapper.vm.accountEdit).toEqual({ name: '', user_id: 'updateUser_id' })

      wrapper.find('input[type="submit"]').trigger('submit.prevent')
      expect(wrapper.vm.accountEdit).toEqual({ user_id: 'updateUser_id' })
    })
  })

  describe('$mq === sp', () => {
    beforeEach(() => {
      wrapper = factory('sp')
    })

    it('display icon_image', () => {
      expect(wrapper.findAllComponents(UploadImage).at(0).exists()).toBe(true)
    })

    it('display header_image', () => {
      expect(wrapper.findAllComponents(UploadImage).at(1).exists()).toBe(true)
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
