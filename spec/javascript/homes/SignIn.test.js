import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import SignIn from 'homes/sign_in'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import axios from 'axios'
import Vuex from 'vuex'
import handler from 'utils/handler'


jest.mock('axios')

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin(handler)

describe('SignIn', () => {
  let wrapper
  let mutations
  let store
  const factory = () => {
    return shallowMount(SignIn, {
      localVue,
      store,
      stubs: ['router-link']
    })
  }

  beforeEach(() => {
    handler.methods.handle = jest.fn(response => ([response, undefined]))
    mutations = {
      setUserSessionTokens: jest.fn(),
      setErrors: jest.fn(),
      clearErrors: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      mutations
    })
    wrapper = factory()
  })

  it('input form', () => {
    wrapper.find('input[name="user_id"]').setValue('testUserId')
    wrapper.find('input[name="password"]').setValue('password')
    const user = {
      user_id: 'testUserId',
      password: 'password'
    }
    expect(wrapper.vm.user).toEqual(user)
  })

  it('run axios.post at submit', async () => {
    wrapper.find('input[type="submit"]').trigger('submit.prevent')
    expect(axios.post).toHaveBeenCalled()
    await wrapper.vm.$nextTick()
    expect(mutations.setUserSessionTokens).toHaveBeenCalled()
  })

  it('calls setErrors when axios response receive errors', async () => {
    const errors = { message: 'error' }
    handler.methods.handle = jest.fn(() => ([undefined, errors]))
    wrapper = factory()
    wrapper.find('input[type="submit"]').trigger('submit.prevent')
    await wrapper.vm.$nextTick()
    expect(mutations.setErrors).toHaveBeenCalled()
  })

  it('calls clearErrors when the route leave', async () => {
    const next = jest.fn()
    SignIn.beforeRouteLeave.call(wrapper.vm, undefined, undefined, next)
    await wrapper.vm.$nextTick()
    expect(mutations.clearErrors).toHaveBeenCalled()
  })
})
