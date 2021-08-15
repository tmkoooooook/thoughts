import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserPasswordEdit from 'user/user_password_edit'
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

describe('UserPasswordEdit', () => {
  let wrapper
  let mutations
  let store

  const factory = (mq) => {
    const $mq = mq
    return shallowMount(UserPasswordEdit, {
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
      wrapper = factory('pc')
    })

    it('run axios.put at submit.prevent', () => {
      wrapper.find('input[type="password"]').setValue('newPassword')
      wrapper.find('input[type="password"]').setValue('newPassword')
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
  })

  describe('$mq === sp', () => {
    beforeEach(() => {
      wrapper = factory('sp')
    })

    it('run axios.put at submit.prevent', () => {
      wrapper.find('input[type="password"]').setValue('newPassword')
      wrapper.find('input[type="password"]').setValue('newPassword')
      wrapper.find('input[type="submit"]').trigger('submit.prevent')
      expect(axios.put).toHaveBeenCalled()
    })
  })
})
