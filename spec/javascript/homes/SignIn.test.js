import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import SignIn from 'homes/sign_in'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import axios from 'axios'
import Vuex from 'vuex'


jest.mock('axios')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SignIn', () => {
  let wrapper
  let mutations
  let store

  beforeEach(() => {
    mutations = {
      setUserSessionTokens: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      mutations
    })
    wrapper = shallowMount(SignIn, {
      localVue,
      store,
      stubs: ['router-link']
    })
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
})
