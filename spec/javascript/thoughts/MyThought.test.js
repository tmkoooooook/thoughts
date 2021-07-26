import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import MyThought from 'thoughts/my_thought.vue'
import MyThoughtBtn from 'parts/my_thought_btn.vue'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { ModalPlugin } from 'bootstrap-vue'
import axios from 'axios'
import Vuex from 'vuex'

jest.mock('axios')
const thought = { title: 'title', text: 'text' }
const response = { data: thought }
axios.post.mockResolvedValue(response)

const localVue = createLocalVue()
localVue.use(ModalPlugin)
localVue.use(Vuex)

describe('MyThought', () => {
  let wrapper
  let route
  let actions
  let store
  const factory = (mq, route) => {
    const $mq = mq
    const $route = route
    return shallowMount(MyThought, {
      localVue,
      store,
      mocks: {
        $mq,
        $route,
      }
    })
  }
  beforeEach(() => {
    actions = {
      fetchThoughts: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  describe('$mq === pc', () => {
    beforeEach(() => {
      route = { params: { userId: 'testUser' } }
      wrapper = factory('pc', route)
      wrapper.setData({ thought: { title: '', text: '' } })
      wrapper.setProps({ myThoughtActive: true })
    })

    it('display thought form', () => {
      expect(wrapper.find('div#my_thought').exists()).toBe(true)
    })

    describe('input form', () => {
      it('gets thought.title', () => {
        const title = wrapper.find('input[name="title"]')
        title.setValue('input title')
        expect(wrapper.vm.thought.title).toBe('input title')
      })

      it('gets thought.text', () => {
        const text = wrapper.find('textarea[name="text"]')
        text.setValue('input text')
        expect(wrapper.vm.thought.text).toBe('input text')
      })

      it('call axios.post', () => {
        const submit = wrapper.find('input[type="submit"]')
        submit.trigger('submit.prevent')
        expect(axios.post).toHaveBeenCalled()
      })

      it('resize textarea height at keydown', () => {
        const text = wrapper.find('textarea[name="text"]')
        text.trigger('keydown.enter')
        expect(text.element.style.height).toBe('200px')
      })

      it('emitted activateMyThought', () => {
        wrapper.findComponent(MyThoughtBtn).vm.$emit('activeMyThought')
        expect(wrapper.emitted('activateMyThought')).toBeTruthy
      })
    })
  })

  describe('$mq === sp', () => {
    beforeEach(() => {
      route = { params: { userId: null } }
      wrapper = factory('sp', route)
      wrapper.setData({ thought: { title: '', text: '' } })
      wrapper.setProps({ myThoughtActive: true })
    })

    it('open myThoughtModal', () => {
    expect(wrapper.find('#my_thought_modal').exists()).toBe(true)
    })

    describe('input form', () => {
      it('gets thought.title', () => {
        const title = wrapper.find('input[name="title"]')
        title.setValue('input title')
        expect(wrapper.vm.thought.title).toBe('input title')
      })

      it('gets thought.text', () => {
        const text = wrapper.find('textarea[name="text"]')
        text.setValue('input text')
        expect(wrapper.vm.thought.text).toBe('input text')
      })

      it('call axios.post', () => {
        const submit = wrapper.find('input[type="submit"]')
        submit.trigger('submit.prevent')
        expect(axios.post).toHaveBeenCalled()
      })

      it('resize textarea height at keydown', () => {
        const text = wrapper.find('textarea[name="text"]')
        text.trigger('keydown.enter')
        expect(text.element.style.height).toBe('200px')
      })

      it('emitted activateMyThought', async () => {
        await wrapper.setProps({ myThoughtActive: false })
        wrapper.findComponent(MyThoughtBtn).vm.$emit('activeMyThought')
        expect(wrapper.emitted('activateMyThought')).toBeTruthy
      })
    })
  })
})
