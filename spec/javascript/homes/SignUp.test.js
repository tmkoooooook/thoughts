import 'jsdom-global/register'
import { shallowMount } from '@vue/test-utils'
import SignUp from 'homes/sign_up'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import axios from 'axios'

jest.mock('axios')

describe('SignUp', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(SignUp, { stubs: ['router-link'] })
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
})
