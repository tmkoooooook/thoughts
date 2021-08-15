import 'jsdom-global/register'
import '../__mocks__/sessionStorage_mock'
import '../__mocks__/localStorage_mock'
import { createLocalVue, mount } from '@vue/test-utils'
import LogoutBtn from 'parts/logout_btn'
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import axios from 'axios'
import Vuex from 'vuex'
import handler from 'utils/handler'

jest.mock('axios')
const response = '200 ok'
axios.delete.mockResolvedValue(response)

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin(handler)

describe('LogoutBtn', () => {
  let wrapper
  let mutations
  let store
  const factory = () => {
    return mount(LogoutBtn, {
      localVue,
      store
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
    wrapper = factory()
  })

  it('run logout at click', () => {
    wrapper.find('button').trigger('click')
    expect(axios.delete).toHaveBeenCalled()
  })

  it('calls set Errors when axios response receive errors', async () => {
    const errors = { message: 'error' }
    handler.methods.handle = jest.fn(() => ([undefined, errors]))
    wrapper = factory()
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(mutations.setErrors).toHaveBeenCalled()
  })
})
