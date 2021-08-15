import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import ErrorMessages from 'parts/error_messages'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { AlertPlugin } from 'bootstrap-vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(AlertPlugin)
localVue.use(Vuex)

describe('ErrorMessages', () => {
  let wrapper
  let mutations
  let store
  const factory = (sign) => {
    const _sign = sign
    return shallowMount(ErrorMessages, {
      localVue,
      store,
      propsData: { sign: _sign }
    })
  }
  beforeEach(() => {
    mutations = { clearErrors: jest.fn() }
    store = new Vuex.Store({
      state: { errors: ['error1', 'error2'] },
      mutations
    })
  })

  it('display error messages when sign is true', async () => {
    wrapper = factory(true)
    const alerts = wrapper.findAll('b-alert-stub')
    expect(alerts.length).toBe(2)
    expect(alerts.at(0).text()).toBe('error1')
    expect(alerts.at(1).text()).toBe('error2')
  })

  it('display error messages when sign is false', async () => {
    wrapper = factory(false)
    const alerts = wrapper.findAll('b-alert-stub')
    expect(alerts.length).toBe(2)
  })
})
