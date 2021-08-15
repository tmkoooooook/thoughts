import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import SignUp from 'homes/sign_up'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import axios from 'axios'
import Vuex from 'vuex'
import handler from 'utils/handler'

jest.mock('axios')

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin(handler)

describe('SignUp', () => {
  let wrapper
  let mutations
  let store


  const factory = () => {
    return shallowMount(SignUp, {
      localVue,
      store,
      stubs: ['router-link']
    })
  }

  beforeEach(() => {
    handler.methods.handle = jest.fn(response => ([response, undefined]))
    mutations = {
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
    wrapper.find('input[name="name"]').setValue('testUser')
    wrapper.find('input[name="email"]').setValue('testuser@example.com')
    wrapper.find('input[name="user_id"]').setValue('testUserId')
    wrapper.find('input[name="password"]').setValue('password')
    const user = {
      name: 'testUser',
      email: 'testuser@example.com',
      user_id: 'testUserId',
      password: 'password'
    }
    expect(wrapper.vm.user).toEqual(user)
  })

  it('run axios.post at submit', () => {
    wrapper.find('input[type="submit"]').trigger('submit.prevent')
    expect(axios.post).toHaveBeenCalled()
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
    SignUp.beforeRouteLeave.call(wrapper.vm, undefined, undefined, next)
    await wrapper.vm.$nextTick()
    expect(mutations.clearErrors).toHaveBeenCalled()
  })
})
