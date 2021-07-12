import 'jsdom-global/register'
import { createLocalVue, mount } from '@vue/test-utils'
import CloseBtn from 'parts/close_btn'
import { expect } from '@jest/globals'

const localVue = createLocalVue()

describe('CloseBtn', () => {
  let wrapper
  const modalHideMock = jest.fn()
  const routerPushMock =jest.fn()

  beforeEach(() => {
    wrapper = mount(CloseBtn, {
      localVue,
      mocks: {
        $bvModal: { hide: modalHideMock },
        $router:  { push: routerPushMock }
      }
    })
  })
  it('run closeThought at click', () => {
    wrapper.find('button').trigger('click')
    expect(modalHideMock).toHaveBeenCalled()
    expect(routerPushMock).toHaveBeenCalled()
  })
})
