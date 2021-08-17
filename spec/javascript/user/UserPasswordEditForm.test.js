import 'jsdom-global/register'
import '../__mocks__/sessionStorage_mock'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserPasswordEditForm from 'user/user_password_edit_form'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { ModalPlugin } from 'bootstrap-vue'
import axios from 'axios'
import Vuex from 'vuex'
import handler from 'utils/handler'

jest.mock('axios')
const response = { data: 'ok' }
axios.put.mockResolvedValue(response)

const localVue = createLocalVue()
localVue.use(ModalPlugin)
localVue.use(Vuex)
localVue.mixin(handler)

describe('UserPasswordEditForm', () => {
  let wrapper
  let mutations
  let store

  const factory = (mq) => {
    const $mq = mq
    return shallowMount(UserPasswordEditForm, {
      localVue,
      store,
      mocks: { $mq },
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

    it('run axios.put at submit.prevent', () => {
      wrapper.find('input[placeholder="現在のパスワード"]').setValue('oldPassword')
      wrapper.find('input[placeholder="新しいパスワード"]').setValue('newPassword')
      wrapper.find('input[placeholder="パスワードの確認"]').setValue('newPassword')
      wrapper.find('input[type="submit"]').trigger('submit.prevent')
      expect(axios.put).toHaveBeenCalled()
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
  })
})
