import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserPasswordEdit from 'user/user_password_edit'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { ModalPlugin } from 'bootstrap-vue'
import axios from 'axios'

jest.mock('axios')
const response = { data: 'ok' }
axios.put.mockResolvedValue(response)

const localVue = createLocalVue()
localVue.use(ModalPlugin)

describe('UserPasswordEdit', () => {
  let wrapper
  const factory = (mq) => {
    const $mq = mq
    return shallowMount(UserPasswordEdit, {
      localVue,
      mocks: { $mq },
    })
  }

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
