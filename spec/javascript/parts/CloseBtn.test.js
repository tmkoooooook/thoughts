import 'jsdom-global/register'
import { mount } from '@vue/test-utils'
import CloseBtn from 'parts/close_btn'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('CloseBtn', () => {
  let wrapper
  let modalHideMock
  let routerPushMock
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
  beforeEach(() => {
    modalHideMock = jest.fn()
    routerPushMock = jest.fn()
  })

  describe('$mq === pc', () => {
    beforeEach(() => {
      wrapper = factory('pc')
    })

    it('does not run $bvModal.hide', () => {
      wrapper.find('button').trigger('click')
      expect(modalHideMock).not.toHaveBeenCalled()
    })
  })

  describe('$mq === sp', () => {
    beforeEach(() => {
      wrapper = factory('sp')
    })

    it('run $bvModal.hide', () => {
      wrapper.find('button').trigger('click')
      expect(modalHideMock).toHaveBeenCalled()
    })
  })

  describe('route', () => {
    beforeEach(() => {
      wrapper = factory('sp')
    })

    it('run $router.push when route is true', async () => {
      await wrapper.setProps({ route: { name: 'route' } })
      wrapper.find('button').trigger('click')
      expect(routerPushMock).toHaveBeenCalled()
    })

    it('does not run $router.push when route is false', () => {
      wrapper.find('button').trigger('click')
      expect(routerPushMock).not.toHaveBeenCalled()
    })
  })
})
