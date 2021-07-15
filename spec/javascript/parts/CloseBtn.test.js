import 'jsdom-global/register'
import { mount } from '@vue/test-utils'
import CloseBtn from 'parts/close_btn'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('CloseBtn', () => {
  let wrapper
  const modalHideMock = jest.fn()
  const routerPushMock = jest.fn()
  const factory = (mq) => {
    const $mq = mq
    return mount(CloseBtn, {
      mocks: {
        $mq,
        $bvModal: { hide: modalHideMock },
        $router:  { push: routerPushMock }
      }
    })
  }
  describe('$mq === pc', () => {
    beforeEach(() => {
      wrapper = factory('pc')
    })

    it('run closeThought at click', () => {
      wrapper.find('button').trigger('click')
      expect(modalHideMock).not.toHaveBeenCalled()
      expect(routerPushMock).toHaveBeenCalled()
    })
  })

  describe('$mq === sp', () => {
    beforeEach(() => {
      wrapper = factory('sp')
    })

    it('run closeThought at click', () => {
      wrapper.find('button').trigger('click')
      expect(modalHideMock).toHaveBeenCalled()
      expect(routerPushMock).toHaveBeenCalled()
    })
  })
})
