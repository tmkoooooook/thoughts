import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import MyThought from 'thoughts/my_thought.vue'
import MyThoughtForm from 'thoughts/my_thought_form.vue'
import MyThoughtBtn from 'parts/my_thought_btn.vue'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { ModalPlugin } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(ModalPlugin)

describe('MyThought', () => {
  let wrapper
  let route
  const factory = (mq, route) => {
    const $mq = mq
    const $route = route
    return shallowMount(MyThought, {
      localVue,
      mocks: { $mq, $route, }
    })
  }

  describe('$mq === pc', () => {
    beforeEach(() => {
      route = { params: { userId: 'testUser' } }
      wrapper = factory('pc', route)
      wrapper.setProps({ myThoughtActive: true })
    })

    it('display thought form', () => {
      expect(wrapper.find('div#my_thought').exists()).toBe(true)
      expect(wrapper.findComponent(MyThoughtForm).exists()).toBe(true)
    })

    it('emitted activateMyThought', () => {
      wrapper.findComponent(MyThoughtBtn).vm.$emit('activeMyThought')
      expect(wrapper.emitted('activateMyThought')).toBeTruthy
    })
  })

  describe('$mq === sp', () => {
    beforeEach(() => {
      route = { params: { userId: null } }
      wrapper = factory('sp', route)
      wrapper.setProps({ myThoughtActive: true })
    })

    it('open myThoughtModal', () => {
    expect(wrapper.find('#my_thought_modal').exists()).toBe(true)
    expect(wrapper.findComponent(MyThoughtForm).exists()).toBe(true)
  })

    it('emitted activateMyThought', async () => {
      await wrapper.setProps({ myThoughtActive: false })
      wrapper.findComponent(MyThoughtBtn).vm.$emit('activeMyThought')
      expect(wrapper.emitted('activateMyThought')).toBeTruthy
    })
  })
})
