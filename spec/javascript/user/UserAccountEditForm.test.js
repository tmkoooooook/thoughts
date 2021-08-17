import 'jsdom-global/register'
import '../__mocks__/sessionStorage_mock'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserAccountEditForm from 'user/user_account_edit_form'
import UploadImage from 'parts/upload_image'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { ModalPlugin } from 'bootstrap-vue'
import axios from 'axios'
import Vuex from 'vuex'
import handler from 'utils/handler'

jest.mock('axios')
const response = { data: 'ok' }
axios.patch.mockResolvedValue(response)

const localVue = createLocalVue()
localVue.use(ModalPlugin)
localVue.use(Vuex)
localVue.mixin(handler)

describe('UserAccountEditForm', () => {
  let wrapper
  let mutations
  let store
  const factory = (mq) => {
    const $mq = mq
    return shallowMount(UserAccountEditForm, {
      localVue,
      store,
      mocks: { $mq },
      propsData: { account: { name: 'testUser', user_id: 'testUserId', email: 'testUser@example.com' } }
    })
  }
  beforeEach(() => {
    handler.methods.handle = jest.fn(response => ([response, undefined]))
    mutations = {
      setErrors: jest.fn(),
    }
    store = new Vuex.Store({
      state: {},
      mutations
    })
  })

  describe('$mq === pc', () => {
    beforeEach(() => {
      window.sessionStorage.clear()
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

    it('calls setErrors when axios response receive errors', async () => {
      const errors = { message: 'error' }
      handler.methods.handle = jest.fn(() => ([undefined, errors]))
      wrapper = factory('pc')
      wrapper.find('input[type="submit"]').trigger('submit.prevent')
      await wrapper.vm.$nextTick()
      expect(mutations.setErrors).toHaveBeenCalled()
    })

    it('does not change when guest user logged in', async () => {
      window.sessionStorage.setItem('isGuestUser', true)
      wrapper = factory('pc')
      wrapper.find('input[type="submit"]').trigger('submit.prevent')
      await wrapper.vm.$nextTick()
      expect(mutations.setErrors).toHaveBeenCalledWith({}, ['ゲストユーザーの変更はできません'])
    })

    it('delete empty prop when exists in accountEdit', () => {
      wrapper.find('input[name="name"]').setValue('')
      wrapper.find('input[name="user_id"]').setValue('updateUser_id')
      expect(wrapper.vm.accountEdit).toEqual({ name: '', user_id: 'updateUser_id' })

      wrapper.find('input[type="submit"]').trigger('submit.prevent')
      expect(wrapper.vm.accountEdit).toEqual({ user_id: 'updateUser_id' })
    })
  })
})
