import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserSettings from 'user/user_settings'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import axios from 'axios'
import Vuex from 'vuex'
import handler from 'utils/handler'

jest.createMockFromModule('axios')
axios.get = jest.fn(response => response = { data: 'ok' })

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin(handler)

describe('UserSettings', () => {
  let wrapper
  let mutations
  let store
  const factory = () => {
    return shallowMount(UserSettings, {
      localVue,
      store,
      stubs: ['router-link', 'router-view']
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

  it('run fetchAccountInfo', () => {
    expect(axios.get).toHaveBeenCalled()
  })

  it('calls setErrors when axios response receive errors', async () => {
    const errors = { message: 'error' }
    handler.methods.handle = jest.fn(() => ([undefined, errors]))
    wrapper = factory()
    await wrapper.vm.$nextTick()
    expect(mutations.setErrors).toHaveBeenCalled()
  })

  it('display アカウント情報', () => {
    expect(wrapper.findAll('router-link-stub').at(0).text()).toBe('アカウント情報')
  })

  it('display アカウント編集', () => {
    expect(wrapper.findAll('router-link-stub').at(1).text()).toBe('アカウント編集')
  })

  it('display パスワード変更', () => {
    expect(wrapper.findAll('router-link-stub').at(2).text()).toBe('パスワード変更')
  })
})
