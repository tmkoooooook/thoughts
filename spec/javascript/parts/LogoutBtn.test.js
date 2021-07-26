import 'jsdom-global/register'
import '../__mocks__/sessionStorage_mock'
import { mount } from '@vue/test-utils'
import LogoutBtn from 'parts/logout_btn'
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import axios from 'axios'

jest.mock('axios')
const response = '200 ok'
axios.delete.mockResolvedValue(response)

describe('LogoutBtn', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LogoutBtn)
  })

  it('run logout at click', () => {
    wrapper.find('button').trigger('click')
    expect(axios.delete).toHaveBeenCalled()
  })
})
