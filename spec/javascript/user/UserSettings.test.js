import 'jsdom-global/register'
import { shallowMount } from '@vue/test-utils'
import UserSettings from 'user/user_settings'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import axios from 'axios'

jest.createMockFromModule('axios')
axios.get = jest.fn(response => response = { data: 'ok' })

describe('UserSettings', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(UserSettings, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('run fetchAccountInfo', () => {
    expect(axios.get).toHaveBeenCalled()
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
