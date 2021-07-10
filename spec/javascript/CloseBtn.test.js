import 'jsdom-global/register'
import { createLocalVue, mount } from '@vue/test-utils'
import MyThought from 'thoughts/my_thought.vue'
import { describe, expect, it } from '@jest/globals'
import { ModalPlugin } from 'bootstrap-vue'
import mq from 'mq'

const localVue = createLocalVue()
localVue.use(ModalPlugin)

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('MyThought', () => {
  const wrapper = mount(MyThought, { localVue })

  describe('mq === pc', () => {
    it('open myThoughtForm', () => {
      wrapper.mq = 'pc'
      expect(wrapper.find('myThoughtForm').exists()).toBe(true)
    })
  })

  describe('mq === sp', () => {
    it('open myThoughtModal', () => {
      wrapper.mq = 'sp'
      expect(wrapper.find('myThoughtForm').exists()).toBe(true)
      expect(wrapper.find('myThoughtModal').exists()).toBe(true)
    })
  })

})
